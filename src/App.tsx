import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import BlocklyWorkspace from './components/BlocklyWorkspace';
import SimulationPanel from './components/SimulationPanel';
import CodePreview from './components/CodePreview';
import { compileMock } from './emulator/compiler';
import { EmulatorRunner } from './emulator/runner';

function App() {
  const [generatedCode, setGeneratedCode] = useState('');
  const [emulatorStatus, setEmulatorStatus] = useState<'idle' | 'compiling' | 'running' | 'error'>('idle');
  const [pinStates, setPinStates] = useState<Record<number, boolean>>({});
  const [serialOutput, setSerialOutput] = useState<string[]>([]);
  
  const runnerRef = useRef<EmulatorRunner | null>(null);

  const handleRun = async () => {
    try {
      if (runnerRef.current) {
        runnerRef.current.stop();
      }
      setEmulatorStatus('compiling');
      setSerialOutput([]);
      setPinStates({});
      
      const hex = await compileMock(generatedCode);
      
      const runner = new EmulatorRunner(hex);
      runnerRef.current = runner;
      
      runner.setupPinListeners((pin, state) => {
        setPinStates(prev => ({ ...prev, [pin]: state }));
      });
      
      runner.setupSerialListener((char) => {
        setSerialOutput(prev => {
          // Keep output array flat strings, or concatenate
          // For typical terminal, we might want to just append to last string but an array of chars is fine too.
          if (prev.length > 5000) prev = prev.slice(-5000); // prevent memory leak
          return [...prev, char];
        });
      });
      
      setEmulatorStatus('running');
      runner.execute();
      
    } catch (err) {
      console.error(err);
      setEmulatorStatus('error');
    }
  };

  const handleStop = () => {
    if (runnerRef.current) {
      runnerRef.current.stop();
      runnerRef.current = null;
    }
    setEmulatorStatus('idle');
  };

  const handleReset = () => {
    handleStop();
    setPinStates({});
    setSerialOutput([]);
  };

  const handleButtonPress = (pin: number, pressed: boolean) => {
    setPinStates(prev => ({ ...prev, [pin]: pressed }));
    
    if (runnerRef.current && emulatorStatus === 'running') {
      // In a full implementation, writing to the PIN memory register allows AVR code to read it.
      // For Pin 2 (PD2), the PIN register is at address 0x29.
      // But for this mock, we just track it.
    }
  };

  useEffect(() => {
    return () => {
      if (runnerRef.current) runnerRef.current.stop();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header 
        status={emulatorStatus}
        onRun={handleRun}
        onStop={handleStop}
        onReset={handleReset}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-[2] flex border-r border-gray-200 relative min-w-0 min-h-0 overflow-hidden">
          <BlocklyWorkspace onCodeChange={setGeneratedCode} />
        </div>
        
        <div className="w-[320px] flex-shrink-0 bg-surface flex flex-col border-r border-gray-200 overflow-y-auto">
          <SimulationPanel 
            pinStates={pinStates} 
            serialOutput={serialOutput} 
            onButtonPress={handleButtonPress} 
          />
        </div>
      </div>
      
      <div className="h-56 border-t border-gray-200 bg-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10 w-full">
        <CodePreview code={generatedCode} />
      </div>
    </div>
  );
}

export default App;
