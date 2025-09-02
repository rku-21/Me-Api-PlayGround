import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';


import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/projects.js';
import skillsRoutes from './routes/skills.js';
import searchRoutes from './routes/search.js';
import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import path from 'path';
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();




const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute per IP
  message: 'Too many requests, please try again later.'
}));


app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/projects', projectRoutes);
app.use('/skills', skillsRoutes);
app.use('/search', searchRoutes);
app.use('/health', healthRoutes);
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'../frontend/portfolio/dist')));
  app.get("^/$|/.*", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/portfolio/dist', 'index.html'));
  });
} 



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
