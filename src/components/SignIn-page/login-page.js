import React, { useState } from 'react';
import './login-page.css';
import { useNavigate, Link } from 'react-router-dom';
import signup from '../../assets/signup.png';
import { Login } from '../../services/APIs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const LoginPage = ({ onSignIn }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordTimer, setPasswordTimer] = useState(null);
  
  const handleForgotPasswordClick = () => {
      navigate('/forgetPassword'); 
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);

    if (!passwordVisible) {

      const timer = setTimeout(() => setPasswordVisible(false), 1000);
      setPasswordTimer(timer);
    } else if (passwordTimer) {

      clearTimeout(passwordTimer);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await Login(Email, Password);
      console.log("Login successful:", data);


      onSignIn();

      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{height:"100%"}}>
      <div className='insuretalkin'>InsureTalk AI</div>
      <div className='signinpage'>
        <div className="containerin" style={{ width: "400px" }}>
          <form onSubmit={handleLogin}>
            <p style={{fontSize:"36px"}}>Sign In</p>
            <label>Email</label>
            <input
              type="email"
              placeholder="Example@gmail.com"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <div className='pass-in'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                // autoComplete="current-password" 
                required
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
              >
                <FontAwesomeIcon icon={passwordVisible ?faEye :faEyeSlash }
                color='gray' />
              </button>
            </div>
            <p style={{fontSize:"16px", color: "#00796B", textAlign: "end" , marginTop:"15px",cursor: "pointer"
 }}  onClick={handleForgotPasswordClick}>Forgot Password?</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="btn-green">Sign In</button>
            
            <p style={{fontSize:"18px", padding: "10px", marginTop: "20px", textAlign:"center"}}>
              Don't have an account?
              <Link to="/signup" style={{ color: " #00796B", textDecoration: "underline" }}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
        <div className='signin-picture'>
          <img src={signup} alt="Signup"/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
