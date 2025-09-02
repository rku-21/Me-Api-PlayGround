import React, { useEffect, useState } from "react";
import { api } from "../api";
import {Loader} from "../components/Loader";


import { useNavigate } from "react-router-dom";

export const EditProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/profile")
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };


  const handleSkillChange = (idx, value) => {
    setProfile((prev) => {
      const skills = [...(prev.skills || [])];
      skills[idx].name = value;
      return { ...prev, skills };
    });
  };

  const handleAddSkill = () => {
    setProfile((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), { _id: undefined, name: "" }],
    }));
  };

  const handleAddProject = () => {
    setProfile((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        { _id: undefined, title: "", description: "", links: [], skills: [] },
      ],
    }));
  };

  const handleProjectChange = (idx, field, value) => {
    setProfile((prev) => {
      const projects = [...(prev.projects || [])];
      projects[idx][field] = value;
      return { ...prev, projects };
    });
  };

  const handleLinkChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      links: { ...prev.links, [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // For new skills/projects, send the name/title/description, not just _id
      const payload = {
        name: profile.name,
        email: profile.email,
        education: profile.education,
        skills: profile.skills.map((s) => s._id ? s._id : { name: s.name }),
        projects: profile.projects.map((p) => p._id ? p._id : { title: p.title, description: p.description, links: p.links, skills: p.skills }),
        work: profile.work?.map((w) => w._id),
        links: profile.links?._id,
      };
      await api.put("/profile", payload, {
        headers: {
          Authorization: 'Basic ' + btoa('admin:password123')
        }
      });
      navigate("/", { replace: true });
    } catch (err) {
      // Optionally handle error
    }
    setSaving(false);
  };

  if (loading) return <Loader />;
  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="page profile-edit-page">
      <h1>Edit Profile</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Name:<input name="name" value={profile.name} onChange={handleChange} /></label>
        <label>Email:<input name="email" value={profile.email} onChange={handleChange} /></label>
        <label>Education:<input name="education" value={profile.education} onChange={handleChange} /></label>
        <div>
          <b>Links:</b>
          <label>GitHub:<input value={profile.links?.github || ""} onChange={e => handleLinkChange("github", e.target.value)} /></label>
          <label>LinkedIn:<input value={profile.links?.linkedin || ""} onChange={e => handleLinkChange("linkedin", e.target.value)} /></label>
          <label>Portfolio:<input value={profile.links?.portfolio || ""} onChange={e => handleLinkChange("portfolio", e.target.value)} /></label>
        </div>
        <div>
          <b>Skills:</b>
          {(profile.skills || []).map((s, i) => (
            <input key={i} value={s.name} onChange={e => handleSkillChange(i, e.target.value)} />
          ))}
          <button type="button" className="edit-btn" style={{marginTop:'0.5rem'}} onClick={handleAddSkill}>Add Skill</button>
        </div>
        <div>
          <b>Projects:</b>
          {(profile.projects || []).map((p, i) => (
            <div key={i} className="project-edit-block">
              <input value={p.title} onChange={e => handleProjectChange(i, "title", e.target.value)} placeholder="Title" />
              <input value={p.description} onChange={e => handleProjectChange(i, "description", e.target.value)} placeholder="Description" />
            </div>
          ))}
          <button type="button" className="edit-btn" style={{marginTop:'0.5rem'}} onClick={handleAddProject}>Add Project</button>
        </div>
        <button type="submit" className="save-btn" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
      </form>
    </div>
  );
};
