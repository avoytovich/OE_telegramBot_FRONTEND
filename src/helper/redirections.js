//import history from './history';

const checkAuth = () => !(localStorage.getItem('token'));

export default checkAuth;
