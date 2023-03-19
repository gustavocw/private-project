import {jsonClass, jsonConvertStringToNumber, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';
import CodigoTributario from './CodigoTributario';

@jsonModel
export default class NotaFiscalItemIpi {
  @jsonClass(() => CodigoTributario)
  @observable
  CST: CodigoTributario;
  @jsonNumber
  @observable
  ALIQUOTA: number;
  @jsonNumber
  @observable
  VALOR_UNIDADE: number;
  @jsonNumber
  @observable
  VALOR: number;
  @jsonConvertStringToNumber
  @observable
  CODIGO_ENQUADRAMENTO: number;
}
