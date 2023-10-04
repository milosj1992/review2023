import axios from 'axios';
const baseUrl = 'http://192.168.1.6:8000';

axios.interceptors.response.use(
  function (response) {
    if (response.data.statusCode === 400) {
      return Promise.reject('Status code 400');
    } else if (response.data.statusCode === 500) {
      return Promise.reject('Status code 500');
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export { baseUrl };
