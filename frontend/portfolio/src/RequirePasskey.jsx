
import React from "react";
import { Navigate } from "react-router-dom";

export function RequirePasskey({ children }) {
  const passkey = localStorage.getItem("passkey");
  if (passkey !== "playground") {
    return <Navigate to="/login" replace />;
  }
  return children;
}
