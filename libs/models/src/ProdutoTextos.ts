import {jsonModel, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
class ProdutoTextos {
  @jsonString
  @observable
  PESQUISA: string;
  @jsonString
  @observable
  DESCRICAO: string;
  @jsonString
  @observable
  OBSERVACAO: string;
}

export default ProdutoTextos;
