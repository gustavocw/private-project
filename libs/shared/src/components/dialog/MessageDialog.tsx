import React, {useContext, useState} from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import {observer, useLocalStore} from 'mobx-react';

type ButtonAction = { name: string, onClick: () => void };
export type MessageDialogButton = (() => void) | ButtonAction;
type MessageDialogShowMessageType = (title?: string, content?: string, onClick?: MessageDialogButton) => void;
type MessageDialogShowConfirmType = (
  title: string,
  message: string,
  onConfirm: MessageDialogButton,
  onCancel?: MessageDialogButton
) => void;

export interface MessageDialogProps extends Omit<any, any>{
  showMessage: MessageDialogShowMessageType;
  showConfirm: MessageDialogShowConfirmType;
  setLoading: (loading: boolean, message?: string) => void;
}

export const MessageDialog = React.createContext<MessageDialogProps>({
  showMessage: null,
  showConfirm: null,
} as MessageDialogProps);

export const useMessageDialog = () => useContext(MessageDialog);

export const DialogProvider = observer((props: React.PropsWithChildren<any>) => {
  const {children} = props;
  const [dialogTitle, setDialogTitle] = useState<string>();
  const [dialogContent, setDialogContent] = useState<string|React.ReactNode>();
  const [buttons, setButtons] = useState<ButtonAction[]>();
  const [disableBackdrop, setDisableBackdrop] = useState<boolean>(false);
  const store = useLocalStore(() => ({
    showDialog: false,
  }));

  const dialogProps: MessageDialogProps = {
    showMessage: (title, content, onClick) => {
      store.showDialog = true;
      setDialogTitle(title);
      setDialogContent(content);
      setDisableBackdrop(false);
      setButtons([
        (!!onClick && typeof onClick === 'object') ? onClick : {name: 'OK', onClick} as ButtonAction,
      ]);
    },
    showConfirm: (title = '', message, onConfirm, onCancel) => {
      store.showDialog = true;
      setDialogTitle(title);
      setDialogContent(message);
      setDisableBackdrop(true);
      setButtons([
        (!!onConfirm && typeof onConfirm === 'object') ?
          onConfirm : {name: 'Confirmar', onClick: onConfirm} as ButtonAction,
        (!!onCancel && typeof onCancel === 'object') ?
          onCancel : {name: 'Cancelar', onClick: onCancel} as ButtonAction,
      ]);
    },
    setLoading: (loading, message) => {
      store.showDialog = loading;
      setDialogTitle('');
      setDialogContent(() => (
        <div style={{
          width: 150,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography>{message ?? 'Carregando...'}</Typography>
          <CircularProgress style={{margin: 16}} disableShrink/>
        </div>
      ));
      setButtons(null);
    },
  };

  return (
    <MessageDialog.Provider value={dialogProps}>
      <Dialog
        open={store.showDialog}
        disableBackdropClick={disableBackdrop}
        onClose={() => store.showDialog = false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {dialogTitle && (
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        )}
        <DialogContent>
          {(typeof dialogContent === 'string') ? (
            <DialogContentText id="alert-dialog-description" style={{whiteSpace: 'pre-wrap'}}>
              {dialogContent}
            </DialogContentText>
          ) : (dialogContent)}
        </DialogContent>

        {!!buttons?.length && (
          <DialogActions style={{flexDirection: 'row-reverse', justifyContent: 'flex-start'}}>
            {buttons.map((button: any, index: number) => (
              <Button
                key={button.name}
                onClick={() => {
                  if (!store.showDialog) return;

                  store.showDialog = false;

                  if (button.onClick) {
                    button.onClick();
                  }
                }}
                color={(index === 0) ? 'primary' : 'secondary'}
              >
                {button.name}
              </Button>
            ))}
          </DialogActions>
        )}
      </Dialog>
      {children}
    </MessageDialog.Provider>
  );
});
