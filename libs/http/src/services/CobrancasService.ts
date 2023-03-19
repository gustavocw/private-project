import BaseService from '../api/BaseService';
import FinanceiroReceita from '@alkord/models/FinanceiroReceita';
import AlkordJson from '@alkord/json/AlkordJson';

export default class CobrancasService extends BaseService {
  async buscarCobrancasPainel(colunas: String): Promise<FinanceiroReceita[]> {
    const receitas: Object[] = (
      await this.http.getProcesso(
          `licenca/cobrancas`,
          null,
          {
            colunas: colunas,
          },
      )
    );

    return AlkordJson.parseAsArray(receitas, FinanceiroReceita).reverse();
  }

  async emitirBoletoCobranca(codigoReceita: number): Promise<any> {
    return await this.http.getProcesso(
        'licenca/gerar-boleto-cobranca',
        null,
        {codigoReceita: codigoReceita},
    );
  }
}
