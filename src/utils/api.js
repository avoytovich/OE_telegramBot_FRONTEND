import axios from 'axios';
import get from 'lodash/get';

import history from './../helper/history';
import { API } from './../helper/constants';

let isExec = false;

const setExecRefreshToken = () => {
  if (!isExec) {
    isExec = true;
    setTimeout(() => {
      const getExpirationDate = jwtToken => {
        if (!jwtToken) {
          return null;
        }
        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
        return (jwt && jwt.exp && jwt.exp * 1000) || null;
      };
      const token = get(JSON.parse(localStorage.getItem('login')), 'token');
      if (!token) return;
      setInterval(
        () => execRefreshToken(),
        getExpirationDate(token) - Date.now() - 10000
      );
    }, 5000);
  }
};

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
    })
    .catch(checkError);
};

export const getAuthHeaders = () => {
  let token = get(JSON.parse(localStorage.getItem('login')), 'token');
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
    localStorage.setItem('login', null);
    history.push('/bookmark');
  }
  return Promise.reject(error);
};

export const wrapRequest = options => {
  return axios({
    headers: getDefHeaders(),
    ...options,
    url: options.url,
  })
    .then(data => {
      setExecRefreshToken();
      data => [200, 201].includes(data.status) && setExecRefreshToken();
    })
    .catch(checkError);
};
