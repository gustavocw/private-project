import BaseService from '../api/BaseService';
import RetornoRegistros from '@alkord/models/RetornoRegistros';
import {SelectParametros} from '@alkord/models/SelectParametros';
import Pessoa from '@alkord/models/Pessoa';
import Veiculo from '@alkord/models/Veiculo';
import RetornoPost from '@alkord/models/RetornoPost';
import RetornoPut from '@alkord/models/RetornoPut';

export default class TransporteService extends BaseService {
  getTransportadoras(parametros?: SelectParametros): Promise<RetornoRegistros<Pessoa>> {
    return this.http.get('transportadoras', Pessoa, SelectParametros.toRest(parametros));
  }

  getVeiculos(parametros?: SelectParametros): Promise<RetornoRegistros<Veiculo>> {
    return this.http.get('transporte-veiculos', Veiculo, SelectParametros.toRest(parametros));
  }

  cadastrarTipoVeiculo(tipoVeiculo: Veiculo): Promise<RetornoPost<Veiculo>> {
    return this.http.post('transporte-veiculos', Veiculo, tipoVeiculo, {});
  }

  editarTipoVeiculo(codigo: number, tipoVeiculo: Veiculo): Promise<RetornoPut<Veiculo>> {
    return this.http.put(`transporte-veiculos/${codigo}`, tipoVeiculo, Veiculo, {});
  }
}
