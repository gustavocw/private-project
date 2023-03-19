import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import TributacaoModalidade from '@alkord/models/TributacaoModalidade';

export default class DadosTributariosService extends BaseService {
  getRegimesTributarios(): Promise<RetornoRegistros<TributacaoModalidade>> {
    return this.http.get('alkord-nfe-regimes-tributarios', TributacaoModalidade, {});
  }
}
