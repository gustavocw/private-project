import {jsonConvertStringToNumber, jsonInteger, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ProdutoPreco {
  @jsonInteger
  @observable
  CODIGO: number;
  @jsonConvertStringToNumber
  @observable
  PRECO_VENDA: number;
  @jsonNumber
  @observable
  MARGEM_VENDA: number;
  @jsonNumber
  @observable
  UNIDADE: number;
  @jsonNumber
  @observable
  GRADE: number;
  @jsonNumber
  @observable
  PRECO_CUSTO_REAL: number;
  @jsonNumber
  @observable
  PRECO_CUSTO: number;
  @jsonString
  EXCLUIDO: string;
}
