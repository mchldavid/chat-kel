import React from "react";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar card">
      <div className="user-display">
        <img src={window.location.origin + "/img/default-img.jpg"} alt="" />
        <span>Michael</span>
      </div>
      <button className="logout-button">Logout</button>
    </div>
  )
}

export default Navbar
