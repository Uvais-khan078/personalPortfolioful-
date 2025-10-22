import React, { useEffect, useState } from 'react';
import { User, MapPin, Mail, Phone, Music, Camera, Book, Globe } from 'lucide-react';

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

const About = () => {
  const [personal, setPersonal] = useState<Partial<Personal>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://uvaiskhan078.vercel.app';

  const getHobbyIcon = (index: number) => {
    switch (index) {
      case 0: return <Music className="w-4 h-4 mr-2" />;
      case 1: return <Camera className="w-4 h-4 mr-2" />;
      case 2: return <Book className="w-4 h-4 mr-2" />;
      default: return <Globe className="w-4 h-4 mr-2" />;
    }
  };

  useEffect(() => {
    fetch(`${apiBase}/api/personal`)
      .then(response => response.json())
      .then(data => {
        setPersonal(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching personal data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">About Me</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6" data-aos="fade-up" data-aos-delay="100"></div>
          <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">{personal.description}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-10 md:mb-0" data-aos="fade-right">
            <img src={personal.profileImage} alt="Profile" className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg" />
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
                      {getHobbyIcon(index)}
                      <span>{hobby}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a href={`${apiBase}/cv`} target="_blank" rel="noopener noreferrer" className="inline-block mt-8 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition">Download CV</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
