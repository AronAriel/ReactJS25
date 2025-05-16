import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../src/firebase";
import { useAuth } from "../../context/AuthContext"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import "../../styles/background.css";

function LoginPage() {
  const { userEmail, logout } = useAuth();
  const [username, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (userEmail) {
      setUserEmail(userEmail); 
    }
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, username, password);
      console.log("Вход выполнен");
      toast.success("Вы успешно вошли в свой аккаунт.");
    } catch (err) {
      console.error("Ошибка входа:", err.message);
      toast.error("Incorrect login or password");
      setError("Incorrect login or password");
    }
  };

  const handleCancel = async () => {
    setUserEmail("");
    setPassword("");
    setError("");
    await logout(); 
  };

  return (
    <div className="login-container background">
      <div className="login-title">Log in</div>
      <div className="login-all">
        <form className="login-box" onSubmit={handleSubmit}>
          <div className="login-labels">
            <label className="login-space">
              <span>User Email</span>
              <input
                type="email"
                value={username}
                placeholder="example@email.com"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </label>
            <label className="login-space">
              <span>Password</span>
              <input
                type="password"
                value={password}
                placeholder="********************"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <div className="login-buttons">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
