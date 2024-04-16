import React, { useState } from 'react';
import axios from 'axios';
import pe from "../images/login/pe.jpg";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/forgot-password', {
        email,
      }, { withCredentials: true });
      setSuccessMessage(response.data);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <img src={pe} alt="log in" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <button type="submit">Reset Password</button>
        {error && <p className="forgot-error">{error}</p>}
        {successMessage && <p className="forgot-success">{successMessage}</p>}
      </form>
    </div>
  );
}

