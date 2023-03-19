import ConfiguracoesAtendimentos from '@alkord/models/ConfiguracoesAtendimentos';
import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoPut from '@alkord/models/RetornoPut';

export default class ConfiguracoesAtendimentosService extends BaseService {
  getConfiguracoesAtendimento(parametros: SelectParametros):
    Promise<RetornoRegistros<ConfiguracoesAtendimentos>> {
    return this.http.get(
        'sistema-configuracoes-atendimentos', ConfiguracoesAtendimentos, SelectParametros.toRest(parametros),
    );
  }

  putConfiguracoesAtendimento(configuracoes: ConfiguracoesAtendimentos, codigo: number):
    Promise<RetornoPut<ConfiguracoesAtendimentos>> {
    return this.http.put<ConfiguracoesAtendimentos>(
        `sistema-configuracoes-atendimentos/${codigo}`, configuracoes, ConfiguracoesAtendimentos, {},
    );
  }
}
