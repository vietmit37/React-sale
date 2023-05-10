import React, { useEffect } from "react";
import RouteMain from "./routes";
import "./globalStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import { actGetAccount } from "./redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/regiter"
    )
      return;
    dispatch(actGetAccount());
  }, []);
  return (
    <>
      <RouteMain />
    </>
  );
}

export default App;
