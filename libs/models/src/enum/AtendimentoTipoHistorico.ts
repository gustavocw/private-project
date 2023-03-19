enum AtendimentoTipoHistorico {
  REGISTRADO = 1,
  PAGAMENTO_PENDENTE,
  PAGAMENTO_EFETUADO,
  CONFERIDO,
  SEPARADO,
  FATURADO,
  DESPACHADO,
  ENTREGUE,
  CANCELADO,
  ENCAMINHADO
}

namespace AtendimentoTipoHistorico {
  export function values(): AtendimentoTipoHistorico[] {
    return Object.values(AtendimentoTipoHistorico)
        .filter((value) => typeof value === 'number')
        .map((value) => value as AtendimentoTipoHistorico);
  }

  export function getDescricao(tipoHistorico: AtendimentoTipoHistorico) {
    switch (tipoHistorico) {
      case AtendimentoTipoHistorico.REGISTRADO:
        return 'Registrado';
      case AtendimentoTipoHistorico.PAGAMENTO_PENDENTE:
        return 'Pagamento pendente';
      case AtendimentoTipoHistorico.PAGAMENTO_EFETUADO:
        return 'Pagamento efetuado';
      case AtendimentoTipoHistorico.CONFERIDO:
        return 'Conferido';
      case AtendimentoTipoHistorico.SEPARADO:
        return 'Separado';
      case AtendimentoTipoHistorico.FATURADO:
        return 'Faturado';
      case AtendimentoTipoHistorico.DESPACHADO:
        return 'Despachado';
      case AtendimentoTipoHistorico.ENTREGUE:
        return 'Entregue';
      case AtendimentoTipoHistorico.CANCELADO:
        return 'Cancelado';
      case AtendimentoTipoHistorico.ENCAMINHADO:
        return 'Encaminhado';
    }

    return '';
  }
}

export default AtendimentoTipoHistorico;
