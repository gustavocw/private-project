import {
  jsonClass,
  jsonConvertStringToBoolean,
  jsonEnum,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {observable} from 'mobx';
import IcmsModalidade from './IcmsModalidade';
import StOrigem from './StOrigem';
import CodigoTributario from './CodigoTributario';
import MotivoDesoneracao from './enum/MotivoDesoneracao';

@jsonModel
export default class NotaFiscalItemIcms {
  @jsonClass(() => CodigoTributario)
  @observable
  CST_CSOSN: CodigoTributario;
  CST_CALCULADO: string;
  @jsonEnum(IcmsModalidade)
  @observable
  MODALIDADE: IcmsModalidade;
  @jsonNumber
  @observable
  BASE: number;
  @jsonNumber
  @observable
  ALIQUOTA: number;
  @jsonNumber
  @observable
  ALIQUOTA_REDUCAO: number;
  @jsonNumber
  @observable
  ST_ALIQUOTA: number;
  @jsonNumber
  @observable
  ST_ALIQUOTA_REDUCAO: number;
  @jsonNumber
  @observable
  ST_MVA: number;
  @jsonConvertStringToBoolean
  @observable
  ST_MVA_AJUSTAR: boolean;
  @jsonNumber
  @observable
  ST_PAUTA: number;
  @jsonEnum(StOrigem)
  @observable
  ST_ORIGEM_BASE: StOrigem;
  @jsonEnum(MotivoDesoneracao)
  @observable
  MOTIVO_DESONERACAO: MotivoDesoneracao;
  @jsonNumber
  @observable
  INTERESTADUAL_FCP_ALIQUOTA: number;
  @jsonNumber
  @observable
  INTERESTADUAL_ALIQUOTA: number;
  @jsonNumber
  @observable
  INTERESTADUAL_ALIQUOTA_DESTINO: number;
  @jsonConvertStringToBoolean
  @observable
  ANTECIPACAO: boolean;
  @jsonConvertStringToBoolean
  @observable
  DESTACAR: boolean;
  @jsonString
  @observable
  SIMPLES_NACIONAL: string;
  @jsonNumber
  @observable
  VALOR: number;
  @jsonNumber
  @observable
  ST_BASE: number;
  @jsonNumber
  @observable
  ST_MVA_AJUSTADA: number;
  @jsonNumber
  @observable
  ST_VALOR: number;
  @jsonNumber
  @observable
  ST_RETIDO_BASE: number;
  @jsonNumber
  @observable
  ST_RETIDO_VALOR: number;
  @jsonNumber
  @observable
  ST_RETIDO_ALIQUOTA: number;
  @jsonNumber
  @observable
  ST_MODALIDADE: number;
  @jsonNumber
  @observable
  FCP_ST_RETIDO_BASE: number;
  @jsonNumber
  @observable
  FCP_ST_RETIDO_ALIQUOTA: number;
  @jsonNumber
  @observable
  FCP_ST_RETIDO_VALOR: number;
  @jsonNumber
  @observable
  VALOR_SUBSTITUTO: number;
  @jsonNumber
  @observable
  CREDITO_PERCENTUAL: number;
  @jsonNumber
  @observable
  CREDITO_VALOR: number;
  @jsonNumber
  @observable
  FCP_ALIQUOTA: number;
  @jsonNumber
  @observable
  FCP_VALOR: number;
  @jsonNumber
  @observable
  FCP_BASE: number;
  @jsonNumber
  @observable
  FCP_ALIQUOTA_ST: number;
  @jsonNumber
  @observable
  FCP_ST_VALOR: number;
  @jsonNumber
  @observable
  INTERESTADUAL_BASE: number;
  @jsonNumber
  @observable
  INTERESTADUAL_FCP_VALOR: number;
  @jsonNumber
  @observable
  INTERESTADUAL_ALIQUOTA_PARTILHA: number;
  @jsonNumber
  @observable
  INTERESTADUAL_VALOR_DESTINO: number;
  @jsonNumber
  @observable
  INTERESTADUAL_VALOR_ORIGEM: number;
  @jsonNumber
  @observable
  DIFERIMENTO_ALIQUOTA: number;
  @jsonNumber
  @observable
  DIFERIMENTO_VALOR: number;
  @jsonNumber
  @observable
  VALOR_ICMS_OPERACAO: number;
}
