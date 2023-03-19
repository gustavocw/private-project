import React, {useMemo, useRef} from 'react';
import {IconButton, TextField, Typography} from '@material-ui/core';
import {useLocalStore, useObserver} from 'mobx-react';
import FormDialog from '../dialog/FormDialog';
import * as yup from 'yup';
import moment from 'moment';
import CampoFormulario from '../CampoFormulario';
import {DatePickerAdapter} from '../adapters/DatePickerAdapter';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {Close} from '@material-ui/icons';
import Intervalo from '@alkord/shared/types/Intervalo';

interface Props {
  label: string;
  value?: Intervalo;
  onChange?: (value: Intervalo) => void;
  minDate?: Date;
  maxDate?: Date;
  maxRange?: number; // EM DIAS
  disablePast?: boolean;
  disableFuture?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  clearable?: boolean;
}

const validador = yup.object().shape({
  DATA_INICIAL: yup.date()
      .required()
      .when('DATA_FINAL', (dataFinal: Date, schema: any) => {
        return dataFinal ? schema.max(dataFinal) : schema;
      }),
  DATA_FINAL: yup.date()
      .required()
      .when('DATA_INICIAL', (dataInicial: Date, schema: any) => {
        return dataInicial ? schema.min(dataInicial) : schema;
      }),
}, [['DATA_INICIAL', 'DATA_FINAL']]);

const DateIntervalPicker: React.FC<Props> = (props: Props) => {
  const {
    label,
    value,
    onChange,
    error,
    helperText,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    maxRange,
    required,
  } = props;

  const dataInicialRef = useRef<HTMLInputElement>(null);
  const dataFinalRef = useRef<HTMLInputElement>(null);

  let ultimaDataInicial = null;

  const store = useLocalStore(() => ({
    dialogRegistro: null as Intervalo,
    erro: null,
  }));

  const onClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChange(null);
    e.stopPropagation();
    e.preventDefault();
  };

  const isIntervaloValido = (intervalo: Intervalo) => {
    if (moment(intervalo.DATA_INICIAL).isAfter(intervalo.DATA_FINAL)) {
      store.erro = `A data inicial não pode ser superior a data final`;
      return false;
    }

    if (maxRange) {
      const diferenca = moment(intervalo.DATA_FINAL).diff(moment(intervalo.DATA_INICIAL), 'days');

      if (diferenca > maxRange) {
        store.erro = `O intervalo não pode ser maior do que ${maxRange} dias`;
        return false;
      }
    }

    if (minDate && moment(intervalo.DATA_INICIAL).isBefore(minDate)) {
      store.erro = `A data inicial não pode ser anterior à data mínima`;
      return false;
    }

    if (minDate && moment(intervalo.DATA_FINAL).isBefore(minDate)) {
      store.erro = `A data final não pode ser superior à data máxima`;
      return false;
    }

    store.erro = null;

    return true;
  };

  const valorFormatado = useMemo(() => {
    if (value == null) return '';

    if (value.DATA_FINAL == null) {
      return `A partir de ${moment(value.DATA_INICIAL).format('DD/MM/YYYY')}`;
    }
    else {
      return `${moment(value.DATA_INICIAL).format('DD/MM/YYYY')} - ${moment(value.DATA_FINAL).format('DD/MM/YYYY')}`;
    }
  }, [value]);

  const onSubmit = (intervalo: Intervalo) => {
    if (!isIntervaloValido(intervalo)) return false;

    onChange(intervalo);
  };

  const onClose = () => {
    store.dialogRegistro = null;
    store.erro = null;
  };

  const onKeyUpDataInicial = () => {
    const novaDataInicial = dataInicialRef.current.value.replace(/[_/]/g, '');

    if (ultimaDataInicial == null) {
      ultimaDataInicial = novaDataInicial;
    }

    if (novaDataInicial !== ultimaDataInicial && novaDataInicial.length === 8) {
      ultimaDataInicial = novaDataInicial;
      dataFinalRef.current.focus();
    }
  };

  return useObserver(() => (
    <>
      <TextField
        style={{cursor: 'pointer', width: '100%'}}
        inputProps={{style: {cursor: 'pointer'}}}
        InputProps={{
          readOnly: true,
          endAdornment: (value != null && props.clearable ?
            <IconButton onClick={onClear}>
              <Close/>
            </IconButton> :
            null
          )}}
        placeholder={'Selecione um intervalo'}
        value={valorFormatado}
        label={required ? `${label} *` : label}
        error={error}
        helperText={helperText}
        onClick={() => {
          store.dialogRegistro = value ?? new Intervalo();
        }}
      />

      <FormDialog
        titulo="Selecionar intervalo"
        registro={store.dialogRegistro}
        onSubmit={onSubmit}
        onClose={onClose}
        textoSalvar="SELECIONAR"
        validador={validador}
      >
        {(registroEdicao: Intervalo) => (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {!!store.erro && (
              <Typography style={{padding: '0px 8px 8px 8px'}} variant="body2" color="error">
                {store.erro}
              </Typography>
            )}
            <CampoFormulario propriedade="DATA_INICIAL" adapter={DatePickerAdapter}>
              <KeyboardDatePicker
                autoOk
                autoFocus
                disablePast={disablePast}
                disableFuture={disableFuture}
                minDate={minDate}
                maxDate={registroEdicao.DATA_FINAL || maxDate}
                size="small"
                color="secondary"
                inputProps={{
                  style: {fontSize: 14},
                  onKeyUp: onKeyUpDataInicial,
                }}
                onChange={null}
                value={null}
                placeholder="__/__/____"
                cancelLabel="cancelar"
                format="DD/MM/YYYY"
                invalidDateMessage="Data inválida"
                minDateMessage="Data não deve ser menor que a data mínima"
                maxDateMessage="Data não deve ser maior que a data máxima"
                label="Data Inicial"
                inputRef={dataInicialRef}
              />
            </CampoFormulario>

            <CampoFormulario propriedade="DATA_FINAL" adapter={DatePickerAdapter}>
              <KeyboardDatePicker
                autoOk
                disablePast={disablePast}
                disableFuture={disableFuture}
                minDate={registroEdicao.DATA_INICIAL || minDate}
                maxDate={maxDate}
                size="small"
                color="secondary"
                inputProps={{style: {fontSize: 14}}}
                onChange={null}
                value={null}
                placeholder="__/__/____"
                cancelLabel="cancelar"
                format="DD/MM/YYYY"
                invalidDateMessage="Data inválida"
                minDateMessage="Data não deve ser menor que a data mínima"
                maxDateMessage="Data não deve ser maior que a data máxima"
                label="Data Final"
                inputRef={dataFinalRef}
              />
            </CampoFormulario>
          </div>
        )}
      </FormDialog>
    </>
  ));
};

export default DateIntervalPicker;
