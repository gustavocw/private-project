import IntegracaoGwt from './IntegracaoGwt';
import DadosSessao from '@alkord/models/DadosSessao';
import Services from '@alkord/http/Services';
import DadosToken from '@alkord/models/DadosToken';
import TipoUsuario from '@alkord/models/TipoUsuario.enum';
import ModuleHandlers from './handlers/ModuleHandlers';
import INameToken from '@alkord/shared/bloc/INameToken';
import TipoPermissao from '@alkord/models/modules/TipoPermissao.enum';
import type IGerenciadorDadosSessao from '@alkord/models/handlers/IGerenciadorDadosSessao';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import {computed, observable} from 'mobx';

export default class GerenciadorDadosSessao implements IGerenciadorDadosSessao {
  private static instance: GerenciadorDadosSessao;
  isRenovandoToken: boolean = false;
  @observable dadosSessao: DadosSessao;

  constructor() {
    const self = this;

    window.onstorage = () => {
      self.onLocalStorageChanged();
    };

    IntegracaoGwt.get().adicionarEvento('logout', () => {
      self.onGwtLogout();
    });
  }

  protected onLocalStorageChanged() {
    if (!this.dadosSessao?.TOKEN_ACESSO) return;

    const novoToken = localStorage.getItem('token_acesso');

    if ((novoToken !== this.dadosSessao.TOKEN_ACESSO) && this.dadosSessao.LICENCA) {
      if (novoToken && (this.dadosSessao.LICENCA.CODIGO.toString() === localStorage.getItem('licenca'))) {
        this.dadosSessao.TOKEN_ACESSO = localStorage.getItem('token_acesso');
        this.dadosSessao.TOKEN_RENOVACAO = localStorage.getItem('token_renovacao');
        IntegracaoGwt.get().atualizarToken(this.dadosSessao.TOKEN_ACESSO, this.dadosSessao.TOKEN_RENOVACAO);
        window.dispatchEvent(new CustomEvent('__react_token_atualizado', {detail: {}}));
      }
      else {
        this.efetuarLogout(false);
      }
    }
  }

  protected onGwtLogout() {
    this.efetuarLogout();
  }

  protected onDestruct() {
    window.onstorage = null;
    IntegracaoGwt.get().removerEvento('logout');

    GerenciadorDadosSessao.instance = null;
  }

  isAutenticado(): boolean {
    return !!this.dadosSessao?.USUARIO;
  }

  isImplantacao(): boolean {
    return this.dadosSessao?.LICENCA?.IMPLANTACAO;
  }

  @computed
  get isLicencaAtiva(): boolean {
    return this.dadosSessao?.LICENCA?.ATIVA;
  }

  possuiTokenSalvo(): boolean {
    return !!localStorage.getItem('token_acesso') && !!localStorage.getItem('licenca');
  }

  async iniciarSessaoUsandoTokenSalvo(): Promise<void> {
    this.dadosSessao = new DadosSessao();
    this.dadosSessao.TOKEN_ACESSO = localStorage.getItem('token_acesso');
    this.dadosSessao.TOKEN_RENOVACAO = localStorage.getItem('token_renovacao');

    const requestLogin = () => Services.get().loginService.iniciarSessao(parseInt(localStorage.getItem('licenca')));

    try {
      await requestLogin();
    }
    catch (e) {
      await this.executarRenovacaoToken();
      await requestLogin();
    }
  }

  async iniciarSessaoUsandoChave(chave: string) {
    this.limparLocalStorage();

    return Services.get().loginService.efetuarLoginChaveSve(chave);
  }

  resetarDadosSessao(dadosToken: DadosToken) {
    this.dadosSessao = new DadosSessao();
    this.dadosSessao.TOKEN_ACESSO = dadosToken.tokenAcesso;
    this.dadosSessao.TOKEN_RENOVACAO = dadosToken.tokenRenovacao;

    this.limparLocalStorage();
  }

