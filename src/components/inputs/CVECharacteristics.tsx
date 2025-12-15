import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CVECharacteristicsProps {
  highestCveSeverity: number;
  totalCves: number;
  onHighestCveChange: (value: number) => void;
  onTotalCvesChange: (value: number) => void;
}

export function CVECharacteristics({
  highestCveSeverity,
  totalCves,
  onHighestCveChange,
  onTotalCvesChange,
}: CVECharacteristicsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">CVE Characteristics</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="highest-cve">
              Highest CVE Severity: {highestCveSeverity.toFixed(1)}
            </Label>
            <Slider
              id="highest-cve"
              min={0.1}
              max={10.0}
              step={0.1}
              value={[highestCveSeverity]}
              onValueChange={(values) => onHighestCveChange(values[0])}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Range: 0.1 to 10.0
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="total-cves">Total Number of Related CVEs</Label>
            <Input
              id="total-cves"
              type="number"
              min={1}
              value={totalCves}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1) {
                  onTotalCvesChange(value);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

