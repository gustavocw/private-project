import OperacaoFiscal from './OperacaoFiscal';

enum AtendimentoTipoOperacao {
  OPERACAO_VENDA = 1,
  OPERACAO_BONIFICACAO,
  OPERACAO_CONSIGNACAO,
  OPERACAO_DEVOLUCAO,
  OPERACAO_DEVOLUCAO_COMODATO,
  OPERACAO_COMODATO,
  ACERTO_CONSIGNACAO,
  ANALISE_PDV,
  CONTAGEM_ESTOQUE,
  PESQUISA_PRECO,
  PESQUISA_PRECO_CONCORRENCIA
}

namespace AtendimentoTipoOperacao {
  export function values(): AtendimentoTipoOperacao[] {
    return Object.values(AtendimentoTipoOperacao)
        .filter((value) => typeof value === 'number')
        .map((value) => value as AtendimentoTipoOperacao);
  }

  export function getDescricao(tipoOperacao: AtendimentoTipoOperacao) {
    switch (tipoOperacao) {
      case AtendimentoTipoOperacao.OPERACAO_VENDA:
        return 'Venda';
      case AtendimentoTipoOperacao.OPERACAO_BONIFICACAO:
        return 'Bonificação';
      case AtendimentoTipoOperacao.OPERACAO_CONSIGNACAO:
        return 'Consignação';
      case AtendimentoTipoOperacao.OPERACAO_DEVOLUCAO:
        return 'Devolução';
      case AtendimentoTipoOperacao.OPERACAO_DEVOLUCAO_COMODATO:
        return 'Devolução de comodato';
      case AtendimentoTipoOperacao.OPERACAO_COMODATO:
        return 'Comodato';
      case AtendimentoTipoOperacao.ACERTO_CONSIGNACAO:
        return 'Acerto de consignação';
      case AtendimentoTipoOperacao.ANALISE_PDV:
        return 'Análise de PDV';
      case AtendimentoTipoOperacao.CONTAGEM_ESTOQUE:
        return 'Contagem de estoque';
      case AtendimentoTipoOperacao.PESQUISA_PRECO:
        return 'Pesquisa de preços próprios';
      case AtendimentoTipoOperacao.PESQUISA_PRECO_CONCORRENCIA:
        return 'Pesquisa de preços da concorrência';
    }

    return '';
  }

  export function isDevolucao(tipoOperacao?: AtendimentoTipoOperacao): boolean {
    if (!tipoOperacao) return false;

    switch (tipoOperacao) {
      case AtendimentoTipoOperacao.OPERACAO_DEVOLUCAO:
      case AtendimentoTipoOperacao.OPERACAO_DEVOLUCAO_COMODATO:
      case AtendimentoTipoOperacao.ACERTO_CONSIGNACAO:
        return true;
      default:
        return false;
    }
  }

  export function getLabelTotal(tipoOperacao: AtendimentoTipoOperacao) {
    switch (tipoOperacao) {
      case AtendimentoTipoOperacao.OPERACAO_COMODATO:
        return 'Total do Comodato';
      case AtendimentoTipoOperacao.OPERACAO_CONSIGNACAO:
        return 'Total da Consignação';
      case AtendimentoTipoOperacao.OPERACAO_BONIFICACAO:
        return 'Total da Bonificação';
      default:
        return 'Total do Atendimento';
    }
  }

  export function getOperacaoFiscal(tipoOperacao: AtendimentoTipoOperacao): OperacaoFiscal {
    switch (tipoOperacao) {
      case AtendimentoTipoOperacao.OPERACAO_VENDA:
      case AtendimentoTipoOperacao.OPERACAO_DEVOLUCAO:
        return OperacaoFiscal.VENDA;
      case AtendimentoTipoOperacao.OPERACAO_BONIFICACAO:
        return OperacaoFiscal.BONIFICACAO;
      case AtendimentoTipoOperacao.OPERACAO_CONSIGNACAO:
        return OperacaoFiscal.CONSIGNACAO;
      case AtendimentoTipoOperacao.OPERACAO_COMODATO:
      case AtendimentoTipoOperacao.OPERACAO_DEVOLUCAO_COMODATO:
        return OperacaoFiscal.COMODATO;
    }

    return OperacaoFiscal.VENDA;
  }
}

export default AtendimentoTipoOperacao;
