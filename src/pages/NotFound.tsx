import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFound() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-purple-900/70"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <div className="text-8xl font-bold text-white mb-4">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-white/80 mb-8 text-lg">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound; 