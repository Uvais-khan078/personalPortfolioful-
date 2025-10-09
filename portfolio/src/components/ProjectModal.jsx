import React from 'react';

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a href={project.demoLink || '#'} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              View Demo
            </a>
            <a href={project.githubLink || '#'} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
