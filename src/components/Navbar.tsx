import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radar, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDarkMode, toggleTheme }: NavbarProps) {
  const location = useLocation();

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-lg transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/90 border-b border-gray-800' 
        : 'bg-white/90 border-b border-gray-100'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <Radar className={`h-7 w-7 transition-all duration-300 ${
              isDarkMode 
                ? 'text-blue-400 group-hover:text-blue-300' 
                : 'text-blue-600 group-hover:text-blue-500'
            }`} />
            <span className={`text-xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              QuickScrape
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-1">
              {[
                { path: '/', label: 'Home' },
                { path: '/dashboard', label: 'Dashboard' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === path
                      ? isDarkMode
                        ? 'text-blue-400'
                        : 'text-blue-600'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                  {location.pathname === path && (
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full transform transition-all duration-300 ${
                      isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                    }`} />
                  )}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 hover:text-yellow-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}