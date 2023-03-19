import React, {ReactNode, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import {Badge, Button, Popover, Tab, Tabs, Typography} from '@material-ui/core';
import NotificacoesListBloc from './NotificacoesListBloc';
import NotificacaoItem from './NotificacaoItem';
import {NotificationsOutlined} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import SistemaNotificacao from '@alkord/models/SistemaNotificacao';
import {bindView} from '@alkord/components/ViewBinder';
import useBaseViewHandler from '@alkord/shared/bloc/UseBaseViewHandler';
import ViewProps from '@alkord/shared/types/ViewProps';

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
  acaoBotao?: () => void;
}

const TabPanel = (props: TabPanelProps) => {
  const {children, value, index, acaoBotao} = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 16px',
        justifyContent: 'space-between',
        alignContent: 'center',
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
    >
      {value === index && (
        <>
          <div style={{height: acaoBotao ? 400 : 433, width: '100%', overflow: 'auto'}}>
            {children}
          </div>
          {!!acaoBotao && (
            <Button
              color="primary"
              variant="contained"
              onClick={acaoBotao}
            >
              MARCAR TODAS COMO LIDAS
            </Button>
          )}
        </>
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  tab: {
    minWidth: 0,
    minHeight: 0,
    height: 48,
    flexGrow: 1,
    '& > *': {
      alignSelf: 'end',
    },
  },
}));

const NotificacoesList = (props: ViewProps<NotificacoesListBloc>) => {
  const {bloc} = props;
  const {notificacoes} = bloc;
  const [tabIndex, setTabIndex] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  useBaseViewHandler(bloc);

  const selecionarTabPadrao = () => {
    setTabIndex(1);
    setTabIndex(0);
  };

  useEffect(() => {
    if (anchorEl) {
      selecionarTabPadrao();
      setTimeout(selecionarTabPadrao, 250);
    }
  }, [anchorEl]);

  const close = () => {
    setAnchorEl(null);
  };

  const onClickNotificacao = async (notificacao: SistemaNotificacao) => {
    await bloc.executarAcaoNotificacao(notificacao);
    close();
  };

  const renderNotificacoes = (notificacoes: SistemaNotificacao[]) => {
    if (!notificacoes || !notificacoes?.length) {
      return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography color="secondary" variant="body2">
            Não há notificações aqui
          </Typography>
        </div>
      );
    }

    return notificacoes.map((notificacao) => (
      <NotificacaoItem
        key={notificacao.CODIGO.toString()}
        notificacao={notificacao}
        onClick={() => onClickNotificacao(notificacao)}
      />
    ));
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <Badge
          color={'error'}
          badgeContent={(bloc.notificacoesNaoVistas?.length > 0) ? bloc.notificacoesNaoVistas?.length.toString() : null}
        >
          <NotificationsOutlined/>
        </Badge>
      </IconButton>
      <Popover
        id={'notificacoes-popover'}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={close}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* @ts-ignore*/}
        <Box style={{width: 300, border: '2px solid #CCC'}}>
          <Tabs
            centered
            value={tabIndex}
            textColor="primary"
            indicatorColor="primary"
            onChange={(event, newValue) => {
              setTabIndex(newValue);
            }}
            style={{
              padding: '0px 16px',
              minHeight: 0,
            }}
          >
            {['Todas', 'Não Lidas', 'Lidas'].map((item, index) => (
              <Tab
                key={item}
                className={classes.tab}
                id={'tab-' + index}
                label={item}
              />
            ))}
          </Tabs>
          <TabPanel
            value={tabIndex}
            index={0}
            acaoBotao={(bloc.notificacoesNaoVistas?.length > 0) ? bloc.marcarTodasNotificacoesComoLidas : null}
          >
            {renderNotificacoes(notificacoes)}
          </TabPanel>
          <TabPanel
            value={tabIndex}
            index={1}
            acaoBotao={(bloc.notificacoesNaoVistas?.length > 0) ? bloc.marcarTodasNotificacoesComoLidas : null}
          >
            {renderNotificacoes(notificacoes?.filter((notificacao) => !notificacao.VISUALIZADA))}
          </TabPanel>
          <TabPanel
            value={tabIndex}
            index={2}
          >
            {renderNotificacoes(notificacoes?.filter((notificacao) => notificacao.VISUALIZADA))}
          </TabPanel>
        </Box>
      </Popover>
    </>
  );
};

export default bindView(NotificacoesList, NotificacoesListBloc);

