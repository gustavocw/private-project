import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RegiaoVenda from '@alkord/models/RegiaoVenda';
import Pessoa from '@alkord/models/Pessoa';
import Relacionamento from '@alkord/models/Relacionamento';
import PessoaEmail from '@alkord/models/PessoaEmail';
import Vendedor from '@alkord/models/Vendedor';
import RetornoPut from '@alkord/models/RetornoPut';
import {EndpointsPessoa} from './SuggestionService';

export default class PessoasService extends BaseService {
  get(parametros?: SelectParametros, endpoint?: keyof EndpointsPessoa): Promise<RetornoRegistros<Pessoa>> {
    return this.http.get(endpoint ?? 'pessoas', Pessoa, SelectParametros.toRest(parametros));
  }

  getRegioesVenda(parametros: SelectParametros): Promise<RetornoRegistros<RegiaoVenda>> {
    return this.http.get('pessoas-cadastro-regioes', RegiaoVenda, SelectParametros.toRest(parametros));
  }

  getVendedores(parametros?: SelectParametros): Promise<RetornoRegistros<Vendedor>> {
    return this.http.get('vendedores', Vendedor, SelectParametros.toRest(parametros));
  }

  getRelacionamentos(parametros: SelectParametros): Promise<RetornoRegistros<Relacionamento>> {
    return this.http.get('pessoas-cadastro-relacionamentos', Relacionamento, SelectParametros.toRest(parametros));
  }

  getEmails(parametros: SelectParametros): Promise<RetornoRegistros<PessoaEmail>> {
    return this.http.get<PessoaEmail>('pessoas-emails', PessoaEmail, SelectParametros.toRest(parametros));
  }

  put(codigo: number, pessoa: Pessoa): Promise<RetornoPut<Pessoa>> {
    return this.http.put<Pessoa>(`pessoas/${codigo}`, pessoa, Pessoa, {}, {
      serializationConfig: {
        preserveNull: true,
      },
    });
  }

  delete(codigo: number) {
    return this.http.delete(`pessoas/${codigo}`, {});
  }
}
