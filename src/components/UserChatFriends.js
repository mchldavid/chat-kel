import React, { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/initializeFirebase"
import "./userchatfriends.scss"
import { AuthContext } from "../context/AuthContext"

const UserChatFriends = () => {
  const { currentUser } = useContext(AuthContext)
  const [friends, setFriends] = useState([])

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1) // Epoch
    t.setSeconds(secs)
    return t
  }

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
            <img src={window.location.origin + "/img/default-img.jpg"} alt="" />
          </div>

          <div className="user-chat-info">
            <div className="username">{friend[1].userInfo.displayName}</div>
            <p>message me...</p>
          </div>
          <div className="time">{toDateTime(friend[1].date.seconds).get()}</div>
        </div>
      ))}
    </div>
  )
}

export default UserChatFriends
