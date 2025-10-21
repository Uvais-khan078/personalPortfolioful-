import React, { useEffect, useState } from 'react';
import { ChevronDown, User, MapPin, Mail, Phone, Book, Briefcase, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import ProjectModal from './ProjectModal';

interface Personal {
  name: string;
  title: string;
  description: string;
  aboutDescription: string;
  image: string;
  aboutImage?: string;
  location: string;
  email: string;
  phone: string;
  hobbies: Hobby[];
}

interface Hobby {
  name: string;
  icon: string;
}

interface Education {
  id: number;
  title: string;
  institution: string;
  duration: string;
  description: string;
  type: string;
}

interface Social {
  github: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

interface BasicProject {
  title: string;
  description: string;
  technologies: string[];
}

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface Skills {
  technical: Skill[];
  professional: Skill[];
}

interface Skill {
  name: string;
  percentage: number;
}

interface RawSkill {
  name: string;
  percentage: string;
}

const Home = () => {
  const [personal, setPersonal] = useState<Personal>({} as Personal);
  const [education, setEducation] = useState<Education[]>([]);
  const [social, setSocial] = useState<Social>({} as Social);
  const [projects, setProjects] = useState<Project[]>([]);
  const [basicProjects, setBasicProjects] = useState<BasicProject[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [skills, setSkills] = useState<Skills>({} as Skills);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {

    // Fetch data
    Promise.all([
      fetch(`${apiBase}/api/personal`),
      fetch(`${apiBase}/api/education`),
      fetch(`${apiBase}/api/social`),
      fetch(`${apiBase}/api/projects`),
      fetch(`${apiBase}/api/basicProjects`),
      fetch(`${apiBase}/api/blogs`),
      fetch(`${apiBase}/api/skills`)
    ])
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(([personalData, educationData, socialData, projectsData, basicProjectsData, blogsData, skillsData]) => {
      setPersonal(personalData);
      setEducation(educationData);
      setSocial(socialData);
      setProjects(projectsData);
      setBasicProjects(basicProjectsData);
      setBlogs(blogsData);
      setSkills({
        technical: skillsData.technical.map((skill: RawSkill) => ({ ...skill, percentage: Number(skill.percentage) })),
        professional: skillsData.professional.map((skill: RawSkill) => ({ ...skill, percentage: Number(skill.percentage) }))
      });
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero-bg text-white min-h-screen flex items-center relative overflow-hidden" data-aos="fade">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="md:w-1/3" data-aos="fade-right">
              <img src={`${apiBase}/images/${personal.image ? personal.image.split('/')[1] : ''}`} alt="Profile" className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg border-4 border-white" />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-4" data-aos="fade-up">Hi, I'm <span className="text-indigo-200">{personal.name}</span></h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-8" data-aos="fade-up" data-aos-delay="100">{personal.title}</h2>
              <div className="flex justify-center md:justify-start space-x-4" data-aos="fade-up" data-aos-delay="200">
                <a href="#projects" className="px-6 py-3 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-100 transition">View My Work</a>
                <a href="#contact" className="px-6 py-3 border border-white text-white rounded-full font-medium hover:bg-white hover:text-indigo-600 transition">Contact Me</a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-0 right-0 text-center">
            <a href="#about" className="animate-bounce inline-block">
              <ChevronDown className="w-10 h-10 text-white" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">About Me</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">{personal.description}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-10 md:mb-0" data-aos="fade-right">
              <img src={`/images/${personal.aboutImage ? personal.aboutImage.split('/')[1] : personal.image ? personal.image.split('/')[1] : ''}`} alt="Profile" className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg" />
            </div>
            <div className="md:w-2/3 md:pl-16" data-aos="fade-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Who am I?</h3>
              <p className="text-gray-600 mb-6">{personal.aboutDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Personal Info</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-center"><User className="w-4 h-4 mr-2" /> <span>{personal.name}</span></li>
                    <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> <span>{personal.location}</span></li>
                    <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> <span>{personal.email}</span></li>
                    <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> <span>{personal.phone}</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">My Hobbies</h4>
                  <ul className="text-gray-600 space-y-2">
                    {personal.hobbies && personal.hobbies.map((hobby, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-4 h-4 mr-2">•</span> <span>{hobby.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a href="#" className="inline-block mt-8 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition">Download CV</a>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">Education & Experience</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">My academic background and professional journey.</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="border-l-2 border-indigo-600 absolute h-full left-1/2 transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {education.map((item, index) => (
                <div
                  key={index}
                  className={`relative ${index % 2 === 0 ? 'md:ml-auto' : ''}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className={`bg-white p-6 rounded-lg shadow-md relative z-10 md:w-1/2 ${index % 2 === 0 ? 'ml-auto' : ''}`}>
                    <div className="flex items-center mb-2">
                      <div className="bg-indigo-100 p-2 rounded-full mr-4">
                        {item.type === 'education' ? <Book className="w-5 h-5 text-indigo-600" /> : <Briefcase className="w-5 h-5 text-indigo-600" />}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">{item.institution} • {item.duration}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="hidden md:block absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full z-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">My Skills</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">I've worked with a variety of technologies in the web development world.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Technical Skills</h3>
              <div className="space-y-6">
                {skills.technical && skills.technical.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-gray-600">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full skill-bar" style={{width: `${Number(skill.percentage)}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div data-aos="fade-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Professional Skills</h3>
              <div className="space-y-6">
                {skills.professional && skills.professional.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-gray-600">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full skill-bar" style={{width: `${Number(skill.percentage)}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">My Projects</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Here are some of my recent projects that showcase my skills and expertise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md project-card transition duration-300" data-aos="fade-up" data-aos-delay={index * 100}>
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">{tech}</span>
                    ))}
                  </div>
                  <button onClick={() => openModal(project)} className="text-indigo-600 font-medium hover:text-indigo-800 transition">View Project →</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12" data-aos="fade-up">
            <a href="/projects" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-600 hover:text-white transition">View All Projects</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">Get In Touch</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Have a project in mind or want to discuss potential opportunities? Feel free to reach out!</p>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                  <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition w-full">Send Message</button>
              </form>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <Mail className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600">{personal.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <Phone className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Phone</h4>
                      <p className="text-gray-600">{personal.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Location</h4>
                      <p className="text-gray-600">{personal.location}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-medium text-gray-800 mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    <a href={social.github} className="bg-gray-100 p-3 rounded-full hover:bg-indigo-100 transition">
                      <Github className="w-5 h-5 text-gray-700" />
                    </a>
                    <a href={social.twitter} className="bg-gray-100 p-3 rounded-full hover:bg-indigo-100 transition">
                      <Twitter className="w-5 h-5 text-gray-700" />
                    </a>
                    <a href={social.linkedin} className="bg-gray-100 p-3 rounded-full hover:bg-indigo-100 transition">
                      <Linkedin className="w-5 h-5 text-gray-700" />
                    </a>
                    <a href={social.instagram} className="bg-gray-100 p-3 rounded-full hover:bg-indigo-100 transition">
                      <Instagram className="w-5 h-5 text-gray-700" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

          </>
  );
};

export default Home;
