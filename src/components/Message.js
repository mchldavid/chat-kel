import React from "react"
import "./message.scss"

const Message = (props) => {
  return (
    <div className={"message " + props.isOwner}>
      <div className="user-info">
        <img src={window.location.origin + "/img/default-img.jpg"} alt="" />
      </div>
      <div className="content">
        <p>
          Have a Good night to you. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        {/* <img src={window.location.origin + "/img/default-img.jpg"} alt="" /> */}
      </div>
    </div>
  )
}

export default Message
