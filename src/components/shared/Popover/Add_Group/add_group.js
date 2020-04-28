import React from 'react';
import { TextField } from '@material-ui/core';
import { Button } from 'antd';

import './add_group.sass';

const Add_Group = props => {
  return (
    <div className="wrapper-add-group-popover">
      <TextField
        label="Add Group"
        placeholder="type group name..."
        inputProps={{
          type: 'text',
        }}
        onChange={e => props.handleChangeAddGroup(e.target.value)}
      />
      <div className="buttons-container">
        <Button
          type="primary"
          style={{
            margin: '10px',
            border: 'green',
            backgroundColor: 'green',
          }}
          onClick={props.sendAddGroupRequest}
        >
          Add
        </Button>
        <Button
          type="primary"
          style={{
            margin: '10px',
            border: 'red',
            backgroundColor: 'red',
          }}
          onClick={props.handleClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Add_Group;
