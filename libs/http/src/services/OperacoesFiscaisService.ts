import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import OperacaoFiscal from '@alkord/models/OperacaoFiscal';
import {SelectParametros} from '@alkord/models/SelectParametros';

export default class OperacoesFiscaisService extends BaseService {
  getOperacoesFiscais(parametros: SelectParametros): Promise<RetornoRegistros<OperacaoFiscal>> {
    return this.http.get(
        'alkord-geral-operacoes-fiscais', OperacaoFiscal, SelectParametros.toRest(parametros),
    );
  }
}
