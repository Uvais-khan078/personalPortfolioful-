from flask import Flask, jsonify, request, send_from_directory
import json
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Telegram bot configuration
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

def send_telegram_message(message):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram bot token or chat ID not configured")
        return False

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML"
    }

    try:
        response = requests.post(url, data=data)
        return response.status_code == 200
    except Exception as e:
        print(f"Error sending Telegram message: {e}")
        return False

# Load data from data.json
with open('data.json', 'r') as f:
    data = json.load(f)

@app.route('/api/personal')
def get_personal():
    response = jsonify(data['personal'])
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/education')
def get_education():
    response = jsonify(data['education'])
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/skills')
def get_skills():
    response = jsonify(data['skills'])
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/social')
def get_social():
    response = jsonify(data['social'])
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/projects')
def get_projects():
    response = jsonify(data['projects'])
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/basicProjects')
def get_basic_projects():
    response = jsonify(data['basicProjects'])
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/blogs')
def get_blogs():
    response = jsonify(data['blogs'])
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/blog/<int:blog_id>')
def get_blog_post(blog_id):
    blog_posts = data.get('blogPosts', {})
    if str(blog_id) not in blog_posts:
        response = jsonify({'error': 'Blog post not found'})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response, 404
    response = jsonify(blog_posts[str(blog_id)])
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/api/contact', methods=['POST', 'OPTIONS'])
def send_contact_message():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    try:
        contact_data = request.get_json()
        name = contact_data.get('name')
        email = contact_data.get('email')
        subject = contact_data.get('subject')
        message = contact_data.get('message')

        if not all([name, email, subject, message]):
            response = jsonify({'error': 'All fields are required'})
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response, 400

        # Format message for Telegram
        telegram_message = f"""
<b>New Contact Form Message</b>

<b>Name:</b> {name}
<b>Email:</b> {email}
<b>Subject:</b> {subject}

<b>Message:</b>
{message}
"""

        if send_telegram_message(telegram_message):
            response = jsonify({'message': 'Message sent successfully'})
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response
        else:
            response = jsonify({'error': 'Failed to send message'})
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response, 500

    except Exception as e:
        print(f"Error processing contact form: {e}")
        response = jsonify({'error': 'Internal server error'})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response, 500

@app.route('/images/<path:filename>')
def serve_image(filename):
    response = send_from_directory('images', filename)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response


@app.route('/cv')
def download_cv():
    """Serve the CV PDF from the docs folder as an attachment with CORS headers.

    Uses `send_from_directory`. For compatibility with different Flask
    versions we attempt to set an attachment filename via `download_name`
    (newer Flask) and fall back to `attachment_filename` (older Flask).
    """
    docs_dir = 'docs'
    filename = 'cv.pdf'
    try:
        # Try newer Flask parameter first
        response = send_from_directory(docs_dir, filename, as_attachment=True, download_name='Uvais_Khan_CV.pdf')
    except TypeError:
        # Fallback for older Flask versions that expect attachment_filename
        response = send_from_directory(docs_dir, filename, as_attachment=True, attachment_filename='Uvais_Khan_CV.pdf')

    # Add CORS headers so the frontend can download/open the file
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

if __name__ == '__main__':
    app.run(debug=True, port=8000)
