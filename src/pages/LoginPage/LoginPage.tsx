import React, { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login, logout, clearError } from "../../store/slices/authSlice";
import "../../styles/background.css";
import "./LoginPage.css";

function LoginPage() {
  const dispatch = useAppDispatch();
  const { userEmail, loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Вы успешно вошли в свой аккаунт.");
      })
      .catch(() => {
      });
  };

  const handleCancel = async () => {
    setEmail("");
    setPassword("");
    dispatch(logout());
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
                value={email}
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </label>
            <label className="login-space">
              <span>Password</span>
              <input
                type="password"
                value={password}
                placeholder="********************"
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </label>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <div className="login-buttons">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
