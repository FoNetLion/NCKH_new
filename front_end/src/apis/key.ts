import {request} from './base'
import { CommonGetAllParams, FileNameParams, CommonSearchAllParams } from "../constants/types/common.type";
import { Key } from '../constants/types/key.type';

export const keyApi = {
  getAll: (params?: CommonGetAllParams) => {
    return request("/key/all", {
      method: "GET",
      params,
    });
  },
  search: (params?: CommonSearchAllParams)=>{
    return request("/key/all/search",{
      method: "GET",
      params,
    })
  },
  create: (data: Key) =>{
    return request("/key", {
      method: "POST",
      data,
    })
  },
  delete: (params: FileNameParams)=>{
    return request("/key",{
      method: "DELETE",
      params,
    })
  }
};
