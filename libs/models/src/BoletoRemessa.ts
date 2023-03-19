import {jsonClass, jsonDate, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import PessoaTipo from './enum/PessoaTipo';

@jsonModel
class PessoaCnab {
  @jsonNumber
  codigo: number;
  @jsonString
  nome: string;
  @jsonEnum(PessoaTipo)
  tipoPessoa: PessoaTipo;
  @jsonString
  documento: string;
}

@jsonModel
class BoletoRemessa {
  @jsonString
  agencia: string;
  @jsonString
  agenciaDigito: string;
  @jsonNumber
  banco: number;
  @jsonClass(() => PessoaCnab)
  beneficiario: PessoaCnab;
  @jsonString
  codigoBarras: string;
  @jsonNumber
  codigo: number;
  @jsonString
  conta: string;
  @jsonString
  contaDigito: string;
  @jsonDate
  dataEmissao: Date;
  @jsonDate
  dataVencimento: Date;
  @jsonDate
  dataPagamento: Date;
  @jsonString
  linhaDigitavel: string;
  @jsonString
  nossoNumero: string;
  @jsonClass(() => PessoaCnab)
  pagador: PessoaCnab;
  @jsonNumber
  percentualMora: number;
  @jsonNumber
  percentualMulta: number;
  @jsonNumber
  valor: number;
  @jsonNumber
  valorPago: number;
  @jsonNumber
  valorDesconto: number;
  @jsonString
  numeroDocumento: string;
}

export default BoletoRemessa;
