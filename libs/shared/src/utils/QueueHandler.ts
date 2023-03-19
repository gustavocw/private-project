import {action} from 'mobx';

type Handler = () => PromiseLike<any>;

export default class QueueHandler {
  private queue: {resolve: (data: any) => void, reject: (error: any) => void}[] = [];
  private handler: Handler = null;
  private limit?: number;

  constructor(handler: Handler, limit?: number) {
    if (limit && (limit < 2)) {
      throw new Error('Limite da fila precisa ser de pelo menos 2 itens');
    }

    this.handler = action(handler);
    this.limit = limit;
  }

  @action.bound
  async execute(): Promise<any> {
    const dados = {resolve: null, reject: null};
    const promise = new Promise((resolve, reject) => {
      dados.resolve = resolve;
      dados.reject = reject;
    });
    this.queue.push(dados);

    if (this.queue.length > this.limit) {
      this.queue.splice(1, 1);
    }

    setTimeout(this.run, 0);

    return promise;
  }

  @action.bound
  private async run() {
    if (this.queue.length > 1) return;

    try {
      this.queue[0].resolve(await this.handler());
    }
    catch (e) {
      this.queue[0].reject(e);
    }
    finally {
      this.queue.shift();

      if (this.queue.length > 0) {
        this.run();
      }
    }
  }
}
