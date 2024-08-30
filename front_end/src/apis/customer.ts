import { request } from "./base";
import {
  CommonGetAllParams,
  GetDetailCustomerParams,
  UpdateCustomerStatus,
  CommonSearchAllParams
} from "../constants/types/common.type";
import { Customer } from "../constants/types/customer.type";

export const customerApi = {
  getAll: (params?: CommonGetAllParams) => {
    return request("/customers/all", {
      method: "GET",
      params,
    });
  },
  search: (params?: CommonSearchAllParams) =>{
    return request("/customers/all/search",{
      method: "GET",
      params
    })
  },
  getOne: (params: GetDetailCustomerParams) => {
    return request("/customer", {
      method: "GET",
      params,
    });
  },
  create: (data: Customer) => {
    return request("/customer", {
      method: "POST",
      data,
    });
  },
  updateStatus: (params: UpdateCustomerStatus) => {
    return request("/customer/status", {
      method: "PUT",
      params,
    });
  },
};
