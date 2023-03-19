import React, {ReactNode} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, CardHeader, Typography} from '@material-ui/core';
import {cardStyles} from './styles/Styles';

interface Props {
  titulo?: React.ReactNode | string;
  subtitulo?: React.ReactNode | string | ReactNode;
  acoesHeader?: React.ReactNode;
  displayDivider?: boolean;
  children?: ReactNode;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  carregando?: boolean
}

const useStyles = makeStyles(() => ({
  cardContent: {
    width: '100%',
    padding: '0',
  },
  header: {
    padding: '24px',
  },
  headerContent: {
    display: 'flex',
  },
  container: {
    width: '100%',
  },
  titulo: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  botaoCarregarMais: {
    width: '100%',
    textAlign: 'center',
  },
  mensagemCard: {
    textAlign: 'center',
    padding: 16,
  },
}));

const CardDefault = function(props: Props) {
  const {
    style,
    titulo,
    subtitulo,
    acoesHeader,
    displayDivider,
    contentStyle,
    children,
  } = props;
  const classes = useStyles();
  const cardClasses = cardStyles();

  return (
    <Card className={cardClasses.card} style={style}>
      {(titulo || subtitulo || acoesHeader) && (
        <CardHeader
          style={{
            borderBottom: displayDivider ? '2px solid #d2d2d2' : 'none',
            maxHeight: !!subtitulo ? null : 62,
          }}
          className={classes.header}
          title={(
            <div className={classes.headerContent}>
              <div className={classes.titulo}>
                {typeof titulo === 'string' ? (
                  <Typography variant="h6" component="h2">
                    {titulo}
                  </Typography>
                ) : titulo}

                {typeof subtitulo === 'string' ? (
                  <Typography color="secondary">
                    {subtitulo}
                  </Typography>
                ) : subtitulo}
              </div>

              {acoesHeader && (
                <div className={cardClasses.cardHeaderActions}>{acoesHeader}</div>
              )}
            </div>
          )}
        >
        </CardHeader>
      )}
      <CardContent
        className={classes.cardContent}
        style={(!!contentStyle ? contentStyle : {padding: (!titulo ? 24 : '0px 24px 24px')})}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default CardDefault;
