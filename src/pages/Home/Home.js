import React from "react"
import "./home.scss"
import Sidebar from "../../components/Sidebar"
import Chat from "../../components/Chat"

const Home = () => {
  return (
    <div className="home">
      <div className="wrapper">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home
