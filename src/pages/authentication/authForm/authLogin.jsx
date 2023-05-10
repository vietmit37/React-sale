import React, { useState } from "react";
import { Button, Form, Input, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actLogin } from "@/redux/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "@/components/Loader";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const [loadings, setLoadings] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };
  const onFinish = async (values) => {
    const { username, password } = values;
    const valueData = { username, password };
    try {
      const actResult = await dispatch(actLogin(valueData));
      const resultData = unwrapResult(actResult);
      message.success(`Khách hàng đăng nhập thành công!`);
      navigate("/");
    } catch (err) {
      notification.error({
        message: "Lỗi",
        description: err,
        duration: 5,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        minWidth: "400px",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="username"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthLogin;
