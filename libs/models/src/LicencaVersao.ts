enum LicencaVersao {
  ALPHA = 1,
  BETA,
  PRODUCAO,
}

namespace LicencaVersao {
  export function values(): LicencaVersao[] {
    return Object.values(LicencaVersao)
        .filter((acao) => typeof acao === 'number')
        .map((acao) => acao as LicencaVersao);
  }

  export function getDescricao(acao: LicencaVersao) {
    switch (acao) {
      case LicencaVersao.ALPHA:
        return 'Alpha';
      case LicencaVersao.BETA:
        return 'Beta';
      case LicencaVersao.PRODUCAO:
        return 'Producao';
    }

    return '';
  }
}

export default LicencaVersao;
