import {jsonModel, jsonNumber} from '@alkord/json/decorators';

@jsonModel
export default class RegraComissaoParametroTipo {
  @jsonNumber
  CODIGO: number;
  @jsonNumber
  PRIORIDADE: number;
}
