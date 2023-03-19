import React, {CSSProperties} from 'react';
import {IconButton, Menu, MenuItem, SvgIconProps} from '@material-ui/core';
import MoreVertOutlined from '@material-ui/icons/MoreVertOutlined';

interface ItemDropdown {
  nome: string,
  onClick: (props?: any) => void,
}

interface Props {
  style?: CSSProperties,
  itensMenu: ItemDropdown[],
  icon?: React.ReactElement<SvgIconProps>,
  disabled?: boolean,
}

const renderItens = (itensMenu: ItemDropdown[], handleClose: () => void) => {
  return itensMenu.map((itemMenu) => {
    const onClick = () => {
      itemMenu.onClick();
      handleClose();
    };

    return (
      <MenuItem key={itemMenu.nome} onClick={onClick}>{itemMenu.nome}</MenuItem>
    );
  },
  );
};

const DropdownButton = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        style={{
          opacity: props.itensMenu?.length ? '' : '0',
          ...props.style,
        }}
        disabled={props.disabled || !props.itensMenu?.length}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.icon || <MoreVertOutlined color="secondary"/>}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
      >
        {renderItens(props.itensMenu, handleClose)}
      </Menu>
    </>
  );
};
export default DropdownButton;
