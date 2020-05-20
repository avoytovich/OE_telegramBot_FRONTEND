import { get } from 'lodash';

const checkAuth = () => {
  const login = JSON.parse(localStorage.getItem('login'));
  const token = get(login, 'token');
  return !token;
};

export default checkAuth;
