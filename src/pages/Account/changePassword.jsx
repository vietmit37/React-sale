import { actChangePassW } from "@/redux/admin/adminSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Form, Input, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { email, oldpass, newpass } = values;
    const valueData = { email, oldpass, newpass };
    setIsSubmit(true);
    try {
      const result = await dispatch(actChangePassW(valueData));
      const actResult = unwrapResult(result);
      message.success(`Đổi mật khẩu thành công!`);
      form.setFieldValue("oldpass", "");
      form.setFieldValue("newpass", "");
    } catch (err) {
      notification.error({
        message: "Đã xảy ra lỗi!!!!",
        description: err,
        duration: 5,
      });
    }
    setIsSubmit(false);
  };
  const onFinishFailed = (values) => {
    console.log("Falied", values);
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <div>
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
          width: "400px",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="ID" name="id" hidden>
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          label="Mật khẩu cũ"
          name="oldpass"
          rules={[
            {
              required: true,
              message: "Tên hiển thị không được để trống!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newpass"
          rules={[
            {
              required: true,
              message: "Số diện thoại không được để trống!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      <Button onClick={() => form.submit()} type="primary">
        Xác nhận
      </Button>
    </div>
  );
};

export default ChangePassword;
