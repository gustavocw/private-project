import IArquivo from '../components/IArquivo';

export default class Blob {
  private blob: any;

  constructor(arquivo: IArquivo) {
    let type = arquivo.TIPO;

    if (arquivo.CHARSET) {
      type += `;charset=${arquivo.CHARSET}`;
    }

    this.blob = Blob.criarArquivoBlob(arquivo.CONTEUDO, {type});
  }

  private static criarArquivoBlob(conteudo: string, opcoes: { [chave: string]: string }): any {
    conteudo = atob(conteudo);
    const tamanhoFatia = 512;
    const arrayBytes = [];

    for (let indice = 0; indice < conteudo.length; indice += tamanhoFatia) {
      const fatia = conteudo.slice(indice, indice + tamanhoFatia);

      const bytesFatia = new Array(fatia.length);
      for (let i = 0; i < fatia.length; i++) {
        bytesFatia[i] = fatia.charCodeAt(i);
      }

      arrayBytes.push(new Uint8Array(bytesFatia));
    }

    return new window.Blob(arrayBytes, opcoes);
  }

  salvarAquivo(nomeArquivo: string) {
    if (window.navigator['msSaveOrOpenBlob']) {
      window.navigator['msSaveOrOpenBlob'](this.blob, nomeArquivo);
    }
    else {
      const url = window.URL.createObjectURL(this.blob);

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = nomeArquivo;
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }
}
