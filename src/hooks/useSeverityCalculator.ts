import { useState, useMemo } from 'react';
import {
  CalculationInputs,
  CalculationResult,
  VolumeBucket,
  calculateSeverity,
} from '@/lib/severityCalculator';
import { examplePreset, defaultVolumeBuckets } from '@/lib/examplePreset';

export interface UseSeverityCalculatorReturn {
  inputs: CalculationInputs;
  result: CalculationResult;
  updateInputs: (updates: Partial<CalculationInputs>) => void;
  loadExample: () => void;
  updateVolumeBucket: (index: number, updates: Partial<VolumeBucket>) => void;
}

const defaultInputs: CalculationInputs = {
  highestCveSeverity: 7.5,
  totalCves: 5,
  exploitAvailable: false,
  activelyExploited: false,
  baseReduction: 2.0,
  exploitAvailableAdjustment: 0.5,
  activelyExploitedAdjustment: 1.0,
  volumeBuckets: defaultVolumeBuckets,
};

export function useSeverityCalculator(): UseSeverityCalculatorReturn {
  const [inputs, setInputs] = useState<CalculationInputs>(defaultInputs);

  const result = useMemo(() => {
    return calculateSeverity(inputs);
  }, [inputs]);

  const updateInputs = (updates: Partial<CalculationInputs>) => {
    setInputs((prev) => ({ ...prev, ...updates }));
  };

  const loadExample = () => {
    setInputs(examplePreset);
  };

  const updateVolumeBucket = (
    index: number,
    updates: Partial<VolumeBucket>
  ) => {
    setInputs((prev) => {
      const newBuckets = [...prev.volumeBuckets];
      newBuckets[index] = { ...newBuckets[index], ...updates };
      return { ...prev, volumeBuckets: newBuckets };
    });
  };

  return {
    inputs,
    result,
    updateInputs,
    loadExample,
    updateVolumeBucket,
  };
}

