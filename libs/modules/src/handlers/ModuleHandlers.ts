import IRouterProvider from './IRouterProvider';
import IMenuProvider from './IMenuProvider';
import INotificacoesProvider from './INotificacoesProvider';
import IAuthorizationProvider from './IAuthorizationProvider';
import IAlertProvider from './IAlertProvider';

export interface ModuleHandlersHolder {
  routerProvider: () => IRouterProvider;
  menuProvider: () => IMenuProvider;
  notificacoesProvider: () => INotificacoesProvider;
  authorizationProvider: () => IAuthorizationProvider;
  alertProvider?: () => IAlertProvider;
}

export default class ModuleHandlers {
  private static holder?: ModuleHandlersHolder;

  public static register(holder: ModuleHandlersHolder) {
    this.holder = holder;
  }

  public static get routerProvider(): IRouterProvider {
    return this.holder?.routerProvider();
  }

  public static get menuProvider(): IMenuProvider {
    return this.holder?.menuProvider();
  }

  public static get notificacoesProvider(): INotificacoesProvider {
    return this.holder?.notificacoesProvider();
  }

  public static get authorizationProvider(): IAuthorizationProvider {
    return this.holder?.authorizationProvider();
  }

  public static get alertProvider(): IAlertProvider | undefined {
    return this.holder?.alertProvider ? this.holder?.alertProvider() : undefined;
  }
}
