import {action, computed, observable} from 'mobx';
import SistemaNotificacao from '@alkord/models/SistemaNotificacao';
import Services from '@alkord/http/Services';
import {SelectParametros} from '@alkord/models/SelectParametros';
import IGerenciadorNotificacoes from '@alkord/models/handlers/IGerenciadorNotificacoes';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';

export default class GerenciadorNotificacoes implements IGerenciadorNotificacoes {
  @observable notificacoes: SistemaNotificacao[];

  @computed
  get notificacoesVistas() {
    return this.notificacoes?.filter((notificacao) => notificacao.VISUALIZADA) ?? [];
  }

  @computed
  get notificacoesNaoVistas() {
    return this.notificacoes?.filter((notificacao) => !notificacao.VISUALIZADA) ?? [];
  }

  constructor() {
    action(this.buscarNotificacoes)();
    addEventListener('__react_token_atualizado', this.buscarNotificacoes);
  }

  @action.bound
  async buscarNotificacoes() {
    const gerenciadorDadosSessao = GlobalHandlers.gerenciadorDadosSessao;

    if (gerenciadorDadosSessao.isAutenticado() && gerenciadorDadosSessao.isLicencaAtiva) {
      const service = Services.get().sistemaNotificacoesService;
      const parametros: SelectParametros = {
        colunas: 'CODIGO,DESCRICAO,DATA,TIPO,VISUALIZADA',
        ordenacao: 'DATA ASC',
      };

      this.notificacoes = (await service.get(parametros)).REGISTROS;
    }
  }
}
