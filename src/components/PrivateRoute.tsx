import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../slices/store';

const PrivateRoute = () => {
    const authToken: any = useSelector((state: RootState) => state.user);
    return(
        authToken?.user?.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;