import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import RegraComissao from '@alkord/models/RegraComissao';

export default class RegrasComissionamentoService extends BaseService {
  async get(parametros: SelectParametros): Promise<RetornoRegistros<RegraComissao>> {
    return this.http.get('regras-comissionamento', RegraComissao, SelectParametros.toRest(parametros));
  }
}
