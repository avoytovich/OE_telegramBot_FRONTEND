import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import './add_bookmark.sass';

function Add_Bookmark(props) {
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
    props.sendAddBookmarkRequest();
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
    <div className="wrapper-add-bookmark-popover">
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
          label="bookmark"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input title!',
            },
          ]}
          onChange={e => props.handleChangeAddBookmarkTitle(e.target.value)}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="link"
          name="link"
          rules={[
            {
              required: true,
              message: 'Please input link!',
            },
          ]}
          onChange={e => props.handleChangeAddBookmarkLink(e.target.value)}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="search words"
          name="search_words"
          rules={[
            {
              required: true,
              message: 'Please input link!',
            },
          ]}
          onChange={e =>
            props.handleChangeAddBookmarkSearchWords(e.target.value)
          }
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

export default Add_Bookmark;
