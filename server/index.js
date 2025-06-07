const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Import models
    const User = require('./models/User');
    const Engineer = require('./models/Engineer');
    const Project = require('./models/Project');
    const Assignment = require('./models/Assignment');

    // Seed users if they don't exist
    const users = await User.find();
    if (users.length === 0) {
      const newUsers = await User.create([
        { username: 'manager', password: 'password123', role: 'manager' },
        { username: 'engineer', password: 'password123', role: 'engineer' },
      ]);
      console.log('Default users created: manager and engineer (password: password123)');

      // Get the "engineer" user's ID
      const engineerUser = newUsers.find(user => user.username === 'engineer');
      const engineerUserId = engineerUser._id.toString();

      // Seed engineers, projects, and assignments
      const engineers = await Engineer.find();
      if (engineers.length === 0) {
        const engs = await Engineer.insertMany([
          { name: "John Doe", skills: ["React", "Node.js"], seniority: "senior", maxCapacity: 100, currentAllocation: 80 },
          { name: "Jane Smith", skills: ["Python", "React"], seniority: "mid", maxCapacity: 50, currentAllocation: 40, userId: engineerUserId },
          { name: "Alice Brown", skills: ["Node.js"], seniority: "junior", maxCapacity: 100, currentAllocation: 60 },
          { name: "Bob Wilson", skills: ["React"], seniority: "mid", maxCapacity: 50, currentAllocation: 30 },
        ]);

        const projs = await Project.insertMany([
          { name: "E-commerce App", description: "Online store", startDate: "2025-01-01", endDate: "2025-06-30", requiredSkills: ["React", "Node.js"], status: "active" },
          { name: "Data Pipeline", description: "Process data", startDate: "2025-02-01", endDate: "2025-07-31", requiredSkills: ["Python"], status: "planning" },
          { name: "API Service", description: "Backend service", startDate: "2025-03-01", endDate: "2025-08-31", requiredSkills: ["Node.js"], status: "active" },
        ]);

        await Assignment.insertMany([
          { engineerId: engs[0]._id, projectId: projs[0]._id, allocationPercentage: 50, startDate: "2025-01-01", endDate: "2025-06-30", role: "Developer" },
          { engineerId: engs[0]._id, projectId: projs[2]._id, allocationPercentage: 30, startDate: "2025-03-01", endDate: "2025-08-31", role: "Tech Lead" },
          { engineerId: engs[1]._id, projectId: projs[1]._id, allocationPercentage: 40, startDate: "2025-02-01", endDate: "2025-07-31", role: "Developer" },
          { engineerId: engs[2]._id, projectId: projs[0]._id, allocationPercentage: 60, startDate: "2025-01-01", endDate: "2025-06-30", role: "Developer" },
          { engineerId: engs[3]._id, projectId: projs[2]._id, allocationPercentage: 30, startDate: "2025-03-01", endDate: "2025-08-31", role: "Developer" },
        ]);

        console.log('Default engineers, projects, and assignments created');
      }
    }

    // Login endpoint
    app.post('/api/auth/login', async (req, res) => {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      res.json({ token, role: user.role });
    });

    // JWT Middleware
    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
      if (!token) {
        return res.status(401).json({ message: 'Access token required' });
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
      });
    };

    // Engineers routes
    app.get('/api/engineers', authenticateToken, async (req, res) => {
      try {
        const engineers = await Engineer.find();
        res.json(engineers);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Create an engineer (protected, manager only)
    app.post('/api/engineers', authenticateToken, async (req, res) => {
      if (req.user.role !== 'manager') {
        return res.status(403).json({ message: 'Only managers can create engineers' });
      }
      const { name, skills, seniority, maxCapacity, currentAllocation } = req.body;
      const engineer = new Engineer({
        name,
        skills,
        seniority,
        maxCapacity,
        currentAllocation,
      });
      await engineer.save();
      res.status(201).json(engineer);
    });

    // Update an engineer (protected, engineer can update their own profile)
    app.put('/api/engineers/:id', authenticateToken, async (req, res) => {
      const engineer = await Engineer.findById(req.params.id);
      if (!engineer) {
        return res.status(404).json({ message: 'Engineer not found' });
      }
      if (req.user.role === 'engineer' && engineer.userId !== req.user.id) {
        return res.status(403).json({ message: 'You can only update your own profile' });
      }
      const { name, skills } = req.body;
      engineer.name = name || engineer.name;
      engineer.skills = skills || engineer.skills;
      await engineer.save();
      res.json(engineer);
    });

    // Projects routes
    app.get('/api/projects', authenticateToken, async (req, res) => {
      try {
        const projects = await Project.find();
        res.json(projects);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Create a project (protected, manager only)
    app.post('/api/projects', authenticateToken, async (req, res) => {
      if (req.user.role !== 'manager') {
        return res.status(403).json({ message: 'Only managers can create projects' });
      }
      const { name, description, startDate, endDate, requiredSkills, status } = req.body;
      const project = new Project({
        name,
        description,
        startDate,
        endDate,
        requiredSkills,
        status,
      });
      await project.save();
      res.status(201).json(project);
    });

    // Assignments routes
    app.get('/api/assignments', authenticateToken, async (req, res) => {
      try {
        const assignments = await Assignment.find()
          .populate('engineerId')
          .populate('projectId');
        res.json(assignments);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Create an assignment (protected, manager only)
    app.post('/api/assignments', authenticateToken, async (req, res) => {
      if (req.user.role !== 'manager') {
        return res.status(403).json({ message: 'Only managers can create assignments' });
      }
      const { engineerId, projectId, allocationPercentage, startDate, endDate, role } = req.body;
      const assignment = new Assignment({
        engineerId,
        projectId,
        allocationPercentage,
        startDate,
        endDate,
        role,
      });
      await assignment.save();
      res.status(201).json(assignment);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));