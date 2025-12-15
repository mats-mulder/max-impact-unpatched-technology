import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface BaseAdjustmentProps {
  baseReduction: number;
  onBaseReductionChange: (value: number) => void;
}

export function BaseAdjustment({
  baseReduction,
  onBaseReductionChange,
}: BaseAdjustmentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Base Adjustment</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This is a downward adjustment applied to the highest CVE severity to represent potential risk uncertainty.
        </p>
        
        <div className="space-y-2">
          <Label htmlFor="base-reduction">
            Base Reduction: {baseReduction.toFixed(1)}
          </Label>
          <Slider
            id="base-reduction"
            min={0.0}
            max={5.0}
            step={0.1}
            value={[baseReduction]}
            onValueChange={(values) => onBaseReductionChange(values[0])}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            Base severity = highest_cve - base_reduction
          </p>
        </div>
      </div>
    </div>
  );
}

