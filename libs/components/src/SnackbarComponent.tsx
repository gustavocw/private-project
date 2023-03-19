import {Snackbar, SnackbarProps} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import React from 'react';

interface Props extends SnackbarProps {
  message: string;
  open: boolean;
  isError?: boolean;
  handleClose: () => void;
}

const SnackbarComponent = (props: Props) => {
  const {open, message, handleClose, isError} = props;

  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={isError ? 'error' : 'success'}>
        {message}
      </Alert>
    </Snackbar>

  );
};

export default SnackbarComponent;
