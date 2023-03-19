import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import ResultadoComissoesEmAberto from '@alkord/models/processos/ResultadoComissoesEmAberto';
import Intervalo from '@alkord/shared/types/Intervalo';
import StatusRecebimentoComissoes from '@alkord/models/processos/enum/StatusRecebimentoComissoes';
import Utils from '@alkord/shared/utils/Utils';

export interface FiltroComissoesGeracao {
  INTERVALO: Intervalo;
  STATUS_RECEBIMENTO: StatusRecebimentoComissoes;
}

export default class ComissoesService extends BaseService {
  private readonly endpoint: string = 'comissoes-em-aberto';

  getComissoesEmAberto(codigoVendedor: number, filtro: FiltroComissoesGeracao):
    Promise<RetornoRegistros<ResultadoComissoesEmAberto>> {
    let requestEndpoint = this.endpoint;

    if (filtro.STATUS_RECEBIMENTO != null) {
      requestEndpoint += `/${filtro.STATUS_RECEBIMENTO}`;
    }

    return this.http.get(requestEndpoint, ResultadoComissoesEmAberto, {
      vendedor: codigoVendedor,
      dataInicial: Utils.dateToRest(filtro.INTERVALO.DATA_INICIAL),
      dataFinal: Utils.dateToRest(filtro.INTERVALO.DATA_FINAL),
    });
  }
}
