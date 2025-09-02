import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  start_date: String,
  end_date: String,
  description: String
});

export default mongoose.model('Work', WorkSchema);
