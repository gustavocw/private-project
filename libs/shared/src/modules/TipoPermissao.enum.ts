export default class TipoPermissao {
  static allValues: TipoPermissao[] = [];

  static readonly VISUALIZAR = new TipoPermissao(2);
  static readonly CADASTRAR = new TipoPermissao(4);
  static readonly EDITAR = new TipoPermissao(8);
  static readonly APAGAR = new TipoPermissao(16);
  static readonly FILTRAR = new TipoPermissao(32);
  static readonly AUTORIZACAO = new TipoPermissao(64);
  static readonly TOTAL = new TipoPermissao(126);

  constructor(public valor: number) {
  }

  static getPermissoes(valor: number): TipoPermissao[] {
    if (!valor) {
      return [];
    }

    const listaPermissoes: TipoPermissao[] = [];
    let valorCalculo = valor;

    for (const tipoPermissao of [...TipoPermissao.allValues].reverse()) {
      if (tipoPermissao.valor <= valorCalculo) {
        listaPermissoes.push(tipoPermissao);
        valorCalculo -= tipoPermissao.valor;

        if (valorCalculo === 0) {
          break;
        }
      }
    }

    return listaPermissoes;
  }
}
