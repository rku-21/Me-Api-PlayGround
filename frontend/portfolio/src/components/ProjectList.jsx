import React from "react";

export const ProjectList = ({ projects, onRemove }) => {
  if (!projects?.length) return <div>No projects found.</div>;
  return (
    <div className="project-list">
      {projects.map((project) => (
        <div className="project-card" key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.links?.length > 0 && (
            <div>
              <b>Links:</b>
              <ul>
                {project.links.map((l, i) => (
                  <li key={i}><a href={l} target="_blank" rel="noopener noreferrer">{l}</a></li>
                ))}
              </ul>
            </div>
          )}
          <div className="skills-list">
            {project.skills?.map((s) => (
              <span key={s._id} className="skill-badge">{s.name}</span>
            ))}
          </div>
          {onRemove && (
            <button className="remove-btn" onClick={() => onRemove(project._id)} style={{marginTop:'1rem'}}>Remove</button>
          )}
        </div>
      ))}
    </div>
  );
}
