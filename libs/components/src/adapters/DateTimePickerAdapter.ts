import React, {useEffect, useState} from 'react';
import {AdapterProps} from './Adapter';
import moment from 'moment';

export const DateTimePickerAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    onChange,
    error,
    value: dateField,
    disabled,
  } = props;
  const [value, setValue] = useState();

  useEffect(() => setValue(dateField), [dateField]);

  const childrenProps: any = {
    value: value ? value : null,
    disableToolbar: true,
    InputLabelProps: {
      shrink: true,
    },
    onAccept: (data: number) => {
      if (data && moment(data)?.isValid() && moment.isMoment(data)) {
        onChange(new Date(data));
      }
      else {
        setValue(dateField);
      }
    },
    cancelLabel: 'cancelar',
    ampm: false,
    placeholder: '__/__/__  __:__',
    format: 'DD/MM/YYYY HH:mm',
    invalidDateMessage: 'Data inválida',
    minDateMessage: 'Data não deve ser menor que a data mínima',
    maxDateMessage: 'Data não deve ser maior que a data máxima',
    onChange: (date: any) => {
      setValue(date);
    },
    onBlur: () => {
      if (value) {
        onChange(new Date(value));
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
