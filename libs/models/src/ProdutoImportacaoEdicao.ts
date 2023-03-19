import {observable} from 'mobx';
import {jsonModel, jsonNumber} from '@alkord/json/decorators';
import Produto from './Produto';

@jsonModel
export default class ProdutoEdicaoMargem extends Produto {
  @observable
  @jsonNumber
  NOVO_VALOR_VENDA?: number;
}
