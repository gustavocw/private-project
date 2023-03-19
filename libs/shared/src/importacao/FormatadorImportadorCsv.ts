import CampoImportadorCsv from './CampoImportadorCsv';

export default class FormatadorImportadorCsv {
  static getFormatado(campo: CampoImportadorCsv) {
    return campo.CAMPO
        .replaceAll(/\.\d\./g, ' - ')
        .replaceAll('.', ' - ')
        .replaceAll('_', ' ');
  }
}
