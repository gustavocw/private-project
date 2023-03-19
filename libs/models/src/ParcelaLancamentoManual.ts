import {jsonDate, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ParcelaLancamentoManual {
  @observable
  @jsonNumber
  VALOR: number;
  @observable
  @jsonDate
  DATA_VENCIMENTO: Date;
  @observable
  @jsonDate
  DATA_EMISSAO: Date;
}
