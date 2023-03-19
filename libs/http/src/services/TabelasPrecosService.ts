import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import TabelaPreco from '@alkord/models/TabelaPreco';
import RetornoPut from '@alkord/models/RetornoPut';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoDelete from '@alkord/models/RetornoDelete';
import Arquivo from '@alkord/models/Arquivo';
import Blob from '@alkord/shared/api/Blob';
import AwsLambda from '../api/AwsLambda';

export default class TabelasPrecosService extends BaseService {
  async get(parametros: SelectParametros): Promise<RetornoRegistros<TabelaPreco>> {
    return this.http.get('tabelas-precos', TabelaPreco, SelectParametros.toRest(parametros));
  }

  async put(tabelasPrecos: TabelaPreco[]): Promise<RetornoPut<TabelaPreco>> {
    return this.http.put('tabelas-precos', tabelasPrecos, TabelaPreco, {});
  }

  async post(tabelaPreco: TabelaPreco): Promise<RetornoPost<TabelaPreco>> {
    return this.http.post('tabelas-precos', TabelaPreco, tabelaPreco, {});
  }

  async delete(codigoTabela: number): Promise<RetornoDelete> {
    return this.http.delete(`tabelas-precos/${codigoTabela}`, {});
  }

  async baixarCsv(payload: {}): Promise<void> {
    const arquivo: Arquivo = await AwsLambda.get().invocarApi({
      endpoint: 'tabela-de-precos/baixar-csv',
      metodo: 'POST',
      tipoRetorno: Arquivo,
      body: payload,
    });

    if (arquivo) {
      new Blob(arquivo).salvarAquivo(arquivo.NOME);
    }
  }
}
