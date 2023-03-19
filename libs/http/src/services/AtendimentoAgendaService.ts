import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import AtendimentosAgenda from '@alkord/models/AtendimentosAgenda';

export default class AtendimentoAgendaService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<AtendimentosAgenda>> {
    return this.http.get<AtendimentosAgenda>(
        'atendimentos-agendamentos',
        AtendimentosAgenda,
        SelectParametros.toRest(parametros),
    );
  }
}
