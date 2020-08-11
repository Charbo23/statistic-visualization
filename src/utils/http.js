import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000
});
const mockInstance=axios.create({
  baseURL: '',
  timeout: 10000
});
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params: params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getLocalMock(url, params = {}) {
    return new Promise((resolve, reject) => {
      mockInstance
        .get(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
