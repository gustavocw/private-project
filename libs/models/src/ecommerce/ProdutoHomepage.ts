import {jsonClass, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Produto from '../Produto';

@jsonModel
class ProdutoHomepage {
  @observable
  @jsonNumber
  CODIGO: number;
  @observable
  @jsonNumber
  POSICAO: number;
  @observable
  @jsonClass(() => Produto)
  PRODUTO: Produto;
}

export default ProdutoHomepage;
