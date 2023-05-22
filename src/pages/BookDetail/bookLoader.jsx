import { Col, Row, Skeleton } from "antd";
import React from "react";

const BookLoader = () => {
  return (
    <div className="container">
      <Row gutter={[20, 20]}>
        <Col md={10} xs={0} sm={0}>
          <Skeleton.Input
            active={true}
            block={true}
            style={{ width: "100%", height: 350 }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              margin: "20px 0",
            }}
          >
            <Skeleton.Image active={true} />
            <Skeleton.Image active={true} />
            <Skeleton.Image active={true} />
          </div>
        </Col>
        <Col md={14} sm={24}>
          <Skeleton paragraph={{ rows: 3 }} />
          <br />
          <br />
          <Skeleton paragraph={{ rows: 2 }} />
          <div
            style={{
              display: "flex",
              gap: 20,
              margin: "20px 0",
            }}
          >
            <Skeleton.Button active={true} style={{ width: 100 }} />
            <Skeleton.Button active={true} style={{ width: 100 }} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookLoader;
