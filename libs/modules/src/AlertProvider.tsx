import React, {PropsWithChildren, useCallback} from 'react';
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import INameToken from '@alkord/shared/bloc/INameToken';
import GlobalSnackbar from '@alkord/components/GlobalSnackbar';
import useEventListener from '@alkord/shared/hooks/UseEventListener';
import ModuleHandlers from './handlers/ModuleHandlers';

const AlertProvider: React.FC<PropsWithChildren<any>> = (props) => {
  const {children} = props;
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const abrirSnackbar = useCallback((mensagem, nameToken: INameToken) => {
    GlobalSnackbar.enqueueSnackbar(mensagem, {
      persist: true,
      variant: 'warning',
      action: (key) => (
        <>
          <Button
            onClick={() => {
              history.push(nameToken.endpoint);
              GlobalSnackbar.closeSnackbar(key);
            }}
          >
            ACESSAR
          </Button>
          <Button onClick={() => GlobalSnackbar.closeSnackbar(key)}>
            FECHAR
          </Button>
        </>
      ),
    });
  }, [history]);

  const tokenAtualizadoHandler = useCallback( async () => {
    const alertProvider = ModuleHandlers.alertProvider;

    if (alertProvider) {
      const message = await alertProvider.onTokenAlterado();

      if (message) {
        abrirSnackbar(message.message, message.nameToken);
      }
    }
  }, []);

  useEventListener('__react_token_atualizado', tokenAtualizadoHandler);

  return children;
};

export default AlertProvider;
