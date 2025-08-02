import React from 'react';
import { ArrowRight, Globe, Bell, Zap, Code, Database, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  isDarkMode: boolean;
}

export default function Home({ isDarkMode }: HomeProps) {
  const features = [
    {
      icon: Globe,
      title: 'Multiple Sources',
      description: 'Aggregate content from various websites and platforms in real-time.'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get notified immediately when new content matches your interests.'
    },
    {
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'See updates as they happen with our powerful scraping engine.'
    },
    {
      icon: Code,
      title: 'Advanced Filtering',
      description: 'Filter news by technology domains and custom keywords.'
    },
    {
      icon: Database,
      title: 'Content Analysis',
      description: 'AI-powered content summarization and key points extraction.'
    },
    {
      icon: Shield,
      title: 'Verified Sources',
      description: 'All content comes from trusted and verified tech news sources.'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="space-y-24 py-16">
        {/* Hero Section */}
        <section className="text-center space-y-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-6xl font-bold leading-tight ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400'
                : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600'
            } bg-clip-text text-transparent`}>
              Stay Updated with Real-Time Web Scraping
            </h1>
            <p className={`text-xl mt-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Get instant updates from multiple sources in one place. No more switching between tabs or missing important information.
            </p>
            <div className="mt-10">
              <Link
                to="/dashboard"
                className={`group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className={`group p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-750'
                      : 'bg-white hover:shadow-xl'
                  }`}
                >
                  <div className={`inline-block p-3 rounded-xl transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 group-hover:bg-gray-600'
                      : 'bg-blue-50 group-hover:bg-blue-100'
                  }`}>
                    <Icon className={`h-7 w-7 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <h3 className={`text-xl font-semibold mt-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {title}
                  </h3>
                  <p className={`mt-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}