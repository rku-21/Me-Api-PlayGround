# Backend for Candidate Profile Playground
This backend is built with Node.js, Express, and MongoDB Atlas. It exposes endpoints to manage and query a candidate profile, including skills, projects, work experience, and links.

## Structure
 `index.js` — Main server file
 `db.js` — MongoDB connection
 `models/` — Mongoose models
 `routes/` — Express route handlers
 `seed.js` — Seed data (real candidate info)
 `.env` — MongoDB Atlas connection string (you provide)

## How to Run
1. Install dependencies: `npm install`
2. Add your MongoDB Atlas URI to `.env` as `MONGODB_URI=...`
3. Run seed: `npm run seed`
4. Start server: `npm start`

## Endpoints
 `GET /health` — Liveness check
 `GET/POST/PUT /profile` — Manage profile
 `GET /projects?skill=python` — Query projects by skill
 `GET /skills/top` — List top skills
 `GET /search?q=...` — Search across profile


