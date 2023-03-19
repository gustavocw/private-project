import {jsonInteger, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class ProdutoTributario {
  @jsonInteger
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  UNIDADE: number;
  @jsonNumber
  @observable
  GRADE: number;
  @jsonNumber
  @observable
  IPI_ALIQUOTA: number;
  @jsonString
  @observable
  IPI_CST_SAIDA: string;
  @jsonString
  @observable
  ICMS_SIMPLES_NACIONAL: string;
  @jsonString
  @observable
  IPI_CST_ENTRADA: string;
  @jsonNumber
  @observable
  IPI_VALOR_UNIDADE: number;
  @jsonString
  @observable
  IPI_CLASSE_ENQUADRAMENTO: string;
  @jsonString
  @observable
  PIS_CST: string;
  @jsonNumber
  @observable
  PIS_ALIQUOTA: number;
  @jsonString
  COFINS_CST: string;
  @jsonNumber
  COFINS_ALIQUOTA: number;
  @jsonString
  @observable
  COFINS_NATUREZA_RECEITA: string;
  @jsonString
  @observable
  PIS_NATUREZA_RECEITA: string;
  @jsonString
  @observable
  CONTRIBUICAO_SOCIAL_APURADA: string;
  @jsonString
  @observable
  TOTAL_TRIBUTOS_TIPO: string;
  @jsonNumber
  @observable
  TOTAL_TRIBUTOS_VALOR: number;
  @jsonNumber
  @observable
  TOTAL_TRIBUTOS_PERCENTUAL: number;
  @jsonString
  CODIGO_BENEFICIO_FISCAL: string;
  @jsonString
  FICHA_CONTEUDO_IMPORTACAO: string;
}
