import { Avatar, Badge, Button, Col, Popover, Row, Space } from "antd";
import React from "react";
import "./header.scss";
import logo from "@/assets/logo/logo.png";
import { Input, Dropdown } from "antd";
import { ShoppingCartOutlined, DownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actLogout } from "@/redux/auth/authSlice";
import { URL_BACKEND } from "@/utils/config";

const { Search } = Input;
const onSearch = (value) => console.log(value);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carts } = useSelector((state) => state.order);
  const { data, isAuthenticated } = useSelector((state) => state.auth);
  const URL_AVATAR = `${URL_BACKEND}/images/avatar/${data?.avatar}`;
  const handleLogout = () => {
    dispatch(actLogout());
  };

  let items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Quản lý tài khoản
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <Link to="" onClick={handleLogout}>
          Đăng Xuất
        </Link>
      ),
      key: "1",
    },
    {
      label: <Link to="/history">Lịch sử đặt hàng</Link>,
      key: "3",
    },
  ];

  if (data?.role === "ADMIN") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "2",
    });
  }
  const renderUserHeader = (user) => {
    if (isAuthenticated) {
      return (
        <Dropdown
          menu={{
            items,
          }}
        >
          <Link
            onClick={(e) => e.preventDefault()}
            className="header__upper-account header__upper-auth"
          >
            <Avatar
              src={URL_AVATAR}
              style={{
                backgroundColor: "#cffdf8",
                color: "#f56a00",
                marginRight: "1rem",
              }}
            />
            {user}
            <DownOutlined />
          </Link>
        </Dropdown>
      );
    } else {
      return (
        <Link className="header__upper-account" to="/login">
          <ShoppingCartOutlined />
          <p>Log in </p>
        </Link>
      );
    }
  };
  const contentPopover = () => {
    return (
      <div className="popover__body">
        <div className="popover__content">
          {!isAuthenticated
            ? null
            : carts?.map((item) => {
                return (
                  <div className="popover__content--book" key={item._id}>
                    <img src={`${item.detail.items[0].original}`} />
                    <div>{item.detail.mainText}</div>
                    <div>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.detail.price)}
                    </div>
                    <div className="overlay"></div>
                  </div>
                );
              })}
        </div>
        <div className="popover__footer">
          <button onClick={() => navigate("/order")}>Xem giỏ hàng</button>
        </div>
      </div>
    );
  };
  return (
    <>
      <header className="header header__top">
        <div className="container">
          <Row>
            <Col xs={8}>
              <p>
                Miễn phí vận chuyển hóa đơn trên 1.000.000đ & Miễn phí hoàn trả
              </p>
            </Col>
            <Col xs={8} offset={8}>
              <p>Hotline: 0123 456 789 - 9876 543 210</p>
            </Col>
          </Row>
        </div>
      </header>
      <header className="header header__upper">
        <div className="container">
          <Row align="middle">
            <Col
              xs={{
                span: 2,
              }}
            >
              <img src={logo} className="header__upper-logo" />
            </Col>
            <Col
              xs={{
                span: 12,
                offset: 2,
              }}
            >
              <Search
                placeholder="Bạn tìm gì hôm nay"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </Col>
            <Col
              xs={{
                span: 6,
                offset: 2,
              }}
            >
              <Row align={"middle"}>
                <Col
                  xs={{
                    span: 8,
                  }}
                >
                  <Popover
                    rootClassName="popover__carts"
                    content={contentPopover}
                    arrow={true}
                    placement="topLeft"
                    title={"Sản phẩm thêm mới"}
                  >
                    <Link className="header__upper-cart" to="/order">
                      <Badge
                        // count={carts?.length ?? 0}
                        count={!isAuthenticated ? "" : carts?.length}
                        size="small"
                        overflowCount={10}
                        showZero
                      >
                        <Avatar
                          shape="square"
                          icon={<ShoppingCartOutlined />}
                        />
                      </Badge>
                      <p>Giỏ hàng</p>
                    </Link>
                  </Popover>
                </Col>
                <Col
                  xs={{
                    span: 12,
                    offset: 4,
                  }}
                >
                  {renderUserHeader(data?.fullName)}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </header>
    </>
  );
};

export default Header;
