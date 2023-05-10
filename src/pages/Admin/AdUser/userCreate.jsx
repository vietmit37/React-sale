import { actCreateUser } from "@/redux/admin/adminSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Input, Modal, message, notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ModalCreateUser = ({ openCreate, setOpenCreate, fetchUser }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setOpenCreate(false);
  };
  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    const valueData = { fullName, password, email, phone };
    setIsSubmit(true);
    try {
      const actResult = await dispatch(actCreateUser(valueData));
      const resultData = unwrapResult(actResult);
      message.success(`Tạo thành công!`);
      form.resetFields();
      setOpenCreate(false);
      fetchUser();
    } catch (err) {
      notification.error({
        message: "Xảy ra lỗi!!!!",
        description: err,
        duration: 5,
      });
    }
    setIsSubmit(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        title="Create User"
        open={openCreate}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Create"}
        confirmLoading={isSubmit}
      >
        <Form
          name="basic"
          form={form}
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
            label="Tên hiển thị"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your name !",
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
                required: true,
                message: "Please input your password !",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email !",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number !",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
