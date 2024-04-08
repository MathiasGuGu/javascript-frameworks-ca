import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
