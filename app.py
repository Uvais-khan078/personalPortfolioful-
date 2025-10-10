from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173", "https://uvaiskhan078.vercel.app", "https://personal-portfolioful.vercel.app"])

# Load data from JSON
with open('data.json', 'r') as f:
    data = json.load(f)

@app.route('/api/personal')
def get_personal():
    return jsonify(data['personal'])

@app.route('/api/education')
def get_education():
    return jsonify(data['education'])

@app.route('/api/skills')
def get_skills():
    return jsonify(data['skills'])

@app.route('/api/projects')
def get_projects():
    return jsonify(data['projects'])

@app.route('/api/blogs')
def get_blogs():
    return jsonify(data['blogs'])

@app.route('/api/blog/<int:blog_id>')
def get_blog_post(blog_id):
    blog_posts = data.get('blogPosts', {})
    if str(blog_id) in blog_posts:
        return jsonify(blog_posts[str(blog_id)])
    return jsonify({'error': 'Blog post not found'}), 404

@app.route('/api/social')
def get_social():
    return jsonify(data['social'])

if __name__ == '__main__':
    app.run()
