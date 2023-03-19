import BaseService from '../../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import RetornoDelete from '@alkord/models/RetornoDelete';
import RetornoPut from '@alkord/models/RetornoPut';
import RetornoPost from '@alkord/models/RetornoPost';
import {AgendamentoNotificacao} from '@alkord/models/ecommerce/AgendamentoNotificacao';

export default class NotificacoesAgendamentoService extends BaseService {
  buscarNotificacoes(parametros: SelectParametros): Promise<RetornoRegistros<AgendamentoNotificacao>> {
    return this.http.get<AgendamentoNotificacao>('notificacoes-agendamentos', AgendamentoNotificacao, {
      colunas: parametros.colunas,
      filtros: parametros.filtros,
    });
  }
  excluirNotificacao(codigoNotificacao: number): Promise<RetornoDelete> {
    return this.http.delete(`notificacoes-agendamentos/${codigoNotificacao}`, {} );
  }
  criarNotificacao(body: AgendamentoNotificacao): Promise<RetornoPost<AgendamentoNotificacao>> {
    return this.http.post<AgendamentoNotificacao>('notificacoes-agendamentos', AgendamentoNotificacao, body, {} );
  }
  salvarNotificacao(body: AgendamentoNotificacao): Promise<RetornoPut<AgendamentoNotificacao>> {
    return this.http.put<AgendamentoNotificacao>(`notificacoes-agendamentos/${body.CODIGO}`,
        body, AgendamentoNotificacao, {} );
  }
}
