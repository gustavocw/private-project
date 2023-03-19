import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import UnidadeNegocio from '@alkord/models/UnidadeNegocio';
import RetornoPut from '@alkord/models/RetornoPut';
import {SelectParametros} from '@alkord/models/SelectParametros';

export default class UnidadesNegocioService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<UnidadeNegocio>> {
    return this.http.get('unidades-negocio', UnidadeNegocio, SelectParametros.toRest(parametros));
  }

  put(unidade: UnidadeNegocio): Promise<RetornoPut<UnidadeNegocio>> {
    return this.http.put<UnidadeNegocio>(`unidades-negocio`, unidade, UnidadeNegocio, {});
  }
}
