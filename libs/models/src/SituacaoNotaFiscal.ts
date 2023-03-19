enum SituacaoNotaFiscal {
  EMITIDA = 'E',
  CANCELADA = 'C',
  PENDENTE = 'P',
  DIGITADA = 'D',
  INUTILIZADA = 'I',
  DENEGADA = 'N',
  DUPLICADA = 'L'
}

namespace SituacaoNotaFiscal {
  export function values(): SituacaoNotaFiscal[] {
    return Object.values(SituacaoNotaFiscal)
        .filter((value) => ['string', 'number'].includes(typeof value))
        .map((value) => value as SituacaoNotaFiscal);
  }

  export function getDescricao(situacao: SituacaoNotaFiscal) {
    switch (situacao) {
      case SituacaoNotaFiscal.EMITIDA:
        return 'Emitida';
      case SituacaoNotaFiscal.CANCELADA:
        return 'Cancelada';
      case SituacaoNotaFiscal.PENDENTE:
        return 'Pendente';
      case SituacaoNotaFiscal.DIGITADA:
        return 'Digitada';
      case SituacaoNotaFiscal.INUTILIZADA:
        return 'Inutilizada';
      case SituacaoNotaFiscal.DENEGADA:
        return 'Denegada';
      case SituacaoNotaFiscal.DUPLICADA:
        return 'Duplicada';
      default:
        return '';
    }
  }
}

export default SituacaoNotaFiscal;
