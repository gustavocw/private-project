import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Theme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {Divider, Typography} from '@material-ui/core';
import {ExitToApp} from '@material-ui/icons';
import NotificacoesList from './NotificacoesList';
import GlobalHandlers from '@alkord/models/handlers/GlobalHandlers';
import {observer} from 'mobx-react';
import ModuleHandlers from '../../handlers/ModuleHandlers';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  menuFooter: {
    ...theme.mixins.toolbar,
    bottom: 0,
    zIndex: 1,
    display: 'flex',
    cursor: 'pointer',
    position: 'sticky',
    padding: '8px 0px',
    background: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTop: '1px solid #e3e3e3',
  },
  footerText: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  texto: {
    paddingLeft: '12px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    lineHeight: 1,
  },
}));

const MenuFooter = () => {
  const classes = useStyles();
  const menuProvider = ModuleHandlers.menuProvider;
  const footerText = menuProvider.footerText;
  const history = useHistory();

  const footerClick = (footerText) => {
    if (footerText.href) {
      history.push(footerText.href.endpoint);
    }
    else if (footerText.onClick) {
      footerText.onClick();
    }
  };

  return (
    <div className={classes.menuFooter}>
      <IconButton onClick={() => GlobalHandlers.gerenciadorDadosSessao.efetuarLogout(true, true)}>
        <ExitToApp color="secondary"/>
      </IconButton>
      <Divider orientation="vertical" light/>
      {footerText ? (
        <div className={classes.footerText} onClick={() => footerClick(footerText)}>
          <Typography variant="body2" color="secondary" className={classes.texto}>
            {footerText.text}
          </Typography>
        </div>
      ) : (
        <div className={classes.footerText}>
          <Typography variant="body2" color="secondary" className={classes.texto}>
            {GlobalHandlers.gerenciadorDadosSessao.dadosSessao?.USUARIO?.nomeExibicao}
          </Typography>
        </div>
      )}
      {menuProvider.footerButtons?.map((button) => (
        <React.Fragment key={button.name}>
          <Divider orientation="vertical" light/>
          {button.component}
        </React.Fragment>
      ))}
      <Divider orientation="vertical" light/>
      <NotificacoesList/>
    </div>
  );
};

export default observer(MenuFooter);
