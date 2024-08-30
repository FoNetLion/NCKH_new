import React, { useState } from "react";
import {
  Form,
} from "antd";
import "./style.scss";
import TextArea from "antd/es/input/TextArea";
import RulesTable from "./RulesTable";
import ButtonCustom from "../../components/ButtonCustom";
import Icons from "../../assets/icons";

const Rules = () => {
  const [isopenKeyCreateModal, setIsOpenKeyCreateModal] =
    useState<boolean>(false);

  const openKeyCreateModal = () => {
    setIsOpenKeyCreateModal(true);
  };

  const closeKeyCreateModal = () => {
    setIsOpenKeyCreateModal(false);
  };


  return (
    <div>
      <Form>
        <TextArea rows={3} />
        <ButtonCustom
            type="primary"
            icon={<Icons.add />}
            size="small"
            onClick={() => {}}
            label="Add rule"
            style={{margin: "10px 0"}}
          />
      </Form>
      <RulesTable />
    </div>
  );
};

export default Rules;
