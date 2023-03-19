import React, {Suspense, useEffect} from 'react';
import {HashRouter, Redirect, Route, useHistory} from 'react-router-dom';
import {CacheRoute, CacheSwitch, dropByCacheKey, getCachingKeys} from 'react-router-cache-route';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IntegracaoGwt from './IntegracaoGwt';
import AppProvider, {AppConsumer} from '@alkord/components/AppProvider';
import Utils from '@alkord/shared/utils/Utils';
import ModuleHandlers from './handlers/ModuleHandlers';
import MainView from './ui/MainView';
import GwtWrapper from './ui/GwtWrapper';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import ErrorBoundary from './ErrorBoundary';
import AlertProvider from './AlertProvider';

const useStyles = makeStyles(() => ({
  route: {
    width: '100%',
    height: '100%',
  },
}));

export const clearRouterCache = () => {
  for (const key of getCachingKeys()) {
    if (key !== 'gwt-wrapper') {
      dropByCacheKey(key);
    }
  }
};

const AutenticacaoHandler: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const gerenciadorDadosSessao = GlobalHandlers.gerenciadorDadosSessao;
    const parametros = new URLSearchParams(document.location.search);

    if (parametros.has('chave')) {
      Utils.startLoading();

      gerenciadorDadosSessao.iniciarSessaoUsandoChave(parametros.get('chave')).then(() => {
        Utils.finishLoading();
        parametros.delete('chave');
        document.location.search = parametros.toString();
      }).catch(() => {
        Utils.finishLoading();
        gerenciadorDadosSessao.efetuarLogout();
      });
    }
    else if (!gerenciadorDadosSessao.isAutenticado() && gerenciadorDadosSessao.possuiTokenSalvo()) {
      Utils.startLoading();

      gerenciadorDadosSessao.iniciarSessaoUsandoTokenSalvo()
          .then(() => {
            Utils.finishLoading();
            const parametrosHash = /^.+?\?(.*)$/.exec(document.location.hash)?.slice(-1)[0];
            const textoParametros = new URLSearchParams(parametrosHash).toString();
            const novaUrl = history.location.pathname + (textoParametros ? '?' + textoParametros : '');
            history.replace(novaUrl);
          })
          .catch(() => {
            Utils.finishLoading();
            gerenciadorDadosSessao.efetuarLogout();
          });
    }
    else {
      gerenciadorDadosSessao.efetuarLogout();
    }
  }, []);

  return <></>;
};

const RedirectHandler: React.FC = () => {
  useEffect(() => {
    GlobalHandlers.gerenciadorDadosSessao.efetuarLogout();
  });

  return <></>;
};

const SuspenseLoading: React.FC = () => {
  useEffect(() => {
    Utils.startLoading();

    return () => Utils.finishLoading();
  }, []);

  return <></>;
};

const redirectAutenticacao = () => {
  const gerenciadorDadosSessao = GlobalHandlers.gerenciadorDadosSessao;
  const parametros = new URLSearchParams(document.location.search);

  if (parametros.has('chave')) {
    return <AutenticacaoHandler/>;
  }

  if (!gerenciadorDadosSessao.isAutenticado()) {
    return gerenciadorDadosSessao.possuiTokenSalvo() ? <AutenticacaoHandler/> : <RedirectHandler/>;
  }

  return null;
};

const MainRouter: React.FC = () => {
  const classes = useStyles();
  const routerProvider = ModuleHandlers.routerProvider;
  const protectedRoutes = routerProvider.protectedRoutes;

  return (
    // @ts-ignore
    <CacheRoute path='/'>
      <AppProvider>
        <MainView>
          <CacheSwitch>
            <Route exact path='/'>
              <Redirect to={routerProvider.baseScreen.endpoint}/>
            </Route>
            <CacheRoute
              cacheKey="gwt-wrapper"
              // @ts-ignore
              path={protectedRoutes.filter((value) => value.isGwt).map((value) => value.endpoint)}
              className={classes.route}
              render={() => {
                IntegracaoGwt.get().setRotaGwt(true);

                return redirectAutenticacao() ?? <GwtWrapper/>;
              }}
            />
            {protectedRoutes
                .filter((value) => !value.isGwt)
                .map((value) => (
                  <CacheRoute
                    // @ts-ignore
                    exact
                    key={value.endpoint}
                    cacheKey={value.endpoint}
                    path={value.endpoint}
                    className={classes.route}
                    render={(props) => {
                      IntegracaoGwt.get().setRotaGwt(false);

                      return redirectAutenticacao() ?? (
                        GlobalHandlers.gerenciadorDadosSessao.podeAcessarPagina(value) ? (
                          <AppConsumer>
                            <Suspense fallback={<SuspenseLoading/>}>
                              <ErrorBoundary>
                                <value.component {...props}/>
                              </ErrorBoundary>
                            </Suspense>
                          </AppConsumer>
                        ) : (
                          <Redirect to={routerProvider.initialScreenRedirectRoute.endpoint} />
                        )
                      );
                    }}
                  />
                ))}
          </CacheSwitch>
        </MainView>
      </AppProvider>
    </CacheRoute>
  );
};

const OpenRouter: React.FC<{component: React.ComponentType<any>}> = (props: {component: React.ComponentType<any>}) => {
  return (
    <Suspense
      fallback={(
        <div id="carregando" className="carregandoWrapper">
          <div className="carregando"/>
          <div className="carregandoTexto">aguarde</div>
        </div>
      )}
    >
      <ErrorBoundary>
        <props.component/>
      </ErrorBoundary>
    </Suspense>
  );
};

const redirectTelaInicial = () => {
  const initialScreen = ModuleHandlers.routerProvider.initialScreen;

  return <Redirect to={typeof initialScreen === 'string' ? initialScreen : initialScreen.endpoint}/>;
};

const redirectPadrao = () => {
  if (GlobalHandlers.gerenciadorDadosSessao.isAutenticado()) {
    return <Redirect to={ModuleHandlers.routerProvider.initialScreenRedirectRoute.endpoint}/>;
  }

  return <Redirect to={ModuleHandlers.routerProvider.baseScreen.endpoint}/>;
};

const Router: React.FC = () => {
  return (
    <HashRouter>
      <AlertProvider>
        <CacheSwitch>
          <Route exact path='/' render={redirectPadrao}/>
          <Route path={ModuleHandlers.routerProvider.initialScreenRedirectRoute.endpoint} render={redirectTelaInicial}/>
          {ModuleHandlers.routerProvider.openRoutes
              ?.filter((route) => {
                const path = (typeof route.path === 'string') ? route.path : route.path.endpoint;

                return (
                  (route.component || route.render) &&
                  (path !== ModuleHandlers.routerProvider.initialScreenRedirectRoute.endpoint)
                );
              })
              ?.map((route) => {
                const path = (typeof route.path === 'string') ? route.path : route.path.endpoint;

                if (route.component) {
                  return (
                    <Route key={path} path={path}>
                      <OpenRouter component={route.component}/>
                    </Route>
                  );
                }

                const render = route.render();

                return (
                  <Route key={path} path={path}>
                    {(typeof render === 'string') ? (
                      <Redirect to={render}/>) : render
                    }
                  </Route>
                );
              })}
          <MainRouter/>
        </CacheSwitch>
      </AlertProvider>
    </HashRouter>
  );
};

export default Router;
