import React, { useState , useRef, useEffect  } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./navbar.css";
import avtar from "../../assets/1.jpg";
import Badge from "@mui/material/Badge";
import { FaCog, FaSignOutAlt } from "react-icons/fa"; 

const Navbar = ({ onSignOut }) => {
  const [activeTab, setActiveTab] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopupleft = () => {
      setShowPopup((prevState) => !prevState);  
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  

  return (
    <div className="parent-nav">
      <nav className="   navbar-light   navbar-custom">
        <div className="navitem d-flex w-100 justify-content-between ps-3 pe-3">
          <div
            className=" d-flex " 
            
          >
             <div
      className="navbar-nav ms-1 align-items-center"
      style={{ display: "contents" }}
    >
      <div className="collapse-icon" onClick={togglePopupleft}>
        <span>{showPopup ? <>&times;</> : <>&#9776;</>}</span>
      </div>
      <span
        className="navbar-brand"
        style={{
          color: "white",
          fontSize: "18px",
          marginRight: "40px",
          marginTop: "8px",
        }}
      >
        InsureTalk AI
      </span>

      {showPopup && (
        <div className="popup">
          <NavLink
            to="/dashboard"
            onClick={() => handleTabClick("Dashboard")}
            style={{
              marginRight: "25px",
              color: "white",
              textDecoration: "none",
            }}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/logs"
            onClick={() => handleTabClick("Logs")}
            style={{
              marginRight: "25px",
              color: "white",
              textDecoration: "none",
            }}
          >
            Logs
          </NavLink>
          <NavLink
            to="/error-logs"
            onClick={() => handleTabClick("Error-Logs")}
            style={{
              marginRight: "25px",
              color: "white",
              textDecoration: "none",
            }}
          >
            Error-Logs
          </NavLink>
        </div>
      )}

      <div className="links">
        <NavLink
          to="/dashboard"
          className={`nav-link nav-item ${
            activeTab === "Dashboard" ? "active" : ""
          }`}
          onClick={() => handleTabClick("Dashboard")}
          style={{ marginRight: "25px" }}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/logs"
          className={`nav-link nav-item ${
            activeTab === "Logs" ? "active" : ""
          }`}
          onClick={() => handleTabClick("Logs")}
          style={{ marginRight: "25px" }}
        >
          Logs
        </NavLink>
        <NavLink
          to="/error-logs"
          className={`nav-link nav-item ${
            activeTab === "Error-Logs" ? "active" : ""
          }`}
          onClick={() => handleTabClick("Error-Logs")}
          style={{ marginRight: "25px" }}
        >
          Error-Logs
        </NavLink>
      </div>
    </div>
          </div>

          <div style={{display:"flex", gap:"35px"}}>
          <div style={{  marginTop:"8px" }}>
            <Badge
              variant="dot"
              sx={{ "& .MuiBadge-dot": { backgroundColor: "red" } }}
            >
              <i
                className="fas fa-bell"
                style={{ fontSize: "15px", color: "white" }}
              ></i>
            </Badge>
          </div>
           
          <div
            className="avatar"
            onClick={togglePopup}
            style={{ cursor: "pointer",  }}
          >
            <img
              className="avatar-img"
              src={avtar}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                marginTop: "8px",
                marginLeft: "5px",
              }}
              alt="user"
            />
          </div>
          </div>

          {isPopupOpen && (
            <div className="profile-popup" ref={popupRef}>
              <div className="profile-info">
                <img
                  src={avtar}
                  alt="Profile"
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    marginRight: "5px",
                  }}
                />
                <span style={{ alignItems: "baseline" }}>Meryl Streep</span>
              </div>
              <div className="popup-options">
                <button className="popup-button">
                  <FaCog /> Settings
                </button>
                <button className="popup-button" onClick={onSignOut}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
