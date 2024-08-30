import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Typography, message } from 'antd';
import React from 'react'
import './style.scss'
import * as Yup from 'yup';
import { ReactComponent as Retangle } from "../../assets/images/svg/Retangle.svg";
import { ReactComponent as QuestionMarkCircle } from "../../assets/images/svg/QuestionMarkCircle.svg";
import { useFormik } from 'formik';

// const createValuationProfileSchema = Yup.object().shape({
//   ownerName: Yup.string().required(
//     'Bạn chưa nhập tên chủ sở hữu!'
//   ),
//   workingUnit: Yup.string().required(
//     'Bạn chưa nhập đơn vị làm việc!'
//   ),
//   username: Yup.string().required(
//     'Bạn chưa nhập tên tài khoản!'
//   ),
//   password: Yup.string().required(
//     'Bạn chưa nhập mật khẩu!'
//   ),
//   role: Yup.string().required(
//     'Bạn chưa nhập quyền!'
//   ),
//   status: Yup.number().required(
//     'Bạn chưa nhập trạng thái!'
//   ),
// })
type CreateValuationProfileData = {
  profile_number?: number,
  profile_name?: string,
  date_create?: string,
  selectOrgainize?: string,
  organizeName?: string,
  addressOrganize?: string,
  organizeEmail?: string,
  organizePhone?: string,
  organizeFax?: string,
  unitProvider?: string,
  unitCreditName?: string,
  unitPhone?: string,
  unitEmail?: string,
  cusCaterory?: string,
  cusName?: string,
  cusAddress?: string,
  cusEmail?: string,
  cusPhone?: string,
  cusFax?: string,
  cusTaxCode?: string,
  cusRepresentative?: string,
  cusDuty?: string,
}
const initialFormData: CreateValuationProfileData = {
  profile_number: 1,
  profile_name: "huyhuy",
  date_create: "",
  selectOrgainize: "",
  organizeName: "",
  addressOrganize: "",
  organizeEmail: "",
  organizePhone: "",
  organizeFax: "",
  unitProvider: "",
  unitCreditName: "",
  unitPhone: "",
  unitEmail: "",
  cusCaterory: "",
  cusName: "",
  cusAddress: "",
  cusEmail: "",
  cusPhone: "",
  cusFax: "",
  cusTaxCode: "",
  cusRepresentative: "",
  cusDuty: "",
}
function CreateValuation() {
  const formCreateValuationProfile = useFormik({
    initialValues: initialFormData,
    // validationSchema: createValuationProfileSchema,
    onSubmit: async (data) => {
      const createValuationProfileData: CreateValuationProfileData = {}
      createValuationProfileData.profile_number = data.profile_number;
      createValuationProfileData.profile_name = data.profile_name;
      createValuationProfileData.date_create = data.date_create;
      createValuationProfileData.selectOrgainize = data.selectOrgainize;
      createValuationProfileData.organizeName = data.organizeName;
      createValuationProfileData.addressOrganize = data.addressOrganize;
      createValuationProfileData.organizeEmail = data.organizeEmail;
      createValuationProfileData.organizePhone = data.organizePhone;
      createValuationProfileData.organizeFax = data.organizeFax;
      createValuationProfileData.unitProvider = data.unitProvider;
      createValuationProfileData.unitCreditName = data.unitCreditName;
      createValuationProfileData.unitPhone = data.unitPhone;
      createValuationProfileData.unitEmail = data.unitEmail;
      createValuationProfileData.cusCaterory = data.cusCaterory;
      createValuationProfileData.cusName = data.cusName;
      createValuationProfileData.cusAddress = data.cusAddress;
      createValuationProfileData.cusEmail = data.cusEmail;
      createValuationProfileData.cusPhone = data.cusPhone;
      createValuationProfileData.cusFax = data.cusFax;
      createValuationProfileData.cusTaxCode = data.cusTaxCode;
      createValuationProfileData.cusRepresentative = data.cusRepresentative;
      createValuationProfileData.cusDuty = data.cusDuty;
      try {
          console.log(createValuationProfileData)
      } catch (error) {
          console.log(error)
      }
    }
  })
  return (
    <div style={{ width: '100%', padding: '24px 40px 0 40px' }}>
      <Space direction='vertical'>
        <Typography.Paragraph className='breadCrumb_valuation'>Danh sách thẩm định / Tạo mới hồ sơ</Typography.Paragraph>
        <Typography.Title className='title_valuation'>Tạo mới hồ sơ thẩm định</Typography.Title>
      </Space>
      <Form layout='vertical' onFinish={formCreateValuationProfile.handleSubmit}>
        <Space className='create_valuation-space' direction='vertical'>
          <Space className='create-valuation_title'>
            <Retangle />
            <Typography className='create-valuation_title-txt'>Hồ sơ</Typography>
            <QuestionMarkCircle />
          </Space>
          <Row gutter={24} className='create-valuation-wrapInput'>
            <Col span={8}>
              <Form.Item
                name="profile_number"
                label="Số hồ sơ"
                help={
                  formCreateValuationProfile.touched.profile_number && formCreateValuationProfile.errors.profile_number
              }
              >
                <Input type='text' value={formCreateValuationProfile.values.profile_number} onChange={formCreateValuationProfile.handleChange}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="profile_name"
                label="Tên hồ sơ"
                help={
                  formCreateValuationProfile.touched.profile_name && formCreateValuationProfile.errors.profile_name
              }
              >
                <Input placeholder="Input" value={formCreateValuationProfile.values.profile_name} onChange={formCreateValuationProfile.handleChange}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item style={{ width: '100%' }}
                label="Ngày tạo hồ sơ"
                name="date_create"
                help={
                  formCreateValuationProfile.touched.date_create && formCreateValuationProfile.errors.date_create
              }
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Space>
        <Space className='create_valuation-space' direction='vertical' style={{ marginTop: '20px' }}>
          <Space className='create-valuation_title'>
            <Retangle />
            <Typography className='create-valuation_title-txt'>Tổ chức định giá</Typography>
            <QuestionMarkCircle />
          </Space>
          <Row gutter={24} className='create-valuation-wrapInput'>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item label="Tổ chức định giá" name="selectOrgainize">
                <Select value="Chọn">
                  <Select.Option value="">Chọn</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Tên tổ chức"
                name="organizeName"
              >
                <Input placeholder='Input' />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Col span={8} className='organize-valuation_col'>
                <Form.Item
                  label="Địa chỉ"
                  name="addressOrganize"
                >
                  <Input placeholder='Input' />
                </Form.Item>
              </Col>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Email"
                name="organizeEmail"
              >
                <Input placeholder='Input' />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Số điện thoại"
                name="organizePhone"
              >
                <Input placeholder='Input' />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Số Fax"
                name="organizeFax"
              >
                <Input placeholder='Input' />
              </Form.Item>
            </Col>
          </Row>
        </Space>
        <Space className='create_valuation-space' direction='vertical' style={{ marginTop: '20px' }}>
          <Space className='create-valuation_title'>
            <Retangle />
            <Typography className='create-valuation_title-txt'>Đơn vị cung cấp</Typography>
            <QuestionMarkCircle />
          </Space>
          <Row gutter={24} className='create-valuation-wrapInput'>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item label="Đơn vị cấp tín dụng" name="unitProvider">
                <Select value="Chọn">
                  <Select.Option value="demo">Chọn</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Tên tín dụng"
                name="unitCreditName"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Số điện thoại"
                name="unitPhone"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Email"
                name="unitEmail"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
          </Row>
        </Space>
        <Space className='create_valuation-space' direction='vertical' style={{ marginTop: '20px' }}>
          <Space className='create-valuation_title'>
            <Retangle />
            <Typography className='create-valuation_title-txt'>Thông tin khách hàng</Typography>
            <QuestionMarkCircle />
          </Space>
          <Row gutter={24} className='create-valuation-wrapInput'>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item label="Phân loại" name="cusCaterory">
                <Select value="Chọn">
                  <Select.Option value="demo">Chọn</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Tên tổ chức"
                name="cusName"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Địa chỉ"
                name="cusAddress"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Email"
                name="cusEmail"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Số điện thoại"
                name="cusPhone"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Số Fax"
                name="cusFax"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Mã số thuế"
                name="cusTaxCode"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Người đại diện"
                name="cusRepresentative"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
            <Col span={8} className='organize-valuation_col'>
              <Form.Item
                label="Chức danh"
                name="cusDuty"
              >
                <Input placeholder="Input" />
              </Form.Item>
            </Col>
          </Row>
        </Space>
        <div style={{ textAlign: 'right', width: '100%', padding: '16px 20px' }}>
          <Form.Item>
            <Space size='middle'>
              <Button size='large' className='create-valuation_btn create-valuation_btn-cancel'>Hủy bỏ</Button>
              <Button size='large' className='create-valuation_btn create-valuation_btn-submit' htmlType="submit">Tạo hồ sơ</Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default CreateValuation