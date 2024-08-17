import React from "react";
import "./Register.css";
import img from "../../assets/img2.png";

function Register() {
  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Sign up</h2>
        <form>
          <div className="input-group">
            <i className="fa fa-user"></i>
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="input-group">
            <i className="fa fa-envelope"></i>
            <input type="email" placeholder="Your Email" />
          </div>
          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div>
          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input type="password" placeholder="Repeat your password" />
          </div>
          <div className="terms-service">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to all statements in <a href="#">Terms of service</a>
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="already-member">
          <a href="#">I am already a member</a>
        </p>
      </div>
      <div className="register-image">
        <img src={img} alt="resme alternatif yazı" />
      </div>
    </div>
  );
}

export default Register;
