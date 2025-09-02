import express from 'express';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Work from '../models/Work.js';
import Links from '../models/Links.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const profile = await Profile.findOne({})
    .populate('skills')
    .populate({ path: 'projects', populate: { path: 'skills' } })
    .populate('work')
    .populate('links');
  res.json(profile);
});

import { basicAuth } from '../middleware/basicAuth.js';

router.post('/', basicAuth, async (req, res) => {
  const { name, email, education, skills, projects, work, links } = req.body;
  const profile = new Profile({ name, email, education, skills, projects, work, links });
  await profile.save();
  res.status(201).json({ message: 'Profile created' });
});

router.put('/', basicAuth, async (req, res) => {
  let { name, email, education, skills, projects, work, links } = req.body;

  skills = await Promise.all((skills || []).map(async (s) => {
    if (typeof s === 'string' || (s._id && typeof s._id === 'string')) return s._id || s;
    const existing = await Skill.findOne({ name: s.name });
    if (existing) return existing._id;
    const created = await Skill.create({ name: s.name });
    return created._id;
  }));

  projects = await Promise.all((projects || []).map(async (p) => {
    if (typeof p === 'string' || (p._id && typeof p._id === 'string')) return p._id || p;
    const created = await Project.create({
      title: p.title,
      description: p.description,
      links: p.links,
      skills: (p.skills || []).map(s => (typeof s === 'string' ? s : s._id)).filter(Boolean)
    });
    return created._id;
  }));

  const profile = await Profile.findOneAndUpdate(
    {},
    { name, email, education, skills, projects, work, links },
    { new: true }
  );
  res.json({ message: 'Profile updated', profile });
});

export default router;
