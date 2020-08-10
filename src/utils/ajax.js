import axios from 'axios'
import QS from 'qs'
import Vue from 'vue'
import { Message } from "element-ui";
import {getToken, removeToken} from "./auth";
import router from "../router";

// 请求基础url
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境
    axios.defaults.baseURL = 'https://water3th.luxcon.cn/lt_jsq/';
  } else {
    //test 测试环境
    axios.defaults.baseURL = 'https://water3th.luxcon.cn/lt_jsq/';
  }
}

// 请求超时时间
axios.defaults.timeout = 1000 * 40;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const hasToken = getToken();
    if (hasToken) {
      let tokenObj = { token: hasToken };
      Object.assign(config.data, tokenObj);
    }
    return config;
  },
  // Do something with request error
  error => Promise.reject(error),
);

let isToken401 = false;

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  // let data = response.data;
  // if(data.code === 401) {
  //   store.dispatch('user/loginCheck');
  // }
  let data = response.data;
  if(data.code !== 0 && data.code !== 401) {
    Message({
      message: data.message,
      duration: 2000
    });
  }
  if(data.code === 401) {
    removeToken();
    if(!isToken401) {
      isToken401 = true;
      Message({
        message: '登录失效, 请重新登录',
        duration: 2000
      });
      router.replace({
        path: '/login'
      }, () => {
        isToken401 = false;
      });
    }
  }
  return response.data;
}, error => {
  // 对响应错误做点什么
  console.log('err' + error) // for debug
  Message({
    message: error.message,
    center: true
  });
  return Promise.reject(error);
});

Vue.prototype.$ajax = axios;
Vue.prototype.$toQS = (obj) => QS.stringify(obj);
export default axios
// export function ApiGet(url, params) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, {params}).then((res) => {
//         resolve(res.data);
//     })
//     .catch((err) => {
//       reject(err.data);
//     });
//   });
// }
//
// export function Api (url, params = {}) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, QS.stringify(params))
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         console.log('err', err);
//         Toast({
//           message: '未知错误',
//           duration: 1000,
//           forbidClick: true,
//         });
//         reject(err.data);
//       });
//   });
// }