import RetornoRegistros from '@alkord/models/RetornoRegistros';
import MeioPagamento from '@alkord/models/MeioPagamento';
import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import MeiosPagamentoAtendimentosTipos from '@alkord/models/MeiosPagamentoAtendimentosTipos';
import {CondicaoPagamento} from '@alkord/models/CondicaoPagamento';

export default class MeioPagamentoService extends BaseService {
  get(parametros?: SelectParametros): Promise<RetornoRegistros<MeioPagamento>> {
    return this.http.get('meios-pagamento', MeioPagamento, SelectParametros.toRest(parametros));
  }

  getCondicoesPagamento(parametros?: SelectParametros): Promise<RetornoRegistros<CondicaoPagamento>> {
    return this.http.get('condicoes-pagamento', CondicaoPagamento, SelectParametros.toRest(parametros));
  }

  getMeiosPagamentoAtendimentoTipos(parametros?: SelectParametros)
    : Promise<RetornoRegistros<MeiosPagamentoAtendimentosTipos>> {
    return this.http.get(
        'meios-pagamento-atendimentos-tipos',
        MeiosPagamentoAtendimentosTipos,
        SelectParametros.toRest(parametros),
    );
  }
}
