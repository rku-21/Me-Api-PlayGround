import React from "react";

export const SkillSearch = ({ skills, value, onChange, onSearch }) => {
  return (
    <form className="skill-search" onSubmit={e => { e.preventDefault(); onSearch(); }}>
      <input
        type="text"
        list="skills-list"
        placeholder="Search by skill..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="search-input"
      />
      <datalist id="skills-list">
        {skills.map((s) => <option key={s.name} value={s.name} />)}
      </datalist>
      <button type="submit" className="search-btn">Search</button>
    </form>
  );
}
