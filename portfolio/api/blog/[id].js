const fs = require('fs');
const path = require('path');

const dataPath = path.join(process.cwd(), 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

export default function handler(req, res) {
  const { id } = req.query;
  const blogPost = data.blogPosts[id];
  if (blogPost) {
    res.status(200).json(blogPost);
  } else {
    res.status(404).json({ error: 'Blog post not found' });
  }
}
