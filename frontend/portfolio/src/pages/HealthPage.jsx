import React, { useEffect, useState } from "react";
import { api } from "../api";

export const HealthPage = () => {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    api.get("/health").then(res => setStatus(res.data.status)).catch(() => setStatus("error"));
  }, []);
  return (
    <div className="page health-page" style={{textAlign:'center'}}>
      <h1>Health Check</h1>
      <div>Status: {status ? <b style={{color: status === 'ok' ? '#27ae60' : '#c0392b'}}>{status}</b> : 'Loading...'}</div>
    </div>
  );
};
