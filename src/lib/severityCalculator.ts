export interface VolumeBucket {
  min: number;
  max: number;
  adjustment: number;
}

export interface CalculationInputs {
  highestCveSeverity: number;
  totalCves: number;
  exploitAvailable: boolean;
  activelyExploited: boolean;
  baseReduction: number;
  exploitAvailableAdjustment: number;
  activelyExploitedAdjustment: number;
  volumeBuckets: VolumeBucket[];
}

export interface CalculationResult {
  baseSeverity: number;
  volumeAdjustment: number;
  exploitAdjustment: number;
  rawSeverity: number;
  finalSeverity: number;
  isClamped: boolean;
  clampReason?: 'min' | 'max';
}

/**
 * Looks up the volume adjustment based on CVE count and bucket configuration
 */
export function lookupVolumeAdjustment(
  cveCount: number,
  buckets: VolumeBucket[]
): number {
  // Sort buckets by min value to ensure proper lookup
  const sortedBuckets = [...buckets].sort((a, b) => a.min - b.min);
  
  for (const bucket of sortedBuckets) {
    const withinMin = cveCount >= bucket.min;
    const withinMax = bucket.max === Infinity || cveCount <= bucket.max;
    if (withinMin && withinMax) {
      return bucket.adjustment;
    }
  }
  
  // If no bucket matches, return 0
  return 0;
}

/**
 * Calculates the exploit adjustment based on flags
 * Active exploitation overrides exploit available
 */
export function calculateExploitAdjustment(
  exploitAvailable: boolean,
  activelyExploited: boolean,
  exploitAvailableAdjustment: number,
  activelyExploitedAdjustment: number
): number {
  if (activelyExploited) {
    return activelyExploitedAdjustment;
  }
  if (exploitAvailable) {
    return exploitAvailableAdjustment;
  }
  return 0;
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Main calculation function that computes the dynamic severity
 * Enforces hard constraints:
 * - Final severity >= 0.1
 * - Final severity <= highest CVE severity
 */
export function calculateSeverity(
  inputs: CalculationInputs
): CalculationResult {
  // Base severity calculation
  const baseSeverity = inputs.highestCveSeverity - inputs.baseReduction;
  
  // Volume adjustment lookup
  const volumeAdjustment = lookupVolumeAdjustment(
    inputs.totalCves,
    inputs.volumeBuckets
  );
  
  // Exploit adjustment (conditional logic)
  const exploitAdjustment = calculateExploitAdjustment(
    inputs.exploitAvailable,
    inputs.activelyExploited,
    inputs.exploitAvailableAdjustment,
    inputs.activelyExploitedAdjustment
  );
  
  // Raw severity before clamping
  const rawSeverity = baseSeverity + volumeAdjustment + exploitAdjustment;
  
  // Apply hard constraints
  const minSeverity = 0.1;
  const maxSeverity = inputs.highestCveSeverity;
  
  let finalSeverity = rawSeverity;
  let isClamped = false;
  let clampReason: 'min' | 'max' | undefined;
  
  if (rawSeverity < minSeverity) {
    finalSeverity = minSeverity;
    isClamped = true;
    clampReason = 'min';
  } else if (rawSeverity > maxSeverity) {
    finalSeverity = maxSeverity;
    isClamped = true;
    clampReason = 'max';
  }
  
  return {
    baseSeverity,
    volumeAdjustment,
    exploitAdjustment,
    rawSeverity,
    finalSeverity,
    isClamped,
    clampReason,
  };
}

