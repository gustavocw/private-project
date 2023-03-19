import {jsonClass, jsonModel, jsonNumber} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Rota from './Rota';

@jsonModel
class PessoaRota {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  PESSOA: number;
  @jsonClass(() => Rota) // FIXME #verificar#
  @observable
  ROTA: Rota;
}

export default PessoaRota;
