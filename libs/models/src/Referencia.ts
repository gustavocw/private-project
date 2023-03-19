import {jsonModel, jsonNumber} from '@alkord/json/decorators';

@jsonModel
export default class Referencia {
  @jsonNumber
  CODIGO: number;
}
