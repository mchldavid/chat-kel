import React from 'react';

const Login = () => {
  return (
    <div className="register">
    <div className="wrapper">
      <div className="title">
        <h2>Login</h2>
      </div>
      <form>
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
      </form>
      <span>
        Already have an account? <a href="/login">Login</a>
      </span>
    </div>
  </div>
  );
};

export default Login;