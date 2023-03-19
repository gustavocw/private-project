import {jsonArray, jsonClass, jsonModel} from '@alkord/json/decorators';
import MeioPagamento from './MeioPagamento';
import NotaFiscalPagamentoParcela from './NotaFiscalPagamentoParcela';
import {computed, observable} from 'mobx';

@jsonModel
export default class NotaFiscalPagamento {
  @jsonClass(() => MeioPagamento)
  @observable
  MEIO_PAGAMENTO: MeioPagamento;
  @jsonArray(() => NotaFiscalPagamentoParcela)
  @observable
  PARCELAS: NotaFiscalPagamentoParcela[];

  @computed
  get valorCalculado() {
    return this.PARCELAS.reduce((totalParcelas, parcela) => totalParcelas + parcela.VALOR, 0);
  }
}
