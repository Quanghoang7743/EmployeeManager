import React from 'react'
import { NavbarComponent } from '../components/navbar/navbar.component'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export const UserLayout = () => {
  return (
    <>
        <NavbarComponent />
        <Box sx={{ marginLeft: '200px', minHeight: '100vh' }}>
            <Outlet/>
        </Box>
    </>
  )
}
