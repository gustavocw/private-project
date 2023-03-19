enum DespesaSituacao {
  EM_ABERTO,
  PAGA,
  ATRASADA,
  HOJE,
}

namespace DespesaSituacao {
  export function values(): DespesaSituacao[] {
    return Object.values(DespesaSituacao)
        .filter((value) => typeof value === 'number')
        .map((value) => value as DespesaSituacao);
  }

  export function getDescricao(situacao: DespesaSituacao) {
    if (situacao === null) {
      return '';
    }

    switch (situacao) {
      case DespesaSituacao.EM_ABERTO:
        return 'Em aberto';
      case DespesaSituacao.PAGA:
        return 'Paga';
      case DespesaSituacao.ATRASADA:
        return 'Atrasada';
      case DespesaSituacao.HOJE:
        return 'Vencimento hoje';
    }
  }
}

export default DespesaSituacao;
