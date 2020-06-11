import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import { LeftOutlined } from '@ant-design/icons';
import { Markup } from 'interweave';
import { get } from 'lodash';

import connect from './../../utils/connectFunction';
import action from './../../utils/actions';
import { wrapRequest } from './../../utils/api';
import { API } from './../../helper/constants';
import Head from './../Header';

import './bookmark.sass';

function Bookmark(props) {
  // console.log('Bookmark props', props);

  const user_id = get(props, 'match.params.id');
  const group_id = get(props, 'match.params.group');
  const subGroup_id = get(props, 'match.params.subgroup');
  const bookmark_id = get(props, 'match.params.bookmark');
  const groups = get(props, 'store.groups');
  const subGroups = get(props, `store.subGroups.${group_id}`);
  const bookmarks = get(props, `store.bookmarks.${subGroup_id}`);
  const article = get(props, 'store.article');

  useEffect(() => {
    const fetchArticle = async () => {
      const getArticle = await wrapRequest({
        method: 'GET',
        url: `${
          API.URL[process.env.NODE_ENV]
        }/user/${user_id}/article?articleParser=${resolveSrc()}`,
        mode: 'cors',
        cache: 'default',
      });
      const article = get(getArticle, 'data.article');
      props.dispatchFetchArticle('fetchArticle', article);
    };
    fetchArticle();
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
                  {article && (
                    <div className="bookmark-content">
                      <Typography variant="h4" className="caption">
                        {article.title}
                      </Typography>
                      <Typography variant="h6">
                        <a href={article.url} target="_blank">
                          Original View
                        </a>
                      </Typography>
                      <img alt="caption-image" src={article.image} />
                      <Typography variant="h6">
                        <Markup content={article.content} />
                      </Typography>
                    </div>
                  )}
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
    dispatchFetchArticle: actionData,
    dispatchErrorNotifiction: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Bookmark));
