import React from "react";
import { CircleLoader } from "react-spinners";

const Loader = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transfrom: "translate (-50%,-50%",
  };
  return (
    <div style={style}>
      <CircleLoader color="#36d7b7" size={95} />
    </div>
  );
};
export default Loader;
