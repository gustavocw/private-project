import React from 'react';
import {AdapterProps} from '../Adapter';
import MaskAdapter from './MaskAdapter';

const CnpjMaskAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {children, ...other} = props;

  return (
    <MaskAdapter
      format="##.###.###/####-##"
      {...other}
    >
      {children}
    </MaskAdapter>
  );
};

export default CnpjMaskAdapter;
