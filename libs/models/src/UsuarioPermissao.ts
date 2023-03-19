import {jsonModel, jsonNumber} from '@alkord/json/decorators';

@jsonModel
export default class UsuarioPermissao {
  @jsonNumber
  PERMISSAO: number;
  @jsonNumber
  VALOR: number;
}
