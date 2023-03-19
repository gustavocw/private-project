import {Grid} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import ViewContent from './ViewContent';
import CardForm from './CardForm';
import React from 'react';

interface Props {
  titulo: string;
  independent?: boolean; // TODO inverter
}

const SkeletonLoadingCard = (props: Props) => {
  const Holder = props.independent ? React.Fragment : ViewContent;

  return (
    <Holder>
      <CardForm titulo={props.titulo}>
        <SkeletonLoadingContent/>
      </CardForm>
    </Holder>
  );
};

export const SkeletonLoadingContent = () => {
  return (
    <Grid container spacing={1} style={{padding: 20}}>
      <SkeletonCarregamento height={16} fullWidth/>
      <SkeletonCarregamento height={36}/>
      <SkeletonCarregamento height={36}/>
      <SkeletonCarregamento height={36}/>
      <SkeletonCarregamento height={36}/>
    </Grid>
  );
};

const SkeletonCarregamento = (props: { height: number, fullWidth?: boolean }) => {
  const {height, fullWidth} = props;

  return (
    <Grid
      item
      md={fullWidth ? 12 : 6} sm={12} xs={12}
    >
      <Skeleton variant="rect" animation="wave" height={height} width="100%"/>
    </Grid>
  );
};

export default SkeletonLoadingCard;
