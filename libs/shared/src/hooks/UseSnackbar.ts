import React from 'react';

const useSnackbar = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string>();
  const [isError, setIsError] = React.useState<boolean>(false);

  const openSnackbar = (msg: string, isError?: boolean) => {
    setMessage(msg);
    setIsError(isError);
    setOpen(true);
  };

  const closeSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return {open, message, openSnackbar, closeSnackbar, isError};
};

export default useSnackbar;
