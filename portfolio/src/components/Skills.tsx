import React, { useEffect, useState } from 'react';

interface Skill {
  name: string;
  percentage: number;
}

interface SkillsData {
  technical: Skill[];
  professional: Skill[];
}

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
  skillsDescription: string;
}

const Skills = () => {
  const [skills, setSkills] = useState<Partial<SkillsData>>({});
  const [personal, setPersonal] = useState<Partial<Personal>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://uvaiskhan078.vercel.app';

    // Fetch skills data
    fetch(`${apiBase}/api/skills`)
      .then(response => response.json())
      .then(data => setSkills(data))
      .catch(error => console.error('Error fetching skills:', error));

    // Fetch personal data for skills description
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
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">My Skills</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6" data-aos="fade-up" data-aos-delay="100"></div>
          <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">{personal.skillsDescription || "I've worked with a variety of technologies in the web development world."}</p>
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
                    <div className="bg-indigo-600 h-2 rounded-full skill-bar" style={{width: `${skill.percentage}%`}}></div>
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
                    <div className="bg-indigo-600 h-2 rounded-full skill-bar" style={{width: `${skill.percentage}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
