import {jsonClass, jsonDate, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import {observable} from 'mobx';
import Pessoa from './Pessoa';

@jsonModel
export default class FinanceiroReceitaObservacao implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  RECEITA: number;
  @jsonString
  @observable
  OBSERVACAO: string;
  @jsonClass(() => Pessoa)
  @observable
  RESPONSAVEL?: Pessoa;
  @jsonDate
  @observable
  DATA_ALTERACAO: Date;
}
