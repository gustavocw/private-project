import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class ConfiguracoesCanalVenda {
  @jsonString
  CONFIGURACOES: string;
  @jsonNumber
  CANAL_VENDA: number;
}
