import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class RegraPrecoParametro {
  @jsonNumber
  CODIGO: number;
  @jsonString
  DESCRICAO: string;
  @jsonNumber
  REGRA: number;
  @jsonNumber
  TIPO: number;
  @jsonNumber
  VALOR: number;
  @jsonNumber
  VALOR_ADICIONAL: number;
  @jsonNumber
  VALOR_ADICIONAL2: number;
}
