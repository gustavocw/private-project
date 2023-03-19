import AlkordShared from '@alkord/shared/AlkordShared';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import GerenciadorDadosSessao from './GerenciadorDadosSessao';
import GerenciadorNotificacoes from './GerenciadorNotificacoes';
import GerenciadorLicenca from './GerenciadorLicenca';
import GerenciadorPermissoes from './GerenciadorPermissoes';
import ModuleHandlers, {ModuleHandlersHolder} from './handlers/ModuleHandlers';
import React from 'react';
import AlkordComponentsProvider from '@alkord/components/helpers/AlkordComponentsProvider';
import Router from './Router';
import ComponentsConfigProvider from '@alkord/components/helpers/ComponentsConfigProvider';
import Utils from '@alkord/shared/utils/Utils';
import ErrorBoundary from './ErrorBoundary';

export const ModulesRootProvider: React.FC<any> = () => {
  return (
    <ErrorBoundary>
      <AlkordComponentsProvider>
        <Router/>
      </AlkordComponentsProvider>
    </ErrorBoundary>
  );
};

export default class ModulesProvider {
  public static register(moduleHandlers: ModuleHandlersHolder) {
    AlkordShared.register();

    GlobalHandlers.register({
      gerenciadorDadosSessao: Utils.lazySingleton(GerenciadorDadosSessao),
      gerenciadorNotificacoes: Utils.lazySingleton(GerenciadorNotificacoes),
      gerenciadorLicenca: Utils.lazySingleton(GerenciadorLicenca),
      gerenciadorPermissoes: Utils.lazySingleton(GerenciadorPermissoes),
    });

    ComponentsConfigProvider.register();
    ModuleHandlers.register(moduleHandlers);
  }
}
