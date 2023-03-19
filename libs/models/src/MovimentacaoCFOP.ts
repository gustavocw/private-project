import {jsonConvertStringToBoolean, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {observable} from 'mobx';

@jsonModel
export default class MovimentacaoCFOP {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  OPERACAO_FISCAL: number;
  @jsonString
  @observable
  DESCRICAO: string;
  @jsonConvertStringToBoolean
  @observable
  FABRICACAO_PROPRIA: boolean;
  @jsonConvertStringToBoolean
  @observable
  FORA_ESTABELECIMENTO: boolean;
  @jsonConvertStringToBoolean
  @observable
  ICMS_SIMPLES_NACIONAL_NAO_TRIBUTADO: boolean;
  @jsonConvertStringToBoolean
  @observable
  ICMS_ST: boolean;
  @jsonConvertStringToBoolean
  @observable
  ICMS_ST_RETIDO_ANTERIORMENTE: boolean;
  @jsonString
  @observable
  PIS_CST: string;
  @jsonString
  @observable
  COFINS_CST: string;
  @jsonConvertStringToBoolean
  @observable
  IPI: boolean;
  @jsonConvertStringToBoolean
  @observable
  ICMS: boolean;
  @jsonNumber
  @observable
  TIPO_OPERACAO: number;
  @jsonString
  @observable
  TIPO_MOVIMENTACAO: string;
  @jsonString
  @observable
  FINALIDADE_EMISSAO: string;
  @jsonConvertStringToBoolean
  @observable
  UTILIZAR_PRECO_CUSTO: boolean;
  @jsonString
  @observable
  ATUALIZAR_FINANCEIRO: string;
  @jsonString
  @observable
  SOMAR_TOTAL_NOTA: string;
  @jsonString
  @observable
  ICMS_SIMPLES_ESTADUAL_PESSOA_FISICA: string;
  @jsonString
  @observable
  OBSERVACAO_PADRAO: string;
  @jsonConvertStringToBoolean
  @observable
  UTILIZAR_TRANSPORTE: boolean;
  @jsonConvertStringToBoolean
  @observable
  EXCLUIDO?: boolean;
}
