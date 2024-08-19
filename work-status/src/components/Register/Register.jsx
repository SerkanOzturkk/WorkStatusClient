import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import img from "../../assets/img2.png";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setError("Lütfen hizmet şartlarını kabul edin.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolalar eşleşmiyor.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7112/api/auth/register",
        {
          fullname,
          email,
          password,
        }
      );

      // Kayıt başarılı olduğunda
      setSuccess("Hesabınız oluşturuldu. Giriş yapabilirsiniz.");
      setError(""); // Hata mesajını temizle

      // Kullanıcıyı giriş sayfasına yönlendir
      setTimeout(() => {
        navigate("/login");
      }, 1000); // 1 saniye sonra yönlendir
    } catch (err) {
      setError("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
      setSuccess(""); // Başarı mesajını temizle
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Your Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-envelope"></i>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="terms-service">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to all statements in <a href="#">Terms of service</a>
            </label>
          </div>
          <button type="submit">Register</button>
          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p className="already-member">
          <a href="#" onClick={() => navigate("/login")}>
            I am already a member
          </a>
        </p>
      </div>
      <div className="register-image">
        <img src={img} alt="resme alternatif yazı" />
      </div>
    </div>
  );
}

export default Register;
