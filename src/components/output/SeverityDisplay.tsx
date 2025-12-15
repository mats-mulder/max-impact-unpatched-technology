import { CalculationResult } from '@/lib/severityCalculator';

interface SeverityDisplayProps {
  result: CalculationResult;
  highestCveSeverity: number;
  activelyExploited: boolean;
}

function getSeverityLabel(severity: number): { label: string; color: string } {
  if (severity >= 9.0) {
    return { label: 'Critical', color: 'text-red-600 dark:text-red-400' };
  } else if (severity >= 7.0) {
    return { label: 'High', color: 'text-orange-600 dark:text-orange-400' };
  } else if (severity >= 4.0) {
    return { label: 'Medium', color: 'text-yellow-600 dark:text-yellow-400' };
  } else {
    return { label: 'Low', color: 'text-green-600 dark:text-green-400' };
  }
}

export function SeverityDisplay({
  result,
  highestCveSeverity,
  activelyExploited,
}: SeverityDisplayProps) {
  const delta = result.finalSeverity - highestCveSeverity;
  const deltaFormatted = delta >= 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1);
  const severityInfo = getSeverityLabel(result.finalSeverity);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Primary Output</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <div className="text-6xl font-bold">
                {result.finalSeverity.toFixed(1)}
              </div>
              <div className={`text-2xl font-semibold ${severityInfo.color}`}>
                {severityInfo.label}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Final Dynamic Severity</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Highest CVE Severity:</span>
              <span className="font-semibold">{highestCveSeverity.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Delta from Highest CVE:</span>
              <span className={`font-semibold ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {deltaFormatted}
              </span>
            </div>
          </div>

          {result.isClamped && (
            <div className={`p-3 rounded-md text-sm ${
              result.clampReason === 'min' 
                ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
            }`}>
              {result.clampReason === 'min' 
                ? '⚠️ Clamped to minimum: 0.1'
                : 'ℹ️ Clamped to maximum: highest CVE severity'
              }
            </div>
          )}

          {activelyExploited && (
            <div className="p-3 rounded-md text-sm bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200">
              Even though this is a potential risk, active exploitation pushes severity close to the worst known impact.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

