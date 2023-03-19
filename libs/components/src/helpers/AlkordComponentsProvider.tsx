import React, {PropsWithChildren} from 'react';
import '../styles/styles.scss';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {GlobalSnackBarProvider} from '../GlobalSnackbar';
import LoadingBar from '../LoadingBar';
import {theme} from '../styles/Styles';
import {ThemeProvider} from '@material-ui/core';
import {DialogProvider} from '@alkord/shared/components/dialog/MessageDialog';

const AlkordComponentsProvider: React.FC<PropsWithChildren<any>> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingBar />
      <DialogProvider>
        <GlobalSnackBarProvider>
          <MuiPickersUtilsProvider utils={MomentUtils} locale={'pt-br'}>
            {props.children}
          </MuiPickersUtilsProvider>
        </GlobalSnackBarProvider>
      </DialogProvider>
    </ThemeProvider>
  );
};

export default AlkordComponentsProvider;
