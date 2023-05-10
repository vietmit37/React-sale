import React from "react";
import { Card } from "antd";

const AuthCard = ({ children }) => {
  return (
    <Card
      bordered={false}
      style={{
        margin: "100px",
        minWidth: "450px",
        boxShadow: "0 0 100px black",
      }}
    >
      <div style={{ padding: 2 }}>{children}</div>
    </Card>
  );
};

export default AuthCard;
