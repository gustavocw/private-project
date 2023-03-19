import {jsonClass, jsonDate, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import Banco from './Banco';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';

@jsonModel
export default class FinanceiroRetorno implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => Banco)
  @observable
  BANCO: Banco;
  @jsonString
  @observable
  NOME_ARQUIVO: string;
  @jsonNumber
  @observable
  TOTAL_BOLETOS: number;
  @jsonDate
  @observable
  DATA_RETORNO: Date;
}

