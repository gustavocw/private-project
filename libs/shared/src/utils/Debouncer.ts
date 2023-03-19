interface DebouncerOptions {
  beforeExecute?: () => void;
  afterExecute?: () => void;
}

type Callback = (...args: any) => Promise<any> | void;

export default class Debouncer {
  private readonly callback: Callback;
  private readonly delay: number;
  private readonly options: DebouncerOptions;
  private timer = null;

  constructor(callback: Callback, delay: number, options: DebouncerOptions = {}) {
    this.callback = callback;
    this.delay = delay;
    this.options = options;
  }

  debounce(...args: any) {
    if (!this.isRunning() && this.options.beforeExecute) {
      this.options.beforeExecute();
    }

    this.cancel();
    this.timer = setTimeout(() => this.execute(...args), this.delay);
  }

  cancel() {
    if (this.isRunning()) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private isRunning(): boolean {
    return this.timer != null;
  }

  private execute(...args: any) {
    this.callback(...args);
    this.cancel();

    if (this.options.afterExecute) {
      this.options.afterExecute();
    }
  }
}
