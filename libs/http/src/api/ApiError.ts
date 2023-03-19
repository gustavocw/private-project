export default class ApiError extends Error {
  readonly codigo: number;
  readonly extra?: any;

  constructor(mensagem: string, codigo: number, extra?: any) {
    super(mensagem);
    this.codigo = codigo;
    this.extra = extra;
  }
}
