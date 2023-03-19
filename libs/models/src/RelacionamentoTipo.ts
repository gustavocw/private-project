import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class RelacionamentoTipo {
  @jsonNumber
  CODIGO: number;
  @jsonString
  NOME: string;
  @jsonString
  TIPO_PESSOA: string;
  @jsonNumber
  TIPO: number;
}
