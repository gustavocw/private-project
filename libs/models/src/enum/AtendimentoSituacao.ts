enum AtendimentoSituacao {
  ABERTO = 1,
  FECHADO,
  CANCELADO,
  FINALIZADO
}

namespace AtendimentoSituacao {
  export function values(): AtendimentoSituacao[] {
    return Object.values(AtendimentoSituacao)
        .filter((value) => typeof value === 'number')
        .map((value) => value as AtendimentoSituacao);
  }

  export function getDescricao(situacao: AtendimentoSituacao) {
    switch (situacao) {
      case AtendimentoSituacao.ABERTO:
        return 'Aberto';
      case AtendimentoSituacao.FECHADO:
        return 'Fechado';
      case AtendimentoSituacao.CANCELADO:
        return 'Cancelado';
      case AtendimentoSituacao.FINALIZADO:
        return 'Finalizado';
    }

    return '';
  }
}

export default AtendimentoSituacao;
