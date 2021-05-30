/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./css/LoginForm.css";

const RegisterForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameOnFocus, setNameOnFocus] = useState(false);
  const history = useHistory();
  const onRegister = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email can't be empty");
    }
    if (!password) {
      alert("password can't be empty");
    }
    props.onRegister(name, email, password);
    history.push("/");
  };

  const greet = (name) => {
    let str = "";
    if (name.length === 0) {
      str = "Welcome";
    }
    if (name.length > 0) {
      str = "Welcome, " + name;
    }

    if (!nameOnFocus) {
      str = str + "!";
    }
    return str;
  };

  return (
    <div className="container">
      <div className="form-container sign-in-container">
        <form onSubmit={onRegister}>
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
          <span>or sign up with email</span>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            maxLength="20"
            onFocus={() => {
              setNameOnFocus(true);
            }}
            onBlur={() => {
              setNameOnFocus(false);
            }}
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
          {/* <a href="#">Forgot your password?</a> */}
          <div style={{ height: 20 }}></div>
          <button type="submit" value="Sign in">
            Sign up
          </button>
        </form>
      </div>
      <div className="panel-container">
        <div className="greet-panel-container">
          {nameOnFocus ? (
            <h1 className="greet-panel welcome-text">{greet(name)}</h1>
          ) : (
            <h1 className="greet-panel">{greet(name)}</h1>
          )}
        </div>

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
