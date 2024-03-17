import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div> 
  );
}

export default App;
