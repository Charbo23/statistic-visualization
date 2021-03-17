import axios from "axios";
import { Message } from "ant-design-vue";


const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  crossDomain:true,
  timeout: 20000,
});
const mockInstance = axios.create({
  baseURL: "",
  timeout: 20000,
});
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    Message.error(error.message)
    return Promise.reject(error);
  }
);
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
