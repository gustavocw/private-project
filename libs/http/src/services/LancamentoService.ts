import BaseService from '../api/BaseService';
import RetornoPost from '@alkord/models/RetornoPost';
import LancamentoManualAReceber from '@alkord/models/LancamentoManualAReceber';
import LancamentoManualAPagar from '@alkord/models/LancamentoManualAPagar';

export default class LancamentoService extends BaseService {
  async gerarLancamentosManuaisAReceber(lancamentos: LancamentoManualAReceber[], gerarBoleto: boolean): Promise<any> {
    await this.http.postProcesso(
        'financeiro-receitas/cadastrar',
        null,
        lancamentos,
        {gerarBoletos: gerarBoleto},
    );
  }

  gerarLancamentosManuaisAPagar(lancamentos: LancamentoManualAPagar[]):
    Promise<Array<RetornoPost<LancamentoManualAReceber>>> {
    return this.http.post<LancamentoManualAPagar>(
        'financeiro-despesas',
        LancamentoManualAPagar,
        lancamentos,
        {},
    );
  }
}
