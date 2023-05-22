import { Col, Row } from "antd";
import React from "react";
import logo from "@/assets/logo/logo.png";
import "./footer.scss";
import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <Row gutter={16} align="middle">
            <Col xs={12}>
              <div className="footer__logo">
                <img
                  src={logo}
                  alt="newsletter"
                  className="footer__logo--img"
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className="footer__inputGr">
                <input placeholder="Your Email Adress" type="text" />
                <span>Subscribe</span>
              </div>
            </Col>
          </Row>
        </div>
      </footer>
      <footer className="footer">
        <div className="container">
          <Row>
            <Col xs={12} md={6}>
              <h4>Thông tin liên hệ</h4>
              <div className="footer__content contact">
                <address>
                  Hno : 277 Near Vill chopal, <br /> Sonipat, Haryana <br />
                  PinCode: 131103
                </address>
                <a href="tel:+91 8264954234">+91 8264954234</a>
                <a href="mailto:navdeepdahiya753@gmail.com">
                  nthanhtung1440@gmail.com
                </a>
                <div className="contact__social">
                  <a href="#">
                    <AiFillLinkedin />
                  </a>
                  <a href="#">
                    <AiFillFacebook />
                  </a>
                  <a href="#">
                    <AiFillGithub />
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <h4>CHĂM SÓC KHÁCH HÀNG</h4>
              <div className="footer__content flex ">
                <Link to="/privacy-policy">
                  <span>Chính sách bảo mật</span>
                </Link>
                <Link to="/refund-policy">
                  <span>Chính sách đổi trả</span>
                </Link>
                <Link to="/shipping-policy">
                  <span>Chính sách vận chuyển</span>
                </Link>
                <Link to="/term-conditions">
                  <span>Điều khoản & Điều kiện</span>
                </Link>
                <Link>
                  <span>Blogs</span>
                </Link>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <h4>VỀ CHÚNG TÔI</h4>
              <div className="footer__content flex">
                <Link>
                  <span>Tuyển Dụng</span>
                </Link>
                <Link>
                  <span>Điều Khoản </span>
                </Link>
                <Link>
                  <span>Liên Hệ Với Truyền Thông</span>
                </Link>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <h4>THANH TOÁN</h4>
              <div className="footer__content">
                <Row>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
                      alt="logo"
                    />
                  </Col>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16"
                      alt="logo"
                    />
                  </Col>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08"
                      alt="logo"
                    />
                  </Col>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09"
                      alt="logo"
                    />
                  </Col>
                </Row>
              </div>
              <h4 style={{ marginTop: "20px" }}>ĐƠN VỊ VẬN CHUYỂN</h4>
              <div className="footer__content">
                <Row gutter={4}>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/77bf96a871418fbc21cc63dd39fb5f15"
                      alt="logo"
                    />
                  </Col>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f"
                      alt="logo"
                      style={{ backgroundColor: "white" }}
                    />
                  </Col>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c"
                      alt="logo"
                      style={{ backgroundColor: "white" }}
                    />
                  </Col>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63"
                      alt="logo"
                    />
                  </Col>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6"
                      alt="logo"
                    />
                  </Col>
                  <Col>
                    <img
                      src="https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5"
                      alt="logo"
                      style={{ backgroundColor: "white" }}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </footer>
      <footer className="footer">
        <div className="container">
          <Row justify="center">
            <Col>
              <p>
                &copy; {new Date().getFullYear()}; Powered by Developer's
                ThanhTung
              </p>
            </Col>
          </Row>
        </div>
      </footer>
    </>
  );
};

export default Footer;
