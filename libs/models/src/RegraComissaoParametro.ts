import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import RegraComissaoParametroTipo from './RegraComissaoParametroTipo';

@jsonModel
export default class RegraComissaoParametro {
  @jsonNumber
  CODIGO: number;
  @jsonNumber
  REGRA: number;
  @jsonClass(() => RegraComissaoParametroTipo)
  TIPO: RegraComissaoParametroTipo;
  @jsonString
  DESCRICAO: string;
  @jsonNumber
  VALOR?: number;
  @jsonNumber
  VALOR_ADICIONAL: number;
  @jsonNumber
  VALOR_ADICIONAL2: number;
}
