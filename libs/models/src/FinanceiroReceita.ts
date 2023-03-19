import {jsonArray, jsonClass, jsonDate, jsonEnum, jsonModel, jsonNumber, jsonString} from '@alkord/json/decorators';
import {computed, observable} from 'mobx';
import Pessoa from './Pessoa';
import MeioPagamento from './MeioPagamento';
import Atendimento from './Atendimento';
import CondicaoParcela from './CondicaoParcela';
import Boleto from './Boleto';
import FinanceiroReceitaObservacao from './FinanceiroReceitaObservacao';
import moment from 'moment';
import HasCodigo from './HasCodigo';
import FinanceiroReceitaReferencia from './FinanceiroReceitaReferencia';
import AtendimentoPagamento from './AtendimentoPagamento';
import LicencaFuncao from './enum/LicencaFuncao.enum';
import LoteRpsItens from './LoteRpsItens';
import MeioPagamentoTipo from './enum/MeioPagamentoTipo';
import ReceitaSituacao from './enum/ReceitaSituacao';
import {ReceitaModoEdicao} from './enum/ReceitaModoEdicao';
import ReceitaSituacaoExibicao from './enum/ReceitaSituacaoExibicao';
import ReceitaAcao from './enum/ReceitaAcao';
import Utils from '@alkord/shared/utils/Utils';
import FormatUtils from '@alkord/shared/utils/FormatUtils';
import GlobalHandlers from './handlers/GlobalHandlers';

@jsonModel
export default class FinanceiroReceita implements HasCodigo {
  @jsonNumber
  @observable
  CODIGO: number;
  @jsonClass(() => Pessoa)
  @observable
  PAGADOR: Pessoa;
  @jsonString
  @observable
  IDENTIFICADOR: string;
  @jsonString
  @observable
  DESCRICAO: string;
  @jsonClass(() => MeioPagamento)
  @observable
  MEIO_PAGAMENTO: MeioPagamento;
  @jsonClass(() => Atendimento)
  @observable
  ATENDIMENTO: Atendimento;
  @jsonClass(() => AtendimentoPagamento)
  @observable
  PAGAMENTO: AtendimentoPagamento;
  @jsonClass(() => CondicaoParcela)
  @observable
  PARCELA: CondicaoParcela;
  @jsonDate
  @observable
  DATA_VENCIMENTO?: Date;
  @jsonDate
  @observable
  DATA_PAGAMENTO?: Date;
  @jsonDate
  @observable
  DATA_LIQUIDACAO?: Date;
  @jsonNumber
  @observable
  VALOR: number;
  @jsonNumber
  @observable
  VALOR_PAGO: number;
  @jsonNumber
  @observable
  VALOR_LIQUIDADO: number;
  @jsonNumber
  @observable
  VALOR_DESCONTO: number;
  @jsonNumber
  @observable
  VALOR_ENCARGOS: number;
  @jsonString
  @observable
  RECEBIMENTO_FUTURO: string;
  @jsonString
  @observable
  OBSERVACAO: string;
  @jsonClass(() => Boleto)
  @observable
  BOLETOS: Boleto;
  @jsonArray(() => FinanceiroReceitaObservacao)
  @observable
  OBSERVACOES: FinanceiroReceitaObservacao[];
  @jsonNumber
  @observable
  VALOR_SUBSTITUICAO: number;
  @jsonEnum(ReceitaSituacao)
  @observable
  SITUACAO: ReceitaSituacao;
  @jsonArray(() => FinanceiroReceitaReferencia)
  @observable
  SUBSTITUICOES: FinanceiroReceitaReferencia[];
  @jsonArray(() => FinanceiroReceitaReferencia)
  @observable
  LIQUIDACOES: FinanceiroReceitaReferencia[];
  @jsonArray(() => LoteRpsItens)
  @observable
  LOTES_RPS_ITENS: LoteRpsItens[];
  @jsonClass(() => Pessoa)
  @observable
  RESPONSAVEL: Pessoa;

  @computed
  get podeSerNegociada(): boolean {
    return this.SITUACAO === ReceitaSituacao.ABERTA &&
      this.MEIO_PAGAMENTO?.TIPO !== MeioPagamentoTipo.DINHEIRO &&
      !!this.PAGADOR;
  }

  @computed
  get podeSerEditada(): boolean {
    return this.modoEdicao !== ReceitaModoEdicao.NADA;
  }

