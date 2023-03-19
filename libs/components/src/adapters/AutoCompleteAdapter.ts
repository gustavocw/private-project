import React, {ChangeEvent} from 'react';
import {AdapterProps} from './Adapter';

export const AutoCompleteAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    onChange,
    value,
    disabled,
  } = props;

  const childrenProps: any = {
    value: value ?? [],
    onChange: (e: ChangeEvent<any>, newValue: Array<string>) => {
      onChange(newValue);
    },
  };

  if (disabled) {
    childrenProps['disabled'] = true;
  }

  return React.cloneElement(children as React.ReactElement, childrenProps);
};
