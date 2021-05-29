/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const RegisterForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email can't be empty");
    }
    if (!password) {
      alert("password can't be empty");
    }
    props.onLogin(email, password);
  };
  console.log(name);
  let nameOnFocus = true;
  return (
    <div className="container">
      <div className="form-container sign-in-container">
        <form onSubmit={onLogin}>
          <h1>Sign up</h1>
          <div className="social-container">
            <a href="#" className="social">
              <FaFacebookF />
            </a>
            <a href="#" className="social">
              <FaGoogle />
            </a>
            <a href="#" className="social">
              <FaApple />
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onFocus={() => {
              nameOnFocus = true;
              console.log(nameOnFocus);
            }}
            onBlur={() => (nameOnFocus = false)}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <a href="#">Forgot your password?</a>
          <button type="submit" value="Sign in">
            Log in
          </button>
        </form>
      </div>
      <div className="panel-container">
        {nameOnFocus ? (
          <h1 className="greet-panel welcome-text">Welcome, {name}</h1>
        ) : (
          <h1 className="greet-panel">Welcome, {name}!</h1>
        )}

        <div className="register-panel">
          <span>Already have an account?</span>
          <Link to="/login">
            <button className="signup-btn">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
