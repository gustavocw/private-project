enum TipoRecebimento {
  RECEBIMENTO_JA_EFETUADO = 1,
  RECEBIMENTO_EM_DATA_FUTURA
}

namespace TipoRecebimento {
  export function values(): TipoRecebimento[] {
    return Object.values(TipoRecebimento)
        .filter((tipo) => typeof tipo === 'number')
        .map((tipo) => tipo as TipoRecebimento);
  }

  export function getDescricao(tipo: TipoRecebimento, recebimento: boolean) {
    switch (tipo) {
      case TipoRecebimento.RECEBIMENTO_JA_EFETUADO:
        return (recebimento ? 'Recebimento ' : 'Pagamento ' ) + 'já efetuado';
      case TipoRecebimento.RECEBIMENTO_EM_DATA_FUTURA:
        return (recebimento ? 'Recebimento ' : 'Pagamento ' ) + 'em data futura';
    }

    return '';
  }
}

export default TipoRecebimento;
