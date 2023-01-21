import React from 'react'

const Spinner = () => {
  return (
      <div className='spinner-container'>
          <div>
              <img src={spinner} alt="Loading..." className='spinner' />
          </div>
      </div>
  )
}

export default Spinner
