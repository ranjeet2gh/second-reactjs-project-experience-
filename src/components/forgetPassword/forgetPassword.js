import React from 'react';
import './forgetPassword.css'
const ForgotPassword = () => {
    return (
        <div className="forgot-password-container">
            <div className="forgot-password-card">
                <h2>Forgot Your Password?</h2>
                <p>Please provide your email address, and we will send you a temporary password shortly.</p>
                <label>Email</label>
                <input type="email" placeholder="Example@email.com" required />
                <button type="submit">Submit</button>
            </div>
        </div>
    );
};

export default ForgotPassword;
