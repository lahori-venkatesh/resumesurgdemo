import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SignedIn, SignedOut, RedirectToSignIn, useUser, UserButton } from '@clerk/clerk-react';
import { FileText, Sun, Moon, ArrowLeft, Download, Save } from 'lucide-react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import CustomSectionForm from './CustomSectionForm';
import TemplateSelector from './TemplateSelector';
import CustomizationPanel from './CustomizationPanel';
import ResumePreview from './resume/ResumePreview';
import ResumeCreationOptions from './ResumeCreationOptions';
import { useResumeData } from '../hooks/useResumeData';
import { exportToPDF } from '../utils/exportToPDF';

interface ResumeBuilderProps {
  onBackToLanding: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  selectedTemplate?: string;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ 
  onBackToLanding, 
  isDarkMode = false, 
  onToggleTheme,
  selectedTemplate: propSelectedTemplate 
}) => {
  const [activeSection, setActiveSection] = useState('creation-options');
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [isExporting, setIsExporting] = useState(false);
  const { user, isLoaded } = useUser();
  const {
    resumeData,
    selectedTemplate,
    setSelectedTemplate,
    customization,
    updateCustomization,
    resetCustomization,
    sectionOrder,
    setSectionOrder,
    updatePersonalInfo,
    updateExperience,
    updateEducation,
    updateSkills,
    updateCustomSections,
    setResumeData
  } = useResumeData();

  // Set template from props when available
  useEffect(() => {
    if (propSelectedTemplate && propSelectedTemplate !== selectedTemplate) {
      setSelectedTemplate(propSelectedTemplate);
      // If user has a template selected, skip creation options
      if (activeSection === 'creation-options') {
        setActiveSection('dashboard');
      }
    }
  }, [propSelectedTemplate, selectedTemplate, setSelectedTemplate, activeSection]);

  const handleExport = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      // Generate filename based on user's name or default
      const firstName = resumeData.personalInfo.firstName || 'Resume';
      const lastName = resumeData.personalInfo.lastName || '';
      const filename = `${firstName}${lastName ? '_' + lastName : ''}_Resume.pdf`;
      
      // Export the resume preview with exact formatting
      await exportToPDF('resume-preview', filename);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = () => {
    // Simulate save action
    setLastSaved(new Date());
    // Here you would typically save to a backend
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    localStorage.setItem('customization', JSON.stringify(customization));
    localStorage.setItem('sectionOrder', JSON.stringify(sectionOrder));
    
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
  };

  const handleCreateFromScratch = () => {
    // Reset to blank resume data
    setResumeData({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
        jobTitle: '',
        dateOfBirth: '',
        nationality: '',
        gender: '',
        maritalStatus: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      customSections: []
    });
    setActiveSection('dashboard');
  };

  const handleSelectTemplate = () => {
    setActiveSection('templates');
  };

  const handleUploadResume = (extractedData: any) => {
    // Set the extracted data to the resume state
    setResumeData(extractedData);
    setActiveSection('dashboard');
  };

  const handleSectionVisibilityToggle = (sectionId: string) => {
    const newOrder = sectionOrder.map(section =>
      section.id === sectionId ? { ...section, visible: !section.visible } : section
    );
    setSectionOrder(newOrder);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'creation-options':
        return (
          <ResumeCreationOptions
            onCreateFromScratch={handleCreateFromScratch}
            onSelectTemplate={handleSelectTemplate}
            onUploadResume={handleUploadResume}
            isDarkMode={isDarkMode}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            resumeData={resumeData}
            sectionOrder={sectionOrder}
            onSectionOrderChange={setSectionOrder}
            onSectionChange={setActiveSection}
            onExport={handleExport}
            selectedTemplate={selectedTemplate}
          />
        );
      case 'templates':
        return (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateSelect={(templateId) => {
              setSelectedTemplate(templateId);
              // After selecting template, go to dashboard
              setActiveSection('dashboard');
            }}
          />
        );
      case 'customize':
        return (
          <CustomizationPanel
            customization={customization}
            onUpdate={updateCustomization}
            onReset={resetCustomization}
          />
        );
      case 'personal':
        return (
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onUpdate={updatePersonalInfo}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experience={resumeData.experience}
            onUpdate={updateExperience}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={resumeData.education}
            onUpdate={updateEducation}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={resumeData.skills}
            onUpdate={updateSkills}
          />
        );
      case 'custom':
        return (
          <CustomSectionForm
            customSections={resumeData.customSections}
            onUpdate={updateCustomSections}
          />
        );
      case 'preview':
        return (
          <div className="flex justify-center items-start min-h-full py-8">
            <ResumePreview
              resumeData={resumeData}
              selectedTemplate={selectedTemplate}
              customization={customization}
              sectionOrder={sectionOrder}
              showZoomControls={true}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      'creation-options': 'Resume Creation Options',
      dashboard: 'Dashboard',
      templates: 'Resume Templates',
      customize: 'Customize Design',
      personal: 'Personal Information',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills & Expertise',
      custom: 'Custom Sections',
      preview: 'Resume Preview'
    };
    return titles[activeSection as keyof typeof titles] || 'Resume Builder';
  };

  const getSectionDescription = () => {
    const descriptions = {
      'creation-options': 'Choose how you want to create your resume',
      dashboard: 'Overview of your resume progress and quick actions',
      templates: 'Choose a professional template design that matches your style',
      customize: 'Personalize fonts, colors, spacing, and layout to make your resume unique',
      personal: 'Add your contact information and professional summary',
      experience: 'Showcase your professional work experience and achievements',
      education: 'Add your educational background and qualifications',
      skills: 'Highlight your technical and soft skills',
      custom: 'Create custom sections to showcase unique aspects of your background',
      preview: 'See how your resume will look when exported to PDF. Use zoom controls to inspect details.'
    };
    return descriptions[activeSection as keyof typeof descriptions] || '';
  };

  // Determine layout based on active section
  const isFullWidthSection = activeSection === 'creation-options' || activeSection === 'dashboard' || activeSection === 'preview';
  const showPreviewPanel = !isFullWidthSection;
  const showSidebar = activeSection !== 'creation-options';

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className={`h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-950 to-slate-900' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      
      <SignedIn>
        <div className={`h-screen flex overflow-hidden transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-950 to-slate-900' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}>
          {/* Professional Resume Builder Header - Only show when not on creation options */}
          {showSidebar && (
            <div className="absolute top-0 left-0 right-0 z-50">
              <header className={`backdrop-blur-xl border-b transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-900/95 border-slate-800 shadow-xl'
                  : 'bg-white/95 border-slate-200 shadow-xl'
              }`}>
                <div className="max-w-full mx-auto px-8 py-4">
                  <div className="flex justify-between items-center">
                    {/* Left Side - Logo and Navigation */}
                    <div className="flex items-center space-x-6">
                      {/* Back Button */}
                      <motion.button
                        onClick={() => setActiveSection('creation-options')}
                        className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isDarkMode
                            ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Options</span>
                      </motion.button>

                      {/* Logo and Brand */}
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <motion.div 
                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                            whileHover={{ rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FileText className="w-6 h-6 text-white" />
                          </motion.div>
                          <motion.div 
                            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                              ResumeSurge
                            </span>
                            <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                              isDarkMode 
                                ? 'bg-blue-900/30 text-blue-300' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              Pro
                            </div>
                          </div>
                          <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Professional Resume Builder
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Actions and Profile */}
                    <div className="flex items-center space-x-4">
                      {/* Action Buttons */}
                      <div className="hidden md:flex items-center space-x-2">
                        {/* Save Button */}
                        <motion.button
                          onClick={handleSave}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isDarkMode
                              ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </motion.button>

                        {/* Export Button */}
                        <motion.button
                          onClick={handleExport}
                          disabled={isExporting}
                          className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Download className="w-4 h-4" />
                          <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
                        </motion.button>
                      </div>

                      {/* Theme Toggle */}
                      <motion.button
                        onClick={onToggleTheme}
                        className={`p-2.5 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'text-yellow-400 hover:text-yellow-300 hover:bg-slate-800'
                            : 'text-blue-600 hover:text-blue-700 hover:bg-slate-100'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.div
                          initial={false}
                          animate={{ rotate: isDarkMode ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isDarkMode ? (
                            <Sun className="w-5 h-5" strokeWidth={2.5} />
                          ) : (
                            <Moon className="w-5 h-5" strokeWidth={2.5} />
                          )}
                        </motion.div>
                      </motion.button>

                      {/* User Profile Section - Just Profile Icon */}
                      <div className="flex items-center pl-4 border-l border-slate-300 dark:border-slate-700">
                        <div className="relative">
                          <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                              elements: {
                                avatarBox: "w-10 h-10 ring-2 ring-blue-500/20 shadow-lg",
                                userButtonPopoverCard: isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200",
                                userButtonPopoverText: isDarkMode ? "text-slate-200" : "text-gray-900",
                                userButtonPopoverActions: isDarkMode ? "text-slate-300" : "text-gray-700"
                              }
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white dark:border-slate-900 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-center space-x-2">
                      <motion.button
                        onClick={handleSave}
                        className={`p-2 rounded-lg ${
                          isDarkMode
                            ? 'text-slate-300 hover:bg-slate-800'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Save className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="p-2 bg-green-600 text-white rounded-lg disabled:opacity-70"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </header>
            </div>
          )}

          <DndProvider backend={HTML5Backend}>
            <div className={`flex w-full ${showSidebar ? 'pt-24' : ''}`}>
              {/* Sidebar - Only show when not on creation options */}
              {showSidebar && (
                <div className="flex-shrink-0">
                  <Sidebar
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                    onExport={handleExport}
                    onBackToLanding={onBackToLanding}
                    resumeData={resumeData}
                    sectionOrder={sectionOrder}
                    onSectionOrderChange={setSectionOrder}
                    onSectionVisibilityToggle={handleSectionVisibilityToggle}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}

              {/* Main Content Area */}
              <div className="flex-1 flex min-w-0">
                {/* Editor Panel - 40% width when preview is shown */}
                <div className={`flex flex-col min-w-0 ${showPreviewPanel ? 'w-2/5' : 'flex-1'}`}>
                  {/* Section Header - Only show for non-full-width sections */}
                  {!isFullWidthSection && showSidebar && (
                    <div className={`flex-shrink-0 border-b px-6 py-4 ${
                      isDarkMode 
                        ? 'bg-slate-900/50 border-slate-800' 
                        : 'bg-white/50 border-gray-200'
                    }`}>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className={`text-xl font-bold mb-1 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {getSectionTitle()}
                        </h2>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`}>
                          {getSectionDescription()}
                        </p>
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Content Area */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="h-full">
                      {isFullWidthSection ? (
                        <div className={`h-full ${activeSection === 'creation-options' ? '' : 'p-8'}`}>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="h-full"
                          >
                            {renderActiveSection()}
                          </motion.div>
                        </div>
                      ) : (
                        <div className="p-4">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-none"
                          >
                            <div className={`rounded-xl shadow-sm border p-4 ${
                              isDarkMode 
                                ? 'bg-slate-900/50 border-slate-800' 
                                : 'bg-white border-gray-200'
                            }`}>
                              {renderActiveSection()}
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preview Panel - 60% width when shown */}
                {showPreviewPanel && (
                  <div className={`w-3/5 flex-shrink-0 border-l ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-200'
                  }`}>
                    <div className="h-full overflow-y-auto p-4">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center"
                      >
                        <ResumePreview
                          resumeData={resumeData}
                          selectedTemplate={selectedTemplate}
                          customization={customization}
                          sectionOrder={sectionOrder}
                          showZoomControls={false}
                        />
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DndProvider>
        </div>
      </SignedIn>
    </>
  );
};

export default ResumeBuilder;