  @computed
  get modoEdicao(): ReceitaModoEdicao {
    if (this.situacaoExibicao === ReceitaSituacaoExibicao.PAGA) {
      return ReceitaModoEdicao.SOMENTE_DATA_PAGAMENTO;
    }

    if (this.situacaoExibicao === ReceitaSituacaoExibicao.LIQUIDADA) {
      return ReceitaModoEdicao.SOMENTE_DATA_LIQUIDACAO;
    }

    if ((this.situacaoExibicao === ReceitaSituacaoExibicao.ATRASADA ||
      this.situacaoExibicao === ReceitaSituacaoExibicao.HOJE ||
      this.situacaoExibicao === ReceitaSituacaoExibicao.EM_ABERTO) &&
      this.isLancamentoManual
    ) {
      return ReceitaModoEdicao.SOMENTE_VALOR;
    }

    return ReceitaModoEdicao.NADA;
  }

  podeSofrerAcao(acao: ReceitaAcao, codigoPagador?: number): boolean {
    if (acao === ReceitaAcao.NEGOCIAR) {
      if (!codigoPagador) {
        return false;
      }

      return this.acoesDisponiveis.includes(acao) && this.PAGADOR?.CODIGO === codigoPagador;
    }

    return this.acoesDisponiveis.includes(acao);
  }

  @computed
  get isLancamentoManual(): boolean {
    return Utils.isNullOrUndefined(this.ATENDIMENTO);
  }

  @computed
  get acoesDisponiveis(): ReceitaAcao[] {
    const acoesDisponiveis: ReceitaAcao[] = [];

    if (this.podeSerEditada) {
      acoesDisponiveis.push(ReceitaAcao.EDITAR);
    }
    else {
      acoesDisponiveis.push(ReceitaAcao.VISUALIZAR);
    }

    if (this.podeSerNegociada) {
      acoesDisponiveis.push(ReceitaAcao.NEGOCIAR);
    }

    if (this.podeSerMarcadaComoPaga) {
      acoesDisponiveis.push(ReceitaAcao.MARCAR_COMO_PAGA);
    }

    if (this.podeSerMarcadaComoLiquidada) {
      acoesDisponiveis.push(ReceitaAcao.MARCAR_COMO_LIQUIDADA);
    }

    if (this.podeSerAnulada) {
      acoesDisponiveis.push(ReceitaAcao.ANULAR);
    }

    if (this.podeSerEstornada) {
      acoesDisponiveis.push(ReceitaAcao.ESTORNAR);
    }

    if (this.podeExcluirReceita) {
      acoesDisponiveis.push(ReceitaAcao.EXCLUIR_RECEITA);
    }

    if (this.podeCancelarBoleto) {
      acoesDisponiveis.push(ReceitaAcao.EXCLUIR_BOLETO);
    }

    if (this.podeImprimirBoleto) {
      acoesDisponiveis.push(ReceitaAcao.IMPRIMIR_BOLETO);
    }

    if (this.podeEmitirNota) {
      acoesDisponiveis.push(ReceitaAcao.EMITIR_NOTA);
    }

    if (this.podeGerarBoleto) {
      acoesDisponiveis.push(ReceitaAcao.GERAR_BOLETO);
    }

    if (this.podeEnviarBoletoEmail) {
      acoesDisponiveis.push(ReceitaAcao.ENVIAR_BOLETO_EMAIL);
    }

    return acoesDisponiveis;
  }

  @computed
  get diferencaDiasVencimento() {
    const dataVencimento = moment(this.DATA_VENCIMENTO);
    return Math.abs(moment().startOf('day').diff(dataVencimento, 'days'));
  }

  @computed
  get situacaoExibicao(): ReceitaSituacaoExibicao {
    switch (this.SITUACAO) {
      case ReceitaSituacao.ABERTA:
        const venceHoje = moment(this.DATA_VENCIMENTO).isSame(moment().format('YYYY-MM-DD'));
        const jaVenceu = moment(moment(this.DATA_VENCIMENTO).add(1, 'day')).isBefore();

        if (this.SITUACAO === ReceitaSituacao.ABERTA && venceHoje) {
          return ReceitaSituacaoExibicao.HOJE;
        }
        else if (this.SITUACAO === ReceitaSituacao.ABERTA && jaVenceu) {
          return ReceitaSituacaoExibicao.ATRASADA;
        }
        else if (this.DATA_VENCIMENTO) {
          return ReceitaSituacaoExibicao.EM_ABERTO;
        }

        return null;
      case ReceitaSituacao.PAGA:
        return ReceitaSituacaoExibicao.PAGA;
      case ReceitaSituacao.LIQUIDADA:
        return ReceitaSituacaoExibicao.LIQUIDADA;
      case ReceitaSituacao.PARCIALMENTE_SUBSTITUIDA:
        return ReceitaSituacaoExibicao.PARCIALMENTE_SUBSTITUIDA;
      case ReceitaSituacao.SUBSTITUIDA:
      case ReceitaSituacao.SUBSTITUIDA_COM_EXCEDENTE:
        return ReceitaSituacaoExibicao.TOTALMENTE_SUBSTITUIDA;
    }
  }

