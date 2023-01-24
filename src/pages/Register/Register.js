import React from "react"
import { BiImageAdd } from "react-icons/bi"
import "./register.scss"

const Register = () => {
  return (
    <div className="register">
      <div className="wrapper">
        <div className="title">
          <h1>Register to Chat-kel</h1>
        </div>
        <form>
          <div>
            <label for="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
            <label for="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <label for="pass">Password:</label>
            <input
              id="pass"
              type="password"
              placeholder="Enter Password"
              required
            />
            <input type="file" id="file" style={{ display: "none" }} />
          </div>

          <label className="upload-button" htmlFor="file">
            <BiImageAdd /> Upload display picture
          </label>
          <button className="button-primary"> Sign Up</button>
        </form>
        <span>
          Already have an account? <a href="/login">Login</a>
        </span>
      </div>
    </div>
  )
}

export default Register
