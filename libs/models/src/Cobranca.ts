import {jsonDateFormat, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class Cobranca {
  @jsonDateFormat('DD/MM/YYYY')
  DATA_VENCIMENTO: Date;
  @jsonNumber
  DIAS_ATRASO: number;
  @jsonNumber
  VALOR: number;
  @jsonString
  LINK_SEGUNDA_VIA: string;
}
