import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import './add_subgroup.sass';

function Add_Subgroup(props) {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = values => {
    console.log('Success:', values);
    props.sendAddSubGroupRequest();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (!props.close) {
      props.handleClose();
      props.setClose(!props.close);
    }
  }, [props.close]);

  return (
    <div className="wrapper-add-subgroup-popover">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="subgroup"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input title!',
            },
          ]}
          onChange={e => props.handleChangeAddSubGroup(e.target.value)}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              margin: '10px',
              border: 'green',
              backgroundColor: 'green',
            }}
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
        </Form.Item>
      </Form>
    </div>
  );
}

export default Add_Subgroup;
