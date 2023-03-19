import BaseService from '../../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import ConfiguracoesProcessoEmail from '@alkord/models/ecommerce/ConfiguracoesProcessoEmail';
import RetornoPut from '@alkord/models/RetornoPut';

export default class ConfiguracoesProcessoEmailService extends BaseService {
  public buscarTemplate(parametros: SelectParametros): Promise<RetornoRegistros<ConfiguracoesProcessoEmail>> {
    return this.http.get<ConfiguracoesProcessoEmail>(
        'sistema_configuracoes_processos_email',
        ConfiguracoesProcessoEmail, {
          filtros: parametros.filtros,
        });
  }

  public salvarTemplate(body: ConfiguracoesProcessoEmail): Promise<RetornoPut<ConfiguracoesProcessoEmail>> {
    return this.http.put<ConfiguracoesProcessoEmail>(
        `sistema_configuracoes_processos_email`,
        body,
        ConfiguracoesProcessoEmail,
        {},
    );
  }
}

