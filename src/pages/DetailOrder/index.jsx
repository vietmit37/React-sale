import { Button, Col, Empty, Result, Row, Steps } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import "./order.scss";
import { DeleteOutlined, SmileOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCarts, updateCarts } from "@/redux/order/orderSlice";
import Payment from "./payment";

const DetailOrder = () => {
  const { carts } = useSelector((state) => state.order);
  const { data } = useSelector((state) => state.auth);
  const [total, setTotal] = useState(0);
  const [isCheck, setIsCheck] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isValue, setIsValue] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const optionId = carts?.filter((cart) => {
    return cart.userId === data?.id;
  });
  const dispatch = useDispatch();

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(
      carts
        ?.map((cart) => {
          if (cart.userId === data?.id) {
            return cart._id;
          }
        })
        .filter((item) => item)
    );
    setIsValue(
      carts
        .filter((item) => item.userId === data.id)
        .map((cart) => {
          return {
            ...isValue,
            _id: cart._id,
            value: cart.quantityOrder * cart.detail.price,
            detail: cart.detail,
            quantityOrder: cart.quantityOrder,
          };
        })
    );
    if (isCheckAll) {
      setIsCheck([]);
      setTotal(0);
      setIsValue([]);
    }
  };
  console.log(isValue);
  const handleClick = (e, cart) => {
    let { id, checked, value } = e.target;
    setIsCheck([...isCheck, id]);
    setIsValue([
      ...isValue,
      {
        _id: id,
        value: +value,
        detail: cart.detail,
        quantityOrder: cart.quantityOrder,
      },
    ]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setIsValue(isValue.filter((item) => item._id !== id));
    }
  };

  const handleChangeBtn = (type, cart) => {
    if (type === "plus") {
      if (cart.quantityOrder === +cart.detail.quantity) return;
      dispatch(
        updateCarts({
          ...cart,
          quantityOrder: cart.quantityOrder + 1,
        })
      );
    }

    if (type === "minus") {
      if (cart.quantityOrder - 1 <= 0) return;
      dispatch(
        updateCarts({
          ...cart,
          quantityOrder: cart.quantityOrder - 1,
        })
      );
    }
  };

  const renderProductOrder = () => {
    return carts?.map((cart) => {
      if (cart.userId === data.id) {
        return (
          <Fragment key={cart?._id}>
            <div className="order__product order__box">
              <Col xs={8}>
                <input
                  type="checkbox"
                  id={cart._id}
                  checked={isCheck.includes(cart._id)}
                  value={cart.quantityOrder * cart.detail.price}
                  onChange={(e) => handleClick(e, cart)}
                />
                <div className="order__product--title">
                  <img
                    src={`${cart?.detail?.items[0]?.original}`}
                    style={{ width: "100px" }}
                  />
                  <p>{cart?.detail?.mainText}</p>
                </div>
              </Col>
              <Col xs={4}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(cart.detail.price)}
              </Col>
              <Col xs={4}>
                <div className="order__product--quantity">
                  <div className="quantity--inpGr">
                    <button
                      id={`${cart._id}`}
                      onClick={() => handleChangeBtn("minus", cart)}
                      disabled={isCheck.includes(cart._id)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      role="spinbutton"
                      aria-valuenow="1"
                      disabled={isCheck.includes(cart._id)}
                      onChange={(e) => {
                        let { value } = e.target;
                        if (!isNaN(value)) {
                          if (+value < +cart.detail.quantity) {
                            dispatch(
                              updateCarts({
                                ...cart,
                                quantityOrder: +value,
                              })
                            );
                          }
                          if (+value > +cart.detail.quantity) {
                            dispatch(
                              updateCarts({
                                ...cart,
                                quantityOrder: cart.detail.quantity,
                              })
                            );
                          }
                        }
                      }}
                      value={cart.quantityOrder}
                      onBlur={(e) => {
                        e.target.value == 0 ? 1 : "";
                        dispatch(
                          updateCarts({
                            ...cart,
                            quantityOrder:
                              e.target.value == 0 ? 1 : cart.quantityOrder,
                          })
                        );
                      }}
                    />
                    <button
                      onClick={() => handleChangeBtn("plus", cart)}
                      disabled={isCheck.includes(cart._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </Col>

              <Col xs={4}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(cart.quantityOrder * cart.detail.price)}
              </Col>
              <Col xs={4}>
                <DeleteOutlined
                  onClick={() => {
                    setIsValue(isValue.filter((item) => item._id !== cart._id));
                    dispatch(deleteCarts({ _id: cart._id }));
                  }}
                />
              </Col>
            </div>
          </Fragment>
        );
      }
    });
  };

  useEffect(() => {
    setIsCheckAll(isCheck?.length === optionId.length);
  }, [isCheck]);

  useEffect(() => {
    let sum = 0;
    if (isValue && isValue.length > 0) {
      isValue?.map((c) => (sum += c.value));
      setTotal(sum);
    } else {
      setTotal(0);
    }
  }, [isValue]);
  return (
    <section style={{ background: "rgba(0,0,0,.05)" }}>
      <div className="container">
        <div className="order-steps order__box">
          <Steps
            size="small"
            current={currentStep}
            items={[
              {
                title: "Đơn hàng",
              },
              {
                title: "Đặt hàng",
              },
              {
                title: "Thanh toán",
              },
            ]}
          />
        </div>

        {currentStep === 0 && (
          <>
            <Row>
              <div className="order__title order__box">
                <Col xs={8}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                  />
                  Sản Phẩm
                </Col>
                <Col xs={4}>Đơn Giá</Col>
                <Col xs={4}>Số Lượng</Col>
                <Col xs={4}>Số Tiền</Col>
                <Col xs={4}>Thao Tác</Col>
              </div>
            </Row>
            <Row justify="center">
              <div>
                {carts.length === 0 && (
                  <Empty description={"Không có sản phẩm trong giỏ hàng"} />
                )}
              </div>
              {renderProductOrder()}
            </Row>
            <Row>
              <div className="order__payment order__box">
                <Col xs={13}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <p>Tổng tiền({isValue?.length} sản phẩm )</p>
                    <p>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)}
                    </p>
                  </div>
                </Col>
                <Col
                  xs={4}
                  onClick={() => {
                    if (isValue.length <= 0) {
                      return alert("123");
                    } else {
                      setCurrentStep(1);
                    }
                  }}
                >
                  <button>Mua hàng</button>
                </Col>
              </div>
            </Row>{" "}
          </>
        )}

        {currentStep === 1 && (
          <>
            <Payment
              setCurrentStep={setCurrentStep}
              total={total}
              isValue={isValue}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <Result
              icon={<SmileOutlined />}
              title="Đơn hàng đã được đặt thành công"
              extra={<Button type="primary">Xem lịch sử</Button>}
            />
          </>
        )}
      </div>
    </section>
  );
};
export default DetailOrder;
