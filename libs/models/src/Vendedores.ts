import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';

@jsonModel
export default class Vendedores implements HasCodigo {
  @jsonNumber
  CODIGO: number;
  @jsonString
  NOME: string;
}
