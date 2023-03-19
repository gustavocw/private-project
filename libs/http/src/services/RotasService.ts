import BaseService from '../api/BaseService';
import PessoaRota from '@alkord/models/PessoaRota';
import {SelectParametros} from '@alkord/models/SelectParametros';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import RotaCliente from '@alkord/models/RotaCliente';

class RotasService extends BaseService {
  getPessoasRotas(parametros: SelectParametros): Promise<RetornoRegistros<PessoaRota>> {
    return this.http.get('pessoas-rotas', PessoaRota, SelectParametros.toRest(parametros), {});
  }

  getRotasClientes(parametros: SelectParametros): Promise<RetornoRegistros<RotaCliente>> {
    return this.http.get('rotas-clientes', RotaCliente, SelectParametros.toRest(parametros), {});
  }
}

export default RotasService;
