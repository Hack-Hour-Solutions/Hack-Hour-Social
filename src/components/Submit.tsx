import React, { useState } from 'react';
import axios from 'axios';

const Submit = (props) => {
  const [submitText, setSubmitText] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <form id="submit-form" onSubmit={handleSubmit} >
      <input type="textarea" onChange={(e) => setSubmitText(e.target.value)} value={submitText} required/>
      <button className="button-primary">Submit</button>
    </form>
  )
}

export default Submit;