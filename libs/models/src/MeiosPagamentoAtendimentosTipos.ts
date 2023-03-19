import {jsonClass, jsonModel} from '@alkord/json/decorators';
import {observable} from 'mobx';
import MeioPagamento from './MeioPagamento';
import AtendimentoTipo from './AtendimentoTipo';

@jsonModel
export default class MeiosPagamentoAtendimentosTipos {
  @jsonClass(() => MeioPagamento)
  @observable
  MEIO_PAGAMENTO: MeioPagamento;
  @jsonClass(() => AtendimentoTipo)
  @observable
  ATENDIMENTO_TIPO: AtendimentoTipo;
}
