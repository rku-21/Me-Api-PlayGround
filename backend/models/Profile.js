import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: { type: String, required: true },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  work: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],
  links: { type: mongoose.Schema.Types.ObjectId, ref: 'Links' }
});

export default mongoose.model('Profile', ProfileSchema);
