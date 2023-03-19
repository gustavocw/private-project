import {jsonArray, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import TabelaPrecoProduto from './TabelaPrecoProduto';
import {observable} from 'mobx';

@jsonModel
export default class TabelaPreco {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  NOME: string;
  @jsonArray(() => TabelaPrecoProduto)
  @observable
  PRODUTOS: TabelaPrecoProduto[];
}
