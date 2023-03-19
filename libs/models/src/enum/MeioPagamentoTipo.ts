enum MeioPagamentoTipo {
  RECEBIMENTO_ANTECIPADO = 'A',
  BOLETO = 'B',
  CARTAO = 'C',
  DINHEIRO = 'D',
  FIDELIDADE = 'F',
  GATEWAY = 'G',
  CHEQUE = 'H',
  CONVENIO = 'N',
  OUTROS = 'O',
  DEPOSITO = 'P',
  CREDIARIO = 'R',
  WIRECARD = 'W',
  MOEDA_ESTRANGEIRA = 'M'
}

namespace MeioPagamentoTipo {
  export function values(): MeioPagamentoTipo[] {
    return Object.values(MeioPagamentoTipo)
        .filter((value) => typeof value === 'string')
        .map((value) => value as MeioPagamentoTipo);
  }

  export function getDescricao(tipo: MeioPagamentoTipo) {
    switch (tipo) {
      case MeioPagamentoTipo.RECEBIMENTO_ANTECIPADO:
        return 'Recebimento antecipado';
      case MeioPagamentoTipo.BOLETO:
        return 'Boleto';
      case MeioPagamentoTipo.CARTAO:
        return 'Cartão';
      case MeioPagamentoTipo.DINHEIRO:
        return 'Dinheiro';
      case MeioPagamentoTipo.FIDELIDADE:
        return 'Fidelidade';
      case MeioPagamentoTipo.GATEWAY:
        return 'Gateway';
      case MeioPagamentoTipo.CHEQUE:
        return 'Cheque';
      case MeioPagamentoTipo.CONVENIO:
        return 'Convênio';
      case MeioPagamentoTipo.OUTROS:
        return 'Outros';
      case MeioPagamentoTipo.DEPOSITO:
        return 'Depósito';
      case MeioPagamentoTipo.CREDIARIO:
        return 'Crediário';
      case MeioPagamentoTipo.WIRECARD:
        return 'Wirecard';
      case MeioPagamentoTipo.MOEDA_ESTRANGEIRA:
        return 'Moeda estrangeira';
    }

    return '';
  }
}

export default MeioPagamentoTipo;
