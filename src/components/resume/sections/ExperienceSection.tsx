import React from 'react';
import { Experience, ResumeCustomization } from '../../../types/resume';

interface ExperienceSectionProps {
  experience: Experience[];
  customization: ResumeCustomization;
  template?: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  customization,
  template
}) => {
  const isHarvardTemplate = template === 'harvard-classic';

  // Don't render if no experience data
  if (!experience || experience.length === 0) {
    return null;
  }

  // Filter out experiences with no meaningful data
  const validExperience = experience.filter(exp => 
    exp.company || exp.position || (exp.description && exp.description.some(desc => desc.trim()))
  );

  // Don't render if no valid experience
  if (validExperience.length === 0) {
    return null;
  }

  const getSectionTitleStyles = () => {
    if (isHarvardTemplate) {
      return {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#000000',
        borderBottom: '2px solid #000000',
        marginBottom: '12px',
        paddingBottom: '4px'
      };
    }

    return {
      fontSize: `${customization.fontSize.heading}px`,
      fontWeight: customization.fontWeight.heading,
      color: customization.colors.primary,
      marginBottom: `${customization.spacing.item}px`,
      borderBottom: customization.borders.sectionBorder 
        ? `${customization.borders.sectionBorderWidth}px ${customization.borders.sectionBorderStyle} ${customization.colors.primary}`
        : 'none',
      paddingBottom: customization.borders.sectionBorder ? `${customization.spacing.line / 2}px` : '0'
    };
  };

  const getItemSpacing = () => ({
    marginBottom: `${customization.spacing.item}px`
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div style={{ marginBottom: `${customization.spacing.section}px` }}>
      <h2 style={getSectionTitleStyles()}>
        {isHarvardTemplate ? 'PROFESSIONAL EXPERIENCE' : 'Work Experience'}
      </h2>
      
      {validExperience.map((exp) => (
        <div key={exp.id} style={getItemSpacing()}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isHarvardTemplate ? 'flex-start' : 'center',
            marginBottom: `${customization.spacing.line / 2}px`,
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1 }}>
              {exp.company && (
                <h3 style={{
                  fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.body + 2}px`,
                  fontWeight: isHarvardTemplate ? 'bold' : customization.fontWeight.heading,
                  color: isHarvardTemplate ? '#000000' : customization.colors.text,
                  marginBottom: isHarvardTemplate ? '2px' : `${customization.spacing.line / 4}px`
                }}>
                  {isHarvardTemplate ? exp.company.toUpperCase() : exp.company}
                </h3>
              )}
              {exp.position && (
                <h4 style={{
                  fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.body}px`,
                  fontWeight: 'normal',
                  fontStyle: isHarvardTemplate ? 'italic' : 'normal',
                  color: isHarvardTemplate ? '#000000' : customization.colors.secondary,
                  marginBottom: isHarvardTemplate ? '2px' : 0
                }}>
                  {exp.position}
                </h4>
              )}
              {exp.location && !isHarvardTemplate && (
                <p style={{
                  fontSize: `${customization.fontSize.small}px`,
                  color: customization.colors.textLight,
                  margin: 0
                }}>
                  {exp.location}
                </p>
              )}
            </div>
            {(exp.startDate || exp.endDate || exp.current) && (
              <div style={{
                textAlign: 'right',
                fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.small}px`,
                color: isHarvardTemplate ? '#000000' : customization.colors.textLight,
                whiteSpace: 'nowrap'
              }}>
                {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                {isHarvardTemplate && exp.location && (
                  <div style={{ marginTop: '2px' }}>| {exp.location}</div>
                )}
              </div>
            )}
          </div>

          {exp.description && exp.description.length > 0 && exp.description.some(desc => desc.trim()) && (
            <ul style={{
              margin: 0,
              paddingLeft: isHarvardTemplate ? '16px' : '20px',
              listStyleType: customization.bulletStyle === 'disc' ? 'disc' : 'none'
            }}>
              {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                <li key={index} style={{
                  fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.body}px`,
                  lineHeight: customization.lineHeight.body,
                  color: isHarvardTemplate ? '#000000' : customization.colors.text,
                  marginBottom: `${customization.spacing.line / 2}px`
                }}>
                  {desc}
                </li>
              ))}
            </ul>
          )}

          {/* Custom Fields for Experience */}
          {exp.customFields && Object.keys(exp.customFields).length > 0 && (
            <div style={{ marginTop: `${customization.spacing.line}px` }}>
              {Object.entries(exp.customFields).filter(([key, value]) => value.trim()).map(([key, value]) => (
                <div key={key} style={{
                  fontSize: `${customization.fontSize.small}px`,
                  color: customization.colors.textLight,
                  marginBottom: `${customization.spacing.line / 4}px`
                }}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};