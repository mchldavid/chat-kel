import React, { useEffect, useContext} from "react"
import "./home.scss"
import Sidebar from "../../components/Sidebar"
import Chat from "../../components/Chat"
import { ChatContext } from "../../context/ChatContext"

const Home = () => {
  const { data } = useContext(ChatContext)

  useEffect(() => {
    var sidebarExpanded = document.querySelector(".sidebar")
    var chatExpanded = document.querySelector(".chat")
    
    if(data.chatId !== "null"){
      sidebarExpanded.setAttribute("aria-expanded", "false") 
      chatExpanded.setAttribute("aria-expanded", "true") 
    }else{
      sidebarExpanded.setAttribute("aria-expanded", "true") 
      chatExpanded.setAttribute("aria-expanded", "false") 
    }
  }, [data.chatId])

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
