import {jsonArray, jsonDate, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import RegraPrecoTipo from './enum/RegraPrecoTipo';
import RegraPrecoParametro from './RegraPrecoParametro';

@jsonModel
export default class RegraPreco {
  @jsonNumber
  CODIGO: number;
  @jsonEnum(RegraPrecoTipo)
  TIPO: RegraPrecoTipo;
  @jsonString
  DESCRICAO: string;
  @jsonNumber
  VALOR: number;
  @jsonDate
  VALIDADE_INICIAL: Date;
  @jsonDate
  VALIDADE_FINAL: Date;
  @jsonNumber
  LISTA_PRECO_APLICAR: number;
  @jsonArray(() => RegraPrecoParametro)
  PARAMETROS: RegraPrecoParametro[];
}
