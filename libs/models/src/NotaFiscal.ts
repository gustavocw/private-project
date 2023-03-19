import {
  jsonArray,
  jsonClass,
  jsonClassOrInteger,
  jsonDate,
  jsonDateFormat,
  jsonEnum,
  jsonIgnore,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import {observable} from 'mobx';
import Produto from './Produto';
import Pessoa from './Pessoa';
import GeralCFOP from './GeralCFOP';
import NotaFiscalItem from './NotaFiscalItem';
import NotaFiscalReferenciada from './NotaFiscalReferenciada';
import NotaFiscalTexto from './NotaFiscalTexto';
import TransporteFreteModalidade from './TransporteFreteModalidade';
import NotaFiscalTransporteVolume from './NotaFiscalTransporteVolume';
import NotaFiscalPagamento from './NotaFiscalPagamento';
import SituacaoNotaFiscal from './SituacaoNotaFiscal';
import Estado from './Estado';
import NotaFiscalNfe from './NotaFiscalNfe';
import AtendimentoNotaFiscal from './AtendimentoNotaFiscal';
import Utils from '@alkord/shared/utils/Utils';

@jsonModel
export default class NotaFiscal {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonString
  @observable
  SERIE: string;
  @jsonNumber
  @observable
  NUMERO: number;
  @jsonDate
  @observable
  DATA_EMISSAO: Date;
  @jsonEnum(SituacaoNotaFiscal)
  @observable
  SITUACAO: SituacaoNotaFiscal;
  @jsonClass(() => NotaFiscalNfe)
  @observable
  NFE: NotaFiscalNfe;
  @jsonString
  @observable
  CANCELAMENTO_JUSTIFICATIVA: string;
  @jsonString
  @observable
  DESTINATARIO_NOME: string;
  @jsonClass(() => Pessoa)
  @observable
  DESTINATARIO: Pessoa;
  @jsonNumber
  @observable
  DESTINATARIO_CODIGO: number;
  @jsonString
  @observable
  DESTINATARIO_DOCUMENTO: string;
  @jsonString
  @observable
  DESTINATARIO_EMAIL: string;
  @jsonNumber
  @observable
  TIPO_OPERACAO: number;
  @jsonString
  @observable
  TIPO_MOVIMENTACAO: string;
  @jsonString
  @observable
  TIPO: string;
  @jsonString
  @observable
  FINALIDADE_EMISSAO: string;
  @jsonClassOrInteger(GeralCFOP, 'CODIGO')
  @observable
  CFOP: GeralCFOP;
  @jsonString
  @observable
  NATUREZA_OPERACAO: string;
  @jsonString
  @observable
  COD_PEDIDO?: string;
  @jsonClass(() => Produto)
  @observable
  PRODUTO: Produto;
  @jsonNumber
  @observable
  PRECO_PRODUTO: number;
  @jsonNumber
  @observable
  QUANTIDADE: number;
  @jsonNumber
  @observable
  SEGURO: number;
  @jsonEnum(TransporteFreteModalidade)
  @observable
  TRANSPORTE_FRETE_MODALIDADE: TransporteFreteModalidade;
  @jsonNumber
  @observable
  TRANSPORTE_FRETE_VALOR: number;
  @jsonDateFormat('datetime')
  @observable
  TRANSPORTE_DATA_SAIDA: Date;
  @jsonString
  @observable
  TRANSPORTE_VEICULO_PLACA: string;
  @jsonString
  @observable
  TRANSPORTE_VEICULO_ESTADO_SIGLA: string;
  @jsonClassOrInteger(Pessoa, 'CODIGO')
  @observable
  TRANSPORTE_TRANSPORTADORA: Pessoa;
  @jsonClassOrInteger(Pessoa, 'CODIGO')
  @observable
  TRANSPORTE_MOTORISTA: Pessoa;
  @jsonArray(() => NotaFiscalReferenciada)
  @observable
  REFERENCIADAS: NotaFiscalReferenciada[];
  @jsonArray(() => NotaFiscalItem)
  @observable
  ITENS: NotaFiscalItem[];
  @jsonArray(() => NotaFiscalTransporteVolume)
  @observable
  TRANSPORTE_VOLUMES: NotaFiscalTransporteVolume[];
  @jsonArray(() => NotaFiscalPagamento)
  @observable
  PAGAMENTOS: NotaFiscalPagamento[];
  @jsonClass(() => NotaFiscalTexto)
  @observable
  TEXTOS: NotaFiscalTexto;
  @jsonNumber
  @observable
  IMPOSTO_IPI_VALOR: number;
  @jsonNumber
  @observable
  TOTAL_PRODUTOS: number;
  @jsonNumber
  @observable
  TOTAL_ACRESCIMO: number;
  @jsonNumber
  @observable
  TOTAL: number;
  @jsonNumber
  @observable
  TOTAL_PAGO: number;
  @jsonNumber
  @observable
  TROCO: number;
  @jsonNumber
  @observable
  IMPOSTO_ICMS_ST_BASE: number;
  @jsonNumber
  @observable
  IMPOSTO_ICMS_ST_VALOR: number;
  @jsonNumber
  @observable
  IMPOSTO_ICMS_BASE: number;
  @jsonNumber
  @observable
  IMPOSTO_ICMS_VALOR: number;
  @jsonNumber
  @observable
  IMPOSTO_FCP_BASE: number;
  @jsonNumber
  @observable
  IMPOSTO_FCP_VALOR: number;
  @jsonNumber
  @observable
  IMPOSTO_FCP_ST_VALOR: number;
  @jsonNumber
  @observable
  IMPOSTO_FCP_ST_RETIDO_VALOR: number;
  @jsonNumber
  @observable
  IMPOSTO_ICMS_INTERESTADUAL_VALOR_FCP: number;
  @jsonNumber
  @observable
  IMPOSTO_ICMS_INTERESTADUAL_VALOR_DESTINO: number;
  @jsonNumber
  @observable
  IMPOSTO_ICMS_INTERESTADUAL_VALOR_ORIGEM: number;
  @jsonNumber
  @observable
  IMPOSTO_TOTAL_TRIBUTOS_VALOR: number;
  @jsonNumber
  @observable
  IMPOSTO_TOTAL_TRIBUTOS_FEDERAIS: number;
  @jsonNumber
  @observable
  IMPOSTO_TOTAL_TRIBUTOS_ESTADUAIS: number;
  @jsonNumber
  @observable
  IMPOSTO_TOTAL_TRIBUTOS_MUNICIPAIS: number;
  @jsonNumber
  @observable
  UNIDADE: number;
  @jsonNumber
  @observable
  RESPONSAVEL: number;
  @jsonNumber
  @observable
  QUANTIDADE_ITENS: number;
  @observable
  INTERESTADUAL: boolean;
  @observable
  @jsonIgnore
  TRANSPORTE_VEICULO_ESTADO: Estado;
  @jsonIgnore
  ULTIMO_HASH_CALCULADO: number;
  @jsonArray(() => AtendimentoNotaFiscal)
  @observable
  ATENDIMENTOS_NOTAS_FISCAIS_EMITIDAS: AtendimentoNotaFiscal[];

  get hashCalculo(): number {
    return Utils.hashCode(JSON.stringify({
      CODIGO: this.CODIGO,
      SERIE: this.SERIE,
      NUMERO: this.NUMERO,
      DATA_EMISSAO: this.DATA_EMISSAO,
      SITUACAO: this.SITUACAO?.toString(),
      DESTINATARIO_NOME: this.DESTINATARIO_NOME,
      DESTINATARIO: this.DESTINATARIO?.CODIGO,
      DESTINATARIO_CODIGO: this.DESTINATARIO_CODIGO,
      DESTINATARIO_DOCUMENTO: this.DESTINATARIO_DOCUMENTO,
      TIPO_OPERACAO: this.TIPO_OPERACAO,
      TIPO_MOVIMENTACAO: this.TIPO_MOVIMENTACAO,
      TIPO: this.TIPO,
      FINALIDADE_EMISSAO: this.FINALIDADE_EMISSAO,
      CFOP: this.CFOP?.CODIGO,
      NATUREZA_OPERACAO: this.NATUREZA_OPERACAO,
      SEGURO: this.SEGURO,
      TRANSPORTE_FRETE_MODALIDADE: this.TRANSPORTE_FRETE_MODALIDADE?.toString(),
      TRANSPORTE_FRETE_VALOR: this.TRANSPORTE_FRETE_VALOR,
      TRANSPORTE_DATA_SAIDA: this.TRANSPORTE_DATA_SAIDA,
      TRANSPORTE_VEICULO_PLACA: this.TRANSPORTE_VEICULO_PLACA,
      TRANSPORTE_VEICULO_ESTADO_SIGLA: this.TRANSPORTE_VEICULO_ESTADO_SIGLA,
      TRANSPORTE_TRANSPORTADORA: this.TRANSPORTE_TRANSPORTADORA?.CODIGO,
      TRANSPORTE_MOTORISTA: this.TRANSPORTE_MOTORISTA?.CODIGO,
      UNIDADE: this.UNIDADE,
      RESPONSAVEL: this.RESPONSAVEL,
      INTERESTADUAL: this.INTERESTADUAL,
      TRANSPORTE_VEICULO_ESTADO: this.TRANSPORTE_VEICULO_ESTADO?.CODIGO,
      REFERENCIADAS: this.REFERENCIADAS?.map((referenciada) => referenciada.REFERENCIA),
      PAGAMENTOS: this.PAGAMENTOS?.map(((pagamento) => pagamento.MEIO_PAGAMENTO)),
    }));
  }
}
