export default class NumberUtils {
  static arredondar(numero: number): number {
    if (numero == null) return 0;
    return Math.round((numero + Number.EPSILON) * 100) / 100;
  }
}
