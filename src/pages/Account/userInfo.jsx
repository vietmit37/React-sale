import { actUpdateUser, actUploadAvtUser } from "@/redux/admin/adminSlice";
import { doUpdateTempAvt } from "@/redux/auth/authSlice";
import { URL_BACKEND } from "@/utils/config";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserInfo = () => {
  const [form] = Form.useForm();
  const { data } = useSelector((state) => state.auth);
  const [userAvtar, setUserAvatar] = useState(data?.avatar ?? "");
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const URLAVATAR = `${URL_BACKEND}/images/avatar/${userAvtar}`;

  const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    try {
      const result = await dispatch(actUploadAvtUser(file));
      const actRes = unwrapResult(result);
      const newAvt = actRes.fileUploaded;
      dispatch(doUpdateTempAvt(newAvt));
      setUserAvatar(newAvt);
      onSuccess("ok");
    } catch (err) {
      onError("Đã có lỗi xảy ra");
    }
  };
  const propsUpload = {
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    customRequest: handleUploadAvatar,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const onFinish = async (values) => {
    const { id, phone, fullName } = values;
    const valueData = { _id: id, fullName, phone, avatar: userAvtar };
    setIsSubmit(true);
    try {
      const result = await dispatch(actUpdateUser(valueData));
      const actResult = unwrapResult(result);
      localStorage.removeItem("access");
      message.success(`Cập nhật thành công!`);
    } catch (err) {
      notification.error({
        message: "Xảy ra lỗi!!!!",
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
    <>
      <Row gutter={[20, 20]} justify="center">
        <Col md={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px 0",
            }}
          >
            <Avatar size={200} icon={<UserOutlined />} src={URLAVATAR} />

            <Upload {...propsUpload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
        </Col>
        <Col sm={24} md={12}>
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
              label="Tên hiển thị"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Tên hiển thị không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số diện thoại không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
          <Button onClick={() => form.submit()} loading={isSubmit}>
            Cập nhật
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserInfo;
