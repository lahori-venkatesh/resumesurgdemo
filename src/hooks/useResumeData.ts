import { useState, useEffect } from 'react';
import { ResumeData, SectionOrder, CustomSection, ResumeCustomization } from '../types/resume';
import { sampleResumeData } from '../data/sampleData';
import { resumeTemplates } from '../data/templates';
import { User, Briefcase, GraduationCap, Plus, Type, List, Briefcase as ProjectIcon } from 'lucide-react';

const defaultCustomization: ResumeCustomization = {
  fontFamily: 'Inter',
  fontSize: {
    name: 32,
    heading: 20,
    body: 14,
    small: 12
  },
  fontWeight: {
    name: 700,
    heading: 600,
    body: 400
  },
  lineHeight: {
    heading: 1.2,
    body: 1.5
  },
  colors: {
    primary: '#2563EB',
    secondary: '#64748B',
    accent: '#10B981',
    text: '#1F2937',
    textLight: '#6B7280',
    background: '#FFFFFF',
    border: '#E5E7EB'
  },
  spacing: {
    page: 32,
    section: 24,
    item: 16,
    line: 8
  },
  layout: {
    pageWidth: 8.27, // A4 width in inches
    pageHeight: 11.69, // A4 height in inches
    columns: 1,
    headerAlignment: 'center',
    sectionSpacing: 32,
    pageFormat: 'A4',
    orientation: 'portrait',
    maxPages: 3,
    pageBreakBehavior: 'auto',
    showPageNumbers: false,
    pageNumberPosition: 'bottom-center',
    headerOnAllPages: false,
    footerText: ''
  },
  borders: {
    sectionBorder: true,
    sectionBorderWidth: 2,
    sectionBorderStyle: 'solid',
    headerBorder: true,
    headerBorderWidth: 2,
    pageBorder: false,
    pageBorderWidth: 1,
    pageBorderColor: '#E5E7EB'
  },
  shadows: false,
  roundedCorners: 0,
  bulletStyle: 'disc'
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    ...sampleResumeData,
    customSections: []
  });
  const [selectedTemplate, setSelectedTemplate] = useState('harvard-classic');
  const [customization, setCustomization] = useState<ResumeCustomization>(defaultCustomization);
  const [sectionOrder, setSectionOrder] = useState<SectionOrder[]>([
    { id: 'personal', title: 'Personal Information', component: 'personal', visible: true, icon: User },
    { id: 'experience', title: 'Work Experience', component: 'experience', visible: true, icon: Briefcase },
    { id: 'education', title: 'Education', component: 'education', visible: true, icon: GraduationCap }
    // Removed skills section from default sidebar
  ]);

  // Update customization colors when template changes (only if templates exist)
  useEffect(() => {
    if (resumeTemplates.length > 0) {
      const template = resumeTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        setCustomization(prev => ({
          ...prev,
          colors: {
            ...prev.colors,
            primary: template.colors.primary,
            secondary: template.colors.secondary,
            accent: template.colors.accent
          }
        }));
      }
    }
  }, [selectedTemplate]);

  // Update section order when custom sections change
  useEffect(() => {
    setSectionOrder(prevOrder => {
      // Keep existing core sections with their current visibility state
      const coreSections = prevOrder.filter(section => 
        !section.id.startsWith('custom-') && section.id !== 'custom'
      );

      // Add individual custom sections
      const customSectionItems = resumeData.customSections.map(customSection => {
        const existingSection = prevOrder.find(s => s.id === `custom-${customSection.id}`);
        
        // Get appropriate icon based on section type
        const getCustomSectionIcon = (type: string) => {
          switch (type) {
            case 'text': return Type;
            case 'list': return List;
            case 'achievements': return GraduationCap;
            case 'projects': return ProjectIcon;
            default: return Plus;
          }
        };

        return {
          id: `custom-${customSection.id}`,
          title: customSection.title,
          component: 'custom',
          visible: existingSection?.visible ?? true,
          icon: getCustomSectionIcon(customSection.type),
          customSectionId: customSection.id
        };
      });

      return [...coreSections, ...customSectionItems];
    });
  }, [resumeData.customSections]);

  // Update page dimensions when format changes
  useEffect(() => {
    const updatePageDimensions = () => {
      const { pageFormat, orientation } = customization.layout;
      let width = 8.27;
      let height = 11.69;

      switch (pageFormat) {
        case 'A4':
          width = 8.27;
          height = 11.69;
          break;
        case 'Letter':
          width = 8.5;
          height = 11;
          break;
        case 'Legal':
          width = 8.5;
          height = 14;
          break;
        default:
          // Keep current dimensions for custom
          width = customization.layout.pageWidth;
          height = customization.layout.pageHeight;
      }

      if (orientation === 'landscape') {
        [width, height] = [height, width];
      }

      if (width !== customization.layout.pageWidth || height !== customization.layout.pageHeight) {
        setCustomization(prev => ({
          ...prev,
          layout: {
            ...prev.layout,
            pageWidth: width,
            pageHeight: height
          }
        }));
      }
    };

    updatePageDimensions();
  }, [customization.layout.pageFormat, customization.layout.orientation]);

  const updatePersonalInfo = (personalInfo: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...personalInfo }
    }));
  };

  const updateExperience = (experience: ResumeData['experience']) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: ResumeData['education']) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateCustomSections = (customSections: CustomSection[]) => {
    setResumeData(prev => ({ ...prev, customSections }));
  };

  const updateCustomization = (updates: Partial<ResumeCustomization>) => {
    setCustomization(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetCustomization = () => {
    // Only try to get template colors if templates exist
    let resetColors = defaultCustomization.colors;
    
    if (resumeTemplates.length > 0) {
      const template = resumeTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        resetColors = {
          ...defaultCustomization.colors,
          primary: template.colors.primary,
          secondary: template.colors.secondary,
          accent: template.colors.accent
        };
      }
    }

    setCustomization({
      ...defaultCustomization,
      colors: resetColors
    });
  };

  return {
    resumeData,
    setResumeData,
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
    updateCustomSections
  };
};