enum ReceitaSituacao {
  ABERTA = 1,
  PAGA,
  LIQUIDADA,
  PARCIALMENTE_SUBSTITUIDA,
  SUBSTITUIDA,
  SUBSTITUIDA_COM_EXCEDENTE
}

namespace ReceitaSituacao {
  export function values(): ReceitaSituacao[] {
    return Object.values(ReceitaSituacao)
        .filter((value) => typeof value === 'number')
        .map((value) => value as ReceitaSituacao);
  }

  export function getDescricao(situacao: ReceitaSituacao) {
    if (situacao === null) {
      return '';
    }

    switch (situacao) {
      case ReceitaSituacao.ABERTA:
        return 'Aberta';
      case ReceitaSituacao.PAGA:
        return 'Paga';
      case ReceitaSituacao.LIQUIDADA:
        return 'Liquidada';
      case ReceitaSituacao.PARCIALMENTE_SUBSTITUIDA:
        return 'Parcialmente substituída';
      case ReceitaSituacao.SUBSTITUIDA:
        return 'Substituída';
      case ReceitaSituacao.SUBSTITUIDA_COM_EXCEDENTE:
        return 'Substituída com excedente';
    }
  }
}

export default ReceitaSituacao;
