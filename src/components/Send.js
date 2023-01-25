import React from "react"
import "./send.scss"
import { RiSendPlaneLine } from "react-icons/ri"
import {MdAttachFile } from "react-icons/md"

const Send = () => {
  return (
    <div className="send-container">
      <input type="text" placeholder="Type a message..." />
      <div className="send-wrapper">
        <div className="file">
          <input id="attacthment" type="file" style={{ display: "none" }} />
          <label htmlFor="attacthment">
            <MdAttachFile />
          </label>
        </div>

        <button className="send-button">
          <RiSendPlaneLine />
        </button>
      </div>
    </div>
  )
}

export default Send
