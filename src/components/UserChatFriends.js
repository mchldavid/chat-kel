import React, { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/initializeFirebase"
import "./userchatfriends.scss"
import { AuthContext } from "../context/AuthContext"
import { displayChatTime } from "../function/displayChatTime"
import { ChatContext } from "../context/ChatContext"

const UserChatFriends = () => {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const getFriends = () => {
      const unsub = onSnapshot(
        doc(db, "userFriends", currentUser.uid),
        (doc) => {
          setFriends(doc.data())
        }
      )

      return () => {
        unsub()
      }
    }

    currentUser.uid && getFriends()
  }, [currentUser.uid])

  const handleSelect = (u) => {
    console.log("u", u)
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  return (
    <div className="user-chat-friends card">
      { Object.entries(friends)?.sort((a, b) =>b[1].date - a[1].date).map((friend) => (
        <div
          className="user-chat-details"
          key={friend[0]}
          onClick={() => handleSelect(friend[1].userInfo)}
        >
          <div className="profile-picture">
            <img src={friend[1].userInfo.photoURL} alt="" />
          </div>

          <div className="user-chat-info">
            <div className="username">{friend[1].userInfo.displayName}</div>
            <p>{friend[1].lastMessage?.content}</p>
          </div>
          <div className="time">{displayChatTime(friend[1].date?.seconds)}</div>
        </div>
      ))}
    </div>
  )
}

export default UserChatFriends
