import React from "react";
import "./cardProduct.scss";
import { Rate } from "antd";
import { URL_BACKEND } from "@/utils/config";
const CardProduct = ({ item }) => {
  const { category, author, mainText, price, sold, thumbnail } = item;
  return (
    <>
      <div className="card">
        <div className="poster">
          <img alt="example" src={`${URL_BACKEND}/images/book/${thumbnail}`} />
        </div>
        <div className="detail">
          <h2>{mainText}</h2>
          <h5>Tác giả: {author}</h5>
          <h5>Thể loại: {category}</h5>
          <p>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)}
          </p>
          <div>
            <Rate
              disabled
              defaultValue={2}
              style={{ fontSize: 10, marginRight: 10 }}
            />
            <span>{sold}</span>
          </div>
          <button className="button">Giỏ hàng</button>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
