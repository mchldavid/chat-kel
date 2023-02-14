import React, { useContext, useState } from "react"
import "./send.scss"
import { RiSendPlaneLine } from "react-icons/ri"
import { MdAttachFile } from "react-icons/md"
import { v4 as uuid } from "uuid"
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { db, storage } from "../firebase/initializeFirebase"
import { ChatContext } from "../context/ChatContext"
import { AuthContext } from "../context/AuthContext"

const Send = () => {
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  const [text, setText] = useState("")
  const [file, setFile] = useState(null)

  const updateLastMessage = async (content) => {
    let servTime = serverTimestamp()
    //for reciever
    await updateDoc(doc(db, "userFriends", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        content,
      },
      [data.chatId + ".date"]: servTime,
    })

    //for sender
    await updateDoc(doc(db, "userFriends", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        content,
      },
      [data.chatId + ".date"]: servTime,
    })
  }

  const handleSend = async () => {
    if (file) {
      const storageRef = ref(storage, uuid())

      const uploadTask = uploadBytesResumable(storageRef, file)

      await uploadTask.then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              file: downloadURL,
            }),
          })

          updateLastMessage(text)
        })
      })
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })

      updateLastMessage(text)
    }

    setText("")
    setFile(null)
  }

  return (
    <div className="send-container">
      <input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send-wrapper">
        <div className="file">
          <input id="attacthment" type="file" style={{ display: "none" }} />
          <label htmlFor="attacthment">
            <MdAttachFile />
          </label>
        </div>

        <button className="send-button" onClick={handleSend}>
          <RiSendPlaneLine />
        </button>
      </div>
    </div>
  )
}

export default Send
