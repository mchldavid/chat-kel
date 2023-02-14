import React, { useContext } from "react"
import "./chat.scss"
import { BsThreeDotsVertical } from "react-icons/bs"
import Messages from "./Messages"
import Send from "./Send"
import { ChatContext } from "../context/ChatContext"

const Chat = () => {
  const { data, dispatch } = useContext(ChatContext)

  const handleCloseChat = () => {
    dispatch({ type: "CLEAR_USER"})
  }

  return (
    <div className="chat card">
      <div className="chat-header">
        <div className="user-info">
          {data.chatId !== "null" && (
            <>
              <div className="profile-picture">
                <img src={data.user?.photoURL} alt="" />
              </div>
              <div className="username">{data.user?.displayName}</div>
            </>
          )}
        </div>

        <div className="others">
          <div className="button-icons" onClick={handleCloseChat}>
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
