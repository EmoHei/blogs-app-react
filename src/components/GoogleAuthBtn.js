import React from 'react'
import './GoogleAuthBtn.css'
import Button from 'react-bootstrap/Button';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleAuthBtn() {
  return (
      <Button
          variant="primary"
          //  !! Important: type must be 'button' Not 'submit'
          type="button"
          className="google-btn"
         >
          <span className="google-icon"><FcGoogle /></span>
          Continue with Google
      </Button>
  )
}
