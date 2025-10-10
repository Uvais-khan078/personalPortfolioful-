from sqlalchemy import Column, Integer, String, Text, JSON
from database import Base

class Personal(Base):
    __tablename__ = "personal"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    title = Column(String(255))
    description = Column(Text)
    about_description = Column(Text)
    skills_description = Column(Text)
    profile_image = Column(String(255))
    location = Column(String(255))
    email = Column(String(255))
    phone = Column(String(255))
    hobbies = Column(JSON)

class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50))
    title = Column(String(255))
    subtitle = Column(String(255))
    description = Column(Text)

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    percentage = Column(Integer)
    category = Column(String(50))  # technical or professional

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(Text)
    technologies = Column(JSON)
    image = Column(String(255))
    demo_link = Column(String(255))
    github_link = Column(String(255))

class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    date = Column(String(50))
    read_time = Column(String(50))
    image = Column(String(255))
    excerpt = Column(Text)

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    date = Column(String(50))
    read_time = Column(String(50))
    images = Column(JSON)
    content = Column(Text)

class Social(Base):
    __tablename__ = "social"

    id = Column(Integer, primary_key=True, index=True)
    github = Column(String(255))
    twitter = Column(String(255))
    linkedin = Column(String(255))
    instagram = Column(String(255))
