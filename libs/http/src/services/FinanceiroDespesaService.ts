import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import FinanceiroDespesa from '@alkord/models/FinanceiroDespesa';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoDelete from '@alkord/models/RetornoDelete';
import RetornoPut from '@alkord/models/RetornoPut';

export default class FinanceiroDespesaService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<FinanceiroDespesa>> {
    return this.http.get<FinanceiroDespesa>(
        'financeiro-despesas', FinanceiroDespesa, SelectParametros.toRest(parametros));
  }

  post(lancamento: FinanceiroDespesa): Promise<RetornoPost<FinanceiroDespesa>> {
    return this.http.post('financeiro-despesas', FinanceiroDespesa, lancamento, {});
  }

  postList(despesas: FinanceiroDespesa[]): Promise<RetornoPost<FinanceiroDespesa>[]> {
    return this.http.post('financeiro-despesas', FinanceiroDespesa, despesas);
  }

  put(lancamento: FinanceiroDespesa, codigo: number): Promise<RetornoPut<FinanceiroDespesa>> {
    return this.http.put<FinanceiroDespesa>(
        `financeiro-despesas/${codigo}`, lancamento, FinanceiroDespesa, {});
  }

  delete(codigo: number): Promise<RetornoDelete> {
    return this.http.delete(`financeiro-despesas/${codigo}`, {});
  }
}
