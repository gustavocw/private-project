import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import Localizacao from '@alkord/models/Localizacao';

export default class LocalizacaoService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<Localizacao>> {
    return this.http.get<Localizacao>(
        'produtos-cadastro-localizacoes',
        Localizacao,
        SelectParametros.toRest(parametros));
  }
}
