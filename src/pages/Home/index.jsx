import Navbar from "@/components/Navbar/navbar";
import { getFetchTest } from "@/redux/test/testSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.test);
  useEffect(() => {
    dispatch(getFetchTest());
  }, []);
  return (
    <div>
      <Navbar />
      {test?.map((cate, index) => {
        return (
          <div key={index}>
            <div>{cate}</div>
          </div>
        );
      })}
      Home
    </div>
  );
};

export default Home;
