import {
  Button,
  Col,
  Empty,
  Popconfirm,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetCategory, actGetPaginationBook } from "@/redux/admin/adminSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import InputSearch from "@/components/Search";
import {
  CloudDownloadOutlined,
  DeleteOutlined,
  EditFilled,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import BookDetail from "./bookDetail";
import BookCreate from "./bookCreate";
import * as XLSX from "xlsx";
import BookEdit from "./bookEdit";

const AdminBooks = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.admin);
  const searchRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [listBooks, setListBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
  const [searchCategories, setSearchCategories] = useState("");
  const [detailBook, setDetailBook] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [paging, setPaging] = useState({
    current: 1,
    pageSize: 2,
    total: 10,
  });
  const data = listBooks;

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) =>
        loading ? (
          <Skeleton active paragraph={{ rows: 0 }} />
        ) : (
          <a
            onClick={() => {
              setOpenDetail(true);
              setDetailBook(record);
              console.log(record);
            }}
          >
            {text}
          </a>
        ),
    },
    {
      title: "Tên sách",
      dataIndex: "mainText",
      key: "mainText",
      render: (text) =>
        loading ? <Skeleton active paragraph={{ rows: 0 }} /> : text,
      sorter: () => {},
      defaultSortOrder: "",
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      render: (text) =>
        loading ? <Skeleton active paragraph={{ rows: 0 }} /> : text,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      render: (text) =>
        loading ? <Skeleton active paragraph={{ rows: 0 }} /> : text,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (text) =>
        loading ? (
          <Skeleton active paragraph={{ rows: 0 }} />
        ) : (
          <div style={{ width: "150px" }}>
            {`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND"}
          </div>
        ),
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
  const handelExportData = () => {
    if (listBooks.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listBooks);
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
  const fetchBook = async () => {
    setLoading(true);
    let query = `current=${paging.current}&pageSize=${paging.pageSize}&`;
    if (search) {
      query += `mainText=/${search}/i&`;
    }
    if (searchCategories) {
      query += `category=/${searchCategories}/i&`;
    }
    if (sortQuery) {
      query += `${sortQuery}`;
    }
    console.log(query);
    try {
      const result = await dispatch(actGetPaginationBook(query));
      const actResult = unwrapResult(result);
      setListBooks(actResult.result);
      setPaging((oldPaging) => ({
        ...oldPaging,
        total: actResult.meta.total,
      }));
    } catch (err) {
      console.log(err);
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
    console.log(sorter);
  };
  const handleSearch = (keyword) => {
    setSearch(keyword);
    setPaging((oldPaging) => ({
      ...oldPaging,
      current: 1,
    }));
  };
  const onChangeSelect = (value) => {
    setSearchCategories(value);
    setPaging((oldPaging) => ({
      ...oldPaging,
      current: 1,
    }));
    console.log(`selected ${value}`);
  };
  const onSearchSelect = (value) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      setSearchCategories(value);
    }, 500);
    setPaging((oldPaging) => ({
      ...oldPaging,
      current: 1,
    }));
  };
  useEffect(() => {
    dispatch(actGetCategory());
  }, []);
  useEffect(() => {
    fetchBook();
  }, [paging.pageSize, paging.current, search, searchCategories, sortQuery]);
  return (
    <>
      <Row>
        <Col span={12}>
          <InputSearch handleSearch={handleSearch} />
        </Col>
        <Col offset={1} span={11}>
          <Select
            style={{
              width: "100%",
            }}
            showSearch
            placeholder="Thể loại"
            optionFilterProp="children"
            allowClear
            onChange={onChangeSelect}
            onSearch={onSearchSelect}
            options={categories?.map((category, index) => ({
              label: category,
              value: category,
            }))}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Col>
        <Col span={24}>
          <Table
            title={handleRenderHeader}
            dataSource={data}
            rowKey={"_id"}
            columns={columns}
            onChange={onChange}
            pagination={{
              current: paging.current,
              pageSize: paging.pageSize,
              total: paging.total,
              showSizeChanger: true,
              pageSizeOptions: ["1", "2", "3", "4", `${paging?.total}`],
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
      <BookDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        detailBook={detailBook}
        setDetailBook={setDetailBook}
      />
      <BookCreate
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        fetchBook={fetchBook}
      />
      <BookEdit
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchBook={fetchBook}
        setPaging={setPaging}
      />
    </>
  );
};

export default AdminBooks;
