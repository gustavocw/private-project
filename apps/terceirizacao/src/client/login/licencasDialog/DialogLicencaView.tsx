import React, {useEffect} from 'react';
import {Dialog, DialogContent, ListItemText, Paper, TextField} from '@material-ui/core';
import DialogLicencaBloc from './DialogLicencaBloc';
import {Autocomplete} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import ViewProps from '@alkord/shared/types/ViewProps';
import Licenca from '@alkord/models/Licenca';
import {bindView} from '@alkord/components/ViewBinder';

const useStyles = makeStyles(() => ({
  dialogContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '40vh',
  },
}));

interface Props extends ViewProps<DialogLicencaBloc>{
  licencas: Licenca[],
  onClose: () => void,
  onSelectItem: (licenca: Licenca) => void,
  open: boolean
}

const DialogLicencaView = (props: Props) => {
  const {
    licencas,
    onClose,
    onSelectItem,
    open,
    bloc,
  } = props;
  const classes = useStyles();
  const {limpar} = bloc;

  useEffect(() => {
    if (licencas) {
      bloc.listaLicencas = licencas;
    }
  }, [licencas]);

  const closeDialog = () => {
    onClose();
    limpar();
  };

  const renderItens = (licenca: Licenca) => {
    return (
      <div key={licenca.CODIGO}>
        <ListItemText
          style={{padding: 0}}
          key={licenca.CODIGO}
          primary={licenca.APELIDO ?? licenca.NOME}
          secondary={licenca.NOME}
        />
      </div>
    );
  };

  if (open) {
    return (
      <Dialog
        fullWidth
        transitionDuration={0}
        onClose={onClose}
        open={true}
      >
        <DialogContent
          style={{padding: '0px', overflow: 'hidden'}}
          className={classes.dialogContent}
        >
          <Autocomplete
            open={true}
            popupIcon={null}
            noOptionsText="Nenhuma opção"
            options={bloc.listaLicencas}
            getOptionLabel={(licenca) => `${licenca.CODIGO}  ${licenca.APELIDO} ${licenca.NOME}` }
            renderOption={renderItens}
            onChange={(e, value: any) => {
              if (value.CODIGO) {
                onSelectItem(bloc.listaLicencas.find((licenca) => licenca.CODIGO === value.CODIGO));
                closeDialog();
              }
            }}
            PaperComponent={(a) => {
              return (
                <Paper
                  style={{
                    borderTop: '1px solid #ccc',
                    paddingTop: 0,
                  }}
                  elevation={0}
                  square
                >
                  {a.children}
                </Paper>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus={true}
                InputProps={{...params.InputProps, disableUnderline: true, style: {padding: 16}}}
                placeholder="Filtre a licença desejada"
                variant="standard"
              />
            )}
          />
        </DialogContent>
      </Dialog>
    );
  }
  return null;
};

export default bindView(DialogLicencaView, DialogLicencaBloc);

