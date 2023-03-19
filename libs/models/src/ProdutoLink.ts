import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class ProdutoLink {
  @jsonNumber
  CODIGO: number;
  @jsonNumber
  PRODUTO: number;
  @jsonString
  TIPO: string;
  @jsonString
  NOME: string;
  @jsonString
  EXCLUIDO: string;
}
