import {jsonClass, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import Estado from './Estado';

@jsonModel
export default class PessoaUnidadeTributacaoICMS {
    @jsonNumber
    CODIGO: number;
    @jsonNumber
    UNIDADE: number;
    @jsonNumber
    TIPO: number;
    @jsonClass(() => Estado)
    ESTADO: Estado;
    @jsonString
    CST: string;
    @jsonNumber
    ALIQUOTA_ORIGEM: number;
    @jsonNumber
    ALIQUOTA_DESTINO: number;
    @jsonNumber
    FCP_ALIQUOTA: number;
    @jsonNumber
    FCP_ALIQUOTA_ST: number;
    @jsonNumber
    MVA: number;
    @jsonString
    MVA_AJUSTAR: string;
    @jsonNumber
    ALIQUOTA_REDUCAO: number;
    @jsonNumber
    ALIQUOTA_REDUCAO_ST: number;
    @jsonNumber
    INTERESTADUAL_ALIQUOTA_FCP: number;
    @jsonNumber
    INTERESTADUAL_ALIQUOTA_DESTINO: number;
    @jsonString
    ST_ORIGEM_BASE: string;
    @jsonString
    MOTIVO_DESONERACAO: string;
    @jsonString
    ST_MODALIDADE_BASE: string;
    @jsonNumber
    ST_VALOR_PAUTA: number;
    @jsonString
    ANTECIPACAO: string;
    @jsonString
    CONSUMIDOR_FINAL_DIFERENCIAR: string;
    @jsonNumber
    CONSUMIDOR_FINAL_ALIQUOTA_REDUCAO: number;
    @jsonNumber
    CONSUMIDOR_FINAL_ALIQUOTA_ORIGEM: number;
    @jsonNumber
    DIFERIMENTO_ALIQUOTA: number;
    @jsonString
    GERAR_CREDITO: string;
    @jsonString
    EXCLUIDO: string;
}
