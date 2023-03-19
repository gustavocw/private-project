enum TipoDescontoBoleto {
  PERCENTUAL = 1,
  VALOR = 2
}

namespace TipoDescontoBoleto {
  export function values(): TipoDescontoBoleto[] {
    return Object.values(TipoDescontoBoleto)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TipoDescontoBoleto);
  }

  export function getDescricao(tipo: TipoDescontoBoleto) : string {
    switch (tipo) {
      case TipoDescontoBoleto.PERCENTUAL:
        return 'Percentual';
      case TipoDescontoBoleto.VALOR:
        return 'Valor';
    }

    return '';
  }
}

export default TipoDescontoBoleto;
