import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import IntegracaoApi from '@alkord/models/IntegracaoApi';

export default class IntegracaoApisService extends BaseService {
  buscarIntegracoes(parametros: SelectParametros): Promise<RetornoRegistros<IntegracaoApi>> {
    return this.http.get<IntegracaoApi>('integracao-apis', IntegracaoApi, {
      colunas: parametros.colunas,
      filtros: parametros.filtros,
    });
  }
}
