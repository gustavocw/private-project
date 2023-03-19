import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import CanalVenda from '@alkord/models/CanalVenda';

export default class CanaisVendaService extends BaseService {
  buscarCanaisVenda(): Promise<RetornoRegistros<CanalVenda>> {
    return this.http.get<CanalVenda>('alkord-geral-canais-venda', CanalVenda, {});
  }
}
