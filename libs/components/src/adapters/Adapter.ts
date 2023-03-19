import {ReactElement} from 'react';

export interface AdapterProps {
  children: ReactElement;
  value: any;
  error: string;
  disabled: boolean;
  onChange: (value: any) => void;
}
