import React, {ChangeEvent, useEffect, useState} from 'react';
import {AdapterProps} from './Adapter';

export const TextAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    error,
    onChange,
    value: fieldValue,
    disabled,
  } = props;
  const [value, setValue] = useState();

  useEffect(() => setValue(fieldValue), [fieldValue]);

  const childrenProps: any = {
    value: value ?? '',
    error: !!error,
    onChange: (e: ChangeEvent<any>) => {
      const novoValor = e.target.value;
      setValue(novoValor || '');
    },
    onBlur: () => {
      onChange(value);
      setValue(fieldValue);
    },
    SelectProps: {onClose: () => setTimeout(() => (document.activeElement as HTMLElement).blur(), 0)},
  };

  if (disabled) {
    childrenProps['disabled'] = true;
  }

  if (!!error) {
    childrenProps['helperText'] = error;
  }

  return React.cloneElement(children as React.ReactElement, childrenProps);
};
