import React, { useState } from "react";
import {Loader} from "../components/Loader";
import {ProjectList} from "../components/ProjectList";
import { api } from "../api";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    api.get("/search", { params: { q: query } })
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  return (
    <div className="page search-page">
      <h1>Search</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search profile, skills, projects..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
      {loading && <Loader />}
      {results && (
        <div className="search-results">
          {results.projects && results.projects.length > 0 && (
            <div>
              <h2>Projects</h2>
              <ProjectList projects={results.projects} />
            </div>
          )}
          {results.skills && results.skills.length > 0 && (
            <div>
              <h2>Skills</h2>
              <div className="skills-list">
                {results.skills.map((s) => (
                  <span key={s._id} className="skill-badge">{s.name}</span>
                ))}
              </div>
            </div>
          )}
          {results.profile && (
            <div>
              <h2>Profile</h2>
              <div>Name: {results.profile.name}</div>
              <div>Email: {results.profile.email}</div>
              <div>Education: {results.profile.education}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
