const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Load data
const dataPath = path.join(__dirname, 'data.json');
let data;

try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (error) {
  console.error('Error loading data.json:', error);
  process.exit(1);
}

// Routes
app.get('/api/personal', (req, res) => {
  res.json(data.personal);
});

app.get('/api/education', (req, res) => {
  res.json(data.education);
});

app.get('/api/skills', (req, res) => {
  res.json(data.skills);
});

app.get('/api/projects', (req, res) => {
  res.json(data.projects);
});

app.get('/api/blogs', (req, res) => {
  res.json(data.blogs);
});

app.get('/api/blog/:id', (req, res) => {
  const { id } = req.params;
  const blogPost = data.blogPosts[id];
  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404).json({ error: 'Blog post not found' });
  }
});

app.get('/api/social', (req, res) => {
  res.json(data.social);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
