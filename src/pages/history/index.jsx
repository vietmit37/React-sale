import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actOrderHistory } from "@/redux/order/orderSlice";
import moment from "moment";
import DetailHistory from "./detailHistory";

const History = () => {
  const dispatch = useDispatch();
  const { orderHistory } = useSelector((state) => state.order);
  const [open, setOpen] = useState(false);
  const [dataOrderId, setDataOrderId] = useState(null);
  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      render: (_, text, index) => <p>{index + 1}</p>,
    },
    {
      title: "Thời gian",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => <>{moment(text).format("DD-MM-YY hh:mm:ss")}</>,
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => (
        <>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </>
      ),
    },
    {
      title: "Trạng thái",
      key: "tags",
      dataIndex: "tags",
      render: () => (
        <>
          <Tag color="green">Thành công</Tag>
        </>
      ),
    },
    {
      title: "Chi tiết",
      key: "ct",
      render: (record) => (
        <>
          <a
            onClick={() => {
              setOpen(true);
              setDataOrderId(record);
            }}
          >
            Chi tiết
          </a>
        </>
      ),
    },
  ];
  useEffect(() => {
    dispatch(actOrderHistory());
  }, []);
  const data = orderHistory;
  return (
    <>
      <div className="container">
        <h1>Lịch sử đặt hàng</h1>
        <Table columns={columns} dataSource={data} rowKey={"_id"} />
      </div>
      <DetailHistory open={open} setOpen={setOpen} dataOrderId={dataOrderId} />
    </>
  );
};
export default History;
