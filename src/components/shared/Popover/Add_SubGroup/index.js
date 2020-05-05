import React from 'react';
import { TextField } from '@material-ui/core';
import { Button } from 'antd';

import './add_subgroup.sass';

function Add_Subgroup(props) {
  return (
    <div className="wrapper-add-subgroup-popover">
      <TextField
        label="Add Subgroup"
        placeholder="type subgroup name..."
        inputProps={{
          type: 'text',
        }}
        onChange={e => props.handleChangeAddSubGroup(e.target.value)}
      />
      <div className="buttons-container">
        <Button
          type="primary"
          style={{
            margin: '10px',
            border: 'green',
            backgroundColor: 'green',
          }}
          onClick={props.sendAddSubGroupRequest}
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
}

export default Add_Subgroup;
