import BaseService from '../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import AtendimentoItem from '@alkord/models/AtendimentoItem';

export default class AtendimentoItensService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<AtendimentoItem>> {
    return this.http.get<AtendimentoItem>(
        'atendimentos-itens', AtendimentoItem, SelectParametros.toRest(parametros),
    );
  }
}

