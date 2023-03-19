import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import RegraPreco from '@alkord/models/RegraPreco';

export default class RegrasNegociacaoService extends BaseService {
  async get(parametros: SelectParametros): Promise<RetornoRegistros<RegraPreco>> {
    return this.http.get('produtos-cadastro-regras-precos', RegraPreco, SelectParametros.toRest(parametros));
  }
}
