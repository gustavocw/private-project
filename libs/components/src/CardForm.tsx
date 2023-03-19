import React, {ReactNode} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardDefault from './CardDefault';

interface Props {
  titulo?: string;
  subtitulo?: string;
  acoesHeader?: React.ReactNode;
  displayDivider?: boolean;
  children: ReactNode;
}

const useStyles = makeStyles(() => ({
  content: {
    padding: '0',
  },
}));

const CardForm = (props: React.PropsWithChildren<Props>) => {
  const {
    titulo,
    subtitulo,
    children,
    displayDivider,
    acoesHeader,
  } = props;
  const classes = useStyles();

  return (
    <CardDefault
      titulo={titulo}
      subtitulo={subtitulo}
      acoesHeader={acoesHeader}
      displayDivider={displayDivider}
      contentStyle={{padding: 0}}
    >
      <div className={classes.content} style={!titulo ? {paddingTop: 24} : {}}>
        {children}
      </div>
    </CardDefault>
  );
};

export default CardForm;
