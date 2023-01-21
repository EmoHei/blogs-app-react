
import './App.css';

import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
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
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';


function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/login");
    });
  };

  return (
    <div className="App">
      
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout} />
      <ToastContainer position='top-center'/>
      <Routes>
      
        <Route
          path="/"
          element={<Home setActive={setActive} active={active} user={user} />}
        />
        <Route path="/detail/:id" element={<Detail setActive={setActive} />} />

        {/* <Route path="/create" element={<PrivateRoute />} > */}
        <Route
          path="/create"
          element={ user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />}
           
        />
        <Route
          path="/update/:id"
          element={ user?.uid ? (<AddEditBlog user={user} setActive={setActive} /> 
            ) : (<Navigate to="/" /> ) }
        />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path='/profile' element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
<Route path='/logout' element={<Login></Login>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} />
  
        <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
