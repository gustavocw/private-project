import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import ProdutoNcm from '@alkord/models/ProdutoNcm';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoPut from '@alkord/models/RetornoPut';

export default class ProdutoNcmService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<ProdutoNcm>> {
    return this.http.get<ProdutoNcm>(
        'produtos_cadastro_ncm', ProdutoNcm, SelectParametros.toRest(parametros),
    );
  }

  getSuggestion(parametros: SelectParametros): Promise<RetornoRegistros<ProdutoNcm>> {
    return this.http.getPhp<any>(
        'ncms', ProdutoNcm, {
          colunas: parametros.colunas,
          filtros: parametros.filtros,
          numero_registros: parametros.numeroRegistros,
          ordenacao: parametros.ordenacao,
        },
    );
  }

  post(ncm: ProdutoNcm): Promise<RetornoPost<ProdutoNcm>> {
    return this.http.post('produtos_cadastro_ncm', ProdutoNcm, ncm, {});
  }

  put(ncm: ProdutoNcm): Promise<RetornoPut<ProdutoNcm>> {
    return this.http.put<ProdutoNcm>(
        `produtos_cadastro_ncm`, ncm, ProdutoNcm, {},
    );
  }

  delete(codigo: string) {
    return this.http.delete(`produtos_cadastro_ncm/${codigo}`, {});
  }

  async importarListaIbpt(arquivo: File): Promise<RetornoPost<String>> {
    const formData = new FormData();
    formData.append('Filedata', arquivo);

    return this.http.postMultipart(
        'importacao/importar-lista-ibpt',
        null,
        formData,
        {},
        {},
    );
  }
}
