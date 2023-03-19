import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class ProdutoPorCategoria {
  @jsonString
  NOME: string;
  @jsonNumber
  CODIGO: number;
}
