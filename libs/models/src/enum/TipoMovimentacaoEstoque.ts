enum TipoMovimentacaoEstoque {
  ENTRADA,
  SAIDA,
  TODOS
}
namespace TipoMovimentacaoEstoque {
  export function values(): TipoMovimentacaoEstoque[] {
    return Object.values(TipoMovimentacaoEstoque)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TipoMovimentacaoEstoque);
  }

  export function getDescricao(tipoProduto: TipoMovimentacaoEstoque) {
    switch (tipoProduto) {
      case TipoMovimentacaoEstoque.ENTRADA:
        return 'Entrada';
      case TipoMovimentacaoEstoque.SAIDA:
        return 'Saída';
      case TipoMovimentacaoEstoque.TODOS:
        return 'Todos';
    }
  }
  export function getValorFiltro(tipoProduto: TipoMovimentacaoEstoque) {
    switch (tipoProduto) {
      case TipoMovimentacaoEstoque.ENTRADA:
        return 'E';
      case TipoMovimentacaoEstoque.SAIDA:
        return 'S';
      case TipoMovimentacaoEstoque.TODOS:
        return null;
    }
  }
}

export default TipoMovimentacaoEstoque;
