import React from "react"
import Message from "./Message"
import "./messages.scss"

const Messages = () => {
  return <div className="messages">
    <Message isOwner={"owner"}/>
    <Message />
    <Message isOwner={"owner"}/>
    <Message />
    <Message isOwner={"owner"}/>

  </div>
}

export default Messages
