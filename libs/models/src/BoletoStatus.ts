enum BoletoStatus {
  AGUARDANDO_PAGAMENTO = 1,
  BAIXADO = 2,
  ANULADO = 3,
  QUITADO = 4,
}

namespace BoletoStatus {
  export function values(): BoletoStatus[] {
    return Object.values(BoletoStatus)
        .filter((value) => typeof value === 'number')
        .map((value) => value as BoletoStatus);
  }
  export function getDescricao(status: BoletoStatus) {
    switch (status) {
      case BoletoStatus.AGUARDANDO_PAGAMENTO:
        return 'Aguardando pagamento';
      case BoletoStatus.BAIXADO:
        return 'Baixado';
      case BoletoStatus.ANULADO:
        return 'Anulado';
      case BoletoStatus.QUITADO:
        return 'Quitado';
    }

    return '';
  }
}

export default BoletoStatus;


