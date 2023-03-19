import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Pessoa from './Pessoa';

@jsonModel
export default class ProdutoFornecedor {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  PRODUTO: number;
  @jsonClass(() => Pessoa)
  @observable
  FORNECEDOR: Pessoa;
  @jsonString
  @observable
  CODIGO_REFERENCIA: string;
  @jsonNumber
  @observable
  FATOR_CONVERSAO: number;
}
