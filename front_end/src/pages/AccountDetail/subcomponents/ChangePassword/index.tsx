import { Button, Form, Input, Row, Space, Typography, message } from 'antd'
import React from 'react'
import { ChangePassworData} from '../../../../constants/types/common.type'
import './style.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { accountApi } from '../../../../apis/account'
import { AccountDataProps } from '../Profile'

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required(
    'Bạn chưa nhập mật hiện tại.'
  ),
  newPassword: Yup.string().required(
    'Bạn chưa nhập mật khẩu mới.'
  ),
})

const ChangePassword: React.FC<AccountDataProps> = ({account}) => {
  const [ messageChangePassword, changePasswordMessageContent] = message.useMessage();
  const initFormChangePasswordData: ChangePassworData = {
    oldPassword: '',
    newPassword: ''
  }

  const formChangePassword = useFormik({
    initialValues: initFormChangePasswordData,
    validationSchema: changePasswordSchema,
    onSubmit: async (data) => {
      const changePasswordData: ChangePassworData = {}
      changePasswordData.oldPassword = data.oldPassword;
      changePasswordData.newPassword = data.newPassword;
      try {
          const response = await accountApi.changePassword({
            username: account.username
          }, changePasswordData)
          console.log(response)
          if(response.data.code === 200){
            messageChangePassword.open({
              type: 'success',
              content: response.data.message
            })
            formChangePassword.values.newPassword = "";
            formChangePassword.values.oldPassword = "";
          }else{
            messageChangePassword.open({
              type: 'error',
              content: response.data.message
            })
          }
      }
      catch (error: any) {
        console.log(error)
      }
    }
  })
  return (
    <div className='acc-changePassword-wrapper'>
      {changePasswordMessageContent}
      <Row align={"middle"} className="acc-detail-header" style={{ padding: '0 0 24px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.07)' }} justify='space-between'>
        <Space direction="horizontal" wrap align='center'>
          <Typography.Title level={4} className="acc-detail-header_title" style={{ color: 'white', margin: '0' }}>Đổi mật khẩu</Typography.Title>
        </Space>
      </Row>
      <Row className="acc-changePassword-content" justify='center'>
        <div className="changePassword-form-wrapper">
          <Form
            className="main-changePassword-form"
            onFinish={formChangePassword.handleSubmit}
            layout='vertical'
          >
            <Form.Item
              validateStatus={
                formChangePassword.errors.oldPassword && formChangePassword.touched.oldPassword
                  ? "error"
                  : ""
              }
              help={
                formChangePassword.touched.oldPassword && formChangePassword.errors.oldPassword
              }
              label="Old password"
              className='form-changePassword_item'
            >
              <Input.Password
                placeholder="Input"
                name="oldPassword"
                value={formChangePassword.values.oldPassword}
                onChange={formChangePassword.handleChange}
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              validateStatus={
                formChangePassword.errors.newPassword && formChangePassword.touched.newPassword
                  ? "error"
                  : ""
              }
              help={
                formChangePassword.touched.newPassword && formChangePassword.errors.newPassword
              }
              label="New password"
              className='form-changePassword_item'
            >
              <Input.Password
                placeholder="Input"
                name="newPassword"
                value={formChangePassword.values.newPassword}
                onChange={formChangePassword.handleChange}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="changePassword_btn"
              >
                <Typography>
                  Lưu
                </Typography>
              </Button>
            </Form.Item>
          </Form>

        </div>
      </Row>
    </div>
  )
}

export default ChangePassword