import React, {useEffect, useState} from 'react';
import {AdapterProps} from './Adapter';
import moment from 'moment';
import {Moment} from 'moment';

export const DatePickerAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    onChange,
    error,
    value: dateField,
    disabled,
  } = props;
  const [value, setValue] = useState<Moment>();

  useEffect(() => setValue(dateField), [dateField]);

  const childrenProps: any = {
    value: value ? moment(value) : null,
    disableToolbar: true,
    InputLabelProps: {
      shrink: true,
    },
    onAccept: (data: any) => {
      if (data && moment(data)?.isValid() && moment.isMoment(data)) {
        onChange(data.toDate());
      }
      else {
        setValue(dateField);
      }
    },
    placeholder: '__/__/____',
    cancelLabel: 'cancelar',
    autoOk: true,
    format: 'DD/MM/YYYY',
    invalidDateMessage: 'Data inválida',
    minDateMessage: 'Data não deve ser menor que a data mínima',
    maxDateMessage: 'Data não deve ser maior que a data máxima',
    onChange: (date: Moment | null) => {
      setValue(date);
    },
    onBlur: () => {
      if (value && moment(value)?.isValid() && moment.isMoment(value)) {
        onChange(value.toDate());
      }
      else {
        setValue(dateField);
      }
    },
  };

  if (disabled) {
    childrenProps['disabled'] = true;
  }

  if (!!error) {
    childrenProps['error'] = true;
    childrenProps['helperText'] = error;
  }

  return React.cloneElement(children as React.ReactElement, childrenProps);
};
