import { CPU, avrInstruction, AVRIOPort, AVRTimer, AVRUSART, portBConfig, portCConfig, portDConfig, timer0Config, usart0Config } from 'avr8js';

// Convert hex into Uint8Array for execution
function loadHex(source: string, target: Uint8Array) {
  for (const line of source.split('\n')) {
    if (line[0] === ':' && line.substr(7, 2) === '00') {
      const bytes = parseInt(line.substr(1, 2), 16);
      const addr = parseInt(line.substr(3, 4), 16);
      for (let i = 0; i < bytes; i++) {
        target[addr + i] = parseInt(line.substr(9 + i * 2, 2), 16);
      }
    }
  }
}

export class EmulatorRunner {
  program = new Uint16Array(16384);
  cpu: CPU;
  timer: AVRTimer;
  portB: AVRIOPort;
  portC: AVRIOPort;
  portD: AVRIOPort;
  usart: AVRUSART;
  speed = 16e6; // 16 MHz
  stopped = false;

  constructor(hex: string) {
    loadHex(hex, new Uint8Array(this.program.buffer));
    this.cpu = new CPU(this.program);
    this.timer = new AVRTimer(this.cpu, timer0Config);
    this.portB = new AVRIOPort(this.cpu, portBConfig);
    this.portC = new AVRIOPort(this.cpu, portCConfig);
    this.portD = new AVRIOPort(this.cpu, portDConfig);
    this.usart = new AVRUSART(this.cpu, usart0Config, this.speed);
  }

  setupPinListeners(callback: (pin: number, state: boolean) => void) {
    this.portB.addListener((value) => {
      for (let i = 0; i < 6; i++) {
        callback(8 + i, (value & (1 << i)) !== 0);
      }
    });
    this.portC.addListener((value) => {
      for (let i = 0; i < 6; i++) {
        callback(14 + i, (value & (1 << i)) !== 0);
      }
    });
    this.portD.addListener((value) => {
      for (let i = 0; i < 8; i++) {
        callback(i, (value & (1 << i)) !== 0);
      }
    });
  }

  setupSerialListener(callback: (char: string) => void) {
    this.usart.onByteTransmit = (value) => {
      callback(String.fromCharCode(value));
    };
  }

  execute() {
    this.stopped = false;
    
    const cycle = () => {
      if (this.stopped) return;
      
      // Execute instructions. Adjust for desired emulation speed relative to browser refresh rate.
      for (let i = 0; i < 50000; i++) {
        avrInstruction(this.cpu);
        this.cpu.tick();
      }
      
      // We rely on requestAnimationFrame or setTimeout
      setTimeout(cycle, 1);
    };
    
    cycle();
  }

  stop() {
    this.stopped = true;
  }
}
