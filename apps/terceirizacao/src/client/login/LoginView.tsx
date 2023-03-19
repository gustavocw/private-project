import React, {useCallback, useEffect} from 'react';
import {Button, Card, CardContent, CardMedia, Grid, TextField} from '@material-ui/core';
import LoginBloc from './LoginBloc';
import Login from './Login';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory, useLocation} from 'react-router-dom';
import DialogLicencaView from './licencasDialog/DialogLicencaView';
import LoginImage from '../../images/logo-login.jpg';
import ViewProps from '@alkord/shared/types/ViewProps';
import useQuery from '@alkord/shared/hooks/UseQuery';
import NameToken from '../../modules/NameToken';
import Configuracoes from '@alkord/shared/Configuracoes';
import LicencaVersao from '@alkord/models/LicencaVersao';
import Licenca from '@alkord/models/Licenca';
import Formulario from '@alkord/components/Formulario';
import CampoFormulario from '@alkord/components/CampoFormulario';
import {bindView} from '@alkord/components/ViewBinder';
import {useMessageDialog} from '@alkord/shared/components/dialog/MessageDialog';

const LoginView = (props: ViewProps<LoginBloc>) => {
  const {bloc} = props;
  const {login, erros, licencas} = bloc;

  const classes = styles();
  const emailRef = React.useRef(null);
  const senhaRef = React.useRef(null);

  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const {showMessage, showConfirm} = useMessageDialog();

  const redirecionarPaginaInicial = useCallback(() => {
    if (query.has('redirect_url') && (query.get('redirect_url').length > 0)) {
      const nameToken = NameToken.fromEndPoint(`/${query.get('redirect_url')}`);

      if (!nameToken || !nameToken.isProtected) {
        return history.push(NameToken.REDIRECT_TELA_INICIAL.endpoint);
      }

      let url = nameToken.endpoint;

      if (query.has('redirect_params') && (query.get('redirect_params').length > 0)) {
        url += '?' + query.get('redirect_params');
      }

      history.push(url);
    }
    else {
      history.push(NameToken.REDIRECT_TELA_INICIAL.endpoint);
    }
  }, [query]);

  const recuperarSenha = () => {
    // TODO
    // history.push(NameToken.RECUPERACAO_SENHA.endpoint);
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const windowQuery = new URLSearchParams(window.location.search);

    if (windowQuery.has('reload')) {
      windowQuery.delete('reload');
      window.location.search = windowQuery.toString();
      return;
    }

    const chave = query.get('chave') ?? windowQuery.get('chave');
    if (chave) {
      bloc.efetuarLoginUsandoChaveSve(query.get('chave'))
          .then(redirecionarPaginaInicial)
          .catch((e) => showMessage(null, e.message));
    }
  }, [bloc, location]);

  useEffect(() => {
    if (bloc.licencaSelecionada) {
      if (deveRedirecionarParaBeta()) {
        showConfirm(null,
            'A licença selecionada pertence à um painel em beta. Deseja ser redirecionado para o login correto?',
            () => redirecionarDominio(Configuracoes.get().urlCoreBeta[0]),
        );

        return;
      }

      if (deveRedirecionarParaProducao()) {
        showConfirm(null,
            'A licença selecionada pertence à um painel em produção. Deseja ser redirecionado para o login correto?',
            () => redirecionarDominio(Configuracoes.get().urlCoreProducao[0]),
        );

        return;
      }

      redirecionarPaginaInicial();
    }
  }, [bloc.licencaSelecionada]);

  const deveRedirecionarParaBeta = (): boolean => {
    return bloc.licencaSelecionada.VERSAO === LicencaVersao.BETA &&
      Configuracoes.get().urlCoreProducao.includes(window.location.hostname);
  };

  const deveRedirecionarParaProducao = (): boolean => {
    return bloc.licencaSelecionada.VERSAO === LicencaVersao.PRODUCAO &&
      Configuracoes.get().urlCoreBeta.includes(window.location.hostname);
  };

  const redirecionarDominio = (dominio: string) => {
    window.location.href = `//${dominio}/#${NameToken.LOGIN.endpoint}`;
  };

  const efetuarLogin = async () => {
    // Os valores do bloc são atualizados manualmente por causa de um bug no Firefox ao
    // auto-preencher campos (como acontece nos campos de e-mail e senha)
    bloc.login.EMAIL = emailRef.current.value;
    bloc.login.SENHA = senhaRef.current.value;

    try {
      await bloc.efetuarLogin();
    }
    catch (erro) {
      showMessage(null, erro.message);
    }
  };

  const selecionarLicenca = async (licenca: Licenca) => {
    try {
      await bloc.selecionarLicenca(licenca);
    }
    catch (e) {
      showMessage(null, e.message);
    }
  };

  return (
    <div className={classes.container}>
      <CssBaseline/>
      <Card className={classes.card} raised>
        <CardMedia
          component="img"
          alt="logoVendasExternas"
          height="auto"
          image={LoginImage}
          title="logoVendasExternas"
        />
        <CardContent className={classes.cardContent}>
          <Formulario<Login>
            objeto={login}
            erros={erros}
            className={classes.campoFormulario}
            onSubmit={efetuarLogin}
            id="login-form"
          >
            <Grid container>
              <CampoFormulario propriedade="EMAIL">
                <TextField
                  data-testid="email"
                  label="E-mail"
                  required
                  inputRef={emailRef}
                />
              </CampoFormulario>
              <CampoFormulario propriedade="SENHA">
                <TextField
                  data-testid="senha"
                  label="Senha"
                  type="password"
                  required
                  inputRef={senhaRef}
                />
              </CampoFormulario>
            </Grid>
          </Formulario>

          <div className={classes.buttonContainer}>
            <Button
              onClick={recuperarSenha}
              className={classes.esqueceuSenhaButton}
            >
              ESQUECEU SUA SENHA?
            </Button>
            <Button
              form="login-form"
              type="submit"
              color="primary"
              variant="contained"
            >
              EFETUAR LOGIN
            </Button>
          </div>
        </CardContent>
      </Card>
      <DialogLicencaView
        licencas={licencas}
        open={!!bloc.licencas?.length}
        onClose={() => bloc.licencas = null}
        onSelectItem={selecionarLicenca}
      />
    </div>
  );
};

const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fafafa',
    display: 'flex',
    placeContent: 'center',
    height: '100%',
    // @ts-ignore
    [theme.breakpoints.down('xs')]: {
      backgroundColor: '#ffffff',
    },
  },
  card: {
    maxWidth: 520,
    alignSelf: 'center',
    justifySelf: 'center',
    // @ts-ignore
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: '100%',
      alignSelf: 'start',
      boxShadow: 'none',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    padding: '24px',
  },
  campoFormulario: {
    padding: '8px 0px !important',
  },
  buttonContainer: {
    padding: '24px 0px',
    alignSelf: 'flex-end',
  },
  esqueceuSenhaButton: {
    minWidth: 60,
    marginRight: 12,
    color: '#1E96F3',
  },
}));

export default bindView(LoginView, LoginBloc);
