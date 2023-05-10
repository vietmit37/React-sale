import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Empty,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Table,
  Tag,
  message,
  notification,
} from "antd";
import { admin } from "@/service/adminService";
import UserDetail from "./userDetail";
import {
  CloudDownloadOutlined,
  DeleteOutlined,
  EditFilled,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ModalCreateUser from "./userCreate";
import moment from "moment";
import UserImport from "./userImport";
import * as XLSX from "xlsx";
import UserEdit from "./userEdit";
import { useDispatch } from "react-redux";
import { actDeleteUser } from "@/redux/admin/adminSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import InputSearch from "@/components/Search";

const AdminUser = () => {
  const dispatch = useDispatch();
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
  const [openDetail, setOpenDetail] = useState(false);
  const [detailUser, setDetailUser] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [paging, setPaging] = useState({
    current: 1,
    pageSize: 2,
    total: 10,
  });
  // const [filter, setFilter] = useState({
  //   current: paging.current,
  //   pageSize: paging.pageSize,
  //   fullName: null,
  //   sort: null,
  // });

  const data = listUser;
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) =>
        loading ? (
          <Skeleton active paragraph={{ rows: 0 }} />
        ) : (
          <a
            onClick={() => {
              setOpenDetail(true);
              setDetailUser(record);
            }}
          >
            {text}
          </a>
        ),
      sorter: () => {},
      defaultSortOrder: "",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) =>
        loading ? <Skeleton active paragraph={{ rows: 0 }} /> : text,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) =>
        loading ? <Skeleton active paragraph={{ rows: 0 }} /> : text,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) =>
        loading ? (
          <Skeleton active paragraph={{ rows: 0 }} />
        ) : (
          moment(text).format("DD-MM-YY hh:mm:ss")
        ),
      sorter: () => {},
      defaultSortOrder: "",
    },
    {
      title: "Roles",
      key: "role",
      dataIndex: "role",
      render: (text) =>
        loading ? (
          <Skeleton active paragraph={{ rows: 0 }} />
        ) : text === "USER" ? (
          <Tag color="magenta">{text}</Tag>
        ) : (
          <Tag color="green">{text}</Tag>
        ),
    },
    {
      title: "Action",
      key: "_id",
      render: (text, record) => (
        <Space size="middle">
          <EditFilled
            style={{ color: "#eb2f96" }}
            onClick={() => {
              setOpenEdit(true);
              setDataUpdate(record);
            }}
          />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            placement="leftTop"
          >
            <DeleteOutlined style={{ color: "#52c41a" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // https://stackoverflow.com/questions/70871254/how-can-i-export-a-json-object-to-excel-using-nextjs-react
  const handelExportData = () => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "DataSheet.csv");
    }
  };
  const handleRenderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List User</span>
        <div style={{ display: "flex", gap: 15 }}>
          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={handelExportData}
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<CloudDownloadOutlined />}
            onClick={() => setOpenImport(true)}
          >
            Import
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenCreate(true)}
          >
            Add
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              setSortQuery("");
            }}
          >
            <ReloadOutlined />
          </Button>
        </div>
      </div>
    );
  };
  const fetchUser = async () => {
    setLoading(true);
    let query = `current=${paging.current}&pageSize=${paging.pageSize}&`;
    if (search) {
      query += `fullName=/${search}/i&`;
    }
    if (sortQuery) {
      query += `${sortQuery}`;
    }
    const res = await admin.getUserPagination(query);
    console.log(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setPaging((oldPaging) => ({
        ...oldPaging,
        total: res.data.meta.total,
      }));
    }
    setLoading(false);
  };
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== paging.current) {
      setPaging((oldPaging) => ({
        ...oldPaging,
        current: pagination.current,
      }));
    }
    if (pagination && pagination.pageSize !== paging.pageSize) {
      setPaging((oldPaging) => ({
        ...oldPaging,
        pageSize: pagination.pageSize,
        current: 1,
      }));
    }
    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSortQuery(q);
    }
  };
  const handleSearch = (keyword) => {
    setSearch(keyword);

    setPaging((oldPaging) => ({
      ...oldPaging,
      current: 1,
    }));
  };
  const handleDeleteUser = async (userId) => {
    try {
      const res = await dispatch(actDeleteUser(userId));
      const actResult = unwrapResult(res);
      message.success("Xóa user thành công");
      setPaging((oldPaging) => ({
        ...oldPaging,
        current: 1,
      }));
    } catch (err) {
      notification.error({
        message: "Xảy ra lỗi!!!!",
        description: err,
        duration: 5,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [paging.current, paging.pageSize, search, sortQuery]);

  // C2

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const paramString = queryString.stringify(filter);
  //     let url = `${paramString}`;
  //     const res = await admin.getUserPagination(url);
  //     if (res && res.data) {
  //       setListUser(res.data.result);
  //       setPaging((oldPaging) => ({
  //         ...oldPaging,
  //         total: res.data.meta.total,
  //       }));
  //     }
  //     console.log(url, res);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log("Fail");
  //   }
  // };
  // const onChange = (pagination, filters, sorter, extra) => {
  //   if (pagination && pagination.current !== paging.current) {
  //     setPaging((oldPaging) => ({
  //       ...oldPaging,
  //       current: pagination.current,
  //     }));
  //   }
  //   if (pagination && pagination.pageSize !== paging.pageSize) {
  //     setPaging((oldPaging) => ({
  //       ...oldPaging,
  //       pageSize: pagination.pageSize,
  //       current: 1,
  //     }));
  //   }
  //   setFilter({
  //     ...filter,
  //     pageSize: pagination.pageSize,
  //     current: pagination.current,
  //   });
  //   if (sorter && sorter.field) {
  //     const q =
  //       sorter.order === "ascend" ? `${sorter.field}` : `-${sorter.field}`;
  //     setPaging((oldPaging) => ({
  //       ...oldPaging,
  //       pageSize: pagination.pageSize,
  //       current: 1,
  //     }));
  //     setFilter({
  //       current: 1,
  //       pageSize: pagination.pageSize,
  //       sort: q,
  //     });
  //   }
  //   console.log(sorter);
  // };
  // const handleSearch = useCallback((newText) => {
  //   console.log("newText: ", newText);
  //   setPaging((oldPaging) => ({
  //     ...oldPaging,
  //     current: 1,
  //   }));
  //   setFilter({
  //     ...filter,
  //     current: 1,
  //     fullName: newText,
  //   });
  // }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [filter]);
  return (
    <>
      <Row>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} />
        </Col>
        <Col span={24}>
          <Table
            title={handleRenderHeader}
            dataSource={data}
            rowKey={"email"}
            columns={columns}
            onChange={onChange}
            pagination={{
              current: paging.current,
              pageSize: paging.pageSize,
              total: paging.total,
              showSizeChanger: true,
              pageSizeOptions: ["1", "2", "3", "4", `${paging.total}`],
              showTotal: (total, range) => (
                <div>
                  {range[0]} - {range[1]} / {total} rows
                </div>
              ),
            }}
            locale={{
              emptyText: loading ? (
                <Skeleton active={true} paragraph={{ rows: 0 }} />
              ) : (
                <Empty />
              ),
            }}
          />
        </Col>
      </Row>
      <UserDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        detailUser={detailUser}
      />
      <ModalCreateUser
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        fetchUser={fetchUser}
      />
      <UserImport
        openImport={openImport}
        setOpenImport={setOpenImport}
        fetchUser={fetchUser}
      />
      <UserEdit
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        dataUpdate={dataUpdate}
        fetchUser={fetchUser}
      />
    </>
  );
};

export default AdminUser;
