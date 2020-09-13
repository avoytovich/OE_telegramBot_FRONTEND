import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { get } from 'lodash';

import Head from './../Header';
import connect from './../../utils/connectFunction';
import action from './../../utils/actions';
import { API } from './../../helper/constants';
import { wrapRequest } from './../../utils/api';

import './dashboard.sass';
import invitation from './../../utils/mails/templates/invitation.html';

function Dashboard(props) {
  // console.log('Dashboard props', props);

  const [isSending, setIsSending] = useState(false);
  const [execFetch, setExecFetch] = useState(false);
  const [selectedFollowers, setSelectedFollowers] = useState([]);

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
      title: 'date',
      dataIndex: 'date',
      render: text => text,
    },
    {
      title: 'time',
      dataIndex: 'time',
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
      const presSelectedFollowers = selectedRows.filter(
        each => each !== undefined
      );
      setSelectedFollowers(presSelectedFollowers);
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

  const modalContentDelete = modal => (
    <Fragment>
      <Typography className="modal-question">
        {`${selectedFollowers.length} followers
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
    props.setModalContent(modalContentDelete(props.modal));
    props.modal.current.open();
  };

  const sendDeleteFollowerRequest = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    await wrapRequest({
      method: 'DELETE',
      url: `${API.URL[process.env.NODE_ENV]}/user/${user_id}/followers_delete`,
      data: selectedFollowers,
      mode: 'cors',
      cache: 'default',
    })
      .then(data => {
        props.modal.current.close();
        if ([200, 201].includes(data.status)) {
          props.dispatchSuccessNotifiction('successNotification', {
            message: 'follower was successfully deleted',
          });
          setExecFetch(true);
        }
      })
      .catch(e => props.dispatchErrorNotifiction('errorNotification', e));
    setIsSending(false);
  }, [selectedFollowers]);

  const inputFields = [
    {
      label: 'Join Zoom Meeting',
      type: 'url',
      placeholder: '',
    },
    {
      label: 'Meeting ID',
      type: 'number',
      placeholder: '',
    },
    {
      label: 'Passcode',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'Date',
      type: 'date',
      placeholder: '',
    },
    {
      label: 'Time',
      type: 'time',
      placeholder: '',
    },
    {
      label: 'video',
      type: 'url',
      placeholder: '',
    },
  ];

  let meetingLink,
    meetingId,
    meetingPasscode,
    meetingDate,
    meetingTime,
    videoLink;

  const handleChange = (value, label) => {
    switch (label) {
      case 'Join Zoom Meeting':
        meetingLink = value;
        break;
      case 'Meeting ID':
        meetingId = value;
        break;
      case 'Passcode':
        meetingPasscode = value;
        break;
      case 'Date':
        meetingDate = value;
        break;
      case 'Time':
        meetingTime = value;
        break;
      case 'video':
        videoLink = value;
        break;
    }
  };

  const sendInitialMail = useCallback(
    async event => {
      event.preventDefault();
      if (isSending) return;
      setIsSending(true);
      const newInvitation = invitation
        .replace('#meetingGreeting', `Hi, ${selectedFollowers[0].first_name}!`)
        .replace('#meetingTime', `${meetingTime} ${meetingDate}`)
        .replace('#meetingLink', `${meetingLink}`)
        .replace('#meetingId', `${meetingId}`)
        .replace('#meetingPasscode', `${meetingPasscode}`)
        .replace('#videoLink', `${videoLink}`);
      await wrapRequest({
        method: 'POST',
        url: `${API.URL[process.env.NODE_ENV]}/user/${user_id}/mail_send`,
        data: {
          payload: newInvitation,
          email: selectedFollowers[0].email,
        },
        mode: 'cors',
        cache: 'default',
      })
        .then(data => {
          props.modal.current.close();
          [200, 201].includes(data.status) &&
            props.dispatchSuccessNotifiction('successNotification', {
              message: 'invitation was successfully sent',
            });
        })
        .catch(e => props.dispatchErrorNotifiction('errorNotification', e));
      setIsSending(false);
    },
    [selectedFollowers]
  );

  const modalContentInvite = modal => (
    <Fragment>
      <form onSubmit={sendInitialMail}>
        <div className="modal-invitation">
          {inputFields.map((each, id) => (
            <TextField
              key={id}
              id={each.label}
              name={each.label}
              label={each.label.toUpperCase()}
              placeholder={each.placeholder}
              inputProps={{
                type: each.type,
              }}
              onChange={e => handleChange(e.target.value, each.label)}
              style={{
                borderRadius: '5px',
                backgroundColor: '#e4e4e4',
                marginBottom: '5px',
              }}
              fullWidth
            />
          ))}
        </div>
        <div className="modal-nav">
          <Button
            type="submit"
            color="primary"
            style={{
              border: 'green',
              backgroundColor: 'green',
            }}
          >
            SEND
          </Button>
          <Button
            type="primary"
            style={{
              border: 'red',
              backgroundColor: 'red',
            }}
            onClick={modal.current.close}
          >
            CANCEL
          </Button>
        </div>
      </form>
    </Fragment>
  );

  const confirmationOnInvite = () => {
    props.setModalContent(modalContentInvite(props.modal));
    props.modal.current.open();
  };

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
                    {selectedFollowers.length == 1 ? (
                      <Button
                        type="primary"
                        style={{
                          border: 'green',
                          backgroundColor: 'green',
                        }}
                        onClick={confirmationOnInvite}
                      >
                        Invitation
                      </Button>
                    ) : null}
                    {selectedFollowers.length >= 1 ? (
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
                    ) : null}
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
