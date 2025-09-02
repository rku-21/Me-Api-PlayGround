
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Skill from './models/Skill.js';
import Project from './models/Project.js';
import Work from './models/Work.js';
import Links from './models/Links.js';
import Profile from './models/Profile.js';

dotenv.config();

const seed = async () => {
  try {
  await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Work.deleteMany({});
    await Links.deleteMany({});
    await Profile.deleteMany({});

    // User info
    const name = "Rahul Kumar";
    const email = "upadhyayrahul21642@gmail.com, rahul.k.upadhyay21@gmail.com";
    const education = "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering (ECE), National Institute of Technology Nagaland (2023–2027), Dimapur";

    // Skills
    const skillNames = [
      "Data Structures and Algorithms (DSA)",
      "C++",
      "JavaScript (ES6+)",
      "Python",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "React.js",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "RESTful APIs",
      "Socket.io (Real-time Communication)",
      "JWT Authentication",
      "bcrypt.js (Password Hashing)",
      "Multer (File Upload Middleware)",
      "Cors",
      "dotenv",
      "Postman (API Testing)",
      "Git & GitHub",
      "TailwindCSS"
    ];
    const skills = await Skill.insertMany(skillNames.map(name => ({ name })));

    // Links
    const linksDoc = await Links.create({
      github: "https://github.com/rku-21",
      linkedin: "https://linkedin.com/in/rku21",
      portfolio: "https://rku-21.github.io/portfolio-Website/"
    });

    // Projects
    const projectsData = [
      {
        title: "Chat App",
        description: "Privex – a real time chat app with real-time messaging, search, and user authentication.",
        links: ["https://github.com/rku21/chat-app"],
        skills: [
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Mongoose",
          "Socket.io (Real-time Communication)",
          "JWT Authentication",
          "bcrypt.js (Password Hashing)",
          "Multer (File Upload Middleware)",
          "Cors",
          "dotenv",
          "TailwindCSS"
        ]
      },
      {
        title: "AI Video Generator (In Progress)",
        description: "Building an AI-powered video generator that creates emotional videos with auto voiceovers and scene transitions. Currently under development.",
        links: [],
        skills: [
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Python",
          "NumPy",
          "Pandas",
          "OpenAI API",
          "Socket.io (Real-time Communication)"
        ]
      }
    ];

    // Ensure all project skills exist in Skill collection
    const getSkillIds = (names) => names.map(
      n => (skills.find(s => s.name === n) || { _id: null })._id
    ).filter(Boolean);

    const projects = await Project.insertMany(projectsData.map(p => ({
      title: p.title,
      description: p.description,
      links: p.links,
      skills: getSkillIds(p.skills)
    })));

    // No work experience provided in user data, so skip Work
    const work = [];

    // Create profile
    await Profile.create({
      name,
      email,
      education,
      skills: skills.map(s => s._id),
      projects: projects.map(p => p._id),
      work,
      links: linksDoc._id
    });

    console.log('🎉 Database seeded successfully ✅');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
