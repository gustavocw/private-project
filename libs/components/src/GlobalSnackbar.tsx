import React, {PropsWithChildren, useEffect} from 'react';
import {Button} from '@material-ui/core';
import {OptionsObject, SnackbarKey, SnackbarMessage, SnackbarProvider, useSnackbar} from 'notistack';

interface GlobalSnackbarProps {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
  closeSnackbar: (key?: SnackbarKey) => void;
}

const GlobalSnackbar: GlobalSnackbarProps = {
  enqueueSnackbar: null,
  closeSnackbar: null,
};

export default GlobalSnackbar;

const snackbarRef: React.Ref<SnackbarProvider> = React.createRef();

const CoreSnackbarProvider: React.FC<PropsWithChildren<any>> = (props) => {
  const {children} = props;
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  useEffect(() => {
    GlobalSnackbar.enqueueSnackbar = enqueueSnackbar;
    GlobalSnackbar.closeSnackbar = closeSnackbar;
  }, [enqueueSnackbar, closeSnackbar]);

  return <>{children}</>;
};

export const GlobalSnackBarProvider: React.FC<PropsWithChildren<any>> = (props) => {
  const {children} = props;

  return (
    <SnackbarProvider
      style={{whiteSpace: 'pre-wrap'}}
      ref={snackbarRef}
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      action={(key) => (
        <Button onClick={() => snackbarRef.current.closeSnackbar(key)}>FECHAR</Button>
      )}
    >
      <CoreSnackbarProvider>
        {children}
      </CoreSnackbarProvider>
    </SnackbarProvider>
  );
};
