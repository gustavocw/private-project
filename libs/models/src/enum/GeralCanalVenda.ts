enum GeralCanalVenda {
  LOJA_VIRTUAL = 1,
  ATACADO,
  FORCA_DE_VENDAS,
  B2W,
  AplicativoConsumidor,
  AplicativoBusiness
}

namespace GeralCanalVenda {
  export function values(): GeralCanalVenda[] {
    return Object.values(GeralCanalVenda)
        .filter((value) => typeof value === 'number')
        .map((value) => value as GeralCanalVenda);
  }

  export function getDescricao(canalVenda: GeralCanalVenda): string {
    switch (canalVenda) {
      case GeralCanalVenda.LOJA_VIRTUAL:
        return 'Loja Virtual';
      case GeralCanalVenda.ATACADO:
        return 'Atacado';
      case GeralCanalVenda.FORCA_DE_VENDAS:
        return 'Força de vendas';
      case GeralCanalVenda.B2W:
        return 'B2W';
      case GeralCanalVenda.AplicativoConsumidor:
        return 'Aplicativo consumidor';
      case GeralCanalVenda.AplicativoBusiness:
        return 'Aplicativo business';
      case null:
      case undefined:
        return 'Painel';
    }

    return '';
  }
}

export default GeralCanalVenda;
