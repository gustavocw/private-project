import React, {useEffect, useState} from 'react';
import {Menu, MenuItem} from '@material-ui/core';
import {observer} from 'mobx-react';

export interface ItemDropdown {
  nome: string,
  onClick: (props?: any) => void,
}

interface Props {
  anchorEl?: HTMLElement;
  element?: React.ReactNode;
  itens: ItemDropdown[];
}

const renderItens = (itens: ItemDropdown[], handleClose: () => void) => {
  return itens.map((item, index) => {
    const onClick = () => {
      item.onClick();
      handleClose();
    };

    return (
      <MenuItem key={`${item.nome}-${index}`} onClick={onClick}>{item.nome}</MenuItem>
    );
  },
  );
};

const Dropdown = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(props.anchorEl);
    setOpen(Boolean(anchorEl));
  }, [props.anchorEl]);

  const {
    element,
    itens,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {element && (
        React.cloneElement(element as React.ReactElement, {
          onClick: (e: any) => {
            if (!anchorEl) {
              setAnchorEl(e.currentTarget);
            }

            setOpen(!open);
          },
        })
      )}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => setOpen(false)}
        disableScrollLock={true}
      >
        {renderItens(itens, handleClose)}
      </Menu>
    </>
  );
};


export default observer(Dropdown);
