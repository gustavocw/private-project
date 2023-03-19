import {Typography} from '@material-ui/core';
import React, {useMemo} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

export type TextSize = 'normal' | 'xs' | 'sm' | 'lg' | 'xg';

export type TextColor = 'normal' | 'light' | 'dark' | 'primary' | 'warning' | 'error';

export type TextWeight = 'normal' | 'bold';

export interface TextProps {
  style?: React.CSSProperties;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  inline?: boolean;
  onClick?: () => void;
}

const useStyles = makeStyles(() => ({
  weightNormal: {
    fontWeight: 'normal',
  },
  weightBold: {
    fontWeight: 500,
  },
  fontLarge: {
    fontSize: 16,
  },
  fontExtraLarge: {
    fontSize: 18,
  },
}));

const Text: React.FC<TextProps> = (props) => {
  const classes = useStyles();
  const color = useMemo(() => {
    switch (props.color) {
      case 'light':
        return 'textSecondary';
      case 'normal':
        return 'secondary';
      case 'dark':
        return 'inherit';
      case 'primary':
        return 'textPrimary';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
    }

    return 'inherit';
  }, [props.color]);

  const variant = useMemo(() => {
    switch (props.size) {
      case 'xs':
        return 'overline';
      case 'sm':
        return 'body2';
    }

    return 'body1';
  }, [props.size]);

  const className = useMemo(() => {
    const classList = [];

    if (props.weight === 'bold') {
      classList.push((props.weight === 'bold') ? classes.weightBold : classes.weightNormal);
    }

    switch (props.size) {
      case 'lg':
        classList.push(classes.fontLarge);
        break;
      case 'xg':
        classList.push(classes.fontExtraLarge);
        break;
    }

    return classList.join(' ');
  }, [props.weight, props.size]);

  return (
    <Typography
      style={props.style}
      className={className}
      color={color}
      variant={variant}
      display={props.inline ? 'inline' : undefined}
    >
      {props.children}
    </Typography>
  );
};

export default Text;