  @computed
  get situacaoExibicaoDescricao(): string {
    const diferencaEmDias = this.diferencaDiasVencimento;

    switch (this.situacaoExibicao) {
      case ReceitaSituacaoExibicao.ATRASADA:
        return FormatUtils.stringPlural(diferencaEmDias, 'Atrasada há # dia{s}');
      case ReceitaSituacaoExibicao.EM_ABERTO:
        return FormatUtils.stringPlural(diferencaEmDias, 'Falta{m} # dia{s}');
      default:
        return ReceitaSituacaoExibicao.getDescricao(this.situacaoExibicao);
    }
  }

  @computed
  get podeSerMarcadaComoPaga(): boolean {
    return this.situacaoExibicao !== ReceitaSituacaoExibicao.PAGA &&
      this.situacaoExibicao !== ReceitaSituacaoExibicao.LIQUIDADA &&
      this.situacaoExibicao !== ReceitaSituacaoExibicao.PARCIALMENTE_SUBSTITUIDA &&
      this.situacaoExibicao !== ReceitaSituacaoExibicao.TOTALMENTE_SUBSTITUIDA &&
      this.RECEBIMENTO_FUTURO === 'N' &&
      (!this.BOLETOS || this.BOLETOS?.EXCLUIDO === false);
  }

  @computed
  get podeSerMarcadaComoLiquidada(): boolean {
    return this.situacaoExibicao !== ReceitaSituacaoExibicao.LIQUIDADA &&
      this.situacaoExibicao !== ReceitaSituacaoExibicao.PARCIALMENTE_SUBSTITUIDA &&
      this.situacaoExibicao !== ReceitaSituacaoExibicao.TOTALMENTE_SUBSTITUIDA &&
      this.RECEBIMENTO_FUTURO === 'N' &&
      (!this.BOLETOS || this.BOLETOS?.EXCLUIDO === false);
  }

  @computed
  get podeSerAnulada(): boolean {
    return !this.ATENDIMENTO && this.podeSerMarcadaComoPaga;
  }

  @computed
  get podeSerEstornada(): boolean {
    const situacao: ReceitaSituacaoExibicao = this.situacaoExibicao;
    return (situacao === ReceitaSituacaoExibicao.PAGA || situacao === ReceitaSituacaoExibicao.LIQUIDADA);
  }

  @computed
  get podeCancelarBoleto(): boolean {
    return this.situacaoExibicao !== ReceitaSituacaoExibicao.PAGA &&
      this.situacaoExibicao !== ReceitaSituacaoExibicao.LIQUIDADA &&
      this.MEIO_PAGAMENTO?.TIPO === MeioPagamentoTipo.BOLETO &&
      this.BOLETOS?.EXCLUIDO === false;
  }

  @computed
  get podeExcluirReceita(): boolean {
    return this.SITUACAO === ReceitaSituacao.ABERTA &&
      (!!this.PAGAMENTO?.DIA_RECURSIVIDADE || this.isLancamentoManual);
  }

  @computed
  get podeImprimirBoleto(): boolean {
    return this.MEIO_PAGAMENTO?.TIPO === MeioPagamentoTipo.BOLETO &&
    this.BOLETOS?.EXCLUIDO === false;
  }

  @computed
  get podeEmitirNota(): boolean {
    return GlobalHandlers.gerenciadorLicenca.isFuncaoHabilitada(LicencaFuncao.FATURAMENTO_NFE_PRODUCAO) &&
      GlobalHandlers.gerenciadorLicenca.isFuncaoHabilitada(LicencaFuncao.FINANCEIRO_RECORRENCIA) &&
    !!this.VALOR_PAGO && !!this.DATA_PAGAMENTO &&
      this.VALOR_PAGO >= this.VALOR &&
      !(this.LOTES_RPS_ITENS?.find((item) => (['2', '4'].includes(item.LOTE.SITUACAO))));
  }

  @computed
  get getRPS(): LoteRpsItens {
    return this.LOTES_RPS_ITENS?.find((item) => (['2', '4'].includes(item.LOTE?.SITUACAO)));
  }

  @computed
  get podeEnviarBoletoEmail(): boolean {
    return (
      this.MEIO_PAGAMENTO?.TIPO === MeioPagamentoTipo.BOLETO &&
      !!this.BOLETOS && !this.BOLETOS.EXCLUIDO && this.SITUACAO === ReceitaSituacao.ABERTA
    );
  }

  @computed
  get podeGerarBoleto(): boolean {
    return (
      !this.BOLETOS &&
      (!!this.PAGAMENTO?.DIA_RECURSIVIDADE || this.isLancamentoManual) &&
      (this.SITUACAO === ReceitaSituacao.ABERTA) &&
      (this.MEIO_PAGAMENTO?.TIPO === MeioPagamentoTipo.BOLETO) &&
      !!this.PAGADOR
    );
  }
}
