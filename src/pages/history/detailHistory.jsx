import { Descriptions, Drawer } from "antd";
import moment from "moment";
import React from "react";

const DetailHistory = ({ open, setOpen, dataOrderId }) => {
  return (
    <>
      <Drawer
        title="ORDER DETAIL"
        closable={false}
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={"50vw"}
      >
        <Descriptions bordered row={3}>
          <Descriptions.Item label="Ngày giờ mua" span={3}>
            {moment(dataOrderId?.updatedAt).format("DD-MM-YY hh:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Tên người nhận">
            {dataOrderId?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={2}>
            {dataOrderId?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" span={3}>
            {dataOrderId?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Sách mua" span={3}>
            {dataOrderId?.detail.map((item, index) => (
              <div key={item._id}>
                {index + 1}. {item?.bookName} || <span>Số lượng: </span>
                {item?.quantity} &nbsp;
              </div>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền thanh toán">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(dataOrderId?.totalPrice)}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default DetailHistory;
