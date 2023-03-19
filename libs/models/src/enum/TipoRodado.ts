enum TipoRodado {
  TRUCK = '01',
  TOCO = '02',
  CAVALO_MECANICO = '03',
  VAN = '04',
  UTILITARIO = '05',
  OUTROS = '06'
}

namespace TipoRodado {
  export function values(): TipoRodado[] {
    return Object.values(TipoRodado)
        .filter((value) => typeof value === 'string')
        .map((value) => value as TipoRodado);
  }

  export function getDescricao(tipo: TipoRodado) {
    switch (tipo) {
      case TipoRodado.TRUCK:
        return 'Truck';
      case TipoRodado.TOCO:
        return 'Toco';
      case TipoRodado.CAVALO_MECANICO:
        return 'Cavalo Mecanico';
      case TipoRodado.VAN:
        return 'Van';
      case TipoRodado.UTILITARIO:
        return 'Utilitario';
      case TipoRodado.OUTROS:
        return 'Outros';
    }
  }

}

export default TipoRodado;

