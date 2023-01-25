import React from "react"
import Navbar from "./Navbar"
import Search from "./Search"
import "./sidebar.scss"
import UserChatFriends from "./UserChatFriends"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Search />
      <UserChatFriends />
      <Navbar />
    </div>
  )
}

export default Sidebar
