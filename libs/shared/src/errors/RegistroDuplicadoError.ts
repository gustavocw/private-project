export default class RegistroDuplicadoError extends Error {
  readonly codigo: number;
  readonly excluido: boolean;

  constructor(mensagem: string, codigo: number, excluido: boolean) {
    super(mensagem);
    this.codigo = codigo;
    this.excluido = excluido;
  }
}
