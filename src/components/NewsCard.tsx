import React, { useRef } from 'react';
import { ExternalLink, Calendar, Bookmark } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
  isDarkMode: boolean;
}

export default function NewsCard({ article, isDarkMode }: NewsCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hasContent = article.description || article.content;

  return (
    <div className={`group relative rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
    }`}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className={`text-xl font-bold transition-colors ${
              isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
            }`}>
              {article.title}
            </h3>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(article.pubDate).toLocaleDateString()}</span>
            </div>
          </div>
          <button 
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'
            }`}
            title="Save for later"
          >
            <Bookmark className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </button>
        </div>

        {/* Image (if available) */}
        {article.image_url && (
          <div className="relative h-48 -mx-6">
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-4">
          {hasContent && (
            <div 
              ref={contentRef}
              className={`prose prose-sm overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full ${
                isDarkMode 
                  ? 'text-gray-300 prose-headings:text-gray-100 scrollbar-thumb-gray-600 scrollbar-track-gray-800' 
                  : 'text-gray-600 prose-headings:text-gray-800 scrollbar-thumb-gray-300 scrollbar-track-gray-100'
              }`}
              style={{ maxHeight: '200px' }}
            >
              <p>{article.description || article.content}</p>
            </div>
          )}
          
          <div className="flex items-center justify-end pt-2">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-white bg-blue-600 hover:bg-blue-700'
                  : 'text-white bg-blue-600 hover:bg-blue-700'
              }`}
            >
              View Full Article
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}