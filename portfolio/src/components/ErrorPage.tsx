import React from 'react';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
  errorType?: '404' | 'server' | 'network';
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorType = 'server',
  message
}) => {
  const getErrorContent = () => {
    switch (errorType) {
      case '404':
        return {
          title: 'Oops! Page Not Found',
          description: 'The page you\'re looking for seems to have wandered off. Don\'t worry, it happens to the best of us!',
          icon: <AlertTriangle className="w-24 h-24 text-yellow-500 mx-auto mb-6" />,
          emoji: '🔍'
        };
      case 'network':
        return {
          title: 'Connection Lost',
          description: 'Unable to connect to our servers. Please check your internet connection and try again.',
          icon: <RefreshCw className="w-24 h-24 text-blue-500 mx-auto mb-6" />,
          emoji: '📡'
        };
      default:
        return {
          title: 'Server Under Maintenance',
          description: message || 'Our servers are taking a little nap. We\'ll be back up and running soon!',
          icon: <AlertTriangle className="w-24 h-24 text-orange-500 mx-auto mb-6" />,
          emoji: '⚙️'
        };
    }
  };

  const errorContent = getErrorContent();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Cute Illustration */}
        <div className="mb-8">
          <div className="relative">
            {errorContent.icon}
            <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
              {errorContent.emoji}
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {errorContent.title}
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {errorContent.description}
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-medium hover:bg-indigo-700 transition duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </button>

          {errorType !== '404' && (
            <button
              onClick={handleRefresh}
              className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          )}
        </div>

        {/* Fun Message */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 italic">
            "Every great developer has faced errors. It's how we learn! 🚀"
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-indigo-200 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-purple-200 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-pink-200 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
