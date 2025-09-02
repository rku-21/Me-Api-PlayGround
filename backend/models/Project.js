import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  links: [String],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]
});

export default mongoose.model('Project', ProjectSchema);
