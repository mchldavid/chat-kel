import React, { useEffect, useState } from "react"
import "./register.scss"
import { Link, useNavigate } from "react-router-dom"
import profilePhoto from "../../img/defaultProfilePhoto.jpg"

//firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, storage, db } from "../../firebase/initializeFirebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"
import { v4 as uuid } from "uuid"
import LoadingScreen from "../../components/Loading"
import Logo from "../../components/Logo"

const Register = () => {
  const [err, setErr] = useState({ isError: false, message: "" })
  const navigate = useNavigate()
  const [defaultDPURL, setdefaultDPURL] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getDefaultPhoto = () => {
    function toDataUrl(url, callback) {
      var xhr = new XMLHttpRequest()
      xhr.onload = function () {
        var reader = new FileReader()
        reader.onloadend = function () {
          callback(reader.result)
        }
        reader.readAsDataURL(xhr.response)
      }
      xhr.open("GET", url)
      xhr.responseType = "blob"
      xhr.send()
    }

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }

    toDataUrl(
      profilePhoto,
      function (myBase64) {
        setdefaultDPURL(dataURLtoFile(myBase64, "defaultProfilePhotos.jpg"))
      }
    )
  }

  useEffect(() => {
    getDefaultPhoto()
  }, [])

  const handlePreviewImg = (img) => {
    const prvImg = document.querySelector("#prvImg")
    prvImg.src = URL.createObjectURL(img)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    var file = e.target[3].files[0]
    setIsLoading(true)
    setErr({ ...err, isError: false, message: "" })

    try {
      //create firebase auth sign in
      const rspns = await createUserWithEmailAndPassword(auth, email, password)

      //upload image
      const storageRef = ref(storage, displayName + uuid())

      if (file === undefined) {
        getDefaultPhoto()
        file = defaultDPURL
      }

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

          await setDoc(doc(db, "userFriends", rspns.user.uid), {})
          navigate("/")
        })
      })
    } catch (error) {
      setErr({ ...err, isError: true, message: "Invalid Data" })
      setIsLoading(true)
    }
  }

  return (
    <div className="register">
      <div className="wrapper">
        <div className="title">
          <h1>Register to <Logo/></h1>
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
          </div>

          <div className="profile-container">
            <img
              id="prvImg"
              src={profilePhoto}
              alt="preview img"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />

            <input
              type="file"
              id="upload-profile"
              accept="image/png, image/gif, image/jpeg"
              style={{ display: "none" }}
              onChange={(e) => handlePreviewImg(e.target.files[0])}
            />
            <label className="upload-button" htmlFor="upload-profile">
              Upload display picture
            </label>
          </div>

          <button className="button-primary"> Sign Up</button>
        </form>
        {err.isError && <span style={{ color: "red" }}>{err.message}</span>}
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>

      <LoadingScreen isLoading={isLoading} />
    </div>
  )
}

export default Register
