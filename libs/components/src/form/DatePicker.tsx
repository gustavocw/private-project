import React, {useEffect} from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import FormInput from './FormInput';
import moment from 'moment';
import {Moment} from 'moment';
import {observer, useLocalStore} from 'mobx-react';

interface Props extends FormInput<Date> {
  label: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  minDate?: Date;
  maxDate?: Date;
  time?: boolean;
}

const DatePicker: React.FC<Props> = (props: Props) => {
  const {
    label,
    value,
    onChange,
    error,
    helperText,
    required,
    disabled,
    disablePast,
    disableFuture,
    minDate,
    maxDate,
    time,
  } = props;

  const store = useLocalStore(() => ({
    erroValidacao: null as string,
    valor: null as Moment,
  }));

  const format = time ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
  const mask = format.replace(/[\w]/g, '_');

  useEffect(() => {
    store.valor = (value != null) ? moment(value) : null;
  }, [value]);

  const onAlterarValor = (valor: any, dispararErro?: boolean) => {
    if (valor == null) {
      const valorAnterior = store.valor;

      store.valor = null;
      store.erroValidacao = null;

      if (valorAnterior != null) {
        onChange(null);
      }
    }
    else if (validar(valor, dispararErro)) {
      store.valor = valor;
      if (time) onChange(valor.toDate());
      else onChange(moment(valor.toDate()).startOf('d').toDate());
    }
    else {
      store.valor = valor;

      if (value != null) {
        onChange(null);
      }
    }
  };

  const validar = (valor: Moment, dispararErro?: boolean) => {
    if (valor == null) {
      store.erroValidacao = null;
      return true;
    }

    if (!moment(valor)?.isValid() || !moment.isMoment(valor)) {
      if (dispararErro) {
        store.erroValidacao = 'Data inválida';
      }

      return false;
    }

    if (valor.isBefore(minDate || '1900-01-01')) {
      if (dispararErro) {
        store.erroValidacao = 'Data inferior a permitida';
      }

      return false;
    }

    if (valor.isAfter(minDate || '2100-01-01')) {
      if (dispararErro) {
        store.erroValidacao = 'Data superior a permitida';
      }

      return false;
    }

    store.erroValidacao = null;

    return true;
  };

  return (
    <KeyboardDatePicker
      label={required ? `${label} *` : label}
      value={store.valor}
      required={required}
      disableToolbar
      autoOk
      disablePast={disablePast}
      disableFuture={disableFuture}
      minDate={minDate}
      maxDate={maxDate}
      error={!!store.erroValidacao || error}
      disabled={disabled}
      helperText={store.erroValidacao || helperText}
      size="small"
      color="secondary"
      inputProps={{style: {fontSize: 14}}}
      placeholder={mask}
      mask={mask}
      cancelLabel="cancelar"
      format={format}
      invalidDateMessage="Data inválida"
      minDateMessage="Data não deve ser menor que a data mínima"
      maxDateMessage="Data não deve ser maior que a data máxima"
      InputLabelProps={{shrink: true}}
      onChange={(date: Moment) => store.valor = date}
      onAccept={(date: any) => onAlterarValor(date)}
      onBlur={() => onAlterarValor(store.valor, true)}
    />
  );
};

export default observer(DatePicker);
