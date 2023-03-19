import {
  jsonArray,
  jsonClass,
  jsonConvertStringToBoolean,
  jsonDate,
  jsonEnum,
  jsonIgnore,
  jsonModel,
  jsonNumber,
  jsonString,
} from '@alkord/json/decorators';
import HasCodigo from './HasCodigo';
import {action, computed, observable} from 'mobx';
import Veiculo from './Veiculo';
import Pessoa from './Pessoa';
import AtendimentoTipo from './AtendimentoTipo';
import AtendimentoSituacao from './enum/AtendimentoSituacao';
import AtendimentoHistorico from './AtendimentoHistorico';
import AtendimentoTipoOperacao from './enum/AtendimentoTipoOperacao';
import RegraPreco from './RegraPreco';
import AtendimentoItem from './AtendimentoItem';
import TransporteFreteModalidade from './TransporteFreteModalidade';
import FormaEntrega from './FormaEntrega';
import AtendimentoTexto from './AtendimentoTexto';
import AtendimentoEncomenda from './AtendimentoEncomenda';
import AtendimentoAgendamento from './AtendimentoAgendamento';
import AtendimentoPagamento from './AtendimentoPagamento';
import AtendimentoTransporteVolume from './AtendimentoTransporteVolume';
import Estado from './Estado';
import GeralCanalVenda from './enum/GeralCanalVenda';
import DocumentoFiscalTipo from './enum/DocumentoFiscalTipo';
import AtendimentoContato from './AtendimentoContato';
import AtendimentoContatoEmail from './AtendimentoContatoEmail';
import AtendimentoContatoTelefone from './AtendimentoContatoTelefone';
import Localizacao from './Localizacao';
import PessoaEndereco from './PessoaEndereco';
import AtendimentoNotaFiscal from './AtendimentoNotaFiscal';
import SituacaoNotaFiscal from './SituacaoNotaFiscal';
import TabelaPreco from './TabelaPreco';
import GeralAtendimentoTipo from './enum/GeralAtendimentoTipo';
import Vendedor from './Vendedor';
import AtendimentoTipoHistorico from './enum/AtendimentoTipoHistorico';
import PessoaUnidade from './PessoaUnidade';
import moment from 'moment';
import FinanceiroReceita from './FinanceiroReceita';
import Permissao from './modules/Permissao.enum';
import TipoPermissao from './modules/TipoPermissao.enum';
import ReceitaSituacao from './enum/ReceitaSituacao';
import GlobalHandlers from './handlers/GlobalHandlers';

