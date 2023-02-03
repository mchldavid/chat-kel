import React, { useContext } from "react"
import "./chat.scss"
import { BsThreeDotsVertical } from "react-icons/bs"
import Messages from "./Messages"
import Send from "./Send"
import { ChatContext } from "../context/ChatContext"

const Chat = () => {
  const { data } = useContext(ChatContext)

  return (
    <div className="chat card">
      <div className="chat-header">
        <div className="username">{data.user?.displayName}</div>
        <div className="others">
          <div className="button-icons">
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>

      <Messages />
      <Send />
    </div>
  )
}

export default Chat
