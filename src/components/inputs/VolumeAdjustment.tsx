import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { VolumeBucket } from '@/lib/severityCalculator';

interface VolumeAdjustmentProps {
  buckets: VolumeBucket[];
  onBucketUpdate: (index: number, updates: Partial<VolumeBucket>) => void;
}

export function VolumeAdjustment({
  buckets,
  onBucketUpdate,
}: VolumeAdjustmentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Volume Adjustment</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Volume increases confidence, not exploit power.
        </p>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Min CVEs</TableHead>
                <TableHead>Max CVEs</TableHead>
                <TableHead>Adjustment Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buckets.map((bucket, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      type="number"
                      min={1}
                      value={bucket.min === Infinity ? '∞' : bucket.min}
                      onChange={(e) => {
                        const value = e.target.value === '∞' ? Infinity : parseInt(e.target.value, 10);
                        if (!isNaN(value as number)) {
                          onBucketUpdate(index, { min: value as number });
                        }
                      }}
                      className="w-20"
                      disabled={bucket.min === Infinity}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={bucket.max === Infinity ? 'inf' : bucket.max.toString()}
                      onChange={(e) => {
                        const value = e.target.value.toLowerCase().trim();
                        if (value === 'inf' || value === '∞' || value === 'infinity') {
                          onBucketUpdate(index, { max: Infinity });
                        } else {
                          const numValue = parseInt(value, 10);
                          if (!isNaN(numValue) && numValue >= bucket.min) {
                            onBucketUpdate(index, { max: numValue });
                          }
                        }
                      }}
                      placeholder="inf"
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step={0.1}
                      value={bucket.adjustment}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value)) {
                          onBucketUpdate(index, { adjustment: value });
                        }
                      }}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

