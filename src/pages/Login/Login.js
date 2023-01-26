import React, { useState } from "react"
import "./login.scss"
import { useNavigate } from "react-router-dom"

//firebase
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/initializeFirebase"

const Login = () => {
  const navigate = useNavigate()
  const [err, setErr] = useState({ isError: false, message: "" })

  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        navigate("/")
        // ...
      })
      .catch((error) => {
        setErr({...err, isError: true, message: error.message})
      })
  }

  return (
    <div className="login">
      <div className="wrapper">
        <div className="title">
          <h1>Welcome to ChatKel</h1>
        </div>
        <form onSubmit={handleLogin}>
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
            placeholder="Enter your password  "
            required
          />
          <button className="button-primary">Sign In</button>
        </form>
        {err.isError && <span>{err.message}</span>}
        <span>
          You don't have an account? <a href="/register">Register</a>
        </span>
      </div>
    </div>
  )
}

export default Login
