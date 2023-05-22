import React, { useEffect } from "react";
import RouteMain from "./routes";
import "./globalStyle.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useDispatch, useSelector } from "react-redux";
import { actGetAccount } from "./redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

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
