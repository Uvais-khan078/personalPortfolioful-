from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app, origins=["https://uvaiskhan078.vercel.app"])

# Load data from data.json
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

@app.route('/api/social')
def get_social():
    return jsonify(data['social'])

@app.route('/api/projects')
def get_projects():
    return jsonify(data['projects'])

@app.route('/api/blogs')
def get_blogs():
    return jsonify(data['blogs'])

@app.route('/api/blog/<int:blog_id>')
def get_blog_post(blog_id):
    blog_posts = data.get('blogPosts', {})
    if str(blog_id) not in blog_posts:
        return jsonify({'error': 'Blog post not found'}), 404
    return jsonify(blog_posts[str(blog_id)])

if __name__ == '__main__':
    app.run(debug=True, port=8000)
