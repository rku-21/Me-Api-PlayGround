import express from 'express';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';

const router = express.Router();

router.get('/top', async (req, res) => {
  const skills = await Skill.aggregate([
    {
      $lookup: {
        from: 'projects',
        localField: '_id',
        foreignField: 'skills',
        as: 'projects',
      },
    },
    {
      $addFields: { project_count: { $size: '$projects' } },
    },
    { $sort: { project_count: -1, name: 1 } },
    { $limit: 5 },
    { $project: { name: 1, project_count: 1, _id: 0 } },
  ]);
  res.json(skills);
});

export default router;
