import SistemaNotificacao from '@alkord/models/SistemaNotificacao';
import INameToken from '@alkord/shared/bloc/INameToken';

export default interface INotificacoesProvider {
  get notificacoesHabilitadas(): boolean;

  onExecutarAcaoNotificacao(notificacao: SistemaNotificacao): void | INameToken | PromiseLike<void | INameToken>;
}
