import { basicAuth } from '../middleware/basicAuth.js';
import express from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { skill, page = 1, limit = 10 } = req.query;
  let query = {};
  if (skill) {
    const skillDoc = await Skill.findOne({ name: new RegExp(`^${skill}$`, 'i') });
    if (!skillDoc) return res.json({ projects: [], total: 0 });
    query.skills = skillDoc._id;
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Project.countDocuments(query);
  const projects = await Project.find(query).populate('skills').skip(skip).limit(parseInt(limit));
  res.json({ projects, total });
});


router.delete('/:id', basicAuth, async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  await import('../models/Profile.js').then(({ default: Profile }) =>
    Profile.updateMany({}, { $pull: { projects: id } })
  );
  res.json({ message: 'Project deleted' });
});

export default router;
