const fs = require('fs');
const path = require('path');

const dataPath = path.join(process.cwd(), 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

export default function handler(req, res) {
  res.status(200).json(data.projects);
}
