enum BoletoStatusRemessa {
  PENDENTE = 1,
  PROCESSADO = 2,
  ATUALIZADO = 3,
}

namespace BoletoStatusRemessa {
  export function values(): BoletoStatusRemessa[] {
    return Object.values(BoletoStatusRemessa)
        .filter((value) => typeof value === 'number')
        .map((value) => value as BoletoStatusRemessa);
  }
  export function getDescricao(status: BoletoStatusRemessa) {
    switch (status) {
      case BoletoStatusRemessa.PENDENTE:
        return 'Pendente';
      case BoletoStatusRemessa.PROCESSADO:
        return 'Processado';
      case BoletoStatusRemessa.ATUALIZADO:
        return 'Atualizado';
    }

    return '';
  }
}

export default BoletoStatusRemessa;


