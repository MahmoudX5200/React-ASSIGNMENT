import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
export default function Layout({ userData ,Logout}) {
  return (
    <div>
      <Navbar Logout={Logout} userData={userData} />
      <div className='container py-5'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
