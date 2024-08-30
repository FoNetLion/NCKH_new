import {NCKHAxiosClient} from './base'
import { CommonGetAllParams, FileNameParams, CommonSearchAllParams, UpdateRuleParams } from "../constants/types/common.type";
import { Key } from '../constants/types/key.type';

export const RuleApi = {
  addRuleFile: (data: { name: string, content_rule: string }) => {
    return NCKHAxiosClient("/rule_files/add_file_name", {
        method: "POST",
        data: { // 2 thuộc tính content và file_name chính là 1 đối tượng mà backend yêu cầu
            file_name: data.name, 
            content: data.content_rule 
        },
    });
},
  DeleteFileRule: (params: FileNameParams)=>{
    return NCKHAxiosClient("/rule_file/delete/",{
      method: "DELETE",
      params,
    })
  },
  GetContentRule: (params: FileNameParams)=>{
    return NCKHAxiosClient("/rule-client/get_rules/",{
      method: "GET",
      params,
    })
  },

  updateRule: (data: { name?: string, content_rule: string }) => {
    return NCKHAxiosClient("/rule-client/update", {
        method: "PUT",
        data: { // 2 thuộc tính content và file_name chính là 1 đối tượng mà backend yêu cầu
            file_name: data.name, 
            content: data.content_rule 
        },
    });
},
};
