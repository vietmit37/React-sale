import { Col, Image, Modal, Row } from "antd";
import ImageGallery from "react-image-gallery";
import React, { useEffect, useRef, useState } from "react";

const ModalImg = ({ isOpen, setIsOpen, images, currentIndex, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
    }
  }, [isOpen]);
  return (
    <>
      <Modal
        width={"60vw"}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        className="modal-gallery"
        footer={null}
        closable={false}
      >
        <Row gutter={[20, 20]}>
          <Col xs={16}>
            <ImageGallery
              ref={ref}
              items={images}
              showFullscreenButton={false}
              showPlayButton={false}
              showThumbnails={false}
              showIndex={true}
              startIndex={currentIndex}
              onSlide={(i) => {
                setActiveIndex(i);
              }}
              //   slideDuration={1}
            />
          </Col>
          <Col xs={8}>
            <div className="detailBook__title" style={{ marginBottom: "20px" }}>
              {title}
            </div>
            <Row gutter={[20, 20]}>
              {images?.map((item, index) => {
                return (
                  <Col key={`image-${index}`}>
                    <Image
                      wrapperClassName={"img-normal"}
                      width={100}
                      height={100}
                      src={item.original}
                      preview={false}
                      onClick={() => ref.current.slideToIndex(index)}
                    />
                    <div
                      className={activeIndex === index ? "active" : ""}
                    ></div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalImg;
