import React, { FC, useEffect, useState } from "react";
import {
  Form, Space, message,
} from "antd";
//import "./style.scss";
import TextArea from "antd/es/input/TextArea";
import ButtonCustom from "../../components/ButtonCustom";

// import { RuleApi } from "../../apis/rule";
// import { UpdateRuleType } from "../../constants/types/rules.type";


const RuleDetails: FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataRule, setDataRule] = useState("");
  const [dataRuleChange, setDataRuleChange] = useState("");
  // hàm khi shift + / thì command
  const handleCommandKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '/' && e.ctrlKey) {
      e.preventDefault();
      const textArea = e.target as HTMLTextAreaElement;
      const selectionStart = textArea.selectionStart || 0;
      const selectionEnd = textArea.selectionEnd || 0;
      // Lấy vị trí dấu xuống dòng trước và sau vùng được bôi đen
      const startLineIndex = dataRuleChange.lastIndexOf('\n', selectionStart - 1) + 1;
      const endLineIndex = dataRuleChange.indexOf('\n', selectionEnd);

      // Lấy dòng vừa bôi đen
      const selectedLines = dataRuleChange.substring(startLineIndex, endLineIndex !== -1 ? endLineIndex : undefined);
      // Thêm dấu "#" vào đầu dòng, kiểm tra nếu đã có dấu '#' thì sẽ bỏ đi
      const modifiedLines = selectedLines.split('\n').map(line => {
        if (line.trim().startsWith('#')) return line.replace('#', '')
        else return '#' + line
      }).join('\n');
      const updateddataRuleChange = dataRuleChange.substring(0, startLineIndex) + modifiedLines + dataRuleChange.substring(endLineIndex !== -1 ? endLineIndex : dataRuleChange.length);
      setDataRuleChange(updateddataRuleChange);
    }
  }

  const fetchDataRule = async () => {
    // setIsLoading(true);
    // try {
    //   const res = await RuleApi.getByServernamePort({ ServerName: agentData.ServerName, Port: agentData.Port });
    //   if (res.status === 200) {
    //     setDataRule(res.data);
    //     setIsLoading(false);
    //   } else {
    //     message.error("Get rule error");
    //   }
    // } catch (error) {
    //   message.error("Get rule error");
    //   setIsLoading(false);
    // }
  }
  useEffect(() => {
    if (dataRule) {
      setDataRuleChange(dataRule)
    }
  }, [dataRule])
  useEffect(() => {
    fetchDataRule();
  }, [])
  const handleChangeRule = (e: any) => {
    setDataRuleChange(e.target.value);
  }
  const handleUpdate = async () => {
    // const data: UpdateRuleType = {
    //   ServerName: agentData.ServerName,
    //   Port: agentData.Port,
    //   rules: dataRuleChange
    // }
    setIsLoading(true);
    try {
//       const res = await RuleApi.updateRuleFileEachAgent(data);
//       if (res.status === 200) {
//         message.success(res.data.message);
// setIsLoading(false);
//         fetchDataRule();
//       } else {
//         message.error("Update rule fail");
//       }
    } catch (error) {
      message.error("Update rule fail");
      setIsLoading(false);
    }
  }
  const handleCancel = () => {
    setIsEdit(false);
    setDataRuleChange(dataRule);
  }
  return (
    <div className="container-wrapper">
      <Form>
        <TextArea rows={20} value={dataRuleChange} onChange={handleChangeRule} readOnly={!isEdit} onKeyUp={handleCommandKey} />
        <Space style={{ display: "flex", justifyContent: "end" }}>
          {
            isEdit ? <> <ButtonCustom
              size="small"
              onClick={handleCancel}
              label="Cancel"
              disabled={isLoading}
              style={{ margin: "10px 0" }}
            />
              <ButtonCustom
                type="primary"
                size="small"
                onClick={handleUpdate}
                label="Save"
                loading={isLoading}
                style={{ margin: "10px 0" }}
              /></> : <ButtonCustom
              type="primary"
              size="small"
              onClick={() => setIsEdit(true)}
              label="Update"
              loading={isLoading}
              style={{ margin: "10px 0" }}
            />
          }
        </Space>
      </Form>
    </div>
  );
};

export default RuleDetails;
