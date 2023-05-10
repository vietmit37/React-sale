import { actUpdateUser } from "@/redux/admin/adminSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Input, Modal, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UserEdit = ({ openEdit, setOpenEdit, dataUpdate, fetchUser }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [avatarUser, setAvatarUser] = useState(dataUpdate?.avatar ?? "");
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpenEdit(false);
  };
  const onFinish = async (values) => {
    const { fullName, _id, phone } = values;
    const valueData = { _id, fullName, phone, avatar: avatarUser };
    setIsSubmit(true);
    try {
      const result = await dispatch(actUpdateUser(valueData));
      const actResult = unwrapResult(result);
      message.success(`Cập nhật thành công!`);
      setOpenEdit(false);
      await fetchUser();
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
  useEffect(() => {
    setAvatarUser(dataUpdate?.avatar);
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);
  return (
    <>
      <Modal
        title="Basic Modal"
        open={openEdit}
        onOk={() => {
          form.submit();
        }}
        okText={"Edit"}
        onCancel={handleCancel}
        confirmLoading={isSubmit}
      >
        <Form
          form={form}
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
            hidden
            label="ID"
            name="_id"
            rules={[
              {
                message: "Please input your name !",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            <Input disabled />
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

export default UserEdit;
