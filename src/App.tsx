import { useSeverityCalculator } from '@/hooks/useSeverityCalculator';
import { CVECharacteristics } from '@/components/inputs/CVECharacteristics';
import { ExploitabilityFlags } from '@/components/inputs/ExploitabilityFlags';
import { BaseAdjustment } from '@/components/inputs/BaseAdjustment';
import { ExploitAdjustments } from '@/components/inputs/ExploitAdjustments';
import { VolumeAdjustment } from '@/components/inputs/VolumeAdjustment';
import { SeverityDisplay } from '@/components/output/SeverityDisplay';
import { CalculationBreakdown } from '@/components/output/CalculationBreakdown';
import { Button } from '@/components/ui/button';

function App() {
  const {
    inputs,
    result,
    updateInputs,
    loadExample,
    updateVolumeBucket,
  } = useSeverityCalculator();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Severity Rules UI Playground</h1>
          <p className="text-muted-foreground">
            Interactive tool for tuning dynamic severity adjustment rules for Unpatched Technology (CPE-based) risks
          </p>
        </div>

        <div className="mb-4">
          <Button onClick={loadExample} variant="outline">
            Load Example: Outdated VPN Appliance
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="space-y-8">
            <div className="bg-card border rounded-lg p-6">
              <CVECharacteristics
                highestCveSeverity={inputs.highestCveSeverity}
                totalCves={inputs.totalCves}
                onHighestCveChange={(value) =>
                  updateInputs({ highestCveSeverity: value })
                }
                onTotalCvesChange={(value) =>
                  updateInputs({ totalCves: value })
                }
              />
            </div>

            <div className="bg-card border rounded-lg p-6">
              <ExploitabilityFlags
                exploitAvailable={inputs.exploitAvailable}
                activelyExploited={inputs.activelyExploited}
                onExploitAvailableChange={(value) =>
                  updateInputs({ exploitAvailable: value })
                }
                onActivelyExploitedChange={(value) =>
                  updateInputs({ activelyExploited: value })
                }
              />
            </div>

            <div className="bg-card border rounded-lg p-6">
              <BaseAdjustment
                baseReduction={inputs.baseReduction}
                onBaseReductionChange={(value) =>
                  updateInputs({ baseReduction: value })
                }
              />
            </div>

            <div className="bg-card border rounded-lg p-6">
              <ExploitAdjustments
                exploitAvailableAdjustment={inputs.exploitAvailableAdjustment}
                activelyExploitedAdjustment={inputs.activelyExploitedAdjustment}
                onExploitAvailableAdjustmentChange={(value) =>
                  updateInputs({ exploitAvailableAdjustment: value })
                }
                onActivelyExploitedAdjustmentChange={(value) =>
                  updateInputs({ activelyExploitedAdjustment: value })
                }
              />
            </div>

            <div className="bg-card border rounded-lg p-6">
              <VolumeAdjustment
                buckets={inputs.volumeBuckets}
                onBucketUpdate={updateVolumeBucket}
              />
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-8">
            <div className="bg-card border rounded-lg p-6">
              <SeverityDisplay
                result={result}
                highestCveSeverity={inputs.highestCveSeverity}
                activelyExploited={inputs.activelyExploited}
              />
            </div>

            <div className="bg-card border rounded-lg p-6">
              <CalculationBreakdown
                result={result}
                highestCveSeverity={inputs.highestCveSeverity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

