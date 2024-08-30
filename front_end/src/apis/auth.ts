import { request } from "./base";
import { LoginData } from "../constants/types/auth.type";
import axios from 'axios';

const authApi = {
  login: (data: LoginData) => {
    return axios.post('http://service4all.vinorsoft.com:18003/api/v1/authentication/login', data)
  },
  checkToken: () => {
    return request("/auth/check-token", {
      method: "GET",
    });
  },
  logout: () => {
    return request("/auth/logout", {
      method: "GET",
    });
  },
};

export default authApi;
