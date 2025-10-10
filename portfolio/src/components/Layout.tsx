import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Github, Twitter, Linkedin, Instagram, Menu } from 'lucide-react';

interface Personal {
  name: string;
  title: string;
  description: string;
  aboutDescription: string;
  profileImage: string;
  location: string;
  email: string;
  phone: string;
  hobbies: string[];
}

interface Social {
  github: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

const Layout = () => {
  const [personal, setPersonal] = useState<Partial<Personal>>({});
  const [social, setSocial] = useState<Partial<Social>>({});

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://personal-portfolioful.vercel.app';

    // Fetch personal data
    fetch(`${apiBase}/api/personal`)
      .then(response => response.json())
      .then(data => setPersonal(data))
      .catch(error => console.error('Error fetching personal data:', error));

    // Fetch social data
    fetch(`${apiBase}/api/social`)
      .then(response => response.json())
      .then(data => setSocial(data))
      .catch(error => console.error('Error fetching social data:', error));
  }, []);

  return (
    <div className="font-sans antialiased text-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">{personal.name ? personal.name.replace(' ', '_') : 'Uvais_khan'}</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-indigo-600 transition">Home</a>
              <a href="/#about" className="text-gray-700 hover:text-indigo-600 transition">About</a>
              <a href="/#projects" className="text-gray-700 hover:text-indigo-600 transition">Projects</a>
              <a href="/#skills" className="text-gray-700 hover:text-indigo-600 transition">Skills</a>
              <a href="/#contact" className="text-gray-700 hover:text-indigo-600 transition">Contact</a>
              <Link to="/blog" className="text-gray-700 hover:text-indigo-600 transition">Blog</Link>
            </div>
            <div className="md:hidden flex items-center">
              <button className="mobile-menu-button">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div>Main Content</div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{personal.name || 'Uvais Khan'}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">{personal.title || 'Frontend Developer & UI/UX Designer creating digital experiences that matter.'}</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href={social.github || '#'} className="text-gray-400 hover:text-white transition">
                <i data-feather="github" className="w-6 h-6"></i>
              </a>
              <a href={social.twitter || '#'} className="text-gray-400 hover:text-white transition">
                <i data-feather="twitter" className="w-6 h-6"></i>
              </a>
              <a href={social.linkedin || '#'} className="text-gray-400 hover:text-white transition">
                <i data-feather="linkedin" className="w-6 h-6"></i>
              </a>
              <a href={social.instagram || '#'} className="text-gray-400 hover:text-white transition">
                <i data-feather="instagram" className="w-6 h-6"></i>
              </a>
            </div>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400">&copy; 2023 {personal.name || 'Your Name'}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
