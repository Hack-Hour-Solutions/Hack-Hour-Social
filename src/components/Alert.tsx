import React, { useState } from 'react';

const Alert = ({ message }) => {
  // const alertText = <p>{props.message}</p>
  return (
    <div className='alert-bar'>
      <p>
      <strong>Error!</strong>
      { message }
      </p>
    </div>
  )
}

export default Alert;