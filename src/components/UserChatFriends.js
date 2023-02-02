import React, { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/initializeFirebase"
import "./userchatfriends.scss"
import { AuthContext } from "../context/AuthContext"
import { displayChatTime } from "../function/displayChatTime"

const UserChatFriends = () => {
  const { currentUser } = useContext(AuthContext)
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

    return currentUser.uid && getFriends()
  }, [currentUser.uid])

  return (
    <div className="user-chat-friends card">
      {Object.entries(friends)?.map((friend) => (
        <div className="user-chat-details" key={friend[0]}>
          <div className="profile-picture">
            <img src={friend[1].userInfo.photoURL} alt="" />
          </div>

          <div className="user-chat-info">
            <div className="username">{friend[1].userInfo.displayName}</div>
            <p>no message...</p>
          </div>
          <div className="time">{displayChatTime(friend[1].date?.seconds)}</div>
        </div>
      ))}
    </div>
  )
}

export default UserChatFriends
