import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout () {
  return (
    <div className='p4'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout