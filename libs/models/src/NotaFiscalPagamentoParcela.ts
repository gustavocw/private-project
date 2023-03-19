import {jsonDate, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class NotaFiscalPagamentoParcela {
  @jsonNumber
  @observable
  NUMERO: number;
  @jsonDate
  @observable
  DATA_VENCIMENTO: Date;
  @jsonNumber
  @observable
  VALOR: number;
}
