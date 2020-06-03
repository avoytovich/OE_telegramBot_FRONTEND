import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { get } from 'lodash';

import checkAuth from './../../helper/redirections';
import SVG from './../../helper/customizeIcon';
import connect from './../../utils/connectFunction';
import action from './../../utils/actions';

import imageLogo from './../../assets/images/logo.svg';
import imageAvatar from './../../assets/images/avatar.svg';

import './header.sass';

function Head(props) {
  const user_id = get(props, 'match.params.id');

  const links = {
    logOut: {
      title: 'Log Out',
      route: '/bookmark',
    },
    admin: {
      title: 'Admin Panel',
      route: `/user/${user_id}/admin`,
    },
  };

  const handleLogOut = () => {
    props.dispatchLogOut('logOut');
    localStorage.setItem('login', null);
  };

  const isAdmin = get(props, 'store.isAdmin');

  // console.log('props Header', props);
  return (
    <div className="wrapper-header">
      <Grid container spacing={0} justify="center">
        <Grid item xs={10} sm={10} className="container-header">
          <Grid item xs={8} sm={8} className="container-info">
            <Grid item xs={2} sm={2} className="container-info-logo">
              <SVG
                className="info-logo"
                width="64px"
                height="64px"
                source={imageLogo}
              />
            </Grid>
            <Grid item xs={10} sm={10} className="container-info-title">
              <Typography className="info-title">Bookmark's</Typography>
            </Grid>
          </Grid>
          {!checkAuth() && (
            <Grid item xs={4} sm={4} className="container-link">
              <SVG
                className="link-avatar"
                width="48px"
                height="48px"
                source={imageAvatar}
              />
              <Link
                to={links.logOut.route}
                className="link-auth"
                onClick={handleLogOut}
                style={{ color: '#470b2f' }}
              >
                <Typography className="link-title">
                  {links.logOut.title}
                </Typography>
              </Link>
              {isAdmin && (
                <Link
                  to={links.admin.route}
                  className="link-admin"
                  style={{ color: '#470b2f' }}
                >
                  <Typography className="link-title">
                    {links.admin.title}
                  </Typography>
                </Link>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => {
  return { store: state };
};

const mapDispatchToProps = dispatch => {
  const actionData = name => dispatch(action(name));
  return {
    dispatchLogOut: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Head));
