from flask import Flask, jsonify, send_file
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[os.getenv('CLIENT_URL', '*')], supports_credentials=True)  # Enable CORS for specified origin or all with credentials support

# Load data from data.json
with open('data.json', 'r') as f:
    data = json.load(f)

@app.route('/api/personal', methods=['GET'])
def get_personal():
    return jsonify(data['personal'])

@app.route('/api/education', methods=['GET'])
def get_education():
    return jsonify(data['education'])

@app.route('/api/skills', methods=['GET'])
def get_skills():
    return jsonify(data['skills'])

@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify(data['projects'])

@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    return jsonify(data['blogs'])

@app.route('/api/blog-posts/<int:post_id>', methods=['GET'])
def get_blog_post(post_id):
    post = data['blogPosts'].get(str(post_id))
    if post:
        return jsonify(post)
    return jsonify({'error': 'Post not found'}), 404

@app.route('/api/social', methods=['GET'])
def get_social():
    return jsonify(data['social'])

@app.route('/cv', methods=['GET'])
def download_cv():
    try:
        return send_file('docs/cv.pdf', as_attachment=True, download_name='Uvais_Khan_CV.pdf')
    except FileNotFoundError:
        return jsonify({'error': 'CV file not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=8000)
