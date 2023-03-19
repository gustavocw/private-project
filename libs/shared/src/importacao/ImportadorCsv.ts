import {action, observable} from 'mobx';
import CampoImportadorCsv from './CampoImportadorCsv';
import moment from 'moment';
import Utils from '../utils/Utils';

export type RelacaoCamposImportadorCsv = {[campoCsv: string]: CampoImportadorCsv};

export default class ImportadorCsv<T> {
  @observable registrosCsv: string[] = [];
  @observable camposCsv: string[] = [];

  @observable private readonly objetoBase: T;

  constructor(objetoBase: T) {
    this.objetoBase = objetoBase;
  }

  static arquivoParaString(arquivo: File, encoding?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = (error) => reject(error);

      if (encoding) {
        reader.readAsText(arquivo, encoding);
      }
      else {
        reader.readAsBinaryString(arquivo);
      }
    });
  }

  @action.bound
  async gerarDados(arquivo: File) {
    const csv = await ImportadorCsv.arquivoParaString(arquivo, 'UTF-8');

    this.gerarRegistrosCsv(csv);
    this.gerarCamposCsv(csv);
  }

  @action.bound
  private gerarRegistrosCsv(csv: string) {
    this.registrosCsv = csv.split(/\r?\n/).filter((registro) => registro !== '').slice(1);
  }

  @action.bound
  private gerarCamposCsv(csv: string) {
    this.camposCsv = csv.split(/\r?\n/)[0].split(';').map((i) => i.replaceAll('"', ''));
  }

  getRegistros(camposRelacoes: RelacaoCamposImportadorCsv): T[] {
    const camposRelacoesFormatado = this.formatarCamposRelacoes(camposRelacoes);
    const registros = [];

    for (let i = 0; i < this.registrosCsv.length; i++) {
      const registroCsv = this.registrosCsv[i];
      const dadosRegistroCsv = registroCsv.split(';').map((i) => i.replaceAll('"', ''));
      const novoRegistro = Utils.deepClone(this.objetoBase);

      for (let j = 0; j < dadosRegistroCsv.length; j++) {
        const campoSistema = camposRelacoesFormatado[this.camposCsv[j]];

        if (campoSistema !== undefined && dadosRegistroCsv[j]) {
          this.setValorAt(novoRegistro, campoSistema, dadosRegistroCsv[j], i);
        }
      }

      registros.push(novoRegistro);
    }

    return registros;
  }

  private setValorAt(objeto: {}, campoSistema: CampoImportadorCsv, valor: string, indiceRegistro: number) {
    const campos = campoSistema.CAMPO.split('.');
    let currObj = objeto;

    for (let i = 0; i < campos.length; i++) {
      const campo = campos[i];

      if (i < campos.length - 1) {
        if (!currObj[campo]) {
          if (campoSistema.CLASSES && campoSistema.CLASSES[i]) {
            currObj[campo] = Object.assign(new campoSistema.CLASSES[i](), {});
          }
          else {
            currObj[campo] = {};
          }
        }

        currObj = currObj[campo];
      }
      else {
        if (campoSistema.CLASSES && campoSistema.CLASSES[i]) {
          const currClass = campoSistema.CLASSES[i];

          if (currClass === Date) {
            currObj[campo] = this.formatarData(valor);
          }
          else if (currClass === Number) {
            currObj[campo] = this.formatarNumero(valor);
          }
          else {
            currObj[campo] = currClass(valor).valueOf();
          }

          if ([undefined, null].includes(currObj[campo]) || Object.is(currObj[campo], NaN)) {
            throw new Error(`Valor inválido para a coluna "${campo}": ${valor} (registro ${indiceRegistro + 1})`);
          }
        }
        else {
          currObj[campo] = valor;
        }
      }
    }
  }

  private formatarData(valor: string): moment.Moment {
    return moment(valor, 'DD/MM/YYYY');
  }

  private formatarNumero(valor: string): number {
    const valorNumber = Number(valor).valueOf();

    if (Object.is(valorNumber, NaN)) {
      const valorFormatado = valor
          .replaceAll(/\./g, '')
          .replaceAll(/,/g, '.');

      return Number(valorFormatado).valueOf();
    }
    else {
      return valorNumber;
    }
  }

  formatarCamposRelacoes(relacaoCampos: RelacaoCamposImportadorCsv) {
    const relacaoCamposFormatado = Utils.deepClone(relacaoCampos);

    for (const campoCsv of this.camposCsv) {
      if (!relacaoCampos[campoCsv]) {
        relacaoCamposFormatado[campoCsv] = undefined;
      }
    }

    this.limparCamposRelacoesInutilizados(relacaoCamposFormatado);

    return relacaoCamposFormatado;
  }

  private limparCamposRelacoesInutilizados(relacaoCampos: RelacaoCamposImportadorCsv) {
    for (const [campoUsuario] of Object.entries(relacaoCampos)) {
      if (!this.camposCsv.includes(campoUsuario)) {
        delete relacaoCampos[campoUsuario];
      }
    }
  }

  getCamposFaltantes(relacaoCampos: RelacaoCamposImportadorCsv, campos: CampoImportadorCsv[]) {
    const camposObrigatorios = campos.filter((campo) => campo.OBRIGATORIO);
    const relacaoCamposValues = Object.values(relacaoCampos);
    const camposFaltantes = [];

    for (const campoObrigatorio of camposObrigatorios) {
      if (!relacaoCamposValues.find((campoRelacao) => campoRelacao?.CAMPO === campoObrigatorio.CAMPO)) {
        camposFaltantes.push(campoObrigatorio);
      }
    }

    return camposFaltantes;
  }
}
