import SistemaNotificacao from '../SistemaNotificacao';

export default interface IGerenciadorNotificacoes {
  notificacoes: SistemaNotificacao[];
  readonly notificacoesVistas: SistemaNotificacao[];
  readonly notificacoesNaoVistas: SistemaNotificacao[];

  buscarNotificacoes(): Promise<void>;
}
