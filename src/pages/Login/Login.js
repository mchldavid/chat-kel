import React from "react"
import "./login.scss"

const Login = () => {
  return (
    <div className="login">
      <div className="wrapper">
        <div className="title">
          <h1>Welcome to ChatKel</h1>
        </div>
        <form>
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <label for="pass">Password</label>
          <input
            id="pass"
            type="password"
            placeholder="Enter your password  "
            required
          />
          <button className="button-primary">Sign In</button>
        </form>
        <span>
          You don't have an account? <a href="/register">Register</a>
        </span>
      </div>
    </div>
  )
}

export default Login
