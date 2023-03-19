import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import Vendedor from '@alkord/models/Vendedor';
import {SelectParametros} from '@alkord/models/SelectParametros';
import Estado from '@alkord/models/Estado';
import Cidade from '@alkord/models/Cidade';
import AtendimentoTipo from '@alkord/models/AtendimentoTipo';

export default class VendasPorCidadeService extends BaseService {
  todosEstados(): Promise<RetornoRegistros<Estado>> {
    return this.http.get('alkord-geral-estados', Estado, {
      filtros: `PAIS:IGUAL:1`,
      ordenacoes: 'NOME ASC',
    });
  }

  getTipoAtendimento(): Promise<RetornoRegistros<AtendimentoTipo>> {
    return this.http.get('atendimentos-cadastro-tipos', AtendimentoTipo, {
      filtros: `CODIGO:CONTIDO:1,5`,
    });
  }

  filtrarCidades(parametros:SelectParametros): Promise<RetornoRegistros<Cidade>> {
    return this.http.get('alkord-geral-cidades', Cidade, SelectParametros.toRest(parametros));
  }

  getSugestionVendedor(parametros: SelectParametros): Promise<RetornoRegistros<Vendedor>> {
    return this.http.get<Vendedor>('vendedores', Vendedor, {
      colunas: parametros.colunas,
      filtros: parametros.filtros,
      numero_registros: parametros.numeroRegistros,
      ordenacao: parametros.ordenacao,
    });
  }
}
