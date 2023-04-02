import React, { useState } from "react"
import "./login.scss"
import { Link, useNavigate } from "react-router-dom"

//firebase
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/initializeFirebase"
import LoadingScreen from "../../components/Loading"
import Logo from "../../components/Logo"


const Login = () => {
  const navigate = useNavigate()
  const [err, setErr] = useState({ isError: false, message: "" })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    setIsLoading(true)
    setErr({ ...err, isError: false, message: "" })
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user
        navigate("/chat-kel")
        // ...
      })
      .catch((error) => {
        setErr({ ...err, isError: true, message: "Incorrect Credentials" })
        setIsLoading(false)
      })
  }

  return (
    <div className="login">
      <div className="wrapper">
        <div className="title">
          <h1>
            Welcome to <Logo />
          </h1>
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
        {err.isError && <span style={{ color: "red" }}>{err.message}</span>}
        <span>
          You don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>

      <LoadingScreen isLoading={isLoading} />
    </div>
  )
}

export default Login
