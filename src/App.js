import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/navbar.js';
import SignupPage from './components/signup-page/signup-page.js';
import LoginPage from './components/SignIn-page/login-page.js';
import CallDashboard from './components/call-Logs/dashboard-call.js';
import Logs from './components/logs-error/logs-error.js';
import Dashboard from './components/dashboard/dashboard.js';
import React, { useState, useEffect } from "react";
import 'antd/es/style/reset.css';
import CallDetailPage from './components/call-detail-page/call-detail-page.js';
import { Logout } from './services/APIs.js';
import ForgotPassword from './components/forgetPassword/forgetPassword.js';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

   
  useEffect(() => {
    
    const accessToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!accessToken); 
   
  }, []);

 
  const handleSignIn = () => {
    setIsAuthenticated(true);
    
  };

  const handleSignOut = async () => {
    try {
      await Logout();  
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated","false");  
    } catch (error) {
      console.error("Error during logout:", error);
      
    }
  }; 

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <Navbar onSignOut={handleSignOut} />}
        <Routes>
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/logs"
            element={isAuthenticated ? <CallDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />}
          />
          <Route
            path="/error-logs"
            element={isAuthenticated ? <Logs /> : <Navigate to="/login" />}
          />
          <Route
            path="/page-details/:callId"
            element={isAuthenticated ? <CallDetailPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onSignIn={handleSignIn} />}
          />
          <Route path="/forgetPassword" element={<ForgotPassword/>} />
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signup" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
