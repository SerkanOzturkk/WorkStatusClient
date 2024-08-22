import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // useNavigate hook'unu kullan

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7112/api/auth/login",
        {
          email,
          password,
        }
      );

      // Başarılı giriş durumunda token'ı al
      const token = response.data.token;

      // Token'ı localStorage'a kaydet
      localStorage.setItem("authToken", token);

      // Kullanıcıyı dashboard sayfasına yönlendir
      navigate("/dashboard");
      console.log("Success login");
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="login-container">
      <div className="info-section">
        <h2>New Here?</h2>
        <p>Sign up and discover a great amount of new opportunities!</p>
        <a href="/register" className="create-account-link">
          Create an Account
        </a>
      </div>
      <div className="login-form-section">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
