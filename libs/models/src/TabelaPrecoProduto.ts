import {jsonClass, jsonConvertStringToBoolean, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Produto from './Produto';
import TabelaPreco from './TabelaPreco';

@jsonModel
export default class TabelaPrecoProduto {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => TabelaPreco)
  @observable
  TABELA: TabelaPreco;
  @jsonClass(() => Produto)
  @observable
  PRODUTO: Produto;
  @jsonNumber
  @observable
  PRECO: number;
  @jsonConvertStringToBoolean
  @observable
  EXCLUIDO?: boolean;
}
