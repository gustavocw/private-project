enum LocalizacaoTipo {
  INTERNA = 1,
  EXTERNA,
}

namespace LocalizacaoTipo {
  export function values(): LocalizacaoTipo[] {
    return Object.values(LocalizacaoTipo)
        .filter((value) => typeof value === 'number')
        .map((value) => value as LocalizacaoTipo);
  }
}

export default LocalizacaoTipo;
