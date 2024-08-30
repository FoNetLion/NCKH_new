import { request } from "./base";
import { ChangePasswordParams, CommonGetAllParams, GetAccountDetailParams, AddAccountData, ChangePassworData, ChangeStatusParams, UpdateAccountData } from "../constants/types/common.type";
import { CommonSearchAllParams } from "../constants/types/common.type";

export const accountApi = {
  getAccounts: (params?: CommonGetAllParams) => {
    return request("/users", {
      method: "GET",
      params,
    });
  },
  search: (params?: CommonSearchAllParams) => {
    return request("/user/search", {
      method: "GET",
      params
    })
  },
  getDetail: (params?: GetAccountDetailParams) => {
    return request("/user", {
      method: "GET",
      params,
    });
  },
  add: (data?: AddAccountData) => {
    return request("/user", {
      method: "POST",
      data,
    })
  },
  update: (data?: UpdateAccountData) => {
    return request('/user', {
      method: 'PUT',
      data
    })
  },
  changePassword: (params?: ChangePasswordParams, data?: ChangePassworData) => {
    return request("/user/ad_change_password", {
      method: "PUT",
      data,
      params,
    })
  },
  changeStatus: (params?: ChangeStatusParams) => {
    return request("/user/status", {
      method: "PUT",
      params,
    })
  }

};
