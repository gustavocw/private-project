import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import TipoOperacao from '@alkord/models/TipoOperacao';

export default class TiposOperacoesService extends BaseService {
  getTiposOperacoes(parametros: SelectParametros): Promise<RetornoRegistros<TipoOperacao>> {
    return this.http.get(
        'alkord-geral-tipos-operacoes', TipoOperacao, SelectParametros.toRest(parametros),
    );
  }
}
