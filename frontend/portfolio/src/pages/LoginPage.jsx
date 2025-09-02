import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export const LoginPage = () => {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { passkey });
      if (res.data.success) {
        localStorage.setItem("passkey", passkey);
        navigate("/");
      } else {
        setError("Invalid passkey");
      }
    } catch {
      setError("Invalid passkey");
    }
  };

  return (
    <div className="page" style={{ maxWidth: 400, margin: "4rem auto" }}>
      <h2>Enter Passkey</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={passkey}
          onChange={e => setPasskey(e.target.value)}
          placeholder="Passkey"
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <button type="submit" style={{ width: "100%" }}>Login</button>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
};
