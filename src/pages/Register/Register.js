import React, { useState } from "react"
import { BiImageAdd } from "react-icons/bi"
import "./register.scss"

//firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, storage, db } from "../../firebase/initializeFirebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"

const Register = () => {
  const [err, setErr] = useState({ isError: false, message: "" })

  const handleRegister = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      //create firebase auth sign in
      const rspns = await createUserWithEmailAndPassword(auth, email, password)

      //upload image
      const storageRef = ref(storage, displayName)

      const uploadTask = uploadBytesResumable(storageRef, file)

      await uploadTask.then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(rspns.user, {
            displayName,
            photoURL: downloadURL,
          })

          //add data firestore for new user
          await setDoc(doc(db, "users", rspns.user.uid), {
            uid: rspns.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          })
        })
      })
    } catch (error) {
      setErr({ ...err, isError: true, message: error.message })
    }
  }

  return (
    <div className="register">
      <div className="wrapper">
        <div className="title">
          <h1>Register to Chat-kel</h1>
        </div>
        <form
          onSubmit={(e) => {
            handleRegister(e)
          }}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              type="password"
              placeholder="Enter password"
              required
            />
            <input type="file" id="file" style={{ display: "none" }} />
          </div>

          <label className="upload-button" htmlFor="file">
            <BiImageAdd /> Upload display picture
          </label>
          <button className="button-primary"> Sign Up</button>
        </form>
        {err.isError && <span>{err.message}</span>}
        <span>
          Already have an account? <a href="/login">Login</a>
        </span>
      </div>
    </div>
  )
}

export default Register
