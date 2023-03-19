import {jsonArray, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import RegraComissaoParametro from './RegraComissaoParametro';

@jsonModel
export default class RegraComissao {
  @jsonNumber
  CODIGO: number;
  @jsonString
  DESCRICAO: string;
  @jsonNumber
  VALOR: number;
  @jsonNumber
  PRIORIDADE: number;
  @jsonArray(() => RegraComissaoParametro)
  PARAMETROS: RegraComissaoParametro[];
}
