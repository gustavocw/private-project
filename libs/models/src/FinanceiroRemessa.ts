import {jsonClassOrInteger, jsonDate, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import Banco from './Banco';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';

@jsonModel
export default class FinanceiroRemessa implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClassOrInteger(Banco, 'CODIGO')
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
  DATA_GERACAO: Date;
}
