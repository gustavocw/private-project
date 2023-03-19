import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class RegiaoVenda {
  @jsonNumber
  CODIGO?: number;
  @jsonString
  NOME: string;
  @jsonString
  OBSERVACAO: string;
}
