enum OperacoesEstoque {
  ENTRADA,
  SAIDA,
  INVENTARIO
}


namespace OperacoesEstoque {
  export function getDescricao(operacao: OperacoesEstoque) {
    if (operacao === null) {
      return '';
    }

    switch (operacao) {
      case OperacoesEstoque.ENTRADA:
        return 'Entrada';
      case OperacoesEstoque.SAIDA:
        return 'Saída';
      case OperacoesEstoque.INVENTARIO:
        return 'Inventário';

      default: return '';
    }
  }
}
export default OperacoesEstoque;
