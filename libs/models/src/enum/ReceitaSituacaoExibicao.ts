enum ReceitaSituacaoExibicao {
  EM_ABERTO,
  HOJE,
  ATRASADA,
  PAGA,
  LIQUIDADA,
  PARCIALMENTE_SUBSTITUIDA,
  TOTALMENTE_SUBSTITUIDA,
}

namespace ReceitaSituacaoExibicao {
  export function values(): ReceitaSituacaoExibicao[] {
    return Object.values(ReceitaSituacaoExibicao)
        .filter((value) => typeof value === 'number')
        .map((value) => value as ReceitaSituacaoExibicao);
  }

  export function getDescricao(situacao: ReceitaSituacaoExibicao) {
    if (situacao === null) {
      return '';
    }

    switch (situacao) {
      case ReceitaSituacaoExibicao.EM_ABERTO:
        return 'Em aberto';
      case ReceitaSituacaoExibicao.HOJE:
        return 'Vencimento hoje';
      case ReceitaSituacaoExibicao.ATRASADA:
        return 'Atrasada';
      case ReceitaSituacaoExibicao.PAGA:
        return 'Paga';
      case ReceitaSituacaoExibicao.LIQUIDADA:
        return 'Liquidada';
      case ReceitaSituacaoExibicao.PARCIALMENTE_SUBSTITUIDA:
        return 'Parcialmente substituída';
      case ReceitaSituacaoExibicao.TOTALMENTE_SUBSTITUIDA:
        return 'Totalmente substituída';
    }
  }
}

export default ReceitaSituacaoExibicao;
