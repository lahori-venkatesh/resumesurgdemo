import React from 'react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../../types/resume';
import { PersonalInfoSection } from '../sections/PersonalInfoSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { SkillsSection } from '../sections/SkillsSection';
import { CustomSectionRenderer } from '../sections/CustomSectionRenderer';
import { useTemplateHelpers } from '../hooks/useTemplateHelpers';

interface HarvardClassicTemplateProps {
  resumeData: ResumeData;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
}

export const HarvardClassicTemplate: React.FC<HarvardClassicTemplateProps> = ({
  resumeData,
  customization,
  sectionOrder
}) => {
  const { getOrderedSections, isSectionVisible, getVisibleExperience, getVisibleEducation } = useTemplateHelpers({
    resumeData,
    sectionOrder
  });

  const { personalInfo } = resumeData;
  const visibleExperience = getVisibleExperience();
  const visibleEducation = getVisibleEducation();
  const orderedSections = getOrderedSections();

  const templateStyles = {
    width: '794px',
    minHeight: '1123px',
    padding: '32px',
    backgroundColor: 'white',
    fontFamily: 'Times, serif',
    fontSize: '12px',
    lineHeight: '1.4',
    color: '#000000'
  };

  // Check if we have any content to display
  const hasPersonalInfo = personalInfo.firstName || personalInfo.lastName || personalInfo.jobTitle || 
                         personalInfo.email || personalInfo.phone || personalInfo.location;
  const hasAnyContent = hasPersonalInfo || visibleExperience.length > 0 || visibleEducation.length > 0 || 
                       resumeData.skills.length > 0 || resumeData.customSections.length > 0;

  // If no content, show a helpful template preview
  if (!hasAnyContent) {
    return (
      <div className="relative mb-8">
        <div className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden" style={templateStyles}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#000000', 
              marginBottom: '8px' 
            }}>
              Your Name Here
            </h1>
            <div style={{ 
              fontSize: '12px', 
              color: '#333333', 
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <span>📍 Your Location</span>
              <span>✉ your.email@example.com</span>
              <span>📞 (555) 123-4567</span>
            </div>
          </div>
          
          {/* Education Section */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000000',
              borderBottom: '2px solid #000000',
              marginBottom: '12px',
              paddingBottom: '4px'
            }}>
              EDUCATION
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '4px'
              }}>
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Your University Name</span>
                <span style={{ fontSize: '12px' }}>Month Year</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '12px', marginBottom: '4px' }}>
                Bachelor of Science in Your Field
              </div>
              <div style={{ fontSize: '12px', color: '#333333' }}>
                • Relevant coursework, achievements, or honors
              </div>
            </div>
          </div>
          
          {/* Professional Experience Section */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000000',
              borderBottom: '2px solid #000000',
              marginBottom: '12px',
              paddingBottom: '4px'
            }}>
              PROFESSIONAL EXPERIENCE
            </h2>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '4px'
              }}>
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>COMPANY NAME</span>
                <span style={{ fontSize: '12px' }}>Start Date – End Date | City, State</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '12px', marginBottom: '8px' }}>
                Your Job Title
              </div>
              <div style={{ fontSize: '12px', paddingLeft: '16px' }}>
                <div style={{ marginBottom: '4px' }}>• Key achievement or responsibility with quantifiable results</div>
                <div style={{ marginBottom: '4px' }}>• Another important accomplishment that demonstrates your skills</div>
                <div style={{ marginBottom: '4px' }}>• Third bullet point highlighting your impact and contributions</div>
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000000',
              borderBottom: '2px solid #000000',
              marginBottom: '12px',
              paddingBottom: '4px'
            }}>
              TECHNICAL EXPERTISE
            </h2>
            <div style={{ fontSize: '12px', lineHeight: '1.5', color: '#000000' }}>
              Your Skills, Technologies, Programming Languages, Software, Certifications
            </div>
          </div>

          {/* Helpful Instructions */}
          <div style={{ 
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px dashed #dee2e6'
          }}>
            <div style={{ 
              fontSize: '11px', 
              color: '#6c757d', 
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              This is a preview of the Harvard Classic template. Start filling in your information using the forms on the left to see your resume come to life!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-8">
      <div className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden" style={templateStyles}>
        {/* Header - Only show if personal section is visible */}
        {isSectionVisible('personal') && (
          <PersonalInfoSection
            personalInfo={personalInfo}
            customization={customization}
            template="harvard-classic"
          />
        )}

        {/* Render sections in the order specified by sectionOrder */}
        {orderedSections.map((sectionConfig) => {
          const sectionId = sectionConfig.id;
          
          if (sectionId === 'personal') {
            return null; // Personal info is already rendered in header
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
                template="harvard-classic"
              />
            );
          }

          switch (sectionId) {
            case 'experience':
              return (
                <ExperienceSection
                  key={sectionId}
                  experience={visibleExperience}
                  customization={customization}
                  template="harvard-classic"
                />
              );

            case 'education':
              return (
                <EducationSection
                  key={sectionId}
                  education={visibleEducation}
                  customization={customization}
                  template="harvard-classic"
                />
              );

            case 'skills':
              return (
                <SkillsSection
                  key={sectionId}
                  skills={resumeData.skills}
                  customization={customization}
                  template="harvard-classic"
                />
              );

            default:
              return null;
          }
        })}

        {/* Summary Section - Only show if personal section is visible and summary exists */}
        {isSectionVisible('personal') && personalInfo.summary && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000000',
              borderBottom: '2px solid #000000',
              marginBottom: '12px',
              paddingBottom: '4px'
            }}>
              SUMMARY
            </h2>
            <p style={{
              fontSize: '12px',
              lineHeight: '1.5',
              color: '#000000',
              textAlign: 'justify'
            }}>
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};