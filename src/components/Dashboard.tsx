import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus,
  Download,
  Eye,
  Palette,
  FileText,
  Clock,
  User,
  Save
} from 'lucide-react';
import { ResumeData, SectionOrder } from '../types/resume';

interface DashboardProps {
  resumeData: ResumeData;
  sectionOrder: SectionOrder[];
  onSectionOrderChange: (newOrder: SectionOrder[]) => void;
  onSectionChange: (section: string) => void;
  onExport: () => void;
  selectedTemplate: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  resumeData,
  sectionOrder,
  onSectionOrderChange,
  onSectionChange,
  onExport,
  selectedTemplate
}) => {
  // Mock data for existing resumes - in real app this would come from backend
  const existingResumes = [
    {
      id: '1',
      name: 'Software Engineer Resume',
      lastModified: '2 hours ago',
      template: 'Harvard Classic',
      progress: 85
    },
    {
      id: '2', 
      name: 'Marketing Manager Resume',
      lastModified: '1 day ago',
      template: 'Modern Professional',
      progress: 92
    },
    {
      id: '3',
      name: 'Data Scientist Resume', 
      lastModified: '3 days ago',
      template: 'Clean Minimal',
      progress: 78
    }
  ];

  const quickActions = [
    { 
      icon: Palette, 
      label: 'Change Template', 
      action: () => onSectionChange('templates'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    { 
      icon: Eye, 
      label: 'Preview Resume', 
      action: () => onSectionChange('preview'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      icon: Download, 
      label: 'Download PDF', 
      action: onExport,
      color: 'bg-green-500 hover:bg-green-600'
    },
    { 
      icon: Save, 
      label: 'Save Resume', 
      action: () => {
        // Save resume to localStorage
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
          <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span style="font-weight: 600;">Resume saved successfully!</span>
            </div>
          </div>
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => {
          if (document.body.contains(successDiv)) {
            document.body.removeChild(successDiv);
          }
        }, 3000);
      },
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {resumeData.personalInfo.firstName || 'User'}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Let's create an amazing resume together
          </p>
        </motion.div>

        {/* Create Resume Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Resume</h2>
          </div>
          
          <div className="text-center">
            <motion.button
              onClick={() => onSectionChange('templates')}
              className="group relative bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Create New Resume</h3>
                  <p className="text-blue-100">Start building your professional resume</p>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* My Resumes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Resumes</h2>
            <span className="text-sm text-gray-500">{existingResumes.length} resumes</span>
          </div>

          {existingResumes.length > 0 ? (
            <div className="grid gap-4">
              {existingResumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => onSectionChange('personal')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {resume.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{resume.lastModified}</span>
                          </div>
                          <span>•</span>
                          <span>{resume.template}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{resume.progress}%</div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${resume.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
              <p className="text-gray-600 mb-6">Create your first resume to get started</p>
              <button
                onClick={() => onSectionChange('templates')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Your First Resume
              </button>
            </div>
          )}
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} text-white p-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-6 h-6" />
                    <span className="font-medium">{action.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;