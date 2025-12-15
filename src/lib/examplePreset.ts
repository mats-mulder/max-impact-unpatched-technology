import { CalculationInputs, VolumeBucket } from './severityCalculator';

export const defaultVolumeBuckets: VolumeBucket[] = [
  { min: 1, max: 2, adjustment: 0.0 },
  { min: 3, max: 10, adjustment: 0.3 },
  { min: 11, max: 50, adjustment: 0.6 },
  { min: 51, max: Infinity, adjustment: 1.0 },
];

export const examplePreset: CalculationInputs = {
  highestCveSeverity: 9.1,
  totalCves: 14,
  exploitAvailable: true,
  activelyExploited: true,
  baseReduction: 2.0,
  exploitAvailableAdjustment: 0.5,
  activelyExploitedAdjustment: 1.0,
  volumeBuckets: defaultVolumeBuckets,
};

