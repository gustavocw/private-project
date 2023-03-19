import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import FinanceiroRemessa from '@alkord/models/FinanceiroRemessa';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import Arquivo from '@alkord/models/Arquivo';
import AlkordJson from '@alkord/json/AlkordJson';

export default class RemessaService extends BaseService {
  async buscarRemessas(parametros: SelectParametros): Promise<RetornoRegistros<FinanceiroRemessa>> {
    return this.http.get<FinanceiroRemessa>(
        'boletos-remessas',
        FinanceiroRemessa,
        SelectParametros.toRest(parametros),
    );
  }

  async gerarRemessaTodosBoletos(codigosExcecoes: string, filtros: string):Promise<RetornoRegistros<Arquivo>> {
    const response = await this.http.getProcesso(
        'cnab-processar-remessa/todos-boletos',
        null,
        {
          codigosExcecoes: codigosExcecoes,
          filtros: filtros,
        },
    );

    return new RetornoRegistros<Arquivo>(
        response['TOTAL_REGISTROS'],
        AlkordJson.parseAsArray(response['REGISTROS'], Arquivo),
    );
  }
}
