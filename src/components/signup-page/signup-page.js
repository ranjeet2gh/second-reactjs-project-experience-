import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup-page.css';
import signup from '../../assets/signup.png';
import { Link } from "react-router-dom";
import { Signup } from '../../services/APIs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  
  const [passwordTimer, setPasswordTimer] = useState(null);
  const [confirmPasswordTimer, setConfirmPasswordTimer] = useState(null);

   
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);

    if (!passwordVisible) {
      
      const timer = setTimeout(() => setPasswordVisible(false), 1000);
      setPasswordTimer(timer);
    } else if (passwordTimer) {
      
      clearTimeout(passwordTimer);
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);

    if (!confirmPasswordVisible) {
       
      const timer = setTimeout(() => setConfirmPasswordVisible(false), 1000);
      setConfirmPasswordTimer(timer);
    } else if (confirmPasswordTimer) {
       
      clearTimeout(confirmPasswordTimer);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await Signup({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });
       setSuccess("Signup successful!");
      if (success ==="Signup successful!" ) {  
        navigate('/login');
      }
     
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{height:"100%"}}>
      <div className='insuretalk'>InsureTalk AI</div>
      <div className='signuppage'>
        <div className="container" style={{ width: "400px" }}>
        <form onSubmit={handleSubmit}>
          <p style={{fontSize:"36px"}}>Sign Up</p>

          <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />

            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Example@gmail.com"
              required
             pattern=" ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

            />

             <label>Password</label>
            <div className='pass-in'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                // autoComplete="new-password" 
                required
                minLength="6"
              />
              <button
                onClick={togglePasswordVisibility}
                style={{
                  marginLeft: '-35px',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                }}
                aria-label="Toggle password visibility"
                type="button"
              >
                <FontAwesomeIcon icon={passwordVisible ? faEye :faEyeSlash}
                color='gray' />
              </button>
            </div>
            <label>Confirm Password</label>
            <div className='pass-in'>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                // autoComplete="new-password" 
                required
                minLength="6"
              />
              <button
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  marginLeft: '-35px',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                }}
                aria-label="Toggle confirm password visibility"
                type="button"
              >
                <FontAwesomeIcon icon={confirmPasswordVisible ? faEye :faEyeSlash}
                color='gray' />
              </button>
            </div>
            
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <button className="btn-green" style={{marginTop:"20px"}} disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <p style={{fontSize:"18px", padding: "10px", marginTop: "20px",textAlign:"center" }}>
              Already have an account? <Link to="/login" style={{ color: "#00796B", textDecoration: "underline" }}>Sign In</Link>
            </p>
          </form>
        </div>
        <div className='signup-picture'>
          <img src={signup} alt="Signup"  />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
