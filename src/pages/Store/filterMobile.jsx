import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Form,
  InputNumber,
  Row,
  Space,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";

const FilterMobile = ({
  openFilterMobile,
  setOpenFilterMobile,
  handleFilterChange,
  onFinish,
  setFilter,
}) => {
  const [form] = Form.useForm();
  const { categories } = useSelector((state) => state.book);

  return (
    <>
      <Drawer
        closable={false}
        placement="right"
        onClose={() => setOpenFilterMobile(false)}
        open={openFilterMobile}
        width={"80vw"}
      >
        <Descriptions bordered column={3}>
          <Space>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Bộ lọc</p>
              <Button
                type="ghost"
                onClick={() => {
                  setFilter("");
                }}
              >
                <ReloadOutlined />
              </Button>
            </div>
            <Form
              form={form}
              onFinish={onFinish}
              onValuesChange={(changeValues, values) =>
                handleFilterChange(changeValues, values)
              }
            >
              <Form.Item
                name="category"
                label="Danh mục"
                labelCol={{ span: 24 }}
              >
                <Checkbox.Group>
                  <Row>
                    {categories?.map((item) => {
                      return (
                        <Col span={24} key={item}>
                          <Checkbox value={`${item}`}>{item}</Checkbox>
                        </Col>
                      );
                    })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Divider />
              <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
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
          </Space>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default FilterMobile;
