import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutUser } from "../slices/UserSlice";
import { AppDispatch } from "../slices/store";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.user);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users/${user.id}`
      );
      const data = response.data.data;
      if (data) {
        setCurrentUser(data);
      }
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () =>{
    dispatch(logoutUser());
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <header className=" w-full flex items-center justify-around px-5">
      <h3 className="text-4xl font-bold text-blue-900 my-10 mr-5">
        Dashboard
      </h3>
      <button className='bg-blue-900 text-slate-100 py-2 pl-4 pr-6 rounded-md border-none font-semibold' onClick={handleLogout}>Logout</button>
      </header>
      {currentUser ? (
        <div className="mx-auto w-5/12 border flex flex-col px-5 pb-5 items-center content-center">
          <img className="rounded-full m-5 w-64 h-64" src={currentUser.avatar} alt="" />
          <div className="flex justify-center items-center font-semibold text-blue-900">
            <h4 className="mr-2">Name: </h4>
            <p>
              {currentUser.first_name} {currentUser.last_name}
            </p>
          </div>
          <div className="flex justify-center items-center font-semibold text-blue-900">
            <h4 className="mr-2">Email: </h4>
            <p>{currentUser.email}</p>
          </div>
        </div>
      ):(
            error && (
                <div className="mx-auto w-6/12 text-center">
                    <h2 className="font-semibold text-lg">Error Occurred</h2>
                    {error}
                </div>
            )
      )}
    </div>
  );
};

export default Dashboard;
