enum TipoRota {
  VENDA = '1',
  ENTREGA = '2',
  PROSPECCAO = '3',
  COBRANCA = '4',
  PDV = '5'
}

namespace TipoRota {
  export function values(): TipoRota[] {
    return Object.values(TipoRota)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TipoRota);
  }

  export function getDescricao(tipoRota: TipoRota) {
    switch (tipoRota) {
      case TipoRota.VENDA:
        return 'Venda';
      case TipoRota.ENTREGA:
        return 'Entrega';
      case TipoRota.PROSPECCAO:
        return 'Prospecção';
      case TipoRota.COBRANCA:
        return 'Cobrança';
      case TipoRota.PDV:
        return 'Análise de PDV';
    }
  }
}

export default TipoRota;
