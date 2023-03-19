import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import Cliente from '@alkord/models/Cliente';
import RetornoPost from '@alkord/models/RetornoPost';
import Pessoa from '@alkord/models/Pessoa';
import RetornoPut from '@alkord/models/RetornoPut';
import PessoaComercialVenda from '@alkord/models/PessoaComercialVenda';

export default class ClienteService extends BaseService {
  get(parametros: SelectParametros): Promise<RetornoRegistros<Cliente>> {
    return this.http.get<Cliente>('clientes', Cliente, SelectParametros.toRest(parametros));
  }

  post(clientes: Cliente[]): Promise<RetornoPost<Cliente>[]> {
    return this.http.post<Cliente>('clientes', Cliente, clientes, {});
  }

  put(clientes: Cliente[]): Promise<RetornoPut<Cliente>> {
    return this.http.put('clientes', clientes, Cliente);
  }

  atualizarComercialVenda(comercialVenda: PessoaComercialVenda[]): Promise<RetornoPut<PessoaComercialVenda>> {
    return this.http.put('pessoas-comercial-venda', comercialVenda, PessoaComercialVenda);
  }

  getDestinatarioObjeto(parametros: SelectParametros): Promise<RetornoRegistros<Pessoa>> {
    return this.http.get<any>('pessoas', Pessoa, SelectParametros.toRest(parametros));
  }
}
