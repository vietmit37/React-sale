import { URL_BACKEND } from "@/utils/config";
import { Badge, Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const BookDetail = ({
  openDetail,
  setOpenDetail,
  detailBook,
  setDetailBook,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const onClose = () => {
    setOpenDetail(false);
    setDetailBook(null);
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  useEffect(() => {
    if (detailBook) {
      let imgThumbnail = {};
      let imgSlider = [];
      if (detailBook.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: detailBook.thumbnail,
          status: "done",
          url: `${URL_BACKEND}/images/book/${detailBook.thumbnail}`,
        };
      }
      if (detailBook.slider && detailBook.slider.length > 0) {
        detailBook.slider.map((item) => {
          imgSlider.push({
            uid: uuidv4(),
            name: item,
            status: "done",
            url: `${URL_BACKEND}/images/book/${item}`,
          });
        });
      }
      console.log(...imgSlider);
      setFileList([imgThumbnail, ...imgSlider]);
    }
  }, [detailBook]);
  return (
    <>
      <Drawer
        title="BOOK DETAIL"
        closable={false}
        placement="right"
        onClose={onClose}
        open={openDetail}
        width={"50vw"}
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Id" span={2}>
            {detailBook?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sách" span={2}>
            {detailBook?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label="Thể loại">
            <Badge status="processing" text={detailBook?.category} />
          </Descriptions.Item>
          <Descriptions.Item label="Tác giả">
            {detailBook?.author}
          </Descriptions.Item>
          <Descriptions.Item label="Giá">{detailBook?.price}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(detailBook?.createdAt).format("DD-MM-YY hh:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(detailBook?.updateAt).format("DD-MM-YY hh:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
        <Divider>Ảnh Book</Divider>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={{
            showRemoveIcon: false,
          }}
        ></Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </Drawer>
    </>
  );
};

export default BookDetail;
