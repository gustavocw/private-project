import INotificacoesProvider from '@alkord/modules/handlers/INotificacoesProvider';
import SistemaNotificacao from '@alkord/models/SistemaNotificacao';
import INameToken from '@alkord/shared/bloc/INameToken';

export default class NotificacoesProvider implements INotificacoesProvider {
  get notificacoesHabilitadas(): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onExecutarAcaoNotificacao(notificacao: SistemaNotificacao): void | INameToken | PromiseLike<void | INameToken> {
    return undefined;
  }
}
