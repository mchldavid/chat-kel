import React from 'react';
import "./userchatfriends.scss"

const UserChatFriends = () => {
  return (
    <div className="user-chat-friends card">
      <div className="user-chat-details">
        <img src={window.location.origin + "/img/default-img.jpg"} alt=""/>
        <div className="user-chat-info">
          <div className="username">Jessica</div>
          <p>message me...</p>
        </div>
        <div className="time">9:00PM</div>
      </div>
      <div className="user-chat-details">
        <img src={window.location.origin + "/img/default-img.jpg"} alt=""/>
        <div className="user-chat-info">
          <div className="username">Jessica</div>
          <p>message me...</p>
        </div>
        <div className="time">9:00PM</div>
      </div>
      <div className="user-chat-details">
        <img src={window.location.origin + "/img/default-img.jpg"} alt=""/>
        <div className="user-chat-info">
          <div className="username">Jessica</div>
          <p>message me...</p>
        </div>
        <div className="time">9:00PM</div>
      </div>
    </div>
  );
};

export default UserChatFriends;