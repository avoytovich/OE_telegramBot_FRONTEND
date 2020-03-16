import axios from 'axios';
import get from 'lodash/get';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const accessCors = {'Access-Control-Allow-Origin': '*'};
  return token && {'x-access-token': token, ...accessCors} || {...accessCors};
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