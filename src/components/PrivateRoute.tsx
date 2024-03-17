import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const authToken: any = useSelector((state: any) => state.user);
    return(
        authToken?.user?.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;