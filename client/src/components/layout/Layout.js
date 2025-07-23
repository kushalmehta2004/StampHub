import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdminQuickAccess from '../admin/AdminQuickAccess';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AdminQuickAccess />
    </div>
  );
};

export default Layout;