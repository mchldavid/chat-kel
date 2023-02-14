import React, {useContext} from "react"
import { ChatContext } from "../context/ChatContext"
import "./message.scss"

const Message = (props) => {
  const {data} = useContext(ChatContext)

  return (
    <div className={"message " + (props.isOwner && "owner")}>
      <div className="user-info">
        {!props.isOwner && (
          <img src={data.user.photoURL} alt="" />
        )}
      </div>
      <div className="content">
        <p>{props.message}</p>
        {/* <img src={window.location.origin + "/img/default-img.jpg"} alt="" /> */}
      </div>
    </div>
  )
}

export default Message
