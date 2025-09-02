import mongoose from 'mongoose';

const LinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  portfolio: String
});

export default mongoose.model('Links', LinksSchema);
