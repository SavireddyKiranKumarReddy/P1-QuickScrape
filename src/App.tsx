import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { Theme } from './types/news';

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <main>
            <Routes>
              <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Toaster 
            position="top-right"
            theme={isDarkMode ? 'dark' : 'light'}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;