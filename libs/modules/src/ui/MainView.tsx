import React, {useCallback, useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import IntegracaoGwt from '../IntegracaoGwt';
import {AppContext} from '@alkord/components/AppProvider';
import useEventListener from '@alkord/shared/hooks/UseEventListener';
import {ComponentConfigHolder} from '@alkord/components/helpers/ComponentsConfigProvider';
import Menu from './menu/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      // @ts-ignore
      [theme.breakpoints.up('md')]: {
        width: ComponentConfigHolder.get().drawerWidth,
        scrollbarWidth: 'none',
        flexShrink: 0,
      },
    },
    toolbar: {
      ...theme.mixins.toolbar,
      paddingLeft: 24,
    },
    drawerPaper: {
      width: ComponentConfigHolder.get().drawerWidth,
      scrollbarWidth: 'none',
      height: '100%',
    },
    bold: {
      fontWeight: 500,
    },
    routeHidden: {
      display: 'none',
    },
    routeVisible: {
      width: '100%',
    },
    menuItem: {
      paddingTop: 0,
      paddingBottom: 0,
      '&.Mui-selected': {
        backgroundColor: '#FFF',
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#FFF',
      },
      '&.Mui-selected:hover': {
        backgroundColor: '#EEE',
      },
      '& .MuiListItemText-primary': {
        fontSize: '14px',
      },
      '&.Mui-selected .MuiListItemText-primary': {
        color: '#1e96f3',
      },
      '&.Mui-selected .material-icons': {
        color: '#1e96f3',
      },
    },
  }),
);

export interface EventoNavegacao {
  subtela?: boolean;
  endpoint: string;
  menu?: React.ReactNode;
}

const MainView: React.FC<React.PropsWithChildren<any>> = (props: React.PropsWithChildren<any>) => {
  const classes = useStyles();
  const {children} = props;
  const {state, update} = useContext(AppContext);
  const setMobileOpen = (drawerOpen: boolean) => {
    update('drawerOpen', drawerOpen);
  };

  const history = useHistory();
  const navegacaoHandler = useCallback((event: { detail: EventoNavegacao }) => {
    const eventoNavegacao = event.detail;

    IntegracaoGwt.get().setNavegandoSubtelaGwt(!!eventoNavegacao.subtela);

    if (eventoNavegacao.subtela) {
      history.push(eventoNavegacao.endpoint);
    }
    else {
      history.replace(eventoNavegacao.endpoint);
    }
  }, [history]);

  useEventListener('__react_navegacao', navegacaoHandler);

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={state.drawerOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {props.menu || <Menu/>}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            open
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {props.menu || <Menu/>}
          </Drawer>
        </Hidden>
      </nav>

      {children}
    </div>
  );
};

export default MainView;
