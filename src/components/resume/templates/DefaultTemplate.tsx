import React from 'react';
import { ResumeData, SectionOrder, ResumeCustomization, ResumeTemplate } from '../../../types/resume';
import { PersonalInfoSection } from '../sections/PersonalInfoSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { SkillsSection } from '../sections/SkillsSection';
import { CustomSectionRenderer } from '../sections/CustomSectionRenderer';
import { useTemplateHelpers } from '../hooks/useTemplateHelpers';

interface DefaultTemplateProps {
  resumeData: ResumeData;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
  template?: ResumeTemplate;
  pages: React.ReactNode[];
}

export const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  resumeData,
  customization,
  sectionOrder,
  template,
  pages
}) => {
  const { getOrderedSections, isSectionVisible } = useTemplateHelpers({
    resumeData,
    sectionOrder
  });

  const getCustomStyles = () => {
    const baseStyles = {
      fontFamily: customization.fontFamily,
      width: `${customization.layout.pageWidth * 96}px`,
      minHeight: `${customization.layout.pageHeight * 96}px`,
      padding: `${customization.spacing.page}px`,
      backgroundColor: customization.colors.background,
      color: customization.colors.text,
      lineHeight: customization.lineHeight.body,
      fontSize: `${customization.fontSize.body}px`
    };

    if (template) {
      switch (template.layout) {
        case 'two-column':
          return { ...baseStyles, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: `${customization.spacing.section}px` };
        default:
          return baseStyles;
      }
    }

    return baseStyles;
  };

  const getPageNumberStyles = () => {
    const position = customization.layout.pageNumberPosition;
    const baseStyles = {
      position: 'absolute' as const,
      fontSize: `${customization.fontSize.small}px`,
      color: customization.colors.textLight
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyles, top: '16px', left: '16px' };
      case 'top-center':
        return { ...baseStyles, top: '16px', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { ...baseStyles, top: '16px', right: '16px' };
      case 'bottom-left':
        return { ...baseStyles, bottom: '16px', left: '16px' };
      case 'bottom-center':
        return { ...baseStyles, bottom: '16px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { ...baseStyles, bottom: '16px', right: '16px' };
      default:
        return { ...baseStyles, bottom: '16px', left: '50%', transform: 'translateX(-50%)' };
    }
  };

  const renderSection = (sectionId: string) => {
    if (!isSectionVisible(sectionId)) {
      return null;
    }

    if (sectionId.startsWith('custom-')) {
      const customSectionId = sectionId.replace('custom-', '');
      const customSection = resumeData.customSections.find(cs => cs.id === customSectionId);
      
      if (!customSection) return null;

      return (
        <CustomSectionRenderer
          key={sectionId}
          section={customSection}
          customization={customization}
        />
      );
    }

    switch (sectionId) {
      case 'personal':
        return null; // Personal info is handled in header
      
      case 'experience':
        const visibleExperience = resumeData.experience.filter(exp => exp.visible !== false);
        return (
          <ExperienceSection
            key={sectionId}
            experience={visibleExperience}
            customization={customization}
          />
        );

      case 'education':
        const visibleEducation = resumeData.education.filter(ed => ed.visible !== false);
        return (
          <EducationSection
            key={sectionId}
            education={visibleEducation}
            customization={customization}
          />
        );

      case 'skills':
        return (
          <SkillsSection
            key={sectionId}
            skills={resumeData.skills}
            customization={customization}
          />
        );

      default:
        return null;
    }
  };

  // Check if we have any content to display
  const hasPersonalInfo = resumeData.personalInfo.firstName || resumeData.personalInfo.lastName || 
                         resumeData.personalInfo.jobTitle || resumeData.personalInfo.email;
  const hasExperience = resumeData.experience.some(exp => exp.visible !== false && (exp.company || exp.position));
  const hasEducation = resumeData.education.some(ed => ed.visible !== false && (ed.institution || ed.degree));
  const hasSkills = resumeData.skills.length > 0;
  const hasCustomSections = resumeData.customSections.length > 0;
  const hasAnyContent = hasPersonalInfo || hasExperience || hasEducation || hasSkills || hasCustomSections;

  if (pages.length > 0) {
    return (
      <>
        {pages.map((page, index) => (
          <div key={index} className="relative mb-8">
            {page}
          </div>
        ))}
      </>
    );
  }

  // If no content, show a helpful template preview
  if (!hasAnyContent) {
    return (
      <div className="relative mb-8">
        <div className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden" style={getCustomStyles()}>
          {/* Header Section */}
          <div style={{ 
            textAlign: customization.layout.headerAlignment, 
            marginBottom: `${customization.spacing.section}px`,
            borderBottom: customization.borders.headerBorder 
              ? `${customization.borders.headerBorderWidth}px solid ${customization.colors.primary}20`
              : 'none',
            paddingBottom: customization.borders.headerBorder ? `${customization.spacing.line}px` : '0'
          }}>
            <h1 style={{ 
              fontSize: `${customization.fontSize.name}px`, 
              fontWeight: customization.fontWeight.name,
              color: customization.colors.primary, 
              marginBottom: `${customization.spacing.line}px` 
            }}>
              Your Name Here
            </h1>
            <h2 style={{
              fontSize: `${customization.fontSize.heading}px`,
              fontWeight: customization.fontWeight.heading,
              color: customization.colors.secondary,
              marginBottom: `${customization.spacing.section}px`
            }}>
              Your Professional Title
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: customization.layout.headerAlignment === 'center' ? 'center' : 'flex-start',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: `${customization.spacing.line}px`,
              fontSize: `${customization.fontSize.body}px`,
              color: customization.colors.text,
              marginBottom: `${customization.spacing.section}px`
            }}>
              <span>📧 your.email@example.com</span>
              <span>📞 (555) 123-4567</span>
              <span>📍 Your City, State</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div style={{ marginBottom: `${customization.spacing.section}px` }}>
            <h2 style={{
              fontSize: `${customization.fontSize.heading}px`,
              fontWeight: customization.fontWeight.heading,
              color: customization.colors.primary,
              marginBottom: `${customization.spacing.item}px`,
              borderBottom: customization.borders.sectionBorder 
                ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.primary}`
                : 'none',
              paddingBottom: customization.borders.sectionBorder ? `${customization.spacing.line / 2}px` : '0'
            }}>
              Professional Summary
            </h2>
            <p style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: customization.lineHeight.body,
              color: customization.colors.text,
              textAlign: 'justify'
            }}>
              A brief, compelling summary of your professional background, key skills, and career objectives. This section should highlight your most relevant qualifications and what you bring to potential employers.
            </p>
          </div>

          {/* Work Experience */}
          <div style={{ marginBottom: `${customization.spacing.section}px` }}>
            <h2 style={{
              fontSize: `${customization.fontSize.heading}px`,
              fontWeight: customization.fontWeight.heading,
              color: customization.colors.primary,
              marginBottom: `${customization.spacing.item}px`,
              borderBottom: customization.borders.sectionBorder 
                ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.primary}`
                : 'none',
              paddingBottom: customization.borders.sectionBorder ? `${customization.spacing.line / 2}px` : '0'
            }}>
              Work Experience
            </h2>
            <div style={{ marginBottom: `${customization.spacing.item}px` }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: `${customization.spacing.line / 2}px`,
                flexWrap: 'wrap'
              }}>
                <div>
                  <h3 style={{
                    fontSize: `${customization.fontSize.body + 2}px`,
                    fontWeight: customization.fontWeight.heading,
                    color: customization.colors.text,
                    marginBottom: `${customization.spacing.line / 4}px`
                  }}>
                    Company Name
                  </h3>
                  <h4 style={{
                    fontSize: `${customization.fontSize.body}px`,
                    fontWeight: 'normal',
                    color: customization.colors.secondary,
                    marginBottom: 0
                  }}>
                    Your Job Title
                  </h4>
                </div>
                <div style={{
                  textAlign: 'right',
                  fontSize: `${customization.fontSize.small}px`,
                  color: customization.colors.textLight,
                  whiteSpace: 'nowrap'
                }}>
                  Start Date – End Date
                </div>
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                listStyleType: customization.bulletStyle === 'disc' ? 'disc' : 'none'
              }}>
                <li style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 2}px`
                }}>
                  Key achievement or responsibility with quantifiable results
                </li>
                <li style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 2}px`
                }}>
                  Another important accomplishment demonstrating your skills
                </li>
                <li style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 2}px`
                }}>
                  Third bullet point highlighting your impact and contributions
                </li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: `${customization.spacing.section}px` }}>
            <h2 style={{
              fontSize: `${customization.fontSize.heading}px`,
              fontWeight: customization.fontWeight.heading,
              color: customization.colors.primary,
              marginBottom: `${customization.spacing.item}px`,
              borderBottom: customization.borders.sectionBorder 
                ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.primary}`
                : 'none',
              paddingBottom: customization.borders.sectionBorder ? `${customization.spacing.line / 2}px` : '0'
            }}>
              Education
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: `${customization.spacing.line / 2}px`,
              flexWrap: 'wrap'
            }}>
              <div>
                <h3 style={{
                  fontSize: `${customization.fontSize.body + 2}px`,
                  fontWeight: customization.fontWeight.heading,
                  color: customization.colors.text,
                  marginBottom: `${customization.spacing.line / 4}px`
                }}>
                  University Name
                </h3>
                <h4 style={{
                  fontSize: `${customization.fontSize.body}px`,
                  fontWeight: 'normal',
                  color: customization.colors.secondary
                }}>
                  Degree in Your Field of Study
                </h4>
              </div>
              <div style={{
                textAlign: 'right',
                fontSize: `${customization.fontSize.small}px`,
                color: customization.colors.textLight,
                whiteSpace: 'nowrap'
              }}>
                Graduation Date
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: `${customization.spacing.section}px` }}>
            <h2 style={{
              fontSize: `${customization.fontSize.heading}px`,
              fontWeight: customization.fontWeight.heading,
              color: customization.colors.primary,
              marginBottom: `${customization.spacing.item}px`,
              borderBottom: customization.borders.sectionBorder 
                ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.primary}`
                : 'none',
              paddingBottom: customization.borders.sectionBorder ? `${customization.spacing.line / 2}px` : '0'
            }}>
              Skills & Expertise
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: `${customization.spacing.line}px`
            }}>
              {['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'].map((skill, index) => (
                <span key={index} style={{
                  fontSize: `${customization.fontSize.body}px`,
                  color: customization.colors.text,
                  padding: `${customization.spacing.line / 2}px ${customization.spacing.line}px`,
                  backgroundColor: `${customization.colors.primary}15`,
                  borderRadius: `${customization.roundedCorners}px`,
                  border: `1px solid ${customization.colors.primary}30`
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Helpful Instructions */}
          <div style={{ 
            marginTop: `${customization.spacing.section}px`,
            padding: `${customization.spacing.item}px`,
            backgroundColor: `${customization.colors.primary}05`,
            borderRadius: `${customization.roundedCorners}px`,
            border: `1px dashed ${customization.colors.primary}30`
          }}>
            <div style={{ 
              fontSize: `${customization.fontSize.small}px`, 
              color: customization.colors.textLight, 
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              This is a preview of your resume template. Start filling in your information using the forms on the left to replace this placeholder content with your actual details!
            </div>
          </div>

          {customization.layout.showPageNumbers && (
            <div style={getPageNumberStyles()}>
              Page 1
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-8">
      <div className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden" style={getCustomStyles()}>
        <PersonalInfoSection
          personalInfo={resumeData.personalInfo}
          customization={customization}
        />
        
        {/* Template-specific layout */}
        {template && template.layout === 'two-column' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: `${customization.spacing.section}px` }}>
            {/* Left Column - Skills and other info */}
            <div>
              {isSectionVisible('skills') && renderSection('skills')}
            </div>
            
            {/* Right Column - Experience and Education */}
            <div>
              {getOrderedSections()
                .filter(section => section.visible && section.id !== 'skills' && section.id !== 'personal')
                .map(section => renderSection(section.id))}
            </div>
          </div>
        ) : (
          /* Single Column Layout */
          <>
            {getOrderedSections()
              .filter(section => section.visible && section.id !== 'personal')
              .map(section => renderSection(section.id))}
          </>
        )}

        {customization.layout.showPageNumbers && (
          <div style={getPageNumberStyles()}>
            Page 1
          </div>
        )}
      </div>
    </div>
  );
};