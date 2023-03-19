import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import Estado from '@alkord/models/Estado';
import {SelectParametros} from '@alkord/models/SelectParametros';
import Cidade from '@alkord/models/Cidade';

export default class EnderecosService extends BaseService {
  getEstados(): Promise<RetornoRegistros<Estado>> {
    return this.http.get('alkord-geral-estados', Estado, {
      filtros: 'PAIS:IGUAL:1',
      ordenacoes: 'NOME',
    });
  }

  getCidades(selectParametros: SelectParametros): Promise<RetornoRegistros<Cidade>> {
    return this.http.get('alkord-geral-cidades', Cidade, SelectParametros.toRest(selectParametros));
  }
}
