import React, { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";

const InputSearch = ({ handleSearch }) => {
  const searchRef = useRef(null);

  return (
    <div>
      <Search
        placeholder="Search"
        enterButton={<SearchOutlined />}
        size="large"
        onChange={(e) => {
          let { value } = e.target;
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          searchRef.current = setTimeout(() => {
            let query = "";
            query += `${value}`;
            handleSearch(query);
          }, 500);
        }}
      />
    </div>
  );
};

export default InputSearch;
