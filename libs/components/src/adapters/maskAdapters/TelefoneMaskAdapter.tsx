import React from 'react';
import {AdapterProps} from '../Adapter';
import MaskAdapter from './MaskAdapter';
import {padStart} from 'lodash';

const TelefoneMaskAdapter: React.FC<AdapterProps> = (props: AdapterProps) => {
  const {children, ...other} = props;

  return (
    <MaskAdapter
      format={(string) => {
        if (string.length <= 10) {
          const value = padStart(string, 10, '_');
          return value.replace(/^(.{2})(.{4})(.{4}).*/, '($1) $2-$3');
        }
        else {
          const value = padStart(string, 11, '_');
          return value.replace(/^(.{2})(.{5})(.{4}).*/, '($1) $2-$3');
        }
      }}
      {...other}
    >
      {children}
    </MaskAdapter>
  );
};

export default TelefoneMaskAdapter;
