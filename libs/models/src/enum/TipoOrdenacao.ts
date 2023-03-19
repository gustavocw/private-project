enum TipoOrdenacao {
  ASC,
  DESC
}

namespace TipoOrdenacao {
  export function values(): TipoOrdenacao[] {
    return Object.values(TipoOrdenacao)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TipoOrdenacao);
  }

  export function getValorQuery(tipoOrdenacao: TipoOrdenacao) {
    switch (tipoOrdenacao) {
      case TipoOrdenacao.ASC:
        return 'ASC';
      case TipoOrdenacao.DESC:
        return 'DESC';
    }
  }

  export function getDescricao(tipoOrdenacao: TipoOrdenacao) {
    switch (tipoOrdenacao) {
      case TipoOrdenacao.ASC:
        return 'Ascendente';
      case TipoOrdenacao.DESC:
        return 'Descendente';
    }
  }
}

export default TipoOrdenacao;
