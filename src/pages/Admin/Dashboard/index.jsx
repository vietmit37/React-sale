import { actGetDashboard } from "@/redux/admin/adminSlice";
import { Card, Col, Row, Statistic } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dasboard } = useSelector((state) => state.admin);

  const formatter = (value) => <CountUp end={value} separator="," />;
  useEffect(() => {
    dispatch(actGetDashboard());
  }, []);
  return (
    <>
      <Row gutter={[40, 40]}>
        <Col span={10}>
          <Card bordered={false}>
            <Statistic
              title="Tổng Users
            "
              value={dasboard?.countUser}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card bordered={false}>
            <Statistic
              title="Tổng Orders
            "
              value={dasboard?.countOrder}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
