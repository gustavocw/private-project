import DadosSessao from '../DadosSessao';
import DadosToken from '../DadosToken';
import INameToken from '@alkord/shared/bloc/INameToken';

export default interface IGerenciadorDadosSessao {
  isRenovandoToken: boolean;
  dadosSessao: DadosSessao;

  isAutenticado(): boolean;

  isImplantacao(): boolean;

  get isLicencaAtiva(): boolean;

  possuiTokenSalvo(): boolean;

  iniciarSessaoUsandoTokenSalvo(): Promise<void>;

  iniciarSessaoUsandoChave(chave: string): Promise<void>;

  resetarDadosSessao(dadosToken: DadosToken): void;

  atualizarToken(dadosToken: DadosToken): void;

  efetuarLogin(dadosSessao: DadosSessao): void;

  efetuarLogout(): void;

  efetuarLogout(limparStorage?: boolean, manual?: boolean): void;

  renovarToken(): Promise<void>;

  recarregarDadosSessao(): Promise<void>;

  podeAcessarPagina(nameToken: INameToken): boolean;

  getCodigoUnidadeNegocio(): number;

  getCodigoUsuarioAtivo(): number;

  getCodigoUnidadeAtual(): number;

  getToken(): string;
}
