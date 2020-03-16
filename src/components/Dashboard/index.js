import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { 
  Grid, Typography
} from '@material-ui/core';
import 'antd/dist/antd.css';
import { Button, Input, Table } from 'antd';
import { get } from 'lodash';

import Head from './../Header';
import connect from './../../utils/connectFunction';
import action from './../../utils/actions';
import { API } from "./../../helper/constants";
import { wrapRequest } from "./../../utils/api";

import './dashboard.sass';

const Dashboard = props => {
  console.log('Dashboard props', props);

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      const user_id = get(props, 'match.params.id');
      const getGroup = await wrapRequest({
        method: "GET",
        url: `${API.URL}:${API.PORT}/user/${user_id}/group_list`,
        mode: "cors",
        cache: "default",
      });
      const listGroups = get(getGroup, 'data.groups');
      props.dispatchFetchGroup('fetchGroup', listGroups);
    };
    fetchGroup();
  }, [])

  const user_id = get(props, 'match.params.id');
  const groups = get(props, 'store.groups');
  const { Search } = Input;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => (
        <a href={`/user/${user_id}/group/${text.toLowerCase()}`}>{text}</a>
      ),
    },
  ];
  const data = groups && groups.map((each, id) => ({...each, key: id}));
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const sendAddGroupRequest = useCallback(async () => {
    if (isSending) return
    setIsSending(true)
    await wrapRequest({
      method: "POST",
      url: `${API.URL}:${API.PORT}/user/${user_id}/group_create`,
      data: { name: "Test" },
      mode: "cors",
      cache: "default",
    });
    setIsSending(false)
  }, [isSending])

  return (
    <div className="wrapper-dashboard">
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <div className="container-dashboard">
            <Head />
            <Grid container spacing={8} justify="center">
              <Grid item xs={6} sm={6}>
                <div className="dashboard-group">
                  <div className="group-nav">
                    <Button
                      type="primary"
                      style={{
                        width:'25%',
                        border: 'red',
                        backgroundColor: 'red'
                      }}
                    >
                      Delete Group
                    </Button>
                    <Button
                      type="primary"
                      style={{
                        width:'25%',
                        border: 'green',
                        backgroundColor: 'green'
                      }}
                      onClick={sendAddGroupRequest}
                      disabled={isSending}
                    >
                      Add Group
                    </Button>
                  </div>
                  <div className="group-links">
                    {data &&
                      <Table
                        rowSelection={{
                          type: 'checkbox',
                          ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                      />
                    }
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div className="dashboard-search">
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ 
                      width: '50%'
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {store: state}
};

const mapDispatchToProps = dispatch => {
  const actionData = (name, payload) => dispatch(action(name, payload))
  return {
    dispatchFetchGroup: actionData,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
