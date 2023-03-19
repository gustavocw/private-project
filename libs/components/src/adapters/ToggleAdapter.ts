import React, {ChangeEvent} from 'react';
import {AdapterProps} from './Adapter';

export const ToggleAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    onChange,
    value,
    disabled,
  } = props;

  const childrenProps: any = {
    checked: !!value,
    onChange: (e: ChangeEvent<any>) => {
      onChange(e.target.checked);
    },
  };

  if (disabled) {
    childrenProps['disabled'] = true;
  }

  return React.cloneElement(children as React.ReactElement, childrenProps);
};
