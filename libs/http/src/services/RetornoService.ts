import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import BaseService from '../api/BaseService';
import RetornoPost from '@alkord/models/RetornoPost';
import FinanceiroRetorno from '@alkord/models/FinanceiroRetorno';

export default class RetornoService extends BaseService {
  async buscarRetornos(parametros: SelectParametros): Promise<RetornoRegistros<FinanceiroRetorno>> {
    return this.http.get<FinanceiroRetorno>('boletos-retornos', FinanceiroRetorno, SelectParametros.toRest(parametros));
  }

  async cadastrarRetorno(retorno: FinanceiroRetorno): Promise<RetornoPost<FinanceiroRetorno>> {
    return this.http.post<FinanceiroRetorno>('boletos-retornos', FinanceiroRetorno, retorno, {});
  }

  async importarRetornoCnab(arquivo: File): Promise<RetornoPost<String>> {
    const formData = new FormData();
    formData.append('Filedata', arquivo);

    return this.http.postMultipart(
        'cnab-processar-retorno',
        null,
        formData,
        {},
        {},
    );
  }
}
