import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { getAuth, updateProfile } from 'firebase/auth'
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { FcHome } from 'react-icons/fc'
export default function Profile() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [changeDetail, setChangeDetail] = useState(false)
    let disabled;


    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const { name, email } = formData;

    function onLogout() {
        auth.signOut();
        navigate('/')
    }
    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
    async function onSubmit() {
        try {
            if (auth.currentUser.displayName !== name) {
                //update displayName in firebase auth
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
                // update name in firestore
                const docRef = doc(db, "users", auth.currentUser.uid)
                await updateDoc(docRef, { name, })
            }
            toast.success("Profile details updated")
        } catch (error) {
            toast.error('Could not update the profile details')
        }
    }

    return (
        <div>
            <>
                <section className="form-section">
                    <h1 className='title'>My Profile</h1>
                    <div className='form-container'>

                        <Form>
                            {/* Name Input */}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id='name'
                                    value={name}
                                    disabled={!changeDetail}
                                    onChange={onChange}
                                    style={{ backgroundColor: changeDetail ? "rgb(250, 220, 220)" : 'white' }}
                                />
                            </Form.Group>

                            {/* Email Input */}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    id='email'
                                    value={email}
                                    className="name-input"
                                    disabled={!changeDetail} />
                            </Form.Group>

                            <Form.Group className="mb-3 edit-sign-out-form-group" controlId="formBasicEmail">
                                <Form.Label>Do you want to change your name?
                                    <span onClick={() => {
                                        changeDetail && onSubmit()
                                        setChangeDetail((prevState) => !prevState)
                                    }}
                                    >
                                        {changeDetail ? ' Apply-change' : ' Edit'}
                                    </span>
                                </Form.Label>
                                <p onClick={onLogout}>Sign Out</p>
                            </Form.Group>
                            {/* Button */}
                            <Button
                                variant="primary"
                                type="submit"
                                className='sell-rent-btn' >
                                <Link className='rent-sell-link' to="/create">
                                    <FcHome className='home-icon' />
                                    Sell or rent your home
                                </Link>

                            </Button>
                        </Form>
                    </div>
                </section>
            </>
        </div>
    )
}
