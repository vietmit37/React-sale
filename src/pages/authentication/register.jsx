import React from "react";
import AuthWrapper from "./authWrapper";
import { Col, Row, Typography } from "antd";
import AuthRegister from "./authForm/authRegister";
import { Link } from "react-router-dom";
const { Title } = Typography;
const Register = () => {
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
            <Title level={3}>Sign up</Title>
            <Link type="danger" to="/login">
              Already have an account?
            </Link>
          </div>
        </Col>
      </Row>
      <Row xs={12}>
        <Col>
          <AuthRegister />
        </Col>
      </Row>
    </AuthWrapper>
  );
};

export default Register;
