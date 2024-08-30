import {NCKHAxiosClient} from './base'
import { CommonGetAllParams, DeleteKeyParams, CommonSearchAllParams } from "../constants/types/common.type";
import { Key } from '../constants/types/key.type';

export const RuleApi = {
  addRuleFile: (data: { name: string }) => {
    return NCKHAxiosClient("/rule_files/add_file_name", {
        method: "POST",
        data: {file_name: data.name }, 
    });
},
  DeleteFileRule: (params: DeleteKeyParams)=>{
    return NCKHAxiosClient("/rule_file/delete/",{
      method: "DELETE",
      params,
    })
  }
};
