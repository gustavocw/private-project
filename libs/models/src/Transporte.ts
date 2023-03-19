import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export class Transporte {
  @jsonString
  @observable
  TIPO: string;
  @jsonString
  @observable
  CONDICAO: string;
  @jsonString
  @observable
  DATA_PRIMEIRA_PARCELA: string;
  @jsonNumber
  @observable
  VALOR: number;
}
