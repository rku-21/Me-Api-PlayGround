import React from "react";
import { Link } from "react-router-dom";

export const ProfileCard = ({ profile }) => {
  if (!profile) return null;
  return (
    <div className="profile-card">
      <h2>{profile.name}</h2>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Education:</b> {profile.education}</p>
      <div>
        <b>Links:</b>
        <ul>
          {profile.links?.github && <li><a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>}
          {profile.links?.linkedin && <li><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
          {profile.links?.portfolio && <li><a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a></li>}
        </ul>
      </div>
      <div>
        <b>Skills:</b>
        <div className="skills-list">
          {profile.skills?.map((s) => (
            <span key={s._id} className="skill-badge">{s.name}</span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
        <Link to="/profile/edit" className="edit-btn">Edit Profile</Link>
      </div>
    </div>
  );
}
