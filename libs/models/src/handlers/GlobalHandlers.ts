import IGerenciadorDadosSessao from './IGerenciadorDadosSessao';
import IGerenciadorPermissoes from './IGerenciadorPermissoes';
import IGerenciadorLicenca from './IGerenciadorLicenca';
import IGerenciadorNotificacoes from './IGerenciadorNotificacoes';

export interface GlobalHandlersHolder {
  gerenciadorDadosSessao: () => IGerenciadorDadosSessao;
  gerenciadorPermissoes: () => IGerenciadorPermissoes;
  gerenciadorLicenca: () => IGerenciadorLicenca;
  gerenciadorNotificacoes: () => IGerenciadorNotificacoes;
}

export default class GlobalHandlers {
  private static holder?: GlobalHandlersHolder;

  public static register(holder: GlobalHandlersHolder) {
    this.holder = holder;
  }

  public static get gerenciadorDadosSessao(): IGerenciadorDadosSessao {
    return this.holder?.gerenciadorDadosSessao();
  }

  public static get gerenciadorPermissoes(): IGerenciadorPermissoes {
    return this.holder?.gerenciadorPermissoes();
  }

  public static get gerenciadorLicenca(): IGerenciadorLicenca {
    return this.holder?.gerenciadorLicenca();
  }

  public static get gerenciadorNotificacoes(): IGerenciadorNotificacoes {
    return this.holder?.gerenciadorNotificacoes();
  }
}
