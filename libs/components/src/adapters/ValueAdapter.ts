import React from 'react';
import {AdapterProps} from './Adapter';

const ValueAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    error,
    onChange,
    value,
    disabled,
  } = props;

  const childrenProps: any = {
    value: value ?? null,
    onChange: (newValue: any) => {
      onChange(newValue);
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

export default ValueAdapter;
