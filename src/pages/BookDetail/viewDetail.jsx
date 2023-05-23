import React, { useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { Col, InputNumber, Rate, Row } from "antd";
import ModalImg from "./modalImg";
import "./bookDetail.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "@/redux/order/orderSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ViewDetail = ({ bookIdState }) => {
  const [isOpen, setIsOpen] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  const images = bookIdState?.items ?? [];
  const handleChangeBtn = (type) => {
    if (type === "plus") {
      if (currentQuantity === +bookIdState.quantity) return;
      setCurrentQuantity(+currentQuantity + 1);
    }
    if (type === "minus") {
      if (currentQuantity - 1 <= 0) return;
      setCurrentQuantity(+currentQuantity - 1);
    }
  };
  const handleChangeInp = (e) => {
    let { value } = e.target;
    if (!isNaN(value)) {
      if (+value < +bookIdState.quantity) {
        setCurrentQuantity(+value);
      }
      if (+value > +bookIdState.quantity) {
        setCurrentQuantity(bookIdState.quantity);
      }
    }
  };
  const handleAddCart = () => {};

  return (
    <div className="detailBook">
      <div className="container">
        <Row>
          <Col sm={24} md={12}>
            <ImageGallery
              ref={ref}
              items={images}
              renderLeftNav={() => <></>}
              renderRightNav={() => <></>}
              showFullscreenButton={false}
              showPlayButton={false}
              slideOnThumbnailOver={true}
              onClick={() => {
                setCurrentIndex(ref?.current?.getCurrentIndex());
                setIsOpen(true);
              }}
            />
          </Col>
          <Col sm={24} md={12}>
            <div>
              <span>Tác giả: </span>
              <span>{bookIdState?.author}</span>
            </div>
            <div className="detailBook__title">
              <p>{bookIdState?.mainText} </p>
            </div>
            <div className="detailBook__rate">
              <Rate
                disabled
                defaultValue={2}
                style={{ fontSize: 10, marginRight: 10, color: "#ee4d2d" }}
              />
              <p>Đã bán {bookIdState?.sold}</p>
            </div>
            <div className="detailBook__price">
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(bookIdState?.price)}
              </p>
            </div>
            <div className="detailBook__transport">
              <p>Vận chuyển</p>
              <span>Miễn phí vận chuyển</span>
            </div>
            <div className="detailBook__quantity">
              <p>Số lượng</p>
              <div className="detailBook__quantity--inpGr">
                <button onClick={() => handleChangeBtn("minus")}>-</button>
                <input
                  type="text"
                  role="spinbutton"
                  aria-valuenow="1"
                  onChange={(e) => handleChangeInp(e)}
                  value={currentQuantity}
                  onBlur={(e) => {
                    e.target.value === "" ? setCurrentQuantity(1) : "";
                    console.log(currentQuantity);
                  }}
                />
                <button onClick={() => handleChangeBtn("plus")}>+</button>
              </div>
              <p>{bookIdState.quantity} sản phẩm có sẵn</p>
            </div>
            <div className="detailBook__btn">
              <button
                className="detailBook__btn--cart"
                onClick={() => {
                  if (!isAuthenticated) {
                    return navigate("/login");
                  }
                  dispatch(
                    addCart({
                      quantityOrder: currentQuantity,
                      detail: bookIdState,
                      _id: bookIdState._id,
                    })
                  );
                }}
              >
                <ShoppingCartOutlined /> Thêm vào giỏ hàng
              </button>
              <button className="detailBook__btn--buy">Mua ngay</button>
            </div>
          </Col>
        </Row>
        <ModalImg
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          images={images}
          currentIndex={currentIndex}
          title={bookIdState?.mainText}
        />
      </div>
    </div>
  );
};

export default ViewDetail;
