import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import GeralEndereco from '@alkord/models/GeralEndereco';

export default class GeralEnderecosService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<GeralEndereco>> {
    return this.http.get('alkord-geral-enderecos', GeralEndereco, parametros);
  }
}
