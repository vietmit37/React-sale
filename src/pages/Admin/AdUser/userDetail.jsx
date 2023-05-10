import { Badge, Descriptions, Drawer, Tag } from "antd";
import moment from "moment/moment";
import React from "react";

const UserDetail = ({ openDetail, setOpenDetail, detailUser }) => {
  const onClose = () => {
    setOpenDetail(false);
  };
  return (
    <>
      <Drawer
        title="USER DETAIL"
        closable={false}
        placement="right"
        onClose={onClose}
        open={openDetail}
        width={"50vw"}
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Id">{detailUser?._id}</Descriptions.Item>
          <Descriptions.Item label="Name">
            {detailUser?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {detailUser?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {detailUser?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Role" span={2}>
            <Badge
              status="processing"
              text={
                detailUser?.role === "USER" ? (
                  <Tag color="magenta">{detailUser?.role}</Tag>
                ) : (
                  <Tag color="green">{detailUser?.role}</Tag>
                )
              }
            />
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(detailUser?.createdAt).format("DD-MM-YY hh:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(detailUser?.updateAt).format("DD-MM-YY hh:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserDetail;
