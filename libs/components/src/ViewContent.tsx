import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {createStyles, Theme} from '@material-ui/core/styles';
import {alturaBarraAcoes} from './BarraAcoes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
      paddingTop: 8,
      paddingBottom: 4,
      paddingLeft: 16,
      paddingRight: 16,
    },
    main: {
      flexGrow: 1,
    },
    viewContent: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: 960,
      padding: 16,
      paddingBottom: alturaBarraAcoes + 8,
      marginLeft: 'auto',
      marginRight: 'auto',
      '& > *': {
        flexGrow: 1,
      },
    },
  }),
);

const ViewContent: React.FC<React.PropsWithChildren<any>> = (props: React.PropsWithChildren<any>) => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <div className={classes.toolbar}/>
      <div className={classes.viewContent} {...props}>
        {props.children}
      </div>
    </main>
  );
};

export default ViewContent;
