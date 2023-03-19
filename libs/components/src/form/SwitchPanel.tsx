import {FormControlLabel, Switch} from '@material-ui/core';
import React, {CSSProperties} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

interface Props {
  label: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  outlined?: boolean;
  style?: CSSProperties;
}

const useStyles = makeStyles(() => ({
  outlined: {
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.42)',
    paddingBottom: 4,
    paddingTop: 3,
  },
  areaOutlined: {
    height: 46,
  },
  switchOutlined: {
    margin: -8,
    alignSelf: 'end',
  },
  labelOutlined: {
    alignSelf: 'end',
  },
}));

const SwitchPanel: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const {
    label,
    value,
    onChange,
    disabled,
    outlined,
  } = props;

  return (
    <FormControlLabel
      style={{margin: 'initial', width: '100%', ...props.style}}
      classes={{
        label: outlined ? classes.labelOutlined : undefined,
        root: outlined ? classes.areaOutlined : undefined,
      }}
      className={outlined ? classes.outlined : undefined}
      checked={value ?? false}
      onChange={(e, checked) => onChange(checked)}
      control={
        <Switch
          classes={{
            root: outlined ? classes.switchOutlined : undefined,
          }}
          color="primary"
          disabled={disabled}
        />
      }
      label={label}
      labelPlacement="start"
      disabled={disabled}
    />
  );
};

export default SwitchPanel;
