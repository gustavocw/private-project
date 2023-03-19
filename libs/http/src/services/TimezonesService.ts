import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import Timezone from '@alkord/models/Timezone';

export default class TimezonesService extends BaseService {
  getTimezones(): Promise<RetornoRegistros<Timezone>> {
    return this.http.get('alkord-geral-timezones', Timezone, {
      filtros: 'PAIS:IGUAL:1',
      ordenacoes: 'NOME',
    });
  }
}
