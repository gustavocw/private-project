enum OpcaoParcelamento {
  PARCELA_UNICA = 1,
  PARCELA_DIA_FIXO,
  PARCELA_DIA_VARIAVEL
}

namespace OpcaoParcelamento {
  export function values(): OpcaoParcelamento[] {
    return Object.values(OpcaoParcelamento)
        .filter((value) => typeof value === 'number')
        .map((value) => value as OpcaoParcelamento);
  }

  export function getDescricao(opcao: OpcaoParcelamento) {
    switch (opcao) {
      case OpcaoParcelamento.PARCELA_UNICA:
        return 'Parcela única';
      case OpcaoParcelamento.PARCELA_DIA_FIXO:
        return 'Parcela em dia fixo do mês';
      case OpcaoParcelamento.PARCELA_DIA_VARIAVEL:
        return 'Parcela em dia variável do mês';
    }

    return '';
  }
}

export default OpcaoParcelamento;
