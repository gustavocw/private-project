import {
  jsonClass,
  jsonConvertStringToBoolean,
  jsonConvertStringToNumber,
  jsonDate,
  jsonEnum,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import Banco from './Banco';
import {computed, observable} from 'mobx';
import BoletoStatus from './BoletoStatus';
import FinanceiroReceita from './FinanceiroReceita';
import BoletoStatusRemessa from './BoletoStatusRemessa';
import moment from 'moment';

@jsonModel
export class PrimeiraInstrucao {
  @jsonString
  @observable
  DESCRICAO: string;
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonNumber
  @observable
  DIAS: number;
}

@jsonModel
export default class Boleto implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => FinanceiroReceita)
  @observable
  RECEITA: FinanceiroReceita;
  @jsonEnum(BoletoStatus)
  @observable
  STATUS: BoletoStatus;
  @jsonEnum(BoletoStatusRemessa)
  @observable
  STATUS_REMESSA: BoletoStatusRemessa;
  @jsonString
  @observable
  AGENCIA: string;
  @jsonString
  @observable
  AGENCIA_DIGITO: string;
  @jsonString
  @observable
  CONTA: string;
  @jsonString
  @observable
  CONTA_DIGITO: string;
  @jsonString
  @observable
  CEDENTE: string;
  @jsonDate
  @observable
  VENCIMENTO: Date;
  @jsonNumber
  @observable
  VALOR: number;
  @jsonString
  @observable
  NOSSO_NUMERO: string;
  @jsonString
  @observable
  NUMERO_DOCUMENTO: string;
  @jsonString
  @observable
  CODIGO_BANCO: string;
  @jsonString
  @observable
  LINHA_DIGITAVEL: string;
  @jsonString
  @observable
  CODIGO_BARRAS: string;
  @jsonNumber
  @observable
  REMESSA: number;
  @jsonString
  @observable
  REMESSA_ERRO: string;
  @jsonNumber
  @observable
  VALOR_PAGO: number;
  @jsonNumber
  @observable
  VALOR_ENCARGOS: number;
  @jsonDate
  @observable
  DATA_PAGAMENTO: Date;
  @jsonDate
  @observable
  PROCESSAMENTO: Date;
  @jsonNumber
  @observable
  BENEFICIARIO: number;
  @jsonConvertStringToNumber
  @observable
  PERCENTUAL_MULTA: number;
  @jsonConvertStringToNumber
  @observable
  PERCENTUAL_MORA: number;
  @jsonString
  @observable
  INSTRUCOES_CAIXA: string;
  @jsonString
  @observable
  INFORMACOES_CLIENTE: string;
  @jsonClass(() => PrimeiraInstrucao)
  @observable
  PRIMEIRA_INSTRUCAO: PrimeiraInstrucao;
  @jsonClass(() => Banco)
  @observable
  BANCO: Banco;
  @jsonConvertStringToBoolean
  @observable
  EXCLUIDO?: boolean;

  @computed
  get valorMultaMora(): number {
    const diasDesdeVencimento = moment(new Date()).diff(moment(this.VENCIMENTO), 'days');
    const diasNormalizados = Math.max(diasDesdeVencimento, 0);

    if (diasDesdeVencimento <= 0 || this.RECEITA?.VALOR_PAGO > 0) {
      return 0;
    }

    const valorMora = (diasNormalizados / 30) * (this.PERCENTUAL_MORA / 100) * this.VALOR;
    const valorMulta = (this.PERCENTUAL_MULTA / 100) * this.VALOR;

    return valorMora + valorMulta;
  }
}

