import React from 'react';
import Button from '@material-ui/core/Button';
import SistemaNotificacao from '@alkord/models/SistemaNotificacao';

interface Props {
  notificacao: SistemaNotificacao;
  onClick: () => void;
}

const NotificacaoItem = (props: Props) => {
  const {notificacao, onClick} = props;

  return (
    <Button
      style={{
        cursor: 'pointer',
        background: notificacao.VISUALIZADA ? '#EEE' : '#E8F4FE',
        color: notificacao.VISUALIZADA ? '#CCC' : '#222',
        textTransform: 'none',
        textAlign: 'left',
        fontWeight: 'normal',
      }}
      variant="contained"
      color="primary"
      onClick={onClick}
      disableElevation
    >
      {notificacao.descricaoFormatada}
    </Button>
  );
};

export default NotificacaoItem;
