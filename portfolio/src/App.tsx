import React, { useEffect, useState } from 'react';
import { Router, Route, Switch, Link } from 'wouter';
import { Menu, Github, X, Linkedin, Instagram } from 'lucide-react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import ErrorPage from './components/ErrorPage';
import UnderDevelopmentPage from './components/UnderDevelopmentPage';

interface Personal {
  name: string;
  title: string;
  image: string;
  description: string;
  aboutDescription: string;
  location: string;
  email: string;
  phone: string;
  hobbies: { name: string; icon: string }[];
}

interface Social {
  github: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

function App() {
  const [personal, setPersonal] = useState<Partial<Personal>>({});
  const [social, setSocial] = useState<Partial<Social>>({});
  const [dataError, setDataError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://uvaiskhan078.vercel.app';

    // Fetch personal data
    fetch(`${apiBase}/api/personal`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setPersonal(data))
      .catch(error => {
        console.error('Error fetching personal data:', error);
        setDataError('Unable to load personal information. Please try again later.');
      });

    // Fetch social data
    fetch(`${apiBase}/api/social`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSocial(data))
      .catch(error => {
        console.error('Error fetching social data:', error);
        setDataError('Unable to load social links. Please try again later.');
      });
  }, []);

  return (
    <Router>
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
                <a href="#about" className="text-gray-700 hover:text-indigo-600 transition">About</a>
                <a href="#projects" className="text-gray-700 hover:text-indigo-600 transition">Projects</a>
                <a href="#skills" className="text-gray-700 hover:text-indigo-600 transition">Skills</a>
                <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition">Contact</a>
                <Link href="/blog" className="text-gray-700 hover:text-indigo-600 transition">Blog</Link>
              </div>
              <div className="md:hidden flex items-center">
                <button
                  className="mobile-menu-button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg z-40">
            <div className="px-4 py-4 space-y-4">
              <a
                href="/"
                className="block text-gray-700 hover:text-indigo-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-indigo-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#projects"
                className="block text-gray-700 hover:text-indigo-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="#skills"
                className="block text-gray-700 hover:text-indigo-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </a>
              <a
                href="#contact"
                className="block text-gray-700 hover:text-indigo-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Link
                href="/blog"
                className="block text-gray-700 hover:text-indigo-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        )}

        {/* Main Content */}
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogPost} />
          <Route path="/under-development" component={UnderDevelopmentPage} />
          <Route component={() => <ErrorPage errorType="404" />} />
        </Switch>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{personal.name || 'Uvais Khan'}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">{personal.title || 'B.Tech Cybersecurity Student | Intern at NHPC Limited | Frontend & Backend Developer'}</p>
              <div className="flex justify-center space-x-6 mb-8">
                <a href={social.github || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <Github className="w-6 h-6" />
                </a>
                <a href={social.twitter || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <X className="w-6 h-6" />
                </a>
                <a href={social.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={social.instagram || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <div className="border-t border-gray-700 pt-8">
                <p className="text-gray-400">&copy; 2025 {personal.name || 'Uvais Khan'}. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
        <SpeedInsights />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
