import {request} from './ApiConfig';

const login = (username, password) => {
  return request({
    endpoint: 'login',
    method: 'POST',
    body: {username, password},
  });
};

const getProfile = () => {
  return request({endpoint: 'user/me'});
};

export default {
  login,
  getProfile,
};
