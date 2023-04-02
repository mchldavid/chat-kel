import React, { useContext, useState } from "react"
import "./send.scss"
import { RiSendPlaneLine } from "react-icons/ri"
import { BiImageAlt } from "react-icons/bi"
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

  const handlePreviewImg = (img) => {
    const prvImg = document.querySelector("#prvImg")
    prvImg.src = URL.createObjectURL(img)
  }

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
    if (file != null) {
      const storageRef = ref(storage, uuid())

      const uploadTask = uploadBytesResumable(storageRef, file)

      await uploadTask.then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: text,
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
    handlePreviewImg(file)
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
          <input
            id="attacthment"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0])
              console.log("uploaded")
              handlePreviewImg(e.target.files[0])
              e.target.value = ""
            }}
          />
          <label
            htmlFor="attacthment"
            style={{ display: file !== null ? "none" : "flex" }}
          >
            <BiImageAlt />
          </label>
          <div
            className="preview-container"
            style={{ display: file !== null ? "flex" : "none" }}
          >
            <button onClick={() => setFile(null)}>-</button>
            <img
              id="prvImg"
              src="#"
              alt="preview img"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        <button className="send-button" onClick={handleSend}>
          <RiSendPlaneLine />
        </button>
      </div>
    </div>
  )
}

export default Send
