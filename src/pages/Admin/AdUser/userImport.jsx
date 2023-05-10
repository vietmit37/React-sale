import React, { useState } from "react";
import { Modal, Table, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import * as xlsx from "xlsx";
import { useDispatch } from "react-redux";
import { actBulkCreateUser } from "@/redux/admin/adminSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import template from "@/assets/data/template.xlsx?url";

const { Dragger } = Upload;
const UserImport = ({ openImport, setOpenImport, fetchUser }) => {
  const [dataImport, setDataImport] = useState([]);
  const dispatch = useDispatch();
  const handleCancel = () => {
    setOpenImport(false);
    setDataImport([]);
  };
  //https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    // https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          // https://stackoverflow.com/questions/66171804/importing-xlsx-and-parsing-to-json
          const file = info.fileList[0].originFileObj;
          let reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (e) {
            let data = new Uint8Array(reader.result);
            let workbook = xlsx.read(data, { type: "array" });
            let worksheet = workbook.Sheets["Sheet1"];
            // convert to json format
            const jsonData = xlsx.utils.sheet_to_json(worksheet);
            if (jsonData && jsonData.length > 0) setDataImport(jsonData);
          };
        }

        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const handleSubmit = async () => {
    const data = dataImport.map((item) => {
      item.password = "123456";
      return item;
    });
    try {
      const actResult = await dispatch(actBulkCreateUser(data));
      const resultData = unwrapResult(actResult);
      notification.success({
        description: `Success: ${resultData.countSuccess}, Error: ${resultData.countError}`,
        message: "Upload thành công",
      });
      setDataImport([]);
      setOpenImport(false);
      fetchUser();
    } catch (err) {
      notification.error({
        description: err,
        message: "Đã xảy ra lỗi!",
      });
    }
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={openImport}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={"Import data"}
        maskClosable={false}
        okButtonProps={{ disabled: dataImport.length < 1 }}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Only accept .csv, .xls, .xlsx
            &nbsp;
            {/* e.stopPropagation dùng để hủy bỏ sự kiện của thg cha Upload */}
            <a onClick={(e) => e.stopPropagation()} href={template} download>
              Dowload Sample File
            </a>
          </p>
        </Dragger>
        <Table
          dataSource={dataImport}
          title={() => <span>Dữ liệu Upload</span>}
          rowKey={"email"}
          columns={[
            { title: "Name", dataIndex: "fullName", key: "fullName1" },
            { title: "Email", dataIndex: "email", key: "email1" },
            { title: "Phone", dataIndex: "phone", key: "phone1" },
          ]}
        />
      </Modal>
    </>
  );
};

export default UserImport;
