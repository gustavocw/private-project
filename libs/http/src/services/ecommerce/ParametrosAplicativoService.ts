import BaseService from '../../api/BaseService';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import RetornoPut from '@alkord/models/RetornoPut';
import RetornoPost from '@alkord/models/RetornoPost';
import ConfiguracoesCanalVenda from '@alkord/models/ecommerce/ConfiguracoesCanalVenda';
import ConfiguracoesProcessoEmail from '@alkord/models/ecommerce/ConfiguracoesProcessoEmail';

export default class ParametrosAplicativoService extends BaseService {
  buscarParametros(parametros: SelectParametros): Promise<RetornoRegistros<ConfiguracoesCanalVenda>> {
    return this.http.get<ConfiguracoesCanalVenda>('sistema_configuracoes_canais_venda', ConfiguracoesCanalVenda, {
      filtros: parametros.filtros,
    });
  }

  salvarParametros(body: ConfiguracoesCanalVenda): Promise<RetornoPut<ConfiguracoesCanalVenda>> {
    return this.http.put<ConfiguracoesCanalVenda>(
        `sistema_configuracoes_canais_venda`,
        body,
        ConfiguracoesCanalVenda,
        {},
    );
  }

  criarParametros(body: ConfiguracoesCanalVenda): Promise<RetornoPost<ConfiguracoesProcessoEmail>> {
    return this.http.post<ConfiguracoesCanalVenda>(
        `sistema_configuracoes_canais_venda`,
        ConfiguracoesCanalVenda,
        body,
        {},
    );
  }
}

