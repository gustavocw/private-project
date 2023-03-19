import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import SistemaNotificacao, {NotificacaoVisibilidade} from '@alkord/models/SistemaNotificacao';
import RetornoPost from '@alkord/models/RetornoPost';
import {SelectParametros} from '@alkord/models/SelectParametros';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';

export default class SistemaNotificacoesService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<SistemaNotificacao>> {
    return this.http.get<SistemaNotificacao>(
        'sistema_notificacoes', SistemaNotificacao, SelectParametros.toRest(parametros),
    );
  }

  marcarComoLida(codigoNotificacao: number): Promise<RetornoPost<SistemaNotificacao>> {
    const notificacaoVisibilidade = new NotificacaoVisibilidade();
    notificacaoVisibilidade.PESSOA = GlobalHandlers.gerenciadorDadosSessao.dadosSessao.USUARIO.CODIGO_PESSOA;
    notificacaoVisibilidade.NOTIFICACAO = codigoNotificacao;

    return this.http.post(
        'sistema_notificacoes_visualizacoes', NotificacaoVisibilidade, notificacaoVisibilidade, {},
    );
  }

  marcarComoLidas(codigos: number[]): Promise<RetornoPost<NotificacaoVisibilidade>[]> {
    const notificacoes = codigos.map((codigo) => {
      const notificacaoVisibilidade = new NotificacaoVisibilidade();
      notificacaoVisibilidade.PESSOA = GlobalHandlers.gerenciadorDadosSessao.dadosSessao.USUARIO.CODIGO_PESSOA;
      notificacaoVisibilidade.NOTIFICACAO = codigo;

      return notificacaoVisibilidade;
    });

    return this.http.post('sistema_notificacoes_visualizacoes', NotificacaoVisibilidade, notificacoes, {});
  }

  getNotificacoesVistas(): Promise<RetornoRegistros<NotificacaoVisibilidade>> {
    return this.http.get('sistema_notificacoes_visualizacoes', NotificacaoVisibilidade, {});
  }
}
