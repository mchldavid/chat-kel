import { signOut } from "firebase/auth"
import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { auth } from "../firebase/initializeFirebase"
import "./navbar.scss"
import { ChatContext } from "../context/ChatContext"
import LoadingScreen from "./Loading"

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    //logging out the current user in the application
    setIsLoading(true)
    setTimeout(() => {
      dispatch({ type: "CLEAR_USER" })
      signOut(auth)
    }, 300)
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

      <LoadingScreen isLoading={isLoading} />
    </div>
  )
}

export default Navbar
