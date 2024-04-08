import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="flex flex-col justify-between items-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
