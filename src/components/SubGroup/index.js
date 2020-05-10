import React, { useEffect, useState, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { Button, Table } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { get } from 'lodash';

import connect from './../../utils/connectFunction';
import action from './../../utils/actions';
import { wrapRequest } from './../../utils/api';
import { API } from './../../helper/constants';
import Head from './../Header';
import Popover from './../shared/Popover';
import Add_Bookmark from './../shared/Popover/Add_Bookmark';
import Search from './../shared/Search';

import './subgroup.sass';

function SubGroup(props) {
  console.log('SubGroup props', props);

  const [isSending, setIsSending] = useState(false);
  const [exec, setExec] = useState(false);
  const [close, setClose] = useState(true);
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    link: '',
    searchWords: [],
  });
  const [delBookmarks, setDelBookmarks] = useState([]);

  const user_id = get(props, 'match.params.id');
  const group_id = get(props, 'match.params.group');
  const subGroup_id = get(props, 'match.params.subgroup');
  const subGroups = get(props, 'store.subGroups');

  useEffect(() => {
    const fetchBookmarks = async () => {
      const getBookmarks = await wrapRequest({
        method: 'GET',
        url: `${API.URL}:${
          API.PORT
        }/user/${user_id}/group/${group_id}/subgroup/${subGroup_id}/bookmark_list`,
        mode: 'cors',
        cache: 'default',
      });
      const listBookmarks = get(getBookmarks, 'data.bookmarks');
      props.dispatchFetchBookmarks('fetchBookmark', listBookmarks);
    };
    fetchBookmarks();
  }, [exec]);

  const bookmarks = get(props, 'store.bookmarks');

  const columns = [
    {
      title: 'Bookmarks',
      dataIndex: 'id',
      render: text => (
        <Link to={`/user/${user_id}/group/${group_id}/subgroup/${text}`}>
          {bookmarks
            .filter(each => each.id === text)
            .map(each => each.title)
            .join()}
        </Link>
      ),
    },
  ];

  const data =
    bookmarks && bookmarks.map((each, id) => ({ ...each, key: each.id }));

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const preDelBookmarks = selectedRows.filter(each => each !== undefined);
      setDelBookmarks(preDelBookmarks);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const resolveTitle = () =>
    subGroups
      .filter(each => each.id == subGroup_id)
      .map(each => each.name)
      .join()
      .toUpperCase();

  const sendAddBookmarkRequest = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    await wrapRequest({
      method: 'POST',
      url: `${API.URL}:${
        API.PORT
      }/user/${user_id}/group/${group_id}/subgroup/${subGroup_id}/bookmark_create`,
      data: newBookmark,
      mode: 'cors',
      cache: 'default',
    })
      .then(data => {
        if ([200, 201].includes(data.status)) {
          setExec(!exec);
          setClose(false);
          props.dispatchSuccessNotifiction('successNotification', {
            message: data.data.message,
          });
        }
      })
      .catch(e => props.dispatchErrorNotifiction('errorNotification', e));
    setIsSending(false);
  }, [newBookmark, exec]);

  const handleChangeAddBookmarkTitle = value =>
    setNewBookmark({ ...newBookmark, title: value });
  const handleChangeAddBookmarkLink = value =>
    setNewBookmark({ ...newBookmark, link: value });
  const handleChangeAddBookmarkSearchWords = value =>
    setNewBookmark({ ...newBookmark, searchWords: value.split(' ') });

  const sendDeleteBookmarkRequest = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    await wrapRequest({
      method: 'DELETE',
      url: `${API.URL}:${
        API.PORT
      }/user/${user_id}/group/${group_id}/subgroup/${subGroup_id}/bookmark_delete`,
      data: delBookmarks,
      mode: 'cors',
      cache: 'default',
    })
      .then(data => [200, 201].includes(data.status) && setExec(!exec))
      .catch(e => props.dispatchErrorNotifiction('errorNotification', e));
    setIsSending(false);
  }, [delBookmarks, exec]);

  return (
    <div className="wrapper-subgroup">
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <div className="container-subgroup">
            <Head />
            <Grid container spacing={8} justify="center">
              <Grid item xs={4} sm={4}>
                <div className="subgroup-bookmark">
                  <div className="subgroup-nav">
                    <Link to={`/user/${user_id}/group/${group_id}`}>
                      <LeftOutlined />
                      Back
                    </Link>
                    <Typography className="subgroup-title">
                      {resolveTitle()}
                    </Typography>
                  </div>
                  <div className="bookmark-links">
                    {data && (
                      <Table
                        rowSelection={{
                          type: 'checkbox',
                          ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                      />
                    )}
                  </div>
                  <div className="subgroup-nav">
                    <Button
                      type="primary"
                      style={{
                        border: 'red',
                        backgroundColor: 'red',
                      }}
                      onClick={sendDeleteBookmarkRequest}
                    >
                      Delete
                    </Button>
                    <Popover title="Add" color="green">
                      {handleClose => (
                        <Add_Bookmark
                          handleChangeAddBookmarkTitle={
                            handleChangeAddBookmarkTitle
                          }
                          handleChangeAddBookmarkLink={
                            handleChangeAddBookmarkLink
                          }
                          handleChangeAddBookmarkSearchWords={
                            handleChangeAddBookmarkSearchWords
                          }
                          sendAddBookmarkRequest={sendAddBookmarkRequest}
                          close={close}
                          setClose={setClose}
                          handleClose={handleClose}
                        />
                      )}
                    </Popover>
                  </div>
                </div>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Search />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  console.log('subGroup state');
  return { store: state };
};

const mapDispatchToProps = dispatch => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchFetchBookmarks: actionData,
    dispatchErrorNotifiction: actionData,
    dispatchSuccessNotifiction: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SubGroup));
