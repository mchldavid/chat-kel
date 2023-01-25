import React from "react"
import "./chat.scss"
import { BsThreeDotsVertical } from "react-icons/bs"
import Messages from "./Messages"
import Send from "./Send"

const Chat = () => {
  return (
    <div className="chat card">
      <div className="chat-header">
        <div className="username">Jessica</div>
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
