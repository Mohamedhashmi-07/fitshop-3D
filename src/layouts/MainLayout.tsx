import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ToastContainer } from '../components/common/Toast';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};
