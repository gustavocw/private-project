import React from 'react';
import {TextField, TextFieldProps, Typography} from '@material-ui/core';

const LimitedInput = (props: TextFieldProps) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
    }}>
      <TextField
        {...props}
      />
      {props.inputProps?.maxLength && (
        <Typography
          variant="caption"
          style={{
            alignSelf: 'flex-end',
            justifySelf: 'flex-end',
          }}
        >
          {`${(props.value as string)?.length ?? 0}/${props.inputProps.maxLength}`}
        </Typography>
      )}
    </div>
  );
};

export default LimitedInput;
