import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import checkAuth from './../../helper/redirections';
import SVG from './../../helper/customizeIcon';

import imageLogo from './../../assets/images/logo.svg';
import imageAvatar from './../../assets/images/avatar.svg';

import './header.sass';

function Head(props) {
  const logOut = {
    title: 'Log Out',
    route: '/bookmark',
  };

  const handleLogOut = () => localStorage.setItem('login', null);

  //console.log('props Header', props);
  return (
    <div className="wrapper-header">
      <Grid container spacing={0} justify="center">
        <Grid item xs={10} sm={10} className="container-header">
          <Grid item xs={10} sm={10} className="container-info">
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
            <Grid item xs={2} sm={2} className="container-link">
              <SVG
                className="link-avatar"
                width="48px"
                height="48px"
                source={imageAvatar}
              />
              <Link
                href={logOut.route}
                className="link-auth"
                onClick={handleLogOut}
                style={{ color: '#470b2f' }}
              >
                <Typography className="link-title">{logOut.title}</Typography>
              </Link>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(Head);
