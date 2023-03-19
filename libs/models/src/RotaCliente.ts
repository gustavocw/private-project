import {jsonClass, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Rota from './Rota';

@jsonModel
class RotaCliente {
  @observable
  @jsonNumber
  CODIGO: number;
  @observable
  @jsonNumber
  CLIENTE: number;
  @observable
  @jsonClass(() => Rota)
  ROTA: Rota;
}


export default RotaCliente;
