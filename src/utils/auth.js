import Cookies from 'js-cookie'
import { Base64 } from 'js-base64';

const TokenKey = 'token';

const LoginInfo = 'l_info';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(data) {
  // let expires = new Date(new Date() * 1 + data.expires_in * 1000);
  return Cookies.set(TokenKey, data, { expires: 365 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLoginInfo() {
  let l_info = Cookies.get(LoginInfo);
  if(l_info) {
    l_info = Base64.decode(l_info);
    l_info = JSON.parse(l_info)
    return l_info
  }else {
    return l_info
  }
}

export function setLoginInfo(data) {
  data = JSON.stringify(data);
  data = Base64.encode(data);
  return Cookies.set(LoginInfo, data, { expires: 365 })
}

export function removeLoginInfo() {
  return Cookies.remove(LoginInfo)
}

