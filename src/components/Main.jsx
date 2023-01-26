import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Main = () => {
  return (
    <main>
      <Outlet />
      <Footer />
    </main>
  );
};

export default Main;