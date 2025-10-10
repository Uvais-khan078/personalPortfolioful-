from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://uvaiskhan078.vercel.app", "https://personal-portfolioful.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data from JSON
with open('data.json', 'r') as f:
    data = json.load(f)

@app.get("/api/personal")
async def get_personal():
    return data['personal']

@app.get("/api/education")
async def get_education():
    return data['education']

@app.get("/api/skills")
async def get_skills():
    return data['skills']

@app.get("/api/projects")
async def get_projects():
    return data['projects']

@app.get("/api/blogs")
async def get_blogs():
    return data['blogs']

@app.get("/api/blog/{blog_id}")
async def get_blog_post(blog_id: int):
    blog_posts = data.get('blogPosts', {})
    if str(blog_id) not in blog_posts:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog_posts[str(blog_id)]

@app.get("/api/social")
async def get_social():
    return data['social']
