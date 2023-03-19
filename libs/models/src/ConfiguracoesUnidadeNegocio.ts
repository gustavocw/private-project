import {
  jsonArray,
  jsonClass,
  jsonConvertStringToBoolean,
  jsonDateFormat,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import Timezone from './Timezone';
import TributacaoIest from './TributacaoIest';
import PessoaUnidadeNf from './PessoaUnidadeNf';
import PessoaUnidadeTributacaoICMS from './PessoaUnidadeTributacaoICMS';
import TributacaoModalidade from './TributacaoModalidade';
import {observable} from 'mobx';

@jsonModel
export default class ConfiguracoesUnidadeNegocio {
  @jsonString
  @observable
  TIPO: string;
  @jsonClass(() => Timezone)
  @observable
  TIMEZONE: Timezone;
  @jsonConvertStringToBoolean
  @observable
  PRODUTO_VALOR_UNITARIO_3_DECIMAIS: boolean;
  @jsonString
  @observable
  PRODUTO_QUANTIDADE_3_DECIMAIS: string;
  @jsonString
  @observable
  BROKER: string;
  @jsonString
  @observable
  TRIBUTACAO_EXIBIR_TOTAL_TRIBUTOS: string;
  @jsonClass(() => TributacaoModalidade)
  @observable
  TRIBUTACAO_MODALIDADE: TributacaoModalidade;
  @jsonNumber
  @observable
  TRIBUTACAO_SIMPLES_ICMS_ALIQUOTA: number;
  @jsonDateFormat('date')
  @observable
  TRIBUTACAO_SIMPLES_ICMS_DATA: Date;
  @jsonNumber
  @observable
  TRIBUTACAO_NORMAL_PIS_ALIQUOTA: number;
  @jsonNumber
  @observable
  TRIBUTACAO_NORMAL_COFINS_ALIQUOTA: number;
  @jsonClass(() => PessoaUnidadeNf)
  @observable
  PESSOAS_UNIDADE_NF: PessoaUnidadeNf;
  @jsonArray(() => TributacaoIest)
  @observable
  TRIBUTACAO_IEST: TributacaoIest[];
  @jsonArray(() => PessoaUnidadeTributacaoICMS)
  @observable
  PESSOAS_UNIDADE_TRIBUTACAO_ICMS: PessoaUnidadeTributacaoICMS[];
  @jsonString
  @observable
  CALCULO_PRECO_VENDA: string;
  @jsonNumber
  @observable
  MARGEM_VENDA: number;
}
