import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/initializeFirebase";
import "./navbar.scss";

const Navbar = () => {
  const handleLogout = () => {
    //logging out the current user in the application
    signOut(auth)
  }

  return (
    <div className="navbar card">
      <div className="user-display">
        <img src={window.location.origin + "/img/default-img.jpg"} alt="" />
        <span>Michael</span>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
