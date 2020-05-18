import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { LeftOutlined } from '@ant-design/icons';
import { get } from 'lodash';

import connect from './../../utils/connectFunction';
import action from './../../utils/actions';
import Head from './../Header';

import './bookmark.sass';

function Bookmark(props) {
  //console.log('Bookmark props', props);

  const user_id = get(props, 'match.params.id');
  const group_id = get(props, 'match.params.group');
  const subGroup_id = get(props, 'match.params.subgroup');
  const bookmark_id = get(props, 'match.params.bookmark');
  const groups = get(props, 'store.groups');
  const subGroups = get(props, 'store.subGroups');
  const bookmarks = get(props, 'store.bookmarks');

  useEffect(() => {
    props.dispatchErrorNotifiction('errorNotification', { message: 'hayu' });
  }, []);

  const resolveTitle = () => {
    const { searchSubGroup } = props.store;
    if (searchSubGroup) {
      return `${groups
        .filter(each => each.id == group_id)
        .map(each => each.name)
        .join()
        .toUpperCase()} / ${searchSubGroup
        .filter(each => each.id == subGroup_id)
        .map(each => each.name)[0]
        .toUpperCase()}`;
    } else {
      return `${groups
        .filter(each => each.id == group_id)
        .map(each => each.name)
        .join()
        .toUpperCase()} / ${subGroups
        .filter(each => each.id == subGroup_id)
        .map(each => each.name)
        .join()
        .toUpperCase()}`;
    }
  };

  const resolveSrc = () => {
    const { searchBookmark } = props.store;
    if (searchBookmark) {
      return searchBookmark
        .filter(each => each.id == bookmark_id)
        .map(each => each.link)
        .join();
    } else {
      return bookmarks
        .filter(each => each.id == bookmark_id)
        .map(each => each.link)
        .join();
    }
  };

  return (
    <div className="wrapper-bookmark">
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <div className="container-bookmark">
            <Head />
            <Grid container spacing={0} justify="center">
              <Grid item xs={12} sm={12}>
                <div className="bookmark-with-nav">
                  <div className="bookmark-nav">
                    <Link
                      to={
                        subGroups
                          ? `/user/${user_id}/group/${group_id}/subgroup/${subGroup_id}`
                          : `/user/${user_id}`
                      }
                    >
                      <LeftOutlined />
                      Back
                    </Link>
                    <Typography className="bookmark-title">
                      {resolveTitle()}
                    </Typography>
                  </div>
                  <div className="bookmark-content">
                    <iframe height="100%" width="100%" src={resolveSrc()} />
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
  // console.log('Bookmark state');
  return { store: state };
};

const mapDispatchToProps = dispatch => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchFetchGroup: actionData,
    dispatchErrorNotifiction: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Bookmark));
