import INameToken from '@alkord/shared/bloc/INameToken';
import React from 'react';

export interface OpenRoute {
  path: INameToken | string;
  component?: React.ComponentType<any>;
  render?: () => string | React.ComponentType<any> | JSX.Element;
}

export default interface IRouterProvider {
  get protectedRoutes(): INameToken[];

  get openRoutes(): OpenRoute[];

  get initialScreenRedirectRoute(): INameToken;

  get initialScreen(): INameToken | string;

  get baseScreen(): INameToken;

  getNameToken(path: string): INameToken | undefined;
}
