import { Col, Layout, Row } from "antd";
import React from "react";
import AuthCard from "./authCard";
import AuthBackground from "../../assets/auth/AuthBackground";
import logo from "@/assets/logo/logo.png";

const AuthWrapper = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <AuthBackground />
      <Row
        justify="start"
        style={{
          minHeight: "100vh",
          flexDirection: "row",
        }}
      >
        <div>
          <img
            src={logo}
            style={{
              height: "100px",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>
        <Col span={24}>
          <Row
            justify="center"
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: "calc(80vh - 134px)",
            }}
          >
            <Col>
              <AuthCard>{children}</AuthCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AuthWrapper;
