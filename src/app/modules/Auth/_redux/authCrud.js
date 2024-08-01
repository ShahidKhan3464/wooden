import axios from "axios";
import api from '../../../../api/index';
export const LOGIN_URL = "/oauth/token";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(email, password) {
  const payload = {
      'username': email,
      'password': password,
      'grant_type': 'password'
  }
  return api(LOGIN_URL,payload ,"POST");
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
