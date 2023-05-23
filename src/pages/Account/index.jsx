import { Modal, Tabs } from "antd";
import React from "react";
import UserInfo from "./userInfo";
import ChangePassword from "./changePassword";

const ManageAccount = ({ open, setOpen }) => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "info",
      label: `Cập nhật thông tin`,
      children: <UserInfo />,
    },
    {
      key: "password",
      label: `Đổi mật khẩu`,
      children: <ChangePassword />,
    },
  ];
  return (
    <div>
      <Modal
        title="Quản lý tài khoản"
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
        width={"800px"}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Modal>
    </div>
  );
};

export default ManageAccount;
