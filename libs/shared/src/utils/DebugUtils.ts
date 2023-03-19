import Configuracoes from '../Configuracoes';

export default class DebugUtils {
  public static performance(groupName: string): PerformanceTimer {
    return new PerformanceTimer(groupName);
  }

  public static log(...args: any[]) {
    if (Configuracoes.get().debug) {
      console.log(args);
    }
  }
}

class PerformanceTimer {
  private readonly name: string;
  private readonly startTime: number;
  private logs: {name: string, timestamp: number}[] = [];

  constructor(name: string) {
    if (!Configuracoes.get().debug) return;

    this.name = name;
    this.startTime = window.performance.now();
  }

  public step(name: string) {
    if (!this.startTime) return;

    this.logs.push({name, timestamp: window.performance.now()});
  }

  public finish(name?: string) {
    if (!this.startTime) return;

    const groupName = `[${this.name}] Executed in ${Math.floor(window.performance.now() - this.startTime)} ms`;

    if (this.logs.length === 0) {
      console.log(groupName);
      return;
    }

    this.logs.push({name: name ?? 'Finish', timestamp: window.performance.now()});

    console.groupCollapsed(groupName);

    let lastTimestamp = this.startTime;
    for (const log of this.logs) {
      console.log(`${log.name} - ${Math.floor(log.timestamp - lastTimestamp)} ms`);
      lastTimestamp = log.timestamp;
    }

    console.groupEnd();
  }
}
