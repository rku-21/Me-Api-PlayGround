import React, { useEffect, useState } from "react";
import {Loader} from "../components/Loader";
import {ProfileCard} from "../components/ProfileCard";
import { api } from "../api";

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/profile")
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="page profile-page">
      <h1>My Profile</h1>
      <ProfileCard profile={profile} />
    </div>
  );
}
