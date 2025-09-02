import React from "react";

export const Loader = () => (
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <div className="loader" />
    <span>Loading...</span>
    <style>{`
      .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem auto;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);
