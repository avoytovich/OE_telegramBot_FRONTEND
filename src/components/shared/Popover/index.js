import React from 'react';
import { Popover } from '@material-ui/core';
import { Button } from 'antd';

import './popover.sass';

export default function SimplePopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        type="primary"
        style={{
          border: props.color,
          backgroundColor: props.color,
        }}
        onClick={handleClick}
      >
        {props.title}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="popover-content">{props.children(handleClose)}</div>
      </Popover>
    </div>
  );
}
