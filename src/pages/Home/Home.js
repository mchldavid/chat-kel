import React from "react"
import Sidebar from "../../components/Sidebar"
import Chat from "../../components/Chat"
import "./home.scss"
import Navbar from "../../components/Navbar"
import Search from "../../components/Search"

const Home = () => {
  return (
    <div className="home">
      <div className="wrapper">
        <div className="left-section">
          <Search />
          <Sidebar />
          <Navbar />
        </div>

        <Chat />
      </div>
    </div>
  )
}

export default Home
