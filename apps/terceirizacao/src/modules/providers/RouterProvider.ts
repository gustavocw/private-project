import IRouterProvider, {OpenRoute} from '@alkord/modules/handlers/IRouterProvider';
import INameToken from '@alkord/shared/bloc/INameToken';
import NameToken from '../NameToken';

export default class RouterProvider implements IRouterProvider {
  get baseScreen(): INameToken {
    return NameToken.LOGIN;
  }

  getNameToken(path: string): INameToken | undefined {
    return NameToken.fromEndPoint(path);
  }

  get initialScreen(): INameToken | string {
    return NameToken.TIPOS_ATENDIMENTO;
  }

  get initialScreenRedirectRoute(): INameToken {
    return NameToken.REDIRECT_TELA_INICIAL;
  }

  get openRoutes(): OpenRoute[] {
    return NameToken.allValues
        .filter((nameToken) => !nameToken.isProtected)
        .map((nameToken) => ({
          path: nameToken.endpoint,
          component: nameToken.component,
        }));
  }

  get protectedRoutes(): INameToken[] {
    return NameToken.allValues.filter((nameToken) => nameToken.isProtected);
  }
}
