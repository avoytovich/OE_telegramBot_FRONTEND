import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import 'antd/dist/antd.css';
import { Button, Table } from 'antd';
import { get } from 'lodash';

import Head from './../Header';
import connect from './../../utils/connectFunction';
import action from './../../utils/actions';
import { API } from './../../helper/constants';
import { wrapRequest } from './../../utils/api';

import './dashboard.sass';

function Dashboard(props) {
  // console.log('Dashboard props', props);

  const [isSending, setIsSending] = useState(false);
  const [execFetch, setExecFetch] = useState(false);
  const [delFollowers, setDelFollowers] = useState([]);

  const user_id = get(props, 'match.params.id');

  useEffect(() => {
    const fetchFollower = async () => {
      const getFollower = await wrapRequest({
        method: 'GET',
        url: `${API.URL[process.env.NODE_ENV]}/user/${user_id}/follower_list`,
        mode: 'cors',
        cache: 'default',
      });
      const listFollowers = get(getFollower, 'data.followers');
      props.dispatchFetchFollower('fetchFollower', listFollowers);
    };
    const follower = get(
      JSON.parse(localStorage.getItem('state')),
      'followers'
    );
    if (!follower || execFetch) {
      fetchFollower();
      setExecFetch(false);
    } else {
      props.dispatchFetchFollower('fetchFollower', follower);
    }
  }, [execFetch]);

  const followers = get(props, 'store.followers');

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      render: text => text,
    },
    {
      title: 'first name',
      dataIndex: 'first_name',
      render: text => text,
    },
    {
      title: 'last name',
      dataIndex: 'last_name',
      render: text => text,
    },
    {
      title: 'email',
      dataIndex: 'email',
      render: text => text,
    },
    {
      title: 'level',
      dataIndex: 'level',
      render: text => text,
    },
    {
      title: 'join',
      dataIndex: 'createdAt',
      render: text => text.slice(0, 10),
    },
  ];
  const data =
    followers && followers.map((each, id) => ({ ...each, key: each.id }));

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const preDelFollowers = selectedRows.filter(each => each !== undefined);
      setDelFollowers(preDelFollowers);
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   'selectedRows: ',
      //   selectedRows
      // );
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const modalContent = modal => (
    <Fragment>
      <Typography className="modal-question">
        {`${delFollowers.length} followers
          will be deleted at all! Are you sure?`}
      </Typography>
      <div className="modal-nav">
        <Button
          type="primary"
          style={{
            border: 'red',
            backgroundColor: 'red',
          }}
          onClick={sendDeleteFollowerRequest}
        >
          YES
        </Button>
        <Button
          type="primary"
          style={{
            border: 'green',
            backgroundColor: 'green',
          }}
          onClick={modal.current.close}
        >
          NO
        </Button>
      </div>
    </Fragment>
  );

  const confirmationOnDelete = () => {
    props.setModalContent(modalContent(props.modal));
    props.modal.current.open();
  };

  const sendDeleteFollowerRequest = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    await wrapRequest({
      method: 'DELETE',
      url: `${API.URL[process.env.NODE_ENV]}/user/${user_id}/followers_delete`,
      data: delFollowers,
      mode: 'cors',
      cache: 'default',
    })
      .then(data => {
        props.modal.current.close();
        [200, 201].includes(data.status) && setExecFetch(true);
      })
      .catch(e => props.dispatchErrorNotifiction('errorNotification', e));
    setIsSending(false);
  }, [delFollowers]);

  return (
    <div className="wrapper-dashboard">
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <div className="container-dashboard">
            <Head />
            <Grid container spacing={8} justify="center">
              <Grid item xs={12} sm={12}>
                <div className="dashboard-follower">
                  <div className="follower-list">
                    {data && (
                      <Table
                        rowSelection={{
                          type: 'checkbox',
                          ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                        pagination={{ pageSize: 5 }}
                      />
                    )}
                  </div>
                  <div className="follower-nav">
                    <Button
                      type="primary"
                      style={{
                        border: 'red',
                        backgroundColor: 'red',
                      }}
                      onClick={confirmationOnDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return { store: state };
};

const mapDispatchToProps = dispatch => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchFetchFollower: actionData,
    dispatchErrorNotifiction: actionData,
    dispatchSuccessNotifiction: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