@jsonModel
export default class Atendimento implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => PessoaUnidade) // FIXME #verificar#
  @observable
  UNIDADE: PessoaUnidade;
  @jsonDate
  @observable
  DATA: Date;
  @jsonDate
  @observable
  DATA_ALTERACAO: Date;
  @jsonClass(() => Pessoa)
  @observable
  CLIENTE?: Pessoa;
  @jsonClass(() => AtendimentoTipo)
  @observable
  TIPO_ATENDIMENTO: AtendimentoTipo;
  @jsonArray(() => AtendimentoNotaFiscal)
  @observable
  NOTAS_FISCAIS: AtendimentoNotaFiscal[];
  @jsonEnum(AtendimentoTipoOperacao)
  @observable
  TIPO_OPERACAO: AtendimentoTipoOperacao;
  @jsonConvertStringToBoolean
  @observable
  CONSUMIDOR_FINAL: boolean;
  @jsonString
  @observable
  LISTA_PRECO: string;
  @jsonClass(() => Vendedor)
  @observable
  VENDEDOR?: Vendedor;
  @jsonClass(() => Pessoa)
  @observable
  INTERMEDIARIO?: Pessoa;
  @jsonClass(() => Pessoa)
  @observable
  REPRESENTADA?: Pessoa;
  @jsonClass(() => Veiculo)
  @observable
  VEICULO: Veiculo;
  @jsonString
  @observable
  OBSERVACAO: string;
  @jsonString
  @observable
  REFERENCIA: string;
  @jsonString
  @observable
  MOTIVO_CANCELAMENTO: string;
  @jsonNumber
  @observable
  VALIDADE_PROPOSTA: number;
  @jsonConvertStringToBoolean
  @observable
  ASSINATURA: boolean;
  @jsonEnum(DocumentoFiscalTipo)
  @observable
  TIPO_DOCUMENTO_FISCAL: DocumentoFiscalTipo;
  @jsonNumber
  @observable
  ATENDIMENTO_ACERTO_CONSIGNACAO: number;
  @jsonClass(() => Localizacao)
  @observable
  LOCALIZACAO: Localizacao;
  @jsonClass(() => PessoaEndereco)
  @observable
  ENDERECO: PessoaEndereco;
  @jsonNumber
  @observable
  ACRESCIMO_PERCENTUAL: number;
  @jsonNumber
  @observable
  ACRESCIMO_VALOR: number;
  @jsonNumber
  @observable
  TOTAL_PRODUTOS: number;
  @jsonNumber
  @observable
  TOTAL_BONIFICACAO: number;
  @jsonNumber
  @observable
  TOTAL_COMODATO: number;
  @jsonNumber
  @observable
  TOTAL_CONSIGNACAO: number;
  @jsonNumber
  @observable
  TOTAL_IPI: number;
  @jsonNumber
  @observable
  TOTAL_ICMS_ST: number;
  @jsonNumber
  @observable
  TOTAL_FCP_ST: number;
  @jsonNumber
  @observable
  TOTAL_DESCONTO_PERCENTUAL: number;
  @jsonNumber
  @observable
  TOTAL_DESCONTO_VALOR: number;
  @jsonNumber
  @observable
  TOTAL_ACRESCIMO_PERCENTUAL: number;
  @jsonNumber
  @observable
  TOTAL_ACRESCIMO_VALOR: number;
  @jsonNumber
  @observable
  TROCO: number;
  @jsonNumber
  @observable
  TOTAL_PAGO: number;
  @jsonNumber
  @observable
  TOTAL: number;
  @jsonEnum(AtendimentoSituacao)
  @observable
  SITUACAO: AtendimentoSituacao;
  @jsonEnum(GeralCanalVenda)
  @observable
  CANAL_VENDA: GeralCanalVenda;
  @jsonClass(() => RegraPreco)
  @observable
  REGRA_PRECO_GERAL: RegraPreco;
  @jsonArray(() => AtendimentoHistorico)
  @observable
  HISTORICOS: AtendimentoHistorico[];
  @jsonArray(() => AtendimentoItem)
  @observable
  ITENS: AtendimentoItem[];
  @jsonArray(() => AtendimentoPagamento)
  @observable
  PAGAMENTOS: AtendimentoPagamento[];
  @jsonEnum(TransporteFreteModalidade)
  @observable
  FRETE_MODALIDADE: TransporteFreteModalidade;
  @jsonClass(() => Pessoa)
  @observable
  TRANSPORTADORA: Pessoa;
  @jsonNumber
  @observable
  FRETE_VALOR: number;
  @jsonNumber
  @observable
  PESO_TOTAL: number;
  @jsonDate
  @observable
  FRETE_DATA_SAIDA: Date;
  @jsonDate
  @observable
  DATA_ENTREGA: Date;
  @jsonClass(() => FormaEntrega)
  @observable
  FORMA_ENTREGA: FormaEntrega;
  @jsonString
  @observable
  TRANSPORTE_VEICULO_PLACA: string;
  @jsonClass(() => Estado)
  @observable
  TRANSPORTE_VEICULO_ESTADO: Estado;
  @jsonClass(() => AtendimentoTexto)
  @observable
  TEXTOS: AtendimentoTexto;
  @jsonClass(() => AtendimentoEncomenda)
  @observable
  ENCOMENDAS: AtendimentoEncomenda;
  @jsonClass(() => TabelaPreco)
  @observable
  TABELA_PRECO: TabelaPreco;
  @jsonArray(() => AtendimentoAgendamento)
  @observable
  AGENDAMENTOS: AtendimentoAgendamento[];
  @jsonArray(() => AtendimentoTransporteVolume)
  @observable
  TRANSPORTE_VOLUMES: AtendimentoTransporteVolume[];
  @jsonArray(() => AtendimentoContato)
  @observable
  CONTATOS: AtendimentoContato[];
  @jsonArray(() => AtendimentoContatoEmail)
  @observable
  EMAILS: AtendimentoContatoEmail[];
  @jsonArray(() => AtendimentoContatoTelefone)
  @observable
  TELEFONES: AtendimentoContatoTelefone[];
  @jsonIgnore
  @observable
  MENSAGEM_ERRO: string;
  @jsonIgnore
  @observable
  RATEAR_DESCONTO_ITENS: boolean;
  @jsonNumber
  @observable
  COMISSAO_ITENS: number;
  @jsonEnum(AtendimentoTipoHistorico)
  @observable
  TIPO_ULTIMO_HISTORICO: AtendimentoTipoHistorico;
  @jsonArray(() => FinanceiroReceita)
  @observable
  RECEITAS: FinanceiroReceita[];

  @computed
  get ultimoHistorico(): AtendimentoHistorico {
    if (this.HISTORICOS?.length) {
      const historicos = [...this.HISTORICOS].sort((a, b) => b.DATA?.getTime() - a.DATA?.getTime());

      return historicos[0];
    }

    return null;
  }

  @computed
  get podeCancelarAtendimento(): boolean {
    const situacaoCancelavel = [
      AtendimentoSituacao.ABERTO,
      AtendimentoSituacao.FECHADO,
      AtendimentoSituacao.FINALIZADO,
    ].includes(this.SITUACAO);

    if (
      situacaoCancelavel &&
      this.ATENDIMENTO_ACERTO_CONSIGNACAO == null &&
      this.TIPO_ATENDIMENTO?.TIPO !== GeralAtendimentoTipo.VISITA
    ) {
      if (this.TIPO_ATENDIMENTO?.TIPO === GeralAtendimentoTipo.RECEBIMENTO_VALORES &&
        !this.getPossuiReceitaPaga() && this.SITUACAO === AtendimentoSituacao.FINALIZADO) return true;

      return !this.possuiNotaAtiva;
    }
    else {
      return false;
    }
  }

  @computed
  get totalProdutos(): number {
    switch (this.TIPO_OPERACAO) {
      case AtendimentoTipoOperacao.OPERACAO_BONIFICACAO:
        return this.TOTAL_BONIFICACAO ?? 0;
      case AtendimentoTipoOperacao.ACERTO_CONSIGNACAO:
      case AtendimentoTipoOperacao.OPERACAO_CONSIGNACAO:
        return this.TOTAL_CONSIGNACAO ?? 0;
      case AtendimentoTipoOperacao.OPERACAO_COMODATO:
      case AtendimentoTipoOperacao.OPERACAO_DEVOLUCAO_COMODATO:
        return this.TOTAL_COMODATO ?? 0;
    }

    return this.TOTAL_PRODUTOS ?? 0;
  }

  @computed
  get totalItens(): number {
    return this.totalProdutos + (this.TOTAL_IPI ?? 0) + (this.TOTAL_ICMS_ST ?? 0) + (this.TOTAL_FCP_ST ?? 0);
  }

  @computed
  get totalAtendimentoOperacao(): number {
    switch (this.TIPO_OPERACAO) {
      case AtendimentoTipoOperacao.OPERACAO_BONIFICACAO:
        return this.TOTAL_BONIFICACAO;
      case AtendimentoTipoOperacao.OPERACAO_CONSIGNACAO:
        return this.TOTAL_CONSIGNACAO;
      case AtendimentoTipoOperacao.OPERACAO_COMODATO:
        return this.TOTAL_COMODATO;

      default:
        return this.TOTAL;
    }
  }

  @computed
  get isOperacaoDevolucao(): boolean {
    return AtendimentoTipoOperacao.isDevolucao(this.TIPO_OPERACAO);
  }

  @computed
  get possuiDesconto(): boolean {
    return !!this.TOTAL_DESCONTO_VALOR || !!this.TOTAL_DESCONTO_PERCENTUAL;
  }

  @computed
  get possuiAcrescimo(): boolean {
    return !!this.TOTAL_ACRESCIMO_VALOR || !!this.TOTAL_ACRESCIMO_PERCENTUAL;
  }

  @computed
  get possuiNotaEmitidaAMaisDeUmDia(): boolean {
    return !!this.NOTAS_FISCAIS?.find((nota) => {
      return nota.NOTA_FISCAL?.SITUACAO === SituacaoNotaFiscal.EMITIDA &&
        moment(new Date()).diff(nota?.NOTA_FISCAL?.DATA_EMISSAO, 'hours') >= 24;
    });
  }

  @computed
  get possuiNotaEmitida(): boolean {
    return !!this.NOTAS_FISCAIS?.find((nota) => {
      return SituacaoNotaFiscal.EMITIDA === nota.NOTA_FISCAL?.SITUACAO;
    });
  }

  @computed
  get possuiNotaAtiva(): boolean {
    const situacoes = [
      SituacaoNotaFiscal.EMITIDA,
      SituacaoNotaFiscal.DIGITADA,
      SituacaoNotaFiscal.PENDENTE,
    ];

    return !!this.NOTAS_FISCAIS?.find((nota) => situacoes.includes(nota.NOTA_FISCAL?.SITUACAO));
  }

  @computed
  get reservaEstoque(): boolean {
    return this.TIPO_ATENDIMENTO?.TIPO === GeralAtendimentoTipo.PRONTA_ENTREGA;
  }

  @computed
  get podeEditar(): boolean {
    const possuiPermissao = (this.CODIGO == null) ?
      GlobalHandlers.gerenciadorPermissoes.possuiPermissao(Permissao.ATENDIMENTOS, TipoPermissao.CADASTRAR) :
      GlobalHandlers.gerenciadorPermissoes.possuiPermissao(Permissao.ATENDIMENTOS, TipoPermissao.EDITAR);

    return !this.possuiNotaEmitida && possuiPermissao && !this.LOCALIZACAO &&
      (this.TIPO_ATENDIMENTO?.TIPO !== GeralAtendimentoTipo.RECEBIMENTO_VALORES);
  }

  @computed
  get saldoContaCorrente(): number {
    let saldo = this.VENDEDOR?.VENDEDOR?.SALDO_CONTA_CORRENTE;

    if (saldo == null) return 0;

    if (this.ITENS?.length) {
      saldo -= this.ITENS?.reduce((total, item) => total + (item.CONTA_CORRENTE ?? 0), 0) ?? 0;
    }

    return saldo;
  }

  @action.bound
  getPossuiReceitaPaga() {
    return this.PAGAMENTOS.some(
        (pagamento) => pagamento.RECEITAS.some(
            (receita) => receita.SITUACAO !== ReceitaSituacao.ABERTA),
    );
  }

  @action.bound
  getDescontoMaximoItem(item: AtendimentoItem): number {
    const descontoMaximoCliente = this.CLIENTE?.COMERCIAL_VENDA?.DESCONTO_MAXIMO ?? 99.99;
    const descontoMaximoVendedor = GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.USUARIO?.DESCONTO_MAXIMO ?? 0;

    let descontoMaximo = Math.min(descontoMaximoVendedor, descontoMaximoCliente);

    if ((item.DESCONTO_MAXIMO != null) && (item.DESCONTO_MAXIMO < descontoMaximo)) {
      descontoMaximo = item.DESCONTO_MAXIMO;
    }

    return descontoMaximo;
  }

  @action.bound
  getPrecoCalculadoItem(item: AtendimentoItem): number {
    if (item.VALOR_UNITARIO_CALCULADO != null) {
      return item.VALOR_UNITARIO_CALCULADO;
    }

    if (item.PRODUTO.PRECOS_GRADE) {
      return item.PRODUTO.getPreco(item.GRADE).PRECO_VENDA;
    }

    const produtoTabelaPreco = this?.TABELA_PRECO?.PRODUTOS
        ?.find((produtoTabela) => produtoTabela.PRODUTO?.CODIGO === item.PRODUTO.CODIGO);

    return produtoTabelaPreco ? produtoTabelaPreco.PRECO : item.PRODUTO.getPreco(item.GRADE).PRECO_VENDA;
  }
}
