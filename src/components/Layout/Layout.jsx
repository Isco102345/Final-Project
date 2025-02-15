import React from 'react'
import style from './Layout.module.css';
import NavBar from './../NavBar/NavBar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <NavBar />

        <div className="container my-5 py-20 lg:py-12">
          <Outlet />
        </div>

      <Footer />
    </>
  )
}
