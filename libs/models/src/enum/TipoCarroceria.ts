enum TipoCarroceria {
  NAO_APLICAVEIS = '01',
  ABERTA = '02',
  FECHADA_BAU = '03',
  GRANELERA = '04',
  PORTA_CONTAINER = '05',
  SLIDER = '06'
}

namespace TipoCarroceria {
  export function values(): TipoCarroceria[] {
    return Object.values(TipoCarroceria)
        .filter((value) => typeof value === 'string')
        .map((value) => value as TipoCarroceria);
  }

  export function getDescricao(tipo: TipoCarroceria) {
    switch (tipo) {
      case TipoCarroceria.NAO_APLICAVEIS:
        return 'Não Aplicavel';
      case TipoCarroceria.ABERTA:
        return 'Aberta';
      case TipoCarroceria.FECHADA_BAU:
        return 'Fechada/Baú';
      case TipoCarroceria.GRANELERA:
        return 'Granelera';
      case TipoCarroceria.PORTA_CONTAINER:
        return 'Porta Container';
      case TipoCarroceria.SLIDER:
        return 'Slider';
    }
  }
}

export default TipoCarroceria;

