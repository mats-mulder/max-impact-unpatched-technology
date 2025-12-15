import { CalculationResult } from '@/lib/severityCalculator';

interface CalculationBreakdownProps {
  result: CalculationResult;
  highestCveSeverity: number;
}

export function CalculationBreakdown({
  result,
  highestCveSeverity,
}: CalculationBreakdownProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Calculation Breakdown</h2>
        
        <div className="space-y-3 font-mono text-sm">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Highest CVE:</span>
            <span className="font-semibold">{highestCveSeverity.toFixed(1)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Base reduction:</span>
            <span className="font-semibold text-red-600">-{(highestCveSeverity - result.baseSeverity).toFixed(1)}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Volume adjustment:</span>
            <span className={`font-semibold ${result.volumeAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {result.volumeAdjustment >= 0 ? '+' : ''}{result.volumeAdjustment.toFixed(1)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Exploit adjustment:</span>
            <span className={`font-semibold ${result.exploitAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {result.exploitAdjustment >= 0 ? '+' : ''}{result.exploitAdjustment.toFixed(1)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-t-2 border-foreground mt-2 pt-2">
            <span className="font-semibold">Final severity:</span>
            <span className="font-bold text-lg">{result.finalSeverity.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Calculation Logic</h3>
        <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
{`base = highest_cve - base_reduction
volume_adj = lookup_volume_adjustment(cve_count)
exploit_adj =
  if actively_exploited then active_exploit_adj
  else if exploit_available then exploit_available_adj
  else 0
raw_severity = base + volume_adj + exploit_adj
final_severity = clamp(
  raw_severity,
  min = 0.1,
  max = highest_cve
)`}
        </pre>
      </div>
    </div>
  );
}

