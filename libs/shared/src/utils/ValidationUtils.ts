export default class ValidationUtils {
  static isNumeroValido(numero: number) {
    return numero || numero === 0;
  }

  static existeIntersecaoDeFaixas = (
      valorInicialFaixa1: number,
      valorFinalFaixa1: number,
      valorInicialFaixa2: number,
      valorFinalFaixa2: number,
  ) => {
    if (valorInicialFaixa1 >= valorInicialFaixa2 ||
        valorFinalFaixa1 <= valorFinalFaixa2
    ) {
      return valorInicialFaixa1 <= valorFinalFaixa2 &&
          valorInicialFaixa2 <= valorFinalFaixa1;
    }
    else {
      return valorInicialFaixa1 <= valorFinalFaixa2 &&
          valorInicialFaixa2 <= valorFinalFaixa1;
    }
  };
}
