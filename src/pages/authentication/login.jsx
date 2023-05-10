import React from "react";
import AuthWrapper from "./authWrapper";
import { Col, Layout, Row, Typography } from "antd";
import AuthLogin from "./authForm/authLogin";
import { Link } from "react-router-dom";
const { Title } = Typography;
const Login = () => {
  return (
    <AuthWrapper>
      <Row>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "-1px",
            }}
          >
            <Title level={3}>Login</Title>
            <Link type="danger" to={"/register"}>
              Don&apos;t have an account?
            </Link>
          </div>
        </Col>
      </Row>
      <Row xs={12}>
        <Col>
          <AuthLogin />
        </Col>
      </Row>
    </AuthWrapper>
  );
};

export default Login;
