import spinner from '../assets/svg/spinner.svg'
import React from 'react'
import './SpinnerComp.css';
export default function SpinnerComp() {
    return (
        <div className='spinner-container'>
            <div>
                <img src={spinner} alt="Loading..." className='spinner' />
            </div>
        </div>
    )
}