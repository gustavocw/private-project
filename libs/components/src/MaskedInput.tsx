import React from 'react';
import MaskInput from 'react-text-mask';

interface MaskedInputProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  mask: RegExp[],
  placeholderChar?: string
  showMask?: boolean
}

const MaskedInput = (props: MaskedInputProps) => {
  const {inputRef, mask, placeholderChar = '\u2000', showMask = false, ...other} = props;

  return (
    <MaskInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      placeholderChar={placeholderChar}
      showMask={showMask}
    />
  );
};

export default MaskedInput;
