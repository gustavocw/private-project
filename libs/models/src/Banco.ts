import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';

@jsonModel
export default class Banco implements HasCodigo {
  @jsonNumber
  CODIGO: number;
  @jsonString
  NOME: string;
}
