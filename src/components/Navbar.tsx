import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, MessageCircle, Plane, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
            <Plane className="h-8 w-8 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TravelHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-white hover:text-cyan-400 transition-colors ${
                isActive('/') ? 'text-cyan-400' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/flights"
              className={`text-white hover:text-cyan-400 transition-colors ${
                isActive('/flights') ? 'text-cyan-400' : ''
              }`}
            >
              Flights
            </Link>
            <Link
              to="/hotels"
              className={`text-white hover:text-cyan-400 transition-colors ${
                isActive('/hotels') ? 'text-cyan-400' : ''
              }`}
            >
              Hotels
            </Link>
            <Link
              to="/trains"
              className={`text-white hover:text-cyan-400 transition-colors ${
                isActive('/trains') ? 'text-cyan-400' : ''
              }`}
            >
              Trains
            </Link>
            <Link
              to="/cars"
              className={`text-white hover:text-cyan-400 transition-colors ${
                isActive('/cars') ? 'text-cyan-400' : ''
              }`}
            >
              Cars
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/chat"
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                >
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 text-red-400 font-medium hover:bg-red-500/30 transition-all transform hover:scale-105 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white/5 backdrop-blur-sm rounded-b-lg">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg">
                Home
              </Link>
              <Link to="/flights" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg">
                Flights
              </Link>
              <Link to="/hotels" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg">
                Hotels
              </Link>
              <Link to="/trains" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg">
                Trains
              </Link>
              <Link to="/cars" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg">
                Cars
              </Link>
              <Link to="/chat" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg">
                Chat
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;