import React, {ChangeEvent} from 'react';
import {AdapterProps} from './Adapter';

const EventValueAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    error,
    onChange,
    value,
    disabled,
  } = props;

  const childrenProps: any = {
    value: value ?? null,
    onChange: (e: ChangeEvent<any>, newValue: any) => {
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

export default EventValueAdapter;
