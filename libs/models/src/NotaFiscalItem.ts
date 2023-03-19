import {
  jsonClass,
  jsonConvertStringToBoolean,
  jsonIgnore,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import NotaFiscalItemIcms from './NotaFiscalItemIcms';
import NotaFiscalItemIpi from './NotaFiscalItemIpi';
import Utils from '@alkord/shared/utils/Utils';

@jsonModel
export default class NotaFiscalItem {
  @jsonNumber
  @observable
  ATENDIMENTO: number;
  @jsonNumber
  @observable
  ATENDIMENTO_ITEM: number;
  @jsonNumber
  @observable
  ITEM: number;
  @jsonNumber
  @observable
  PRODUTO: number;
  @jsonString
  @observable
  PRODUTO_CODIGO: string;
  @jsonString
  @observable
  PRODUTO_NOME: string;
  @jsonConvertStringToBoolean
  @observable
  PRODUTO_FABRICACAO_PROPRIA: boolean;
  @jsonNumber
  @observable
  PRODUTO_TIPO: number;
  @jsonNumber
  @observable
  PRODUTO_ORIGEM: number;
  @jsonString
  @observable
  PRODUTO_CODIGO_BARRAS: string;
  @jsonString
  @observable
  PRODUTO_UNIDADE_MEDIDA: string;
  @jsonString
  @observable
  PRODUTO_NCM: string;
  @jsonString
  @observable
  PRODUTO_CEST: string;
  @jsonString
  @observable
  PRODUTO_FABRICANTE: string;
  @jsonNumber
  @observable
  OPERACAO_FISCAL: number;
  @jsonString
  @observable
  CFOP: string;
  @jsonNumber
  @observable
  QUANTIDADE: number;
  @jsonNumber
  @observable
  VALOR_UNITARIO: number;
  @jsonNumber
  @observable
  TOTAL_BRUTO: number;
  @jsonNumber
  @observable
  TOTAL_NOTA: number;
  @jsonString
  @observable
  SOMAR_TOTAL_NOTA: string;
  @jsonClass(() => NotaFiscalItemIcms)
  @observable
  ICMS: NotaFiscalItemIcms;
  @jsonClass(() => NotaFiscalItemIpi)
  @observable
  IPI: NotaFiscalItemIpi;
  @jsonNumber
  @observable
  PERCENTUAL_RATEIO: number;
  @jsonNumber
  @observable
  DESCONTO_TOTAL: number;
  @jsonNumber
  @observable
  ACRESCIMO_TOTAL: number;
  @jsonNumber
  @observable
  FRETE: number;
  @jsonNumber
  @observable
  SEGURO: number;
  @jsonString
  @observable
  INFORMACAO_ADICIONAL: string;
  @observable
  DADOS_PRODUTO: any;
  @observable
  DADOS_TRIBUTACAO_ICMS: any;
  @observable
  MENSAGEM_ERRO: string;
  @jsonIgnore
  ULTIMO_HASH_CALCULADO: number;

  @computed
  get hashCalculo(): number {
    return Utils.hashCode(JSON.stringify({
      CFOP: this.CFOP,
      QUANTIDADE: this.QUANTIDADE,
      VALOR_UNITARIO: this.VALOR_UNITARIO,
      IPI: this.ICMS ? {
        ALIQUOTA: this.IPI.ALIQUOTA,
        VALOR_UNIDADE: this.IPI.VALOR_UNIDADE,
        CODIGO_ENQUADRAMENTO: this.IPI.CODIGO_ENQUADRAMENTO,
      } : null,
      ICMS: this.ICMS ? {
        CST_CSOSN: this.ICMS.CST_CSOSN,
        ALIQUOTA_REDUCAO: this.ICMS.ALIQUOTA_REDUCAO,
        ALIQUOTA: this.ICMS.ALIQUOTA,
        INTERESTADUAL_ALIQUOTA_DESTINO: this.ICMS.INTERESTADUAL_ALIQUOTA_DESTINO,
        ST_MVA: this.ICMS.ST_MVA,
        ST_ALIQUOTA: this.ICMS.ST_ALIQUOTA,
        ST_ALIQUOTA_REDUCAO: this.ICMS.ST_ALIQUOTA_REDUCAO,
        ST_MVA_AJUSTAR: this.ICMS.ST_MVA_AJUSTAR,
      } : null,
    }));
  }
}
