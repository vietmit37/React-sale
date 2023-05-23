import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
