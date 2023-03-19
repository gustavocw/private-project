import React, {PropsWithChildren} from 'react';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const InfoHeader: React.FC = (props: PropsWithChildren<{}>) => {
  const classes = styles();

  return (
    <div className={classes.wrapper}>
      <EmojiObjectsIcon color="primary" className={classes.svg}/>
      <Typography color="primary">
        {props.children}
      </Typography>
    </div>
  );
};

const styles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  svg: {
    minWidth: 24,
    marginRight: 10,
    alignSelf: 'center',
  },
}));

export default InfoHeader;
