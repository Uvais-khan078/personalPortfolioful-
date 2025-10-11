from flask import Flask, jsonify, request
import json

app = Flask(__name__)



# Load data from data.json
with open('data.json', 'r') as f:
    data = json.load(f)

@app.route('/api/personal')
def get_personal():
    response = jsonify(data['personal'])
    response.headers['Access-Control-Allow-Origin'] = 'https://uvaiskhan078.vercel.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/education')
def get_education():
    response = jsonify(data['education'])
    response.headers['Access-Control-Allow-Origin'] = 'https://uvaiskhan078.vercel.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/skills')
def get_skills():
    response = jsonify(data['skills'])
    response.headers['Access-Control-Allow-Origin'] = 'https://uvaiskhan078.vercel.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/social')
def get_social():
    response = jsonify(data['social'])
    response.headers['Access-Control-Allow-Origin'] = 'https://uvaiskhan078.vercel.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/projects')
def get_projects():
    response = jsonify(data['projects'])
    response.headers['Access-Control-Allow-Origin'] = 'https://uvaiskhan078.vercel.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/basicProjects')
def get_basic_projects():
    response = jsonify(data['basicProjects'])
    response.headers['Access-Control-Allow-Origin'] = 'https://uvaiskhan078.vercel.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/blogs')
def get_blogs():
    response = jsonify(data['blogs'])
    response.headers['Access-Control-Allow-Origin'] = 'https://uvaiskhan078.vercel.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/blog/<int:blog_id>')
def get_blog_post(blog_id):
    blog_posts = data.get('blogPosts', {})
    if str(blog_id) not in blog_posts:
        response = jsonify({'error': 'Blog post not found'})
        response.headers['Access-Control-Allow-Origin'] = 'https://uvaiskhan078.vercel.app'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response, 404
    response = jsonify(blog_posts[str(blog_id)])
    response.headers['Access-Control-Allow-Origin'] = 'https://uvaiskhan078.vercel.app'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

if __name__ == '__main__':
    app.run(debug=True, port=8000)
