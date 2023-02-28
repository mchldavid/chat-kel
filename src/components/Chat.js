import React, { useContext } from "react"
import "./chat.scss"
import { AiOutlineClose } from "react-icons/ai"
import Messages from "./Messages"
import Send from "./Send"
import { ChatContext } from "../context/ChatContext"

const Chat = () => {
  const { data, dispatch } = useContext(ChatContext)

  const handleCloseChat = () => {
    dispatch({ type: "CLEAR_USER" })
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

        {data.chatId !== "null" && (
          <div className="others">
            <div
              style={{ cursor: "pointer" }}
              className="button-icons"
              onClick={handleCloseChat}
            >
              Close
            </div>
          </div>
        )}
      </div>

      <Messages />
      <Send />
    </div>
  )
}

export default Chat
