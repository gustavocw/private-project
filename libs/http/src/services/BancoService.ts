import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import Banco from '@alkord/models/Banco';

export default class BancoService extends BaseService {
  get(parametros?: SelectParametros): Promise<RetornoRegistros<Banco>> {
    return this.http.get<Banco>('alkord-geral-bancos', Banco, SelectParametros.toRest(parametros));
  }
}
