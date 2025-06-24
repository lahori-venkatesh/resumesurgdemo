import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  Globe, 
  Users, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Building, 
  Stethoscope, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Zap,
  Crown,
  Sparkles,
  Check,
  FileText,
  Plus
} from 'lucide-react';
import Header from './Header';
import { resumeTemplates, countryFormats } from '../data/templates';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

interface TemplatesProps {
  isDarkMode?: boolean;
  onNavigate?: (page: 'landing' | 'about' | 'pricing' | 'templates' | 'blog' | 'builder') => void;
  onToggleTheme?: () => void;
  onTemplateSelect?: (templateId: string) => void;
}

const Templates: React.FC<TemplatesProps> = ({ 
  isDarkMode = false, 
  onNavigate, 
  onToggleTheme,
  onTemplateSelect 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Templates', icon: Globe, count: resumeTemplates.length },
    { id: 'modern', label: 'Modern', icon: Lightbulb, count: resumeTemplates.filter(t => t.style === 'modern').length },
    { id: 'classic', label: 'Classic', icon: Star, count: resumeTemplates.filter(t => t.style === 'classic').length },
    { id: 'professional', label: 'Professional', icon: Building, count: resumeTemplates.filter(t => t.category === 'professional').length },
    { id: 'creative', label: 'Creative', icon: Heart, count: resumeTemplates.filter(t => t.category === 'creative').length },
  ];

  const filteredTemplates = resumeTemplates.filter(template => {
    const categoryMatch = selectedCategory === 'all' || 
                         template.category === selectedCategory || 
                         template.style === selectedCategory;
    const searchMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleTemplateSelect = (templateId: string) => {
    // Store selected template in localStorage for non-signed users
    localStorage.setItem('selectedTemplate', templateId);
    
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
    
    // Navigate to builder
    if (onNavigate) {
      onNavigate('builder');
    }
  };

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
        currentPage="templates"
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
              Professional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Templates</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Choose from our collection of expertly designed resume templates, crafted for different industries and countries.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search templates..."
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

      {/* Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
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
              {categories.map((category) => {
                const Icon = category.icon;
                return (
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
                    <Icon className="w-4 h-4" />
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
                );
              })}
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Showing <span className="font-semibold text-blue-600">{filteredTemplates.length}</span> templates
            </p>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`group cursor-pointer rounded-xl border transition-all duration-300 hover:shadow-xl overflow-hidden ${
                  isDarkMode 
                    ? 'border-slate-700 bg-slate-800 hover:border-blue-500' 
                    : 'border-gray-200 bg-white hover:border-blue-500'
                }`}
              >
                {/* Template Preview */}
                <div className="aspect-[3/4] overflow-hidden relative">
                  {/* Harvard Classic Template Preview */}
                  {template.id === 'harvard-classic' ? (
                    <div className="w-full h-full bg-white p-6 text-xs">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-black mb-2">Jacob McLaren</h3>
                        <div className="flex justify-center items-center space-x-4 text-xs text-gray-600">
                          <span>📍 54 Dunster St, Cambridge, MA 02138</span>
                          <span>✉ mclaren@gmail.com</span>
                          <span>📞 555-555-5555</span>
                        </div>
                      </div>
                      
                      {/* Education Section */}
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-black border-b border-black mb-2">EDUCATION</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">Harvard University, Extension School</span>
                            <span>May 2018</span>
                          </div>
                          <div className="italic">Master of Liberal Arts, Information Management Systems</div>
                          <div className="text-xs">• Dean's List Academic Achievement Award recipient</div>
                          <div className="text-xs">• Relevant coursework: Trends in Enterprise Information Systems</div>
                        </div>
                      </div>
                      
                      {/* Experience Section */}
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-black border-b border-black mb-2">PROFESSIONAL EXPERIENCE</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">STATE STREET CORPORATION</span>
                            <span>Sep 2011 – Jul 2013 | Boston, MA</span>
                          </div>
                          <div className="italic">Principal – Simulated Technology</div>
                          <div className="text-xs">• Led 8 cross functional, geographically dispersed teams</div>
                          <div className="text-xs">• Improved process efficiency 75% by standardizing workflow</div>
                          <div className="text-xs">• Reduced application testing time 30% by automating testing</div>
                        </div>
                      </div>
                      
                      {/* Skills Section */}
                      <div>
                        <h4 className="text-sm font-bold text-black border-b border-black mb-2">TECHNICAL EXPERTISE</h4>
                        <div className="text-xs">MS Excel, PowerPoint, Relational Databases, Project Management, Quantitative Analysis, SQL, Java</div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Tier Badge */}
                  <div className="absolute top-3 right-3">
                    {template.tier === 'premium' ? (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 shadow-lg">
                        <Crown className="w-3 h-3" />
                        <span>PRO</span>
                      </div>
                    ) : (
                      <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                        FREE
                      </div>
                    )}
                  </div>

                  {/* Country Flag */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg w-8 h-8 flex items-center justify-center text-lg shadow-sm">
                      🇺🇸
                    </div>
                  </div>

                  {/* ATS Score */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-green-400" />
                      <span>{template.atsScore}%</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <motion.button 
                        className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-100 transition-colors shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </motion.button>
                      
                      <SignedOut>
                        <SignInButton mode="modal">
                          <motion.button 
                            onClick={() => handleTemplateSelect(template.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Use Template</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </SignInButton>
                      </SignedOut>
                      
                      <SignedIn>
                        <motion.button 
                          onClick={() => handleTemplateSelect(template.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>Use Template</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </SignedIn>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg leading-tight">{template.name}</h3>
                    <div className="flex items-center space-x-1 ml-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.9</span>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {template.description}
                  </p>

                  {/* Key Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.features.slice(0, 2).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          isDarkMode 
                            ? 'bg-slate-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 2 && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
                        +{template.features.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <SignedOut>
                    <SignInButton mode="modal">
                      <motion.button 
                        onClick={() => handleTemplateSelect(template.id)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Use This Template</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </SignInButton>
                  </SignedOut>
                  
                  <SignedIn>
                    <motion.button 
                      onClick={() => handleTemplateSelect(template.id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Use This Template</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </SignedIn>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDarkMode ? 'bg-slate-800' : 'bg-gray-200'
              }`}>
                <Search className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your filters or search terms
              </p>
              <motion.button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Our Templates Work</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Every template is designed with industry best practices and ATS optimization in mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "ATS-Optimized",
                description: "All templates pass through Applicant Tracking Systems with 99% success rate"
              },
              {
                icon: Globe,
                title: "Country-Specific",
                description: "Tailored formats that meet local hiring standards and cultural expectations"
              },
              {
                icon: CheckCircle,
                title: "Proven Results",
                description: "Used by 2.5M+ professionals who successfully landed their dream jobs"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`text-center p-8 rounded-2xl border ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
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
            <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your Perfect Resume?</h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Choose from our professional templates and create a resume that gets you hired.
            </p>
            
            <SignedOut>
              <SignInButton mode="modal">
                <motion.button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 mx-auto shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Building Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <motion.button 
                onClick={() => onNavigate && onNavigate('builder')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-3 mx-auto shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Building Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </SignedIn>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Templates;