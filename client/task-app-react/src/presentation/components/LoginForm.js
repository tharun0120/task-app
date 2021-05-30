/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./css/LoginForm.css";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const onLogin = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email can't be empty");
    }
    if (!password) {
      alert("password can't be empty");
    }
    props.onLogin(email, password);
    history.push("/");
  };

  return (
    <div className="container">
      <div className="form-container sign-in-container">
        <form onSubmit={onLogin}>
          <h1>Sign in</h1>
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
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
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
        <h1 className="greet-panel">Hello, there!</h1>
        <div className="register-panel">
          <span>Don't have an account?</span>
          <Link to="/register">
            <button className="signup-btn">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
