import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

export default function MainLayout(props) {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

