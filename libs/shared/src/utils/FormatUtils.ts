import moment from 'moment';

export default class FormatUtils {
  static toNumber(valor: string): number {
    if (!valor) {
      return null;
    }

    const valorNumber = Number(valor).valueOf();

    if (Object.is(valorNumber, NaN)) {
      const valorFormatado = valor
          .replaceAll(/\./g, '')
          .replaceAll(/,/g, '.');

      const valorFormatadoNumber = Number(valorFormatado).valueOf();

      return Object.is(valorFormatadoNumber, NaN) ? null : valorFormatadoNumber;
    }
    else {
      return valorNumber;
    }
  }

  static decimal(value: number, quantidadeCasasDecimais: number = 2): string {
    if (value || value === 0) {
      return value.toLocaleString('pt-BR', {
        maximumFractionDigits: quantidadeCasasDecimais,
        minimumFractionDigits: quantidadeCasasDecimais,
      });
    }
  }

  static currency(value: number, casasDecimais = 2): string {
    if (value == null) {
      value = 0;
    }

    return new Intl.NumberFormat(
        'pt-BR',
        {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: casasDecimais,
        }).format(value);
  }

  static date(value: Date, fallbackValue?: string): string {
    if (value === undefined || value === null) {
      return fallbackValue ?? '-';
    }
    else {
      return moment(value).format('DD/MM/YYYY');
    }
  }

  static datetime(value: Date): string {
    if (value === undefined || value === null) {
      return '-';
    }
    else {
      return moment(value).format('DD/MM/YYYY HH:mm');
    }
  }

  static stringPlural(count: number, pattern: string, empty?: string): string {
    if (!count && (empty != null)) return empty;

    const string = pattern.replaceAll('#', (count ?? 0).toString());

    if (count > 1) {
      return string.replace(/\[(.+?)]/g, '').replace(/{(.+?)}/g, '$1');
    }
    else {
      return string.replace(/\[(.+?)]/g, '$1').replace(/{(.+?)}/g, '');
    }
  }

  static maxLengthString(value: string, length: number): string {
    return (value?.length > length) ? `${value.substring(0, length)}...` : value;
  }
}
