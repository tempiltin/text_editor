import React from 'react';
import Navbar from "../components/Navbar/Navbar"
import { Outlet } from 'react-router-dom';
const Layout = ({ children }) => {
  return (
    <header>
       <Navbar />
      <Outlet />
      
    </header>
  );
};

export default Layout;
