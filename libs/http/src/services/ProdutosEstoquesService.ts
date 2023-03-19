import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import ProdutoEstoque from '@alkord/models/ProdutoEstoque';

export default class ProdutosEstoquesService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<ProdutoEstoque>> {
    return this.http.get<ProdutoEstoque>('produtos-estoque', ProdutoEstoque, SelectParametros.toRest(parametros));
  }
}
