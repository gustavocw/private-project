enum TipoProduto {
  OUTROS=1,
  LIVRO,
  TODOS
}
namespace TipoProduto {
  export function values(): TipoProduto[] {
    return Object.values(TipoProduto)
        .filter((value) => typeof value === 'number')
        .map((value) => value as TipoProduto);
  }

  export function getDescricao(tipoProduto: TipoProduto) {
    switch (tipoProduto) {
      case TipoProduto.OUTROS:
        return 'Outros';
      case TipoProduto.LIVRO:
        return 'Livros';
      case TipoProduto.TODOS:
        return 'Todos';
    }
  }
}

export default TipoProduto;
