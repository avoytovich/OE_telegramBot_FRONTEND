import React, { useState } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import { Head } from './../../components';
import { API } from '../../helper/constants';
import { wrapRequest } from '../../utils/api';

import './landingPage.sass';

function LandingPage(props) {
  // console.log('props LandingPage', props);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const inputFields = [
    {
      label: 'email',
      type: 'email',
      placeholder: 'your@email.com',
    },
    {
      label: 'password',
      type: 'password',
      placeholder: 'your password',
    },
  ];

  const handleChange = (value, label) => {
    switch (label) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const payload = {
      email,
      password,
    };
    localStorage.setItem('login', null);
    const loginUser = await wrapRequest({
      method: 'POST',
      url: `${API.URL}:${API.PORT}/login`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    });
    const data = get(loginUser, 'data');
    const user_id = get(loginUser, 'data.user_id');
    if (data) {
      localStorage.setItem('login', JSON.stringify(data));
      props.history.push(`/user/${user_id}`);
    } else {
      console.log('Something went wrong...with login');
    }
  };

  return (
    <div className="wrapper-landing-page">
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12}>
          <div className="container-landing">
            <Head />
            <Grid container spacing={0} justify="center">
              <Grid item xs={6} sm={6}>
                <div className="landing-login">
                  <form onSubmit={handleSubmit}>
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
                          marginBottom: '5px',
                        }}
                        fullWidth
                      />
                    ))}
                    <Button type="submit" variant="contained" color="primary">
                      Log In
                    </Button>
                  </form>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div className="landing-about">
                  <Typography className="landing-about-content">
                    Application allows efficient manage bookmarks of materials
                    which was chosen by you
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(LandingPage);
