import {action, computed} from 'mobx';
import BaseBloc from '@alkord/shared/bloc/BaseBloc';
import SistemaNotificacoesService from '@alkord/http/services/SistemaNotificacoesService';
import Services from '@alkord/http/Services';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import SistemaNotificacao from '@alkord/models/SistemaNotificacao';
import ModuleHandlers from '../../handlers/ModuleHandlers';

class NotificacoesListBloc extends BaseBloc {
  private gerenciadorNotificacoes = GlobalHandlers.gerenciadorNotificacoes;
  private notificacoesService: SistemaNotificacoesService = Services.get().sistemaNotificacoesService;

  @action.bound
  async marcarTodasNotificacoesComoLidas() {
    const {notificacoesNaoVistas} = this.gerenciadorNotificacoes;

    try {
      await this.notificacoesService.marcarComoLidas(
          notificacoesNaoVistas.map((notificacao) => notificacao.CODIGO),
      );
    }
    catch (e) {
      this.viewHandler.exibirMensagem(null, e.message);
    }

    this.buscarNotificacoes();
  }

  @action.bound
  async marcarNotificacaoComoLida(notificacao: SistemaNotificacao) {
    try {
      await this.notificacoesService.marcarComoLida(notificacao.CODIGO);
    }
    catch (e) {
      this.viewHandler.exibirMensagem(null, e.message);
    }

    this.buscarNotificacoes();
  }

  @action.bound
  async executarAcaoNotificacao(notificacao: SistemaNotificacao) {
    if (!notificacao.VISUALIZADA) {
      await this.marcarNotificacaoComoLida(notificacao);
    }

    const result = await ModuleHandlers.notificacoesProvider.onExecutarAcaoNotificacao(notificacao);

    if (result) {
      this.viewHandler.navegarParaPagina(result);
    }
  }

  @computed
  get notificacoes(): SistemaNotificacao[] {
    return this.gerenciadorNotificacoes.notificacoes;
  }

  @computed
  get notificacoesNaoVistas(): SistemaNotificacao[] {
    return this.gerenciadorNotificacoes.notificacoesNaoVistas;
  }

  @action.bound
  buscarNotificacoes() {
    this.gerenciadorNotificacoes.buscarNotificacoes();
  }
}

export default NotificacoesListBloc;
