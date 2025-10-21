import React from 'react';
import { Home, Code, Coffee, Zap } from 'lucide-react';

const UnderDevelopmentPage: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleViewCode = () => {
    // Get the GitHub link from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const githubLink = urlParams.get('github') || localStorage.getItem('currentProjectGithub');
    if (githubLink) {
      window.open(githubLink, '_blank');
    } else {
      // Fallback to portfolio if no GitHub link
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Cute Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="bg-yellow-100 p-4 rounded-full animate-bounce">
                <Code className="w-12 h-12 text-yellow-600" />
              </div>
              <div className="bg-blue-100 p-4 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}>
                <Coffee className="w-12 h-12 text-blue-600" />
              </div>
              <div className="bg-green-100 p-4 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}>
                <Zap className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <div className="text-6xl animate-pulse">🚧</div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Project Under Development
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          This project is currently under development! I'm working hard to bring it to life.
          In the meantime, you can check out the source code on GitHub to see the progress.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-medium hover:bg-indigo-700 transition duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </button>

          <button
            onClick={handleViewCode}
            className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2"
          >
            <Code className="w-5 h-5" />
            <span>View Source Code</span>
          </button>
        </div>

        {/* Fun Message */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 italic">
            "Great things take time... and lots of coffee! ☕✨"
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-purple-200 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-indigo-200 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-pink-200 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-yellow-400 to-green-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Development Progress: 75% Complete</p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopmentPage;
