import {jsonModel, jsonNumber} from '@alkord/json/decorators';

@jsonModel
export default class LicencaFuncao {
  @jsonNumber
  LICENCA: number;
  @jsonNumber
  FUNCAO: number;
}
