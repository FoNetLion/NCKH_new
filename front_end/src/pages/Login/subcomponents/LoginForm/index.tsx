import React, { useEffect, useState } from "react";
import "./style.scss";
import * as Yup from 'yup';
import { Space, Form, Typography, Input, Button, Checkbox, Row, message } from "antd";
import { CategoryTabSVG } from "../../../../assets/images";
import Icon from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { useFormik } from "formik";
import { LoginData } from "../../../../constants/types/auth.type";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../../../routes/route.constant";

type FormLoginData = {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().required(
    'Email không được để trống.'
  ),
  password: Yup.string().required(
    'Vui lòng nhập mật khẩu.'
  ),
})

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initFormLoginData: FormLoginData = {
    email: '',
    password: '',
  }

  const formLogin = useFormik({  
    initialValues: initFormLoginData,
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      const loginData: LoginData = {}
      loginData.username = data.email;
      loginData.password = data.password;
      try {
        // const response = await authApi.login(loginData);
        //localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('username', "admin");
        // dispatch(login(response.data))
        navigate(DASHBOARD, {replace : true})
      }
      catch (error: any) {
        message.error('Lỗi đăng nhập!')
      }
    }
  })


  return (
    <div className="login-form-container">
      <div className="login-form-wrapper">
        <div className="login-form-container-inside">
          <Space className="wrapper-login" direction="vertical" size="large">
            <Icon className="login-icon-cam" component={CategoryTabSVG} alt="" />
            <Typography className="tittle-login">Speed to Text</Typography>
            <Typography className="subtittle">
              Chuyển đổi âm thanh thành văn bản dễ dàng
            </Typography>
            <Form
              className="main-login-form"
              onFinish={formLogin.handleSubmit}
            >
              <Form.Item
                validateStatus={
                  formLogin.errors.email && formLogin.touched.email
                    ? "error"
                    : ""
                }
                help={
                  formLogin.touched.email && formLogin.errors.email
                }
              >
                <Input
                  placeholder="Email"
                  name="email"
                  value={formLogin.values.email}
                  onChange={formLogin.handleChange}
                  allowClear
                  // prefix={
                  //   <Icon className="icon-input-login" component={UserLoginSVG} />
                  // }
                />
              </Form.Item>
              <Form.Item
                name="Password"
                validateStatus={
                  formLogin.errors.password && formLogin.touched.password
                    ? "error"
                    : ""
                }
                help={
                  formLogin.touched.password && formLogin.errors.password
                }
              >
                <Input.Password
                  placeholder="Password"
                  name="password"
                  value={formLogin.values.password}
                  onChange={formLogin.handleChange}
                  // prefix={
                  //   <Icon className="icon-input-login" component={LockOutlineSVG} />
                  // }
                />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Row justify={"space-between"}>
                  <Checkbox className="checkbox-login">
                    <Typography className="checkbox-tittle">
                      Lưu đăng nhập
                    </Typography>
                  </Checkbox>
                  <Link>
                    <Typography className="forget-text-login">
                      Quên mật khẩu
                    </Typography>
                  </Link>
                </Row>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-button"
                >
                  <Typography className="submit-button-tittle">
                    Đăng nhập
                  </Typography>
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>
        <div className="account-already-container">
          <Link>
            <Typography className="account-already-text">
              Chưa có tài khoản?
            </Typography>
          </Link>
          <Link>
            <Typography className="register-text">Đăng ký</Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
