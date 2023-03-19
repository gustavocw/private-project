import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class Pais {
  @jsonNumber
  CODIGO: number;
  @jsonString
  NOME: string;
  @jsonNumber
  CODIGO_BACEN: number;
}

