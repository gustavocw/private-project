import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class ProdutoArquivo {
  @jsonNumber
  CODIGO: number;
  @jsonString
  NOME: string;
  @jsonString
  TIPO: string;
  @jsonString
  URL: string;
  @jsonNumber
  PRODUTO: number;
}
