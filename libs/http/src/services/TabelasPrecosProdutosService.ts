import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import TabelaPrecoProduto from '@alkord/models/TabelaPrecoProduto';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPut from '@alkord/models/RetornoPut';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoDelete from '@alkord/models/RetornoDelete';

export default class TabelasPrecosProdutosService extends BaseService {
  async get(parametros: SelectParametros): Promise<RetornoRegistros<TabelaPrecoProduto>> {
    return this.http.get('tabelas-precos-produtos', TabelaPrecoProduto, SelectParametros.toRest(parametros));
  }

  async post(tabelasPrecosProdutos: TabelaPrecoProduto[]): Promise<RetornoPost<TabelaPrecoProduto>[]> {
    return this.http.post('tabelas-precos-produtos', TabelaPrecoProduto, tabelasPrecosProdutos, {});
  }

  async put(tabelasPrecosProdutos: TabelaPrecoProduto[]): Promise<RetornoPut<TabelaPrecoProduto>> {
    return this.http.put('tabelas-precos-produtos', tabelasPrecosProdutos, TabelaPrecoProduto, {});
  }

  async delete(tabelasPrecosProdutos: TabelaPrecoProduto[]): Promise<RetornoDelete> {
    const codigos = tabelasPrecosProdutos.map((tabela) => tabela.CODIGO).join(',');

    return this.http.delete('tabelas-precos-produtos', {filtros: `CODIGO:CONTIDO:${codigos}`});
  }
}
