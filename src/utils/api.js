import axios from 'axios';
import get from 'lodash/get';

import { API } from './../helper/constants';

let isExec = false;
let isInterval = false;

const execRefreshToken = () => {
  const refreshToken = get(
    JSON.parse(localStorage.getItem('login')),
    'refreshToken'
  );
  axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    url: `${API.URL[process.env.NODE_ENV]}/token`,
    mode: 'cors',
    cache: 'default',
    data: {
      id: 1,
      refreshToken: refreshToken,
    },
  })
    .then(data => {
      const login = JSON.parse(localStorage.getItem('login'));
      localStorage.setItem(
        'login',
        JSON.stringify({
          ...login,
          token: data.data.token,
        })
      );
      isExec = false;
    })
    .catch(checkError);
};

const flowRefreshToken = token => {
  const getExpirationDate = jwtToken => {
    if (!jwtToken) {
      return null;
    }
    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  };
  if (!isExec) {
    isExec = true;
    if (token) {
      if (!isInterval) {
        setInterval(
          () => execRefreshToken(),
          getExpirationDate(token) - Date.now() - 10000
        );
      }
    } else {
      setTimeout(() => {
        token = get(JSON.parse(localStorage.getItem('login')), 'token');
        if (!token) return;
        setInterval(
          () => execRefreshToken(),
          getExpirationDate(token) - Date.now() - 10000
        );
        isInterval = true;
      }, 5000);
    }
  }
};

export const getAuthHeaders = () => {
  let token = get(JSON.parse(localStorage.getItem('login')), 'token');
  flowRefreshToken(token);
  const accessCors = { 'Access-Control-Allow-Origin': '*' };
  return (
    (token && { 'x-access-token': token, ...accessCors }) || { ...accessCors }
  );
};

const getDefHeaders = () => ({
  'Content-Type': 'application/json',
  ...getAuthHeaders(),
});

export const checkError = error => {
  const status = get(error, 'response.status');
  if (status >= 401 && status <= 403) {
    history.push('/reports');
  }
  return Promise.reject(error);
};

export const wrapRequest = options =>
  axios({
    headers: getDefHeaders(),
    ...options,
    url: options.url,
  }).catch(checkError);
