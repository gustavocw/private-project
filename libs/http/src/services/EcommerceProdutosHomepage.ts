import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import ProdutoHomepage from '@alkord/models/ecommerce/ProdutoHomepage';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoDelete from '@alkord/models/RetornoDelete';
import RetornoPost from '@alkord/models/RetornoPost';

export default class ProdutosHomepageService extends BaseService {
  getProdutos(parametros: SelectParametros): Promise<RetornoRegistros<ProdutoHomepage>> {
    return this.http.get('ecommerce-produtos-homepage', ProdutoHomepage, {
      colunas: parametros.colunas,
      ordenacoes: parametros.ordenacao,
    });
  }

  deleteAll(): Promise<RetornoDelete> {
    return this.http.delete('ecommerce-produtos-homepage', {filtros: 'CODIGO:MAIOR:0'});
  }

  salvarProdutos(body: ProdutoHomepage[]): Promise<RetornoPost<ProdutoHomepage>[]> {
    return this.http.post('ecommerce-produtos-homepage', null, body);
  }
}
