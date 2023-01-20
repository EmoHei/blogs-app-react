import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, Link, Router, Route } from "react-router-dom";
import "./Header.css"
//Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//  react-bootstrap
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



const Header = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [profileName, setProfileName] = useState('')
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogged(true)

                setProfileName(user.displayName)
            } else setIsLogged(false)
        })
    }, [auth])

    function onLogout() {
        auth.signOut();

    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="Light" variant="ligth">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto nav-menu-container ul" >
                        {/* <Link to="/" style={{textDecoration:'none'}}>
                            <li 
                            className={`nav-item nav-link  
                            ${active === "home"? "active" : ""}`} 
                            onClick={()=>setActive}>Link/Home
                            </li>
                        </Link> */}
                        <NavLink to='/' >Home</NavLink>

                        <NavLink to='/about' >About</NavLink>
                        {isLogged && <NavLink to='/create' >Create</NavLink>}
                    </Nav>
                    <Nav className="nav-menu-container " >
                        {isLogged && (


                            <div className="profile-logo">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="logo"
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",

                                    }}
                                />
                            </div>
                        )}
                        {isLogged && <NavLink to='/profile' >Profile</NavLink>}
                        {isLogged && <NavLink to='/logout' onClick={onLogout} > Logout</NavLink>}

                        {!isLogged && <NavLink to='/register'>Register</NavLink>}
                        {!isLogged && <NavLink to='/login'>Login</NavLink>}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

};

export default Header;