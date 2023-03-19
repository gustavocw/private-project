import Utils from '@alkord/shared/utils/Utils';
import EventBus from '@alkord/shared/utils/EventBus';
import DadosSessao from '@alkord/models/DadosSessao';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import AlkordJson from '@alkord/json/AlkordJson';

interface GwtCallback<T> {
  onSuccess: (data: T) => void;
  onFailure: (message: string) => void;
}

type JsonCallback = (json: string) => void;

export interface FuncoesGwt {
  carregarConfiguracoesImposto: (onSuccess: JsonCallback, onFailure: JsonCallback) => void;
  calcularImposto: (atendimento: string, onSuccess: JsonCallback, onFailure: JsonCallback) => void;
  calcularImpostoNota: (jsonAtendimento: string, onSuccess: JsonCallback, onFailure: JsonCallback) => void;
  calcularRateioNotaFiscal: (atendimento: string, onSuccess: JsonCallback, onFailure: JsonCallback) => void;
  calcularRegrasNegociacaoAtendimento: (atendimento: string, regrasNegociacao: string, onSuccess: JsonCallback,
                                        onFailure: JsonCallback) => void;
  calcularComissaoAtendimento: (atendimento: string, regrasComissao: string, onSuccess: JsonCallback,
                                        onFailure: JsonCallback) => void;
}

const aguardarResultado = async (resultado: () => boolean, intervalo: number, timeout: number) => {
  return new Promise(async (resolve, reject) => {
    let tempoGasto = 0;

    while (tempoGasto < timeout) {
      if (resultado()) {
        resolve(null);
        break;
      }

      tempoGasto += intervalo;
      await new Promise((resolve) => setTimeout(resolve, intervalo));
    }

    reject(new Error('Timeout'));
  });
};

export default class IntegracaoGwt {
  private static instance: IntegracaoGwt;
  private eventos: { [key: string]: () => void } = {};
  private isRotaGwt: boolean = false;
  private isNavegandoSubtelaGwt: boolean = false;
  private gwtCarregado = false;
  private funcoesGwtCarregadas = false;
  private callbackRetornoNavegacao: () => void = null;
  private callbackContainerChanged: () => void = null;

  constructor() {
    this.registrarPonte();
    this.registrarListeners();
  }

  private static adicionarListenerReact(funcao: string, callback: (dados?: any) => void) {
    window.addEventListener(`__react_${funcao}`, ((e: CustomEvent) => {
      callback(e.detail);
    }) as EventListener);
  }

  static dispararEventoGwt(funcao: string, dados?: any) {
    window.dispatchEvent(new CustomEvent(`__gwt_${funcao}`, {detail: dados}));
  }

  private registrarPonte() {
    const self = this;
    const wnd = window as any;

    wnd['__react'] = {
      startLoading: () => Utils.startLoading(),
      finishLoading: () => Utils.finishLoading(),
      isRotaGwt: () => self.isRotaGwt,
      isRenovandoToken: () => GlobalHandlers.gerenciadorDadosSessao.isRenovandoToken,
      emitirEvento: (evento: string) => {
        const funcao = self.eventos[evento];

        if ((typeof funcao !== 'undefined') && funcao) {
          funcao();
        }
      },
      recarregarDadosSessao: (callback: Function) => {
        GlobalHandlers.gerenciadorDadosSessao.recarregarDadosSessao()
            .then(() => callback())
            .catch(() => GlobalHandlers.gerenciadorDadosSessao.efetuarLogout());
      },
      renovarToken: (callback: GwtCallback<String>) => {
        GlobalHandlers.gerenciadorDadosSessao.renovarToken()
            .then(() => callback.onSuccess(null))
            .catch((e) => {
              callback.onFailure(e.message);
              GlobalHandlers.gerenciadorDadosSessao.efetuarLogout();
            });
      },
      isNavegandoSubtela: () => self.isNavegandoSubtelaGwt,
      setNavegandoSubtela: (navegandoSubtela: boolean) => self.setNavegandoSubtelaGwt(navegandoSubtela),
      setContainerChangedHandler: (handler: () => void) => self.setCallbackContainerChanged(handler),
      abrirSubtela: (endpoint: string, dados: string, callback: GwtCallback<string>) => {
        EventBus.get().postSticky('navegacao', {
          dados: JSON.parse(dados),
          callback: {
            onFailure: (mensagem: string) => callback.onFailure(mensagem),
            onSuccess: (dados: any) => callback.onSuccess(JSON.stringify(dados)),
          },
        });

        window.dispatchEvent(new CustomEvent('__react_navegacao', {
          detail: {subtela: true, endpoint},
        }));
      },
      navegarParaTela: (endpoint: string) => {
        window.dispatchEvent(new CustomEvent('__react_navegacao', {
          detail: {endpoint},
        }));
      },
      eventBus: EventBus.get(),
      retornarParaReact: () => {
        if (this.callbackRetornoNavegacao) {
          const callback = this.callbackRetornoNavegacao;
          this.callbackRetornoNavegacao = null;

          callback();
        }
      },
    };
  }

  private registrarListeners() {
    const self = this;

    IntegracaoGwt.adicionarListenerReact('onGwtInit', () => {
      self.gwtCarregado = true;

      if (GlobalHandlers.gerenciadorDadosSessao.isAutenticado()) {
        self.atualizarDadosSessao(GlobalHandlers.gerenciadorDadosSessao.dadosSessao);
      }
    });
  }

  atualizarDadosSessao(dadosSessao: DadosSessao) {
    IntegracaoGwt.dispararEventoGwt('setDadosSessao', AlkordJson.stringify(dadosSessao, DadosSessao));
  }

  atualizarToken(tokenAcesso: string, tokenRenovacao: string) {
    IntegracaoGwt.dispararEventoGwt('setTokens', JSON.stringify({
      TOKEN_ACESSO: tokenRenovacao,
      TOKEN_RENOVACAO: tokenRenovacao,
    }));
  }

  setRotaGwt(isRotaGwt: boolean) {
    this.isRotaGwt = isRotaGwt;
  }

  getRotaGwt(): boolean {
    return this.isRotaGwt;
  }

  getNavegandoSubtelaGwt(): boolean {
    return this.isNavegandoSubtelaGwt;
  }

  setNavegandoSubtelaGwt(navegandoSubtela: boolean) {
    this.isNavegandoSubtelaGwt = navegandoSubtela;
  }

  setCallbackContainerChanged(callback: () => void) {
    this.callbackContainerChanged = callback;
  }

  onContainerChanged() {
    if (this.callbackContainerChanged) {
      this.callbackContainerChanged();
    }
  }

  adicionarEvento(evento: string, callback: () => void) {
    this.eventos[evento] = callback;
  }

  removerEvento(evento: string) {
    delete this.eventos[evento];
  }

  setDadosNavegacao(chave: string, dado: any, callback: () => void) {
    this.callbackRetornoNavegacao = callback;
    EventBus.get().postSticky(chave, dado);
  }

  async getFuncoesGwt(): Promise<FuncoesGwt> {
    if (!this.funcoesGwtCarregadas) {
      try {
        await aguardarResultado(() => this.gwtCarregado, 100, 30000);
        await aguardarResultado(() => !!(window as any)['__gwt'], 100, 10000);
      }
      catch (erro) {
        if (!Utils.isLocalhost()) throw erro;
      }
      this.funcoesGwtCarregadas = true;
    }

    return (window as any)['__gwt'];
  }

  static get(): IntegracaoGwt {
    if (this.instance == null) {
      this.instance = new IntegracaoGwt();
    }

    return this.instance;
  }
}
