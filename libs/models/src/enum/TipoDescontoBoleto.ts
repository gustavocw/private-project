enum TipoDescontoBoleto {
  FIXO = 1,
  ANTECIPACAO = 2
}

namespace TipoDescontoBoleto {
  export function values(): TipoDescontoBoleto[] {
    return Object.values(TipoDescontoBoleto)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TipoDescontoBoleto);
  }

  export function getDescricao(tipo: TipoDescontoBoleto) : string {
    switch (tipo) {
      case TipoDescontoBoleto.FIXO:
        return 'Fixo';
      case TipoDescontoBoleto.ANTECIPACAO:
        return 'Antecipação';
    }

    return '';
  }

  export function getTextoExplicativo(tipo: TipoDescontoBoleto): string {
    switch (tipo) {
      case TipoDescontoBoleto.FIXO:
        return 'Desconto fixo no boleto';
      case TipoDescontoBoleto.ANTECIPACAO:
        return 'Desconto no boleto por antecipação';
    }

    return null;
  }

  export function getUsandoCodigo(codigo: string | number) {
    switch (codigo.toString()) {
      case '1':
        return TipoDescontoBoleto.FIXO;
      case '2':
        return TipoDescontoBoleto.ANTECIPACAO;
      default:
        return null;
    }
  }

}

export default TipoDescontoBoleto;
