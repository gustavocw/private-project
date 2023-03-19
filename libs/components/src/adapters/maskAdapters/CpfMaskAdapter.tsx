import React from 'react';
import {AdapterProps} from '../Adapter';
import MaskAdapter from './MaskAdapter';

const CpfMaskAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {children, ...other} = props;

  return (
    <MaskAdapter
      format="###.###.###-##"
      {...other}
    >
      {children}
    </MaskAdapter>
  );
};

export default CpfMaskAdapter;
