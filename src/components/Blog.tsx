import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search, 
  Tag, 
  TrendingUp,
  BookOpen,
  Star,
  Share2,
  Bookmark,
  Eye,
  MessageCircle,
  Filter
} from 'lucide-react';
import Header from './Header';

interface BlogProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
}

const Blog: React.FC<BlogProps> = ({ isDarkMode = false, onNavigate, onToggleTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Posts', count: 24 },
    { id: 'career-tips', label: 'Career Tips', count: 8 },
    { id: 'resume-writing', label: 'Resume Writing', count: 6 },
    { id: 'interview-prep', label: 'Interview Prep', count: 5 },
    { id: 'industry-insights', label: 'Industry Insights', count: 3 },
    { id: 'job-search', label: 'Job Search', count: 2 }
  ];

  const featuredPost = {
    id: 1,
    title: "The Ultimate Guide to ATS-Optimized Resumes in 2025",
    excerpt: "Learn how to create resumes that pass through Applicant Tracking Systems and land you more interviews. Our comprehensive guide covers everything from keyword optimization to formatting best practices.",
    author: "Sarah Johnson",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    date: "January 15, 2025",
    readTime: "12 min read",
    category: "resume-writing",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
    views: "15.2K",
    comments: 89,
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Common Resume Mistakes That Cost You Job Interviews",
      excerpt: "Avoid these critical errors that hiring managers see every day. From formatting issues to content mistakes, we break down what not to do.",
      author: "Michael Chen",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "January 12, 2025",
      readTime: "8 min read",
      category: "resume-writing",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      views: "8.7K",
      comments: 45
    },
    {
      id: 3,
      title: "How to Negotiate Your Salary: A Complete Guide",
      excerpt: "Master the art of salary negotiation with proven strategies that help you get the compensation you deserve.",
      author: "Emily Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "January 10, 2025",
      readTime: "15 min read",
      category: "career-tips",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
      views: "12.3K",
      comments: 67
    },
    {
      id: 4,
      title: "Remote Work Resume: How to Showcase Virtual Experience",
      excerpt: "Learn how to effectively highlight your remote work experience and skills that employers value in the new work landscape.",
      author: "David Kim",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "January 8, 2025",
      readTime: "10 min read",
      category: "resume-writing",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop",
      views: "9.1K",
      comments: 34
    },
    {
      id: 5,
      title: "Interview Preparation: 50 Questions You Should Be Ready For",
      excerpt: "Comprehensive list of interview questions with sample answers to help you prepare for any job interview.",
      author: "Jessica Williams",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      date: "January 5, 2025",
      readTime: "20 min read",
      category: "interview-prep",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      views: "18.5K",
      comments: 92
    },
    {
      id: 6,
      title: "Tech Industry Resume Trends for 2025",
      excerpt: "Stay ahead of the curve with the latest resume trends specifically for technology professionals and software engineers.",
      author: "Alex Thompson",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      date: "January 3, 2025",
      readTime: "12 min read",
      category: "industry-insights",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
      views: "11.8K",
      comments: 56
    },
    {
      id: 7,
      title: "Building a Personal Brand Through Your Resume",
      excerpt: "Learn how to infuse your personal brand into your resume to stand out from other candidates and make a lasting impression.",
      author: "Rachel Davis",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      date: "December 30, 2024",
      readTime: "14 min read",
      category: "career-tips",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      views: "7.2K",
      comments: 28
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <Header 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        currentPage="blog"
      />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? 'bg-blue-500' : 'bg-blue-200'
          }`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? 'bg-purple-500' : 'bg-purple-200'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Career <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Expert advice, industry insights, and actionable tips to accelerate your career growth.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Featured Article
              </span>
            </div>

            <motion.div 
              className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700' 
                  : 'bg-white border-gray-200'
              }`}
              whileHover={{ scale: 1.01, y: -5 }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {categories.find(c => c.id === featuredPost.category)?.label}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{featuredPost.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{featuredPost.comments}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4 leading-tight">{featuredPost.title}</h2>
                  <p className={`text-lg mb-6 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={featuredPost.authorImage}
                        alt={featuredPost.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium">{featuredPost.author}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {featuredPost.date} • {featuredPost.readTime}
                        </div>
                      </div>
                    </div>
                    
                    <motion.button 
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className={`text-sm font-semibold mb-4 flex items-center ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Filter className="w-4 h-4 mr-2" />
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : isDarkMode
                        ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{category.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                        ? 'bg-slate-700 text-gray-400'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`group cursor-pointer rounded-2xl border transition-all duration-300 hover:shadow-xl overflow-hidden ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 hover:border-blue-500' 
                    : 'bg-white border-gray-200 hover:border-blue-500'
                }`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {categories.find(c => c.id === post.category)?.label}
                    </span>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium">{post.author}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {post.date}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button 
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark className="w-4 h-4" />
                      </motion.button>
                      <motion.button 
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <motion.button 
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 text-white hover:bg-slate-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Articles
            </motion.button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`p-12 rounded-2xl border ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-slate-700' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200'
            }`}
          >
            <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get the latest career insights and resume tips delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <motion.button 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;