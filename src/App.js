
import './App.css';

import { Routes, Route } from "react-router-dom"
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import AddEditBlog from './pages/AddEditBlog';
import About from './pages/About';
// import Auth from ' ./pages/';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import ForgotPassword from './components/ForgotPassword';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';


function App() {
 

  return (
    <div className="App">
      <Header />
      <ToastContainer position='top-center'/>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />

        <Route path="/create" element={<PrivateRoute />} >
          <Route path="/create" element={<AddEditBlog />} />
        </Route>

        {/* <Route path="/create" element={<PrivateRoute />} > */}
         <Route path="/update/:id" element={<AddEditBlog />} />
        {/* </Route> */}
       
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path='/profile' element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} />
  
        <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
