import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/App_Context";

const Navbar = () => {
  const { isAuthenticated, logOut } = useContext(AppContext);
  const navigate = useNavigate();

  // Function to force reload on Veg Fusion click
  const handleHomeClick = () => {
    navigate("/"); // Navigate to Home
    window.location.reload(); // Force page reload to reset filters
  };

  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <div className="container">
        {/* Brand Name */}
        <span className="navbar-brand fw-bold" style={styles.brand} onClick={handleHomeClick}>
          Veg Fusion 🥗
        </span>

        {/* Responsive Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/add" className="nav-link btn mx-2" style={styles.addBtn}>
                    ➕ Add Recipe
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link btn mx-2" style={styles.profileBtn}>
                    👤 Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn mx-2" style={styles.logoutBtn} onClick={logOut}>
                    🚪 Logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link to="/saved" className="nav-link btn mx-2" style={styles.savedBtn}>
                    ❤️ Saved
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link btn mx-2" style={styles.loginBtn}>
                    🔑 Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link btn mx-2" style={styles.registerBtn}>
                    📝 Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

//  Define `styles` object properly
const styles = {
  navbar: {
    background: "linear-gradient(90deg, #1B5E20, #2E7D32)", // Forest Green Gradient
    padding: "15px 0",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  brand: {
    color: "#FFF",
    fontSize: "28px",
    textDecoration: "none",
    cursor: "pointer", // Make it clickable
  },
  addBtn: {
    backgroundColor: "#66BB6A",
    color: "#FFF",
    borderRadius: "8px",
    padding: "8px 15px",
    transition: "0.3s",
  },
  profileBtn: {
    backgroundColor: "#4CAF50",
    color: "#FFF",
    borderRadius: "8px",
    padding: "8px 15px",
    transition: "0.3s",
  },
  logoutBtn: {
    backgroundColor: "#D32F2F",
    color: "white",
    borderRadius: "8px",
    padding: "8px 15px",
    transition: "0.3s",
  },
  loginBtn: {
    backgroundColor: "#388E3C",
    color: "#FFF",
    borderRadius: "8px",
    padding: "8px 15px",
    transition: "0.3s",
  },
  registerBtn: {
    backgroundColor: "#FFD600",
    color: "#1B5E20",
    borderRadius: "8px",
    padding: "8px 15px",
    transition: "0.3s",
  },
  savedBtn: {
    backgroundColor: "#FF7043",
    color: "white",
    borderRadius: "8px",
    padding: "8px 15px",
    transition: "0.3s",
  },
};

// Apply hover effect
const hoverEffect = {
  ":hover": {
    transform: "scale(1.05)",
    opacity: "0.9",
  },
};

// Add hover effect to all buttons
Object.keys(styles).forEach((key) => {
  if (key.endsWith("Btn")) {
    styles[key] = { ...styles[key], ...hoverEffect };
  }
});

export default Navbar;
