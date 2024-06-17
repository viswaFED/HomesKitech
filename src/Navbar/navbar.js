import React from "react";
import { FiLogOut } from "react-icons/fi";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("loggedIn");
      navigate("/login");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-title">reciipiie</div>
      <button className="logout-button" onClick={handleSignOut}>
        <FiLogOut className="logout-icon" />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
