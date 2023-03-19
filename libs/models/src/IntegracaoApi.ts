import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class IntegracaoApi {
  @jsonNumber
  CODIGO: number;
  @jsonString
  NOME: string;
}
