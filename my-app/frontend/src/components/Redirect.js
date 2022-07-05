import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const RequireAuth = (user) => {
    if (user.user === null) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}


