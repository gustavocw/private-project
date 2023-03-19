import '../styles/styles.scss';

export interface ComponentConfig {
  drawerWidth?: number;
}

export class ComponentConfigHolder implements ComponentConfig {
  private static instance?: ComponentConfigHolder;
  private static defaultConfig: ComponentConfig = {
    drawerWidth: 260,
  };
  private readonly config: ComponentConfig;

  private constructor(config?: ComponentConfig) {
    this.config = {
      ...ComponentConfigHolder.defaultConfig,
      ...(config ?? {}),
    };
  }

  get drawerWidth(): number {
    return this.config.drawerWidth;
  }

  public static updateConfig(newConfig: ComponentConfig) {
    this.instance = new ComponentConfigHolder(newConfig);
  }

  public static get(): ComponentConfigHolder {
    if (!this.instance) {
      this.instance = new ComponentConfigHolder();
    }

    return this.instance;
  }
}

export default class ComponentsConfigProvider {
  public static register(config?: ComponentConfig) {
    if (config) {
      ComponentConfigHolder.updateConfig(config);
    }
  }
}
