import { actCreateBook, actUploadImgBook } from "@/redux/book/bookSlice";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const BookCreate = ({ openCreate, setOpenCreate, fetchBook }) => {
  const { categories } = useSelector((state) => state.book);
  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setOpenCreate(false);
    form.resetFields();
    setDataThumbnail([]);
    setDataSlider([]);
  };
  const handleChange = (info, type) => {
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      type ? setLoadingSlider(false) : setLoading(false);
      return;
    }
  };
  const handleUploadThumbnail = async ({ file, onSuccess, onError }) => {
    try {
      const result = await dispatch(actUploadImgBook(file));
      const actResult = unwrapResult(result);
      setDataThumbnail([
        {
          name: actResult.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } catch (err) {
      console.log(err);
      onError("Đã xảy ra lỗi khi Upload!");
    }
  };
  const handleUploadSlider = async ({ file, onSuccess, onError }) => {
    try {
      const result = await dispatch(actUploadImgBook(file));
      const actResult = unwrapResult(result);
      setDataSlider((oldData) => [
        ...oldData,
        {
          name: actResult.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } catch (err) {
      console.log(err);
      onError("Đã xảy ra lỗi khi Upload!");
    }
    console.log(file);
  };
  const handleRemoveFile = (file, type) => {
    if (type === "thumbnail") {
      setDataThumbnail([]);
    }
    if (type === "slider") {
      const filterDataSlider = dataSlider.filter((x) => x.uid !== file.uid);
      setDataSlider(filterDataSlider);
    }
  };
  const handlePreview = async (file) => {
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };
  const onFinish = async (values) => {
    if (dataThumbnail.length === 0) {
      notification.error({
        message: "Lỗi validate",
        description: "Vui lòng upload ảnh thumbnail",
      });
      if (dataSlider.length === 0) {
        notification.error({
          message: "Lỗi validate",
          description: "Vui lòng upload ảnh slider",
        });
      }
    }
    const { mainText, author, price, sold, quantity, category } = values;
    const thumbnail = dataThumbnail[0].name;
    const slider = dataSlider.map((item) => item.name);
    const valueData = {
      mainText,
      author,
      price,
      sold,
      quantity,
      category,
      thumbnail,
      slider,
    };
    setIsSubmit(true);
    try {
      const result = await dispatch(actCreateBook(valueData));
      const actResult = unwrapResult(result);
      message.success("Tạo book thành công");
      form.resetFields();
      setDataSlider([]);
      setDataThumbnail([]);
      setOpenCreate(false);
      await fetchBook();
    } catch (err) {
      notification.error({
        message: "Lỗi validate",
        description: err,
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
        title="Create Book"
        open={openCreate}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Create"}
        width={880}
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên sách"
                name="mainText"
                rules={[
                  {
                    required: true,
                    message: "Please input your name !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tác giả"
                name="author"
                rules={[
                  {
                    required: true,
                    message: "Please input your password !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number !",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  addonAfter="VND"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Thể loại"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number !",
                  },
                ]}
              >
                <Select
                  style={{
                    width: "100%",
                  }}
                  showSearch
                  placeholder="Thể loại"
                  optionFilterProp="children"
                  allowClear
                  options={categories?.map((category, index) => ({
                    label: category,
                    value: category,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number !",
                  },
                ]}
              >
                <InputNumber min={1} max={100000} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Đã bán"
                name="sold"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number !",
                  },
                ]}
              >
                <InputNumber min={1} max={100000} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ảnh Thumbnail" name="thumbnail">
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  className="avatar-uploader"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  customRequest={handleUploadThumbnail}
                  maxCount={1}
                  multiple={false}
                  onPreview={handlePreview}
                  onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                >
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  Upload
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ảnh Slider"
                name="slider"
                labelCol={{ span: 24 }}
              >
                <Upload
                  multiple
                  name="slider"
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={handleUploadSlider}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, "slider")}
                  onPreview={handlePreview}
                  onRemove={(file) => handleRemoveFile(file, "slider")}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    Upload
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default BookCreate;
