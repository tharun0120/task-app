/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./css/LoginForm.css";

const RegisterForm = (props) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameOnFocus, setNameOnFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  if (props.currUser) {
    history.push("/");
    return <></>;
  }
  const onRegister = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email can't be empty");
    }
    if (!password) {
      alert("Password can't be empty");
      return;
    }
    if (password.length < 7) {
      alert("Password has to be atleast 7 characters long");
      return;
    }
    if (email && password) {
      setLoading(true);
      const res = await props.onRegister(name, email, password);
      res.match({
        emailAlreadyExist: () => {
          setLoading(false);
          alert("Entered email already exist.");
        },
        userAuthenticated: () => {
          setLoading(false);
          history.push("/");
        },
      });
    }
  };

  const greet = (name) => {
    let str = "";
    if (name.length === 0) {
      str = "Welcome";
    }
    if (name.length > 0) {
      str = "Welcome,\n" + name;
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
            <a href="" className="social">
              <FaFacebookF />
            </a>
            <a href="" className="social">
              <FaGoogle />
            </a>
            <a href="" className="social">
              <FaApple />
            </a>
          </div>
          <span>or sign up with email</span>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            maxLength="20"
            autoComplete="name"
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
            required
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {/* <a href="#">Forgot your password?</a> */}
          <div style={{ height: 20 }}></div>
          <button disabled={loading} type="submit" value="Sign in">
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