  atualizarToken(dadosToken: DadosToken) {
    this.dadosSessao.TOKEN_ACESSO = dadosToken.tokenAcesso;
    this.dadosSessao.TOKEN_RENOVACAO = dadosToken.tokenRenovacao;

    localStorage.setItem('token_acesso', dadosToken.tokenAcesso);
    localStorage.setItem('token_renovacao', dadosToken.tokenRenovacao);

    IntegracaoGwt.get().atualizarToken(dadosToken.tokenAcesso, dadosToken.tokenRenovacao);
    window.dispatchEvent(new CustomEvent('__react_token_atualizado', {detail: {}}));
  }

  efetuarLogin(dadosSessao: DadosSessao) {
    if ((dadosSessao.USUARIO?.TIPO !== TipoUsuario.ADMINISTRADOR) && !dadosSessao.LICENCA?.ATIVA) {
      throw new Error('A licença selecionada está inativa.\nPor favor contate o administrador da licença.');
    }

    this.dadosSessao = dadosSessao;

    localStorage.setItem('token_acesso', dadosSessao.TOKEN_ACESSO);
    localStorage.setItem('token_renovacao', dadosSessao.TOKEN_RENOVACAO);
    localStorage.setItem('licenca', `${dadosSessao.LICENCA.CODIGO}`);

    IntegracaoGwt.get().atualizarDadosSessao(this.dadosSessao);
    window.dispatchEvent(new CustomEvent('__react_token_atualizado', {detail: {}}));
  }

  efetuarLogout(limparStorage: boolean = true, manual: boolean = false) {
    this.dadosSessao = null;

    IntegracaoGwt.get().setRotaGwt(false);
    IntegracaoGwt.get().atualizarDadosSessao(null);

    if (limparStorage) {
      this.limparLocalStorage();
    }

    this.onDestruct();

    let urlParameters = '';

    if (!manual) {
      const locationData = /^#\/([a-z0-9-]+)(\?(.*$))?/.exec(location.hash);

      if (locationData[1] && ModuleHandlers.routerProvider.getNameToken(`/${locationData[1]}`)?.isProtected) {
        const redirectParams = new URLSearchParams();
        redirectParams.append('redirect_url', locationData[1]);

        if (locationData[3]) {
          const parameters = new URLSearchParams(locationData[3]);
          parameters.delete('redirect_url');
          parameters.delete('redirect_params');

          redirectParams.append('redirect_params', parameters.toString());
        }

        urlParameters = '?' + redirectParams.toString();
      }
    }

    window.location.href = `?reload#${ModuleHandlers.routerProvider.baseScreen}${urlParameters}`;
  }

  private limparLocalStorage() {
    localStorage.removeItem('token_acesso');
    localStorage.removeItem('token_renovacao');
    localStorage.removeItem('licenca');
  }

  async renovarToken(): Promise<void> {
    if (!this.isAutenticado()) {
      throw new Error('Usuário não autenticado');
    }

    return this.executarRenovacaoToken();
  }

  private async executarRenovacaoToken() {
    this.isRenovandoToken = true;

    try {
      return Services.get().loginService.renovarToken();
    }
    finally {
      this.isRenovandoToken = false;
    }
  }

  async recarregarDadosSessao(): Promise<void> {
    if (this.isAutenticado()) {
      await Services.get().loginService.iniciarSessao(parseInt(localStorage.getItem('licenca')));
    }
  }

  podeAcessarPagina(nameToken: INameToken): boolean {
    return (
      nameToken &&
      this.isAutenticado() &&
      GlobalHandlers.gerenciadorLicenca.isPaginaHabilitada(nameToken) &&
      GlobalHandlers.gerenciadorPermissoes.isPermissaoHabilitada(nameToken, TipoPermissao.VISUALIZAR)
    );
  }

  getCodigoUnidadeNegocio(): number {
    return this.dadosSessao.UNIDADE_NEGOCIO.CODIGO;
  }

  getCodigoUsuarioAtivo(): number {
    return this.dadosSessao.USUARIO?.CODIGO_PESSOA;
  }

  getCodigoUnidadeAtual(): number {
    return this.dadosSessao.UNIDADE_NEGOCIO.CODIGO;
  }

  getToken(): string {
    return this.dadosSessao.TOKEN_ACESSO;
  }
}
