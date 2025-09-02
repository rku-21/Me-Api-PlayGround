# Portfolio API & Frontend

## Architecture

- **Backend:** Node.js, Express, MongoDB (Mongoose ODM)
  - REST API for profile, projects, skills, work, and links
  - Basic authentication for write operations
  - Logging (morgan), rate limiting, and CORS
- **Frontend:** React (Vite)
  - Pages for profile, projects, search, edit
  - Axios for API calls, modern UI, pagination
- **Database:** MongoDB Atlas (cloud) or local MongoDB
  - See `backend/schema.md` for collections and indexes

## Setup

### Local Development

1. **Clone the repository**
2. **Backend:**
   - `cd backend`
   - `npm install`
   - Create a `.env` file with your MongoDB URI:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```
   - `npm start`
3. **Frontend:**
   - `cd frontend/portfolio`
   - `npm install`
   - Optionally, set `VITE_API_URL` in `.env` (defaults to `http://localhost:4000`)
   - `npm run dev`

### Production

- Deploy backend to a Node.js host (e.g., Render, Heroku, AWS, etc.)
- Set `MONGODB_URI` in environment variables
- Serve frontend as static files (e.g., Vercel, Netlify, or via backend)
- Update CORS and API URLs as needed

## Database Schema

See [`backend/schema.md`](backend/schema.md) for detailed collections, fields, and indexes.

## Sample API Usage

### Get Profile
```sh
curl http://localhost:4000/profile
```

### Update Profile (Basic Auth required)
```sh
curl -X PUT http://localhost:4000/profile \
  -H "Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Delete Project (Basic Auth required)
```sh
curl -X DELETE http://localhost:4000/projects/<projectId> \
  -H "Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM="
```

### Postman Collection
- Import the following endpoints:
  - GET/PUT `/profile`
  - GET/DELETE `/projects`
  - GET `/skills`, `/search`, `/health`
  - Use Basic Auth (`admin`/`password123`) for write requests

## Known Limitations

- Only one hardcoded admin user (no real user accounts or login page)
- No email verification or password reset
- No advanced validation or file uploads
- No real-time updates (WebSockets)
- Not optimized for large-scale production (for demo/playground use)

---
For more details, see code comments and `schema.md`.
