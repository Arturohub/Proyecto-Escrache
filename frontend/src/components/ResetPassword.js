import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    console.log("Token:", token);
  }, [token]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/auth/reset-password', {
        token,
        password,
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
        <label htmlFor="password">New Password:</label>
        <input type="password" id="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" placeholder="Confirm new password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
        {error && <p className="forgot-error">{error}</p>}
        {successMessage && <p className="forgot-success">{successMessage}</p>}
      </form>
    </div>
  );
}
