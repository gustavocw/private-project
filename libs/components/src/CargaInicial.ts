import IRetornoRegistros from '@alkord/shared/api/IRetornoRegistros';

type AsyncFn = () => Promise<any>;

export default class CargaInicial {
  itens: Promise<any>[] = [];

  constructor(itens?: AsyncFn[]) {
    if (itens) {
      this.adicionar(itens);
    }
  }

  adicionar(item: AsyncFn | AsyncFn[]): CargaInicial {
    const itensAdicao = Array.isArray(item) ? item : [item];

    for (const itemAdicao of itensAdicao) {
      this.itens.push(new Promise<any>((resolve, reject) => {
        itemAdicao().then(resolve).catch(reject);
      }));
    }

    return this;
  }

  buscarTodos<T>(funcaoBusca: (registroInicial: number) => Promise<IRetornoRegistros<T>>,
      onSuccess: (registros: T[]) => void): CargaInicial {
    this.adicionar(async () => {
      const registros: T[] = [];
      let totalRegistros = 0;

      do {
        const response = await funcaoBusca(registros.length);

        totalRegistros = response.TOTAL_REGISTROS;
        registros.push(...response.REGISTROS);
      } while (registros.length < totalRegistros);

      onSuccess(registros);
    });

    return this;
  }

  async executar() {
    return Promise.all(this.itens).then(() => {
      this.itens = [];
    });
  }
}
