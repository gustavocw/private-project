import {jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';

@jsonModel
export default class HistoricoEstoque {
  @jsonString
  produto: string;
  @jsonString
  detalhe: string;
  @jsonString
  data: string;
  @jsonString
  responsavel: string;
  @jsonString
  localizacao: string;
  @jsonString
  localizacaoReferencia: string;
  @jsonNumber
  atendimento: number;
  @jsonString
  notaFiscal: string;
  @jsonString
  tipoOperacao: string;
  @jsonNumber
  movimentacao: number;
  @jsonString
  movimentacaoFormatada: string;
  @jsonNumber
  saldo: number;
  @jsonString
  saldoFormatado: string;
  @jsonNumber
  saldoAnterior: number;
  @jsonString
  saldoAnteriorFormatado: string;
  @jsonString
  tipoMovimentacao: string;
}
