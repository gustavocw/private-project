enum CalculoPrecoMargem {
  MARGEM = '1',
  MARKUP = '2',
}

namespace CalculoPrecoMargem {
  export function values(): CalculoPrecoMargem[] {
    return Object.values(CalculoPrecoMargem)
        .filter((value) => typeof value === 'string')
        .map((value) => value as CalculoPrecoMargem);
  }

  export function getDescricao(tipo: CalculoPrecoMargem) {
    switch (tipo) {
      case CalculoPrecoMargem.MARGEM:
        return 'Margem';
      case CalculoPrecoMargem.MARKUP:
        return 'Markup';
    }

    return '';
  }
}

export default CalculoPrecoMargem;
