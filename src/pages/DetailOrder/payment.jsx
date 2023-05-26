import {
  actOrderPaymentBook,
  deleteCarts,
  doPlaceOrder,
} from "@/redux/order/orderSlice";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Badge,
  Button,
  Col,
  Form,
  Input,
  Row,
  message,
  notification,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Payment = ({ isValue, setCurrentStep }) => {
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [valuePayment, setValuePayment] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const renderOrder = () => {
    return valuePayment?.map((cart) => {
      return (
        <Fragment key={cart?._id}>
          <div className="order__product order__box">
            <Col xs={8}>
              <div className="order__product--title">
                <img
                  src={`${cart?.detail?.items[0]?.original}`}
                  style={{ width: "100px" }}
                />
                <p>{cart?.detail?.mainText}</p>
              </div>
            </Col>
            <Col xs={4}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(cart.detail.price)}
            </Col>
            <Col xs={4}>
              <div className="order__product--quantity">
                <span> Số lượng: </span>
                <span> {cart.quantityOrder} </span>
              </div>
            </Col>

            <Col xs={6}>
              <span>Tổng tiền: </span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(cart.quantityOrder * cart.detail.price)}
            </Col>
            <Col xs={2}>
              <DeleteOutlined
                onClick={() => {
                  let tung = valuePayment?.filter(
                    (item) => item._id !== cart._id
                  );
                  // console.log(tung);
                  setValuePayment(tung);
                }}
              />
            </Col>
          </div>
        </Fragment>
      );
    });
  };
  const onFinish = async (values) => {
    setIsSubmit(true);
    const detailOrder = valuePayment.map((item) => {
      return {
        bookName: item.detail.mainText,
        quantity: item.quantityOrder,
        _id: item._id,
      };
    });
    const data = {
      name: values.fullName,
      address: values.address,
      phone: values.phone,
      totalPrice: totalPayment,
      detail: detailOrder,
    };
    try {
      const result = await dispatch(actOrderPaymentBook(data));
      const actRes = unwrapResult(result);
      dispatch(doPlaceOrder(data));
      message.success("Đặt hàng thành công");
      setCurrentStep(2);
    } catch (err) {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: err,
      });
    }
    setIsSubmit(false);
  };
  const onFinishFailed = (values) => {
    console.log("Failed", values);
  };
  useEffect(() => {
    form.setFieldsValue(data);
    setValuePayment(isValue);
  }, []);
  useEffect(() => {
    let sum = 0;
    if (valuePayment && valuePayment.length > 0) {
      valuePayment?.map((c) => (sum += c.value));
      setTotalPayment(sum);
    } else {
      setTotalPayment(0);
    }
  }, [valuePayment]);

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xs={16}>
          {renderOrder()}
          <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
            <Col>
              <h1>Tổng tiền thanh toán: </h1>
            </Col>
            <Col offset={12}>
              <h1>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPayment)}
              </h1>
            </Col>
          </Row>
        </Col>
        <Col xs={8}>
          <div className="order__product order__box payment__box">
            <div>
              <Form
                form={form}
                name="basic"
                layout="vertical"
                labelCol={{
                  span: 24,
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
                <Form.Item
                  label="Tên người nhận"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Tên người nhận không được để trống!",
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
                      message: "Số điện thoại không được để trống!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ người nhận!",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Form>
              <div className="payment">
                <div className="payment__action">
                  <p>Hình thức thanh toán</p>
                  <Badge status="processing" text={"Thanh toán tiền mặt"} />
                </div>
              </div>
              <div className="payment__btn">
                <button onClick={() => form.submit()}>
                  {isSubmit && (
                    <span>
                      <LoadingOutlined /> &nbsp;
                    </span>
                  )}
                  Thanh Toán ({valuePayment?.length ?? 0} sản phẩm)
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Payment;
