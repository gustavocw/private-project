enum Ordenacao {
  ASC = 'ASC',
  DESC = 'DESC'
}

namespace Ordenacao {
  export function values(): Ordenacao[] {
    return Object.values(Ordenacao)
        .filter((value) => typeof value === 'number')
        .map((value) => value as Ordenacao);
  }

  export function getDescricao(boletoOrdenacao: Ordenacao) {
    switch (boletoOrdenacao) {
      case Ordenacao.ASC:
        return 'Ascendente';
      case Ordenacao.DESC:
        return 'Descendente';
    }

    return '';
  }
}

export default Ordenacao;
