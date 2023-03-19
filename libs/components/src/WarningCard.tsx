import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import CardDefault from './CardDefault';

interface Props {
  titulo: string;
  mensagem: string;
}

const WarningCard: React.FC<Props> = (props: Props) => {
  const classes = styles();

  return (
    <CardDefault contentStyle={{background: '#FFF3CD', padding: 16}}>
      <div className={classes.wrapper}>
        <Typography className={classes.title}>{props.titulo}</Typography>
        <Typography className={classes.text}>{props.mensagem}</Typography>
      </div>
    </CardDefault>
  );
};

const styles = makeStyles(() => ({
  wrapper: {
    background: '#FFF3CD',
  },
  title: {
    color: '#856404',
    fontWeight: 'bold',
  },
  text: {
    color: '#856404',
  },
}));

export default WarningCard;
