import CardProduct from "@/components/CardProduct/cardProduct";
import { actGetCategory, actGetPaginationBook } from "@/redux/book/bookSlice";
import { ReloadOutlined } from "@ant-design/icons";
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
  Space,
  Spin,
  Tabs,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, categories, isLoading } = useSelector((state) => state.book);
  const [filter, setFilter] = useState("");
  const [tabs, setTabs] = useState("sort=-sold");
  const items = [
    {
      key: "sort=-sold",
      label: `Phổ Biến`,
      children: <></>,
    },
    {
      key: "sort=-createdAt",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "sort=price",
      label: `Giá thấp đến cao`,
      children: <></>,
    },
    {
      key: "sort=-price",
      label: `Giá cao đến thấp`,
      children: <></>,
    },
  ];
  const [paging, setPaging] = useState({
    current: 1,
    pageSize: 6,
    total: 10,
  });
  const fetchBook = async () => {
    let query = `current=${paging.current}&pageSize=${paging.pageSize}&`;
    if (tabs) {
      query += `${tabs}`;
    }
    if (filter) {
      query += `&${filter}`;
    }
    console.log(query);
    try {
      const result = await dispatch(actGetPaginationBook(query));
      const actResult = unwrapResult(result);
      console.log(actResult);
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
  const onChangeTabs = (value) => {
    setTabs(value);
  };
  const handleFilterChange = (changeValues, values) => {
    if (changeValues.category) {
      const cate = values.category;
      if (cate && cate.length > 0) {
        const f = cate.join(",");
        setFilter(`category=${f}`);
      } else {
        setFilter("");
      }
    }
  };
  const onFinish = (values) => {
    if (values?.range.from >= 0 && values?.range?.to >= 0) {
      let f = `price<=${values?.range?.to}&price>=${values?.range.from}`;
      if (values?.category?.length > 0) {
        const cate = values.category.join(",");
        f += `&category=${cate}`;
      }
      setFilter(f);
    }
  };
  function nonAccentVietnamese(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");

    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");

    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    // Loại bỏ các ký tự đặc biệt
    // str = str.replace(/[^a-zA-Z0-9 \s]/g, "")

    return str;
  }
  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };
  const handleRedirectBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };
  useEffect(() => {
    fetchBook();
  }, [paging.pageSize, paging.current, filter, tabs]);

  useEffect(() => {
    dispatch(actGetCategory());
  }, []);
  return (
    <>
      <div className="container">
        <Row>
          <Col xs={0} md={16} xl={6}>
            <Card bordered={false} style={{ width: "300px" }}>
              <Space>
                <p>Bộ lọc</p>
                <Button
                  type="ghost"
                  onClick={() => {
                    setFilter("");
                  }}
                >
                  <ReloadOutlined />
                </Button>
              </Space>

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
          <Col xs={24} md={8} xl={18}>
            <Spin spinning={isLoading} tip="...loading">
              <Tabs
                defaultActiveKey="sort=-sold"
                items={items}
                onChange={onChangeTabs}
              />
              <Row>
                {books?.map((item) => {
                  return (
                    <div key={item._id}>
                      <CardProduct
                        item={item}
                        handleClick={handleRedirectBook}
                      />
                    </div>
                  );
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
            </Spin>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Store;
