import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import AtendimentoTipo from '@alkord/models/AtendimentoTipo';
import Atendimento from '@alkord/models/Atendimento';
import RetornoPut from '@alkord/models/RetornoPut';
import RetornoPost from '@alkord/models/RetornoPost';

export default class AtendimentosService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<Atendimento>> {
    return this.http.get<Atendimento>('atendimentos', Atendimento, SelectParametros.toRest(parametros));
  }

  post(atendimento: Atendimento): Promise<RetornoPost<Atendimento>> {
    return this.http.post('atendimentos', Atendimento, atendimento, {});
  }

  put(codigo: number, atendimento: Atendimento): Promise<RetornoPut<Atendimento>> {
    return this.http.put<Atendimento>(`atendimentos/${codigo}`, atendimento, Atendimento, {}, {
      serializationConfig: {
        preserveNull: true,
      },
    });
  }

  getAtendimentosTipos(parametros: SelectParametros): Promise<RetornoRegistros<AtendimentoTipo>> {
    return this.http.get('atendimentos-cadastro-tipos', AtendimentoTipo, SelectParametros.toRest(parametros));
  }

  cadastrarTipoAtendimento(tipoAtendimento: AtendimentoTipo): Promise<RetornoPost<AtendimentoTipo>> {
    return this.http.post('atendimentos-cadastro-tipos', AtendimentoTipo, tipoAtendimento, {});
  }

  editarTipoAtendimento(codigo: number, tipoAtendimento: AtendimentoTipo): Promise<RetornoPut<AtendimentoTipo>> {
    return this.http.put(`atendimentos-cadastro-tipos/${codigo}`, tipoAtendimento, AtendimentoTipo, {});
  }
}
