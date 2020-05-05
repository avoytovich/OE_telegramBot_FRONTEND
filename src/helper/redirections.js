//import history from './history';

const checkAuth = () => !localStorage.getItem('login');

export default checkAuth;
