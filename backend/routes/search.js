import express from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Work from '../models/Work.js';
import Profile from '../models/Profile.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  const regex = new RegExp(q, 'i');
  const projects = await Project.find({ $or: [ { title: regex }, { description: regex } ] }).populate('skills');
  const skills = await Skill.find({ name: regex });
  const work = await Work.find({ $or: [ { company: regex }, { role: regex }, { description: regex } ] });
  const profile = await Profile.findOne({ $or: [ { name: regex }, { education: regex } ] });
  res.json({ projects, skills, work, profile });
});

export default router;
