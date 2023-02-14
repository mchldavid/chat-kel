import React, { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/ChatContext"
import Message from "./Message"
import "./messages.scss"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/initializeFirebase"
import { AuthContext } from "../context/AuthContext"

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    setMessages([])
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])

  console.log("messages", messages)

  return (
    <div className="messages">
      {messages?.map((m) => (
        <Message message={m.text} key={m.id} isOwner={m.senderId === currentUser.uid} />
      ))}

      {/* 
      <Message />
      <Message isOwner={"owner"} />
      <Message />
      <Message isOwner={"owner"} /> */}
    </div>
  )
}

export default Messages
