import ReactDOM from 'react-dom';
import React from 'react';
import ModulesProvider, {ModulesRootProvider} from '@alkord/modules/ModulesProvider';
import Utils from '@alkord/shared/utils/Utils';
import MenuProvider from './modules/providers/MenuProvider';
import AuthorizationProvider from './modules/providers/AuthorizationProvider';
import NotificacoesProvider from './modules/providers/NotificacoesProvider';
import RouterProvider from './modules/providers/RouterProvider';

ModulesProvider.register({
  menuProvider: Utils.lazySingleton(MenuProvider),
  authorizationProvider: Utils.lazySingleton(AuthorizationProvider),
  notificacoesProvider: Utils.lazySingleton(NotificacoesProvider),
  routerProvider: Utils.lazySingleton(RouterProvider),
});

ReactDOM.render(
    <ModulesRootProvider/>,
    document.getElementById('root'),
);
