import CardProduct from "@/components/CardProduct/cardProduct";
import { actGetPaginationBook } from "@/redux/admin/adminSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  Pagination,
  Row,
  Tabs,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Store = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.admin);
  const [paging, setPaging] = useState({
    current: 1,
    pageSize: 6,
    total: 10,
  });
  const fetchBook = async () => {
    let query = `current=${paging.current}&pageSize=${paging.pageSize}&`;
    try {
      const result = await dispatch(actGetPaginationBook(query));
      const actResult = unwrapResult(result);
      setPaging((oldPaging) => ({
        ...oldPaging,
        total: actResult.meta.total,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  const onChange = (page, pageSize) => {
    if (page !== paging.current) {
      setPaging((oldPaging) => ({
        ...oldPaging,
        current: page,
      }));
    }
  };
  useEffect(() => {
    fetchBook();
  }, [paging.pageSize, paging.current]);
  const items = [
    {
      key: "1",
      label: `Tab 1`,
      children: <></>,
    },
    {
      key: "2",
      label: `Tab 2`,
      children: <></>,
    },
    {
      key: "3",
      label: `Tab 3`,
      children: <></>,
    },
  ];
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <div className="container">
        <Row>
          <Col xs={0} md={6}>
            <Card title="Bộ lọc" bordered={false} style={{ width: "300px" }}>
              <Form form={form} onFinish={onFinish}>
                <Form.Item
                  name="category"
                  label="Danh mục sản phẩm"
                  labelCol={{ span: 24 }}
                >
                  <Checkbox.Group>
                    <Row>
                      <Col span={24}>
                        <Checkbox value="A">A</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="B">B</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="C">C</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="D">D</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="E">E</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="F">F</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <Divider />
                <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Form.Item name={["range", "from"]}>
                      <InputNumber
                        name="from"
                        min={0}
                        placeholder="đ từ"
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                    </Form.Item>
                    <span>-</span>
                    <Form.Item name={["range", "to"]}>
                      <InputNumber
                        name="to"
                        min={0}
                        placeholder="đ đến"
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Button
                      onClick={() => form.submit()}
                      style={{ width: "100%" }}
                      type="primary"
                    >
                      Áp dụng
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Tabs defaultActiveKey="1" items={items} />
            <Row>
              {books?.map((item) => {
                return <CardProduct key={item._id} item={item} />;
              })}
            </Row>
            <Row justify="center" style={{ marginBottom: "2rem" }}>
              <Pagination
                current={paging.current}
                pageSize={paging.pageSize}
                total={paging.total}
                showSizeChanger={false}
                onChange={onChange}
              />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Store;
