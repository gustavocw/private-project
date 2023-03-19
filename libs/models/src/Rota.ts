import {jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';
import TipoRota from './enum/TipoRota';

@jsonModel
class Rota {
  @observable
  @jsonNumber
  CODIGO: number;
  @observable
  @jsonEnum(TipoRota)
  TIPO: TipoRota;
  @observable
  @jsonString
  NOME: string;
}

export default Rota;
