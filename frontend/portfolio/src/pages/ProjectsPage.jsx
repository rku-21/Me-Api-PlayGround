import React, { useEffect, useState } from "react";
import {Loader} from "../components/Loader";
import {ProjectList} from "../components/ProjectList";
import {SkillSearch} from "../components/SkillSearch";
import { api } from "../api";

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/skills/top")
      .then((res) => setSkills(res.data.map(s => ({ name: s.name }))))
      .catch(() => {});
    fetchProjects();
  }, []);

  function fetchProjects(skill, pageNum = 1) {
    setLoading(true);
    api.get("/projects", {
      params: {
        ...(skill ? { skill } : {}),
        page: pageNum,
        limit
      }
    })
      .then((res) => {
        setProjects(res.data.projects);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  function handleSearch() {
    setPage(1);
    fetchProjects(search, 1);
  }

  const handleRemove = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    try {
      await api.delete(`/projects/${projectId}`, {
        headers: {
          Authorization: 'Basic ' + btoa('admin:password123')
        }
      });
      fetchProjects(search, page);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="page projects-page">
      <h1>Projects</h1>
      <SkillSearch skills={skills} value={search} onChange={setSearch} onSearch={handleSearch} />
      {loading ? <Loader /> : <ProjectList projects={projects} onRemove={handleRemove} />}
      <div style={{marginTop:'1rem'}}>
        {Array.from({length: Math.ceil(total/limit)}).map((_, i) => (
          <button key={i} disabled={page===i+1} onClick={()=>{setPage(i+1); fetchProjects(search, i+1);}}>{i+1}</button>
        ))}
      </div>
    </div>
  );
}
