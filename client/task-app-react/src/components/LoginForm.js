/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div class="container">
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <div class="social-container">
            <a href="#" class="social">
              <FaFacebookF />
            </a>
            <a href="#" class="social">
              <FaGoogle />
            </a>
            <a href="#" class="social">
              <FaApple />
            </a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="panel-container">
        <h1 className="greet-panel">Hello, there!</h1>
        <div className="register-panel">
          <span>Don't have an account?</span>
          <button className="signup-btn">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
