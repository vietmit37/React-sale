import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFetchTest } from "../redux/test/testSlice";

const Test = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFetchTest());
  }, []);
  return <div>Test</div>;
};

export default Test;
