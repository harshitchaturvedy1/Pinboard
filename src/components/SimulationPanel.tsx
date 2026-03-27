import LED from './LED';
import Button from './Button';
import SerialMonitor from './SerialMonitor';

interface SimProps {
  pinStates: Record<number, boolean>;
  serialOutput: string[];
  onButtonPress: (pin: number, pressed: boolean) => void;
}

export default function SimulationPanel({ pinStates, serialOutput, onButtonPress }: SimProps) {
  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="font-bold text-gray-800 mb-6 text-lg border-b pb-2">Hardware Setup</h2>
        
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Outputs</h3>
          <div className="flex flex-wrap gap-4">
            <LED pin={13} state={pinStates[13] || false} color="red" />
            <LED pin={12} state={pinStates[12] || false} color="primary" />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Inputs</h3>
          <div className="flex flex-wrap gap-4">
            <Button pin={2} isPressed={pinStates[2] || false} onPressChange={(p) => onButtonPress(2, p)} />
          </div>
        </div>
      </div>
      
      <SerialMonitor output={serialOutput} />
    </div>
  );
}
