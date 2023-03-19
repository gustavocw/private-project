import {
  jsonClass,
  jsonConvertStringToBoolean,
  jsonInteger,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Estado from './Estado';

@jsonModel
export default class ProdutoTributarioIcms {
  @jsonNumber
  @observable
  UNIDADE: number;
  @jsonString
  @observable
  CST: string;
  @jsonClass(() => Estado)
  @observable
  ESTADO: Estado;
  @jsonNumber
  @observable
  ALIQUOTA_ORIGEM: number;
  @jsonNumber
  @observable
  ALIQUOTA_DESTINO: number;
  @jsonNumber
  @observable
  FCP_ALIQUOTA: number;
  @jsonNumber
  @observable
  FCP_ALIQUOTA_ST: number;
  @jsonNumber
  @observable
  MVA: number;
  @jsonConvertStringToBoolean
  @observable
  MVA_AJUSTAR: boolean;
  @jsonString
  @observable
  ST_MODALIDADE_BASE: string;
  @jsonInteger
  @observable
  ST_ORIGEM_BASE: number;
  @jsonInteger
  @observable
  MOTIVO_DESONERACAO: number;
  @jsonNumber
  @observable
  ALIQUOTA_REDUCAO: number;
  @jsonNumber
  @observable
  ALIQUOTA_REDUCAO_ST: number;
  @jsonNumber
  @observable
  ST_VALOR_PAUTA: number;
  @jsonConvertStringToBoolean
  @observable
  ANTECIPACAO: boolean;
  @jsonNumber
  @observable
  INTERESTADUAL_ALIQUOTA_FCP: number;
  @jsonNumber
  @observable
  INTERESTADUAL_ALIQUOTA_DESTINO: number;
  @jsonConvertStringToBoolean
  @observable
  CONSUMIDOR_FINAL_DIFERENCIAR: boolean;
  @jsonNumber
  @observable
  CONSUMIDOR_FINAL_ALIQUOTA_REDUCAO: number;
  @jsonNumber
  @observable
  CONSUMIDOR_FINAL_ALIQUOTA_ORIGEM: number;
  @jsonNumber
  @observable
  DIFERIMENTO_ALIQUOTA: number;
  @jsonConvertStringToBoolean
  @observable
  GERAR_CREDITO: boolean;
}
