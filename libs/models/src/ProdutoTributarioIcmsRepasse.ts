import {jsonDate, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ProdutoTributarioIcmsRepasse {
  @jsonDate
  @observable
  DATA_IMPOSTO: Date;
  @jsonNumber
  @observable
  ST_RETIDO_BASE: number;
  @jsonNumber
  @observable
  ST_RETIDO_VALOR: number;
  @jsonNumber
  @observable
  ST_RETIDO_ALIQUOTA: number;
  @jsonNumber
  @observable
  FCP_ST_RETIDO_BASE: number;
  @jsonNumber
  @observable
  FCP_ST_RETIDO_ALIQUOTA: number;
  @jsonNumber
  @observable
  FCP_ST_RETIDO_VALOR: number;
  @jsonNumber
  @observable
  VALOR_SUBSTITUTO: number;
}
