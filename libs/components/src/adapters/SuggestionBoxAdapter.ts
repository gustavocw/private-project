import React, {ChangeEvent} from 'react';
import {AdapterProps} from './Adapter';

const SuggestionBoxAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {
    children,
    error,
    onChange,
    value,
    disabled,
  } = props;

  const childrenProps: any = {
    value: value ?? (children.props.multiple ? [] : null),
    onChange: (e: ChangeEvent<any>, newValue: Object | string | Array<string>) => {
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

export default SuggestionBoxAdapter;
