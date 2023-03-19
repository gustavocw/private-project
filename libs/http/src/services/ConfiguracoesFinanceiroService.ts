import BaseService from '../api/BaseService';
import ConfiguracoesFinanceiro from '@alkord/models/ConfiguracoesFinanceiro';
import RetornoPut from '@alkord/models/RetornoPut';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPost from '@alkord/models/RetornoPost';

export default class ConfiguracoesFinanceiroService extends BaseService {
  public async buscar(parametros: SelectParametros): Promise<ConfiguracoesFinanceiro> {
    const retorno = await this.http.get<ConfiguracoesFinanceiro>(
        `sistema-configuracoes-financeiro`,
        ConfiguracoesFinanceiro,
        SelectParametros.toRest(SelectParametros.merge(parametros, {filtros: 'CODIGO:IGUAL:1'})),
    );

    if (retorno.TOTAL_REGISTROS === 0) {
      const configuracaoFinanceiro = new ConfiguracoesFinanceiro();
      configuracaoFinanceiro.EMAIL_CLIENTES_INADIMPLENTES = false;
      configuracaoFinanceiro.EMAIL_PAGAMENTOS_A_VENCER = false;

      await this.inserir(configuracaoFinanceiro);

      return configuracaoFinanceiro;
    }
    return retorno.REGISTROS[0];
  }

  public async atualizar(
      configuracoesFinanceiro: ConfiguracoesFinanceiro,
  ): Promise<RetornoPut<ConfiguracoesFinanceiro>> {
    return await this.http.put<ConfiguracoesFinanceiro>(
        `sistema-configuracoes-financeiro/1`,
        configuracoesFinanceiro,
        ConfiguracoesFinanceiro,
        {},
    );
  }

  private async inserir(
      configuracoesFinanceiro: ConfiguracoesFinanceiro,
  ): Promise<RetornoPost<ConfiguracoesFinanceiro>> {
    return await this.http.post<ConfiguracoesFinanceiro>(
        `sistema-configuracoes-financeiro`,
        ConfiguracoesFinanceiro,
        configuracoesFinanceiro,
        {},
    );
  }
}
