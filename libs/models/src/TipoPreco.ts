enum TipoPreco {
    PRECO_CUSTO = 1,
    PRECO_VENDA = 2
}

namespace TipoPreco {
    export function values(): TipoPreco[] {
      return Object.values(TipoPreco)
          .filter((value) => typeof value === 'number')
          .map((value) => value as TipoPreco);
    }

    export function getDescricao(tipo: TipoPreco) : string {
      switch (tipo) {
        case TipoPreco.PRECO_VENDA:
          return 'Preço de venda';
        case TipoPreco.PRECO_CUSTO:
          return 'Preço de custo';
      }

      return '';
    }
}

export default TipoPreco;
