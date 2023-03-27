import React, { useContext, useEffect, useRef } from "react"
import { ChatContext } from "../context/ChatContext"
import "./message.scss"

const Message = (props) => {
  const { data } = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
      })
    }, 500);
    
  }, [props.message])

  return (
    <div className={"message " + (props.isOwner ? "owner" : "")}>
      <div className="user-info">
        {!props.isOwner && <img src={data.user.photoURL} alt="" />}
      </div>
      <div className="content">
        {props.message && <p>{props.message}</p>}
        {props.file && <img src={props.file} alt="" />}
      </div>
      <div ref={ref}></div>
    </div>
  )
}

export default Message
