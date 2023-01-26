import { signOut } from "firebase/auth"
import React, { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { auth } from "../firebase/initializeFirebase"
import "./navbar.scss"

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  const handleLogout = () => {
    //logging out the current user in the application
    signOut(auth)
  }

  return (
    <div className="navbar card">
      <div className="user-display">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Navbar
