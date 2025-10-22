const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://uvaiskhan078.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

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

app.get('/cv', (req, res) => {
  const cvPath = path.join(__dirname, 'docs', 'cv.pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Uvais_Khan_CV.pdf"');
  res.sendFile(cvPath, (err) => {
    if (err) {
      console.error('Error downloading CV:', err);
      res.status(500).json({ error: 'Failed to download CV' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
