enum TipoFaixaEntrega {
  FAIXA_DISTANCIA=1,
  FAIXA_CEP,
}

namespace TipoFaixaEntrega {
  export function values(): TipoFaixaEntrega[] {
    return Object.values(TipoFaixaEntrega)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TipoFaixaEntrega);
  }

  export function getDescricao(tipo: TipoFaixaEntrega) {
    switch (tipo) {
      case TipoFaixaEntrega.FAIXA_DISTANCIA:
        return 'Distância';
      case TipoFaixaEntrega.FAIXA_CEP:
        return 'CEP';
    }
  }
}

export default TipoFaixaEntrega;
