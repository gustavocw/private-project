import BaseService from '../api/BaseService';
import Pessoa from '@alkord/models/Pessoa';
import {SelectParametros} from '@alkord/models/SelectParametros';
import Produto from '@alkord/models/Produto';
import Vendedor from '@alkord/models/Vendedor';
import Cliente from '@alkord/models/Cliente';
import Transportadora from '@alkord/models/Transportadora';
import Relacionamento from '@alkord/models/Relacionamento';
import {encodeParametros} from '@alkord/shared/utils/Utils';

export interface EndpointsPessoa {
  pessoas: Pessoa,
  operadores: Pessoa,
  clientes: Cliente,
  vendedores: Vendedor,
  fabricantes: Pessoa,
  transportadoras: Transportadora,
}

const endpointsPessoa: {[key in string]: { new(): Pessoa}} = {
  pessoas: Pessoa,
  clientes: Cliente,
  vendedores: Vendedor,
  fabricantes: Pessoa,
  transportadoras: Transportadora,
  operadores: Pessoa,
};

export default class SuggestionService extends BaseService {
  /** @deprecated */
  async get<T>(endpoint: string, tipo: { new(): T }, colunas?: string, filtros?: string,
      ordenacoes?: string): Promise<T[]> {
    const response = await this.http.get<T>(endpoint, tipo, SelectParametros.toRest({
      colunas,
      filtros,
      ordenacao: ordenacoes,
      numeroRegistros: 5,
    }));

    return response.REGISTROS;
  }

  async getPessoa<U extends keyof EndpointsPessoa, T = EndpointsPessoa[U]>(
      endpoint: U, query: string, colunas?: string, filtros?: string,
  ): Promise<T[]> {
    const tipo: {new(): T} = endpointsPessoa[endpoint] as any;
    const textoNumerico = query.replace(/[.\-\/]/g, '');
    const pesquisasQuery = [
      encodeParametros`NOME:CONTEM:${query}`,
      encodeParametros`APELIDO:CONTEM:${query}`,
    ];

    if (textoNumerico.match(/^\d+$/)) {
      if (textoNumerico.length >= 3) {
        pesquisasQuery.push(`DOCUMENTO:COMECA_COM:${textoNumerico}`);
      }

      if (textoNumerico.length < 11) {
        pesquisasQuery.push(`CODIGO:IGUAL:${textoNumerico}`);
      }
    }

    const response = await this.http.get<T>(endpoint, tipo, SelectParametros.toRest({
      colunas: colunas ?? '<CODIGO,NOME,APELIDO>',
      filtros: pesquisasQuery.join('|') + (filtros ? `,${filtros}` : ''),
      ordenacao: '<NOME|APELIDO> REL(NOME)',
      numeroRegistros: 5,
    }));

    return response.REGISTROS;
  }

  async getProduto(query: string): Promise<Produto[]> {
    const response = await this.http.get<Produto>('produtos', Produto, SelectParametros.toRest({
      colunas: 'CODIGO,NOME',
      filtros: encodeParametros`TEXTOS[PESQUISA:CONTEM:${query}],EXCLUIDO:ig:N`,
      ordenacao: 'NOME REL(textos.pesquisa)',
      numeroRegistros: 5,
    }));

    return response.REGISTROS;
  }

  async getRelacionamentos(query: string): Promise<Relacionamento[]> {
    const response = await this.http.get<Relacionamento>('pessoas-cadastro-relacionamentos',
        Relacionamento, SelectParametros.toRest({
          colunas: 'CODIGO,NOME',
          filtros: encodeParametros`NOME:CC:${query},EXCLUIDO:ig:N`,
          ordenacao: 'NOME ASC',
          numeroRegistros: 5,
        }));

    return response.REGISTROS;
  }

  async getPessoaDestinatario(endpoint: string, query: string): Promise<Pessoa[]> {
    const response = await this.http.get<Pessoa>(endpoint, Pessoa, SelectParametros.toRest({
      colunas: '<CODIGO,NOME,APELIDO>',
      filtros: encodeParametros`TIPO_CADASTRO:IG:U|TIPO_CADASTRO:IG:P,NOME:CONTEM:${query}
        |APELIDO:CONTEM:${query}|DOCUMENTO:IGUAL:${query}`,
      ordenacao: '<NOME|APELIDO> REL(NOME)',
      numeroRegistros: 5,
    }));

    return response.REGISTROS;
  }
}
