import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import DATABASE_URL
from models import Personal, Education, Skill, Project, Blog, BlogPost, Social

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Load data from JSON
with open('data.json', 'r') as f:
    data = json.load(f)

db = SessionLocal()

# Clear existing data
db.query(Personal).delete()
db.query(Education).delete()
db.query(Skill).delete()
db.query(Project).delete()
db.query(Blog).delete()
db.query(BlogPost).delete()
db.query(Social).delete()
db.commit()

# Insert Personal
personal_data = data['personal']
personal = Personal(
    name=personal_data['name'],
    title=personal_data['title'],
    description=personal_data['description'],
    about_description=personal_data['aboutDescription'],
    skills_description=personal_data['skillsDescription'],
    profile_image=personal_data['profileImage'],
    location=personal_data['location'],
    email=personal_data['email'],
    phone=personal_data['phone'],
    hobbies=personal_data['hobbies']
)
db.add(personal)

# Insert Education
for edu in data['education']:
    education = Education(
        type=edu['type'],
        title=edu['title'],
        subtitle=edu['subtitle'],
        description=edu['description']
    )
    db.add(education)

# Insert Skills
for category in ['technical', 'professional']:
    for skill in data['skills'][category]:
        s = Skill(
            name=skill['name'],
            percentage=skill['percentage'],
            category=category
        )
        db.add(s)

# Insert Projects
for proj in data['projects']:
    project = Project(
        id=proj['id'],
        title=proj['title'],
        description=proj['description'],
        technologies=proj['technologies'],
        image=proj['image'],
        demo_link=proj['demoLink'],
        github_link=proj['githubLink']
    )
    db.add(project)

# Insert Blogs
for blog in data['blogs']:
    b = Blog(
        id=blog['id'],
        title=blog['title'],
        date=blog['date'],
        read_time=blog['readTime'],
        image=blog['image'],
        excerpt=blog['excerpt']
    )
    db.add(b)

# Insert BlogPosts
for key, post in data['blogPosts'].items():
    blog_post = BlogPost(
        id=int(key),
        title=post['title'],
        date=post['date'],
        read_time=post['readTime'],
        images=post['images'],
        content=post['content']
    )
    db.add(blog_post)

# Insert Social
social_data = data['social']
social = Social(
    github=social_data['github'],
    twitter=social_data['twitter'],
    linkedin=social_data['linkedin'],
    instagram=social_data['instagram']
)
db.add(social)

db.commit()
db.close()

print("Database populated successfully!")
