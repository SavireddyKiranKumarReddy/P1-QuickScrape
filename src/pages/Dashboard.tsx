import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, RefreshCw, Sun, Moon } from 'lucide-react';
import { TechDomain, NewsArticle, Theme } from '../types/news';
import { fetchNews } from '../lib/api';
import NewsCard from '../components/NewsCard';

const TECH_DOMAINS: TechDomain[] = [
  "ALL",
  "Cybersecurity",
  "Artificial Intelligence",
  "Data Science",
  "AI & Machine Learning",
  "Computer Science and Engineering",
  "CS & Technology"
];

export default function Dashboard() {
  const [selectedDomain, setSelectedDomain] = useState<TechDomain>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<Theme>('light');

  const isDarkMode = theme === 'dark';

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['news', searchQuery || selectedDomain],
    queryFn: () => fetchNews(searchQuery || selectedDomain),
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Remove duplicate articles based on title
  const uniqueArticles = useMemo(() => {
    if (!data?.results) return [];
    const seen = new Set();
    return data.results.filter((article: NewsArticle) => {
      const duplicate = seen.has(article.title);
      seen.add(article.title);
      return !duplicate;
    });
  }, [data?.results]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className={`text-4xl font-bold ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
            }`}>
              Tech News Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => refetch()}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-blue-400 bg-gray-800 hover:bg-gray-700'
                    : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                    : 'bg-blue-50 hover:bg-blue-100 text-gray-700'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            } h-5 w-5`} />
            <input
              type="text"
              placeholder="Search for specific tech news..."
              className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-colors ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Domain Selection */}
          <div className="flex items-center justify-start gap-3 overflow-x-auto pb-2 no-scrollbar">
            {TECH_DOMAINS.map((domain) => (
              <button
                key={domain}
                onClick={() => {
                  setSelectedDomain(domain);
                  setSearchQuery("");
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedDomain === domain && !searchQuery
                    ? isDarkMode
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-105'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
              isDarkMode ? 'border-blue-400' : 'border-blue-600'
            } mx-auto`}></div>
            <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Loading latest updates...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className={`p-4 rounded-lg inline-block ${
              isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-50 text-red-600'
            }`}>
              Failed to load news. Please try again later.
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {uniqueArticles.map((article: NewsArticle) => (
              <NewsCard key={article.link} article={article} isDarkMode={isDarkMode} />
            ))}
            {uniqueArticles.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className={`p-6 rounded-lg shadow-sm inline-block ${
                  isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                }`}>
                  <p>No articles found. Try a different search or domain.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}