enum ProdutoDisponibilidade {
  DISPONIVEL = 'D',
  ESGOTADO = 'E',
  PRE_VENDA = 'P'
}

namespace ProdutoDisponibilidade {
  export function values(): ProdutoDisponibilidade[] {
    return Object.values(ProdutoDisponibilidade)
        .filter((value) => typeof value === 'string')
        .map((value) => value as ProdutoDisponibilidade);
  }

  export function getDescricao(tipo: ProdutoDisponibilidade) {
    switch (tipo) {
      case ProdutoDisponibilidade.DISPONIVEL:
        return 'Disponível';
      case ProdutoDisponibilidade.ESGOTADO:
        return 'Esgotado';
      case ProdutoDisponibilidade.PRE_VENDA:
        return 'Pré-venda';
    }

    return '';
  }
}

export default ProdutoDisponibilidade;
