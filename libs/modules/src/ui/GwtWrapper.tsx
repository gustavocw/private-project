import React, {useEffect, useMemo} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Utils from '@alkord/shared/utils/Utils';
import AppBar from '@alkord/components/AppBar';
import ViewContent from '@alkord/components/ViewContent';
import useEffectOnce from '@alkord/shared/hooks/UseEffectOnce';
import IntegracaoGwt from '../IntegracaoGwt';
import ModuleHandlers from '../handlers/ModuleHandlers';

let gwtLoaded = false;

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
    maxWidth: '100%',
  },
}));

const GwtWrapper: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    const integracaoGwt = IntegracaoGwt.get();

    if (!gwtLoaded) {
      if (integracaoGwt.getRotaGwt()) {
        Utils.startLoading();
      }

      integracaoGwt.adicionarEvento('loaded', () => {
        if (integracaoGwt.getRotaGwt()) {
          Utils.finishLoading();
        }

        gwtLoaded = true;
      });
    }

    integracaoGwt.adicionarEvento('unauthorized', () => {
      if (integracaoGwt.getRotaGwt() && gwtLoaded) {
        history.replace(ModuleHandlers.routerProvider.initialScreenRedirectRoute.endpoint);
      }
    });
  }, []);

  useEffect(() => {
    const nameToken = ModuleHandlers.routerProvider.getNameToken(location.pathname);

    if (nameToken?.fullWidth) {
      document.querySelector('#app-content').classList.add(classes.fullWidth);
    }
    else {
      document.querySelector('#app-content').classList.remove(classes.fullWidth);
    }
  }, [location.pathname]);

  return useMemo(() => (
    <>
      <AppBar title="" gwt/>
      <GwtContainer/>
    </>
  ), []);
};

const GwtContainer = () => {
  useEffectOnce(() => {
    IntegracaoGwt.get().onContainerChanged();
  });

  return <ViewContent id="app-content" style={{padding: 0}}/>;
};

export default React.memo(GwtWrapper);
