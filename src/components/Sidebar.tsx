import React from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Download, 
  Palette, 
  Layout,
  Plus,
  Eye,
  EyeOff,
  GripVertical,
  Sliders,
  Save
} from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { ResumeData, SectionOrder } from '../types/resume';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onExport: () => void;
  onBackToLanding?: () => void;
  resumeData?: ResumeData;
  sectionOrder?: SectionOrder[];
  onSectionOrderChange?: (newOrder: SectionOrder[]) => void;
  onSectionVisibilityToggle?: (sectionId: string) => void;
  isDarkMode?: boolean;
}

interface DraggableSidebarSectionProps {
  section: any;
  index: number;
  isActive: boolean;
  onClick: () => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onVisibilityToggle: (sectionId: string) => void;
  resumeData?: ResumeData;
  isDarkMode?: boolean;
}

const DraggableSidebarSection: React.FC<DraggableSidebarSectionProps> = ({
  section,
  index,
  isActive,
  onClick,
  onMove,
  onVisibilityToggle,
  resumeData,
  isDarkMode = false
}) => {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'sidebar-section',
    item: { index, id: section.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'sidebar-section',
    hover: (item: { index: number; id: string }) => {
      if (!item) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const Icon = section.icon;

  const getSectionCount = () => {
    if (!resumeData) return '';
    
    switch (section.id) {
      case 'experience':
        const visibleExperience = resumeData.experience.filter(exp => exp.visible !== false);
        const totalDescriptions = visibleExperience.reduce((total, exp) => 
          total + exp.description.filter(desc => desc.trim()).length, 0
        );
        return `${visibleExperience.length} positions, ${totalDescriptions} points`;
      case 'education':
        const visibleEducation = resumeData.education.filter(ed => ed.visible !== false);
        return `${visibleEducation.length} degrees`;
      case 'personal':
        return 'Contact & summary';
      default:
        return section.description;
    }
  };

  return (
    <div
      ref={(node) => dragPreview(drop(node))}
      className={`group relative transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
            : isDarkMode
              ? 'text-slate-300 hover:bg-slate-800 hover:scale-102'
              : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
        }`}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
          isActive 
            ? 'bg-white/20' 
            : isDarkMode
              ? 'bg-slate-800 group-hover:bg-slate-700'
              : 'bg-gray-100 group-hover:bg-gray-200'
        }`}>
          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm ${isActive ? 'text-white' : isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>
            {section.label}
          </div>
          <div className={`text-xs ${isActive ? 'text-blue-100' : isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            {getSectionCount()}
          </div>
        </div>
        
        {/* Visibility Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVisibilityToggle(section.id);
          }}
          className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
            section.visible
              ? isActive 
                ? 'text-white/70 hover:text-white' 
                : isDarkMode 
                  ? 'text-slate-400 hover:text-slate-300' 
                  : 'text-gray-500 hover:text-gray-700'
              : 'text-red-500 hover:text-red-600'
          }`}
          title={section.visible ? 'Hide from resume' : 'Show in resume'}
        >
          {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        
        <div
          ref={drag}
          className={`cursor-move p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
            isActive ? 'text-white/70 hover:text-white' : isDarkMode ? 'text-slate-500 hover:text-slate-400' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <GripVertical className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  onExport, 
  onBackToLanding,
  resumeData,
  sectionOrder,
  onSectionOrderChange,
  onSectionVisibilityToggle,
  isDarkMode = false
}) => {
  const staticSections = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Layout, 
      description: 'Overview & quick actions',
      category: 'main'
    },
    { 
      id: 'templates', 
      label: 'Templates', 
      icon: Palette, 
      description: 'Choose your design',
      category: 'main'
    },
    { 
      id: 'customize', 
      label: 'Customize', 
      icon: Sliders, 
      description: 'Fonts, colors & layout',
      category: 'main'
    },
    { 
      id: 'preview', 
      label: 'Preview', 
      icon: Eye, 
      description: 'Full page preview',
      category: 'main'
    }
  ];

  // Convert sectionOrder to sidebar format with icons
  const draggableContentSections = sectionOrder?.map(section => ({
    ...section,
    label: section.title,
    description: section.id.startsWith('custom-') 
      ? `Custom ${resumeData?.customSections.find(cs => cs.id === section.customSectionId)?.type || 'section'}`
      : section.title
  })) || [];

  const moveContentSection = (dragIndex: number, hoverIndex: number) => {
    if (!sectionOrder || !onSectionOrderChange) return;
    
    const draggedSection = sectionOrder[dragIndex];
    const newOrder = [...sectionOrder];
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, draggedSection);
    onSectionOrderChange(newOrder);
  };

  const handleSectionClick = (sectionId: string) => {
    // Handle custom section clicks
    if (sectionId.startsWith('custom-')) {
      // Navigate to custom sections
      onSectionChange('custom');
    } else {
      onSectionChange(sectionId);
    }
  };

  const handleVisibilityToggle = (sectionId: string) => {
    if (onSectionVisibilityToggle) {
      onSectionVisibilityToggle(sectionId);
    }
  };

  return (
    <div className={`w-80 h-full flex flex-col shadow-xl border-r transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Static Sections */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 px-2 ${
              isDarkMode ? 'text-slate-500' : 'text-gray-500'
            }`}>
              Main
            </h3>
            <div className="space-y-1">
              {staticSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                        : isDarkMode
                          ? 'text-slate-300 hover:bg-slate-800 hover:scale-102'
                          : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-white/20' 
                        : isDarkMode
                          ? 'bg-slate-800 group-hover:bg-slate-700'
                          : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${isActive ? 'text-white' : isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>
                        {section.label}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-blue-100' : isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        {section.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Draggable Content Sections */}
          <div>
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 px-2 ${
              isDarkMode ? 'text-slate-500' : 'text-gray-500'
            }`}>
              Resume Sections
            </h3>
            <div className="space-y-1">
              {draggableContentSections.map((section, index) => (
                <DraggableSidebarSection
                  key={section.id}
                  section={section}
                  index={index}
                  isActive={activeSection === section.component || (section.id.startsWith('custom-') && activeSection === 'custom')}
                  onClick={() => handleSectionClick(section.id)}
                  onMove={moveContentSection}
                  onVisibilityToggle={handleVisibilityToggle}
                  resumeData={resumeData}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>

          {/* Add Custom Section Button */}
          <div>
            <button
              onClick={() => onSectionChange('custom')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border-2 border-dashed ${
                isDarkMode
                  ? 'text-purple-400 hover:bg-purple-900/20 border-purple-600 hover:border-purple-500'
                  : 'text-purple-600 hover:bg-purple-50 border-purple-300 hover:border-purple-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
              }`}>
                <Plus className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                  Add Custom Section
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  Create unique sections
                </div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Export Section */}
      <div className={`flex-shrink-0 p-4 border-t transition-colors duration-300 ${
        isDarkMode 
          ? 'border-slate-800 bg-slate-900/50' 
          : 'border-gray-100 bg-gray-50'
      }`}>
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg transform hover:scale-105"
        >
          <Download className="w-5 h-5" />
          <span>Download Resume</span>
        </button>
        <div className="mt-3 text-center">
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            High-quality PDF • ATS-optimized
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;