import React from 'react';
import { Education, ResumeCustomization } from '../../../types/resume';

interface EducationSectionProps {
  education: Education[];
  customization: ResumeCustomization;
  template?: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  customization,
  template
}) => {
  const isHarvardTemplate = template === 'harvard-classic';

  // Don't render if no education data
  if (!education || education.length === 0) {
    return null;
  }

  // Filter out education entries with no meaningful data
  const validEducation = education.filter(ed => 
    ed.institution || ed.degree || ed.field
  );

  // Don't render if no valid education
  if (validEducation.length === 0) {
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
        {isHarvardTemplate ? 'EDUCATION' : 'Education'}
      </h2>
      
      {validEducation.map((ed) => (
        <div key={ed.id} style={getItemSpacing()}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isHarvardTemplate ? 'flex-start' : 'center',
            marginBottom: `${customization.spacing.line / 2}px`,
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1 }}>
              {ed.institution && (
                <h3 style={{
                  fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.body + 2}px`,
                  fontWeight: isHarvardTemplate ? 'bold' : customization.fontWeight.heading,
                  color: isHarvardTemplate ? '#000000' : customization.colors.text,
                  marginBottom: isHarvardTemplate ? '2px' : `${customization.spacing.line / 4}px`
                }}>
                  {ed.institution}
                </h3>
              )}
              {(ed.degree || ed.field) && (
                <h4 style={{
                  fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.body}px`,
                  fontWeight: 'normal',
                  fontStyle: isHarvardTemplate ? 'italic' : 'normal',
                  color: isHarvardTemplate ? '#000000' : customization.colors.secondary,
                  marginBottom: isHarvardTemplate ? '2px' : 0
                }}>
                  {ed.degree} {ed.field && `in ${ed.field}`}
                </h4>
              )}
              {ed.location && !isHarvardTemplate && (
                <p style={{
                  fontSize: `${customization.fontSize.small}px`,
                  color: customization.colors.textLight,
                  margin: 0
                }}>
                  {ed.location}
                </p>
              )}
            </div>
            {ed.endDate && (
              <div style={{
                textAlign: 'right',
                fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.small}px`,
                color: isHarvardTemplate ? '#000000' : customization.colors.textLight,
                whiteSpace: 'nowrap'
              }}>
                {formatDate(ed.endDate)}
                {isHarvardTemplate && ed.location && (
                  <div style={{ marginTop: '2px' }}>| {ed.location}</div>
                )}
              </div>
            )}
          </div>

          {ed.gpa && (
            <p style={{
              fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.small}px`,
              color: isHarvardTemplate ? '#000000' : customization.colors.textLight,
              margin: `${customization.spacing.line / 4}px 0`
            }}>
              GPA: {ed.gpa}
            </p>
          )}

          {/* Custom Fields for Education */}
          {ed.customFields && Object.keys(ed.customFields).length > 0 && (
            <div style={{ marginTop: `${customization.spacing.line}px` }}>
              {Object.entries(ed.customFields).filter(([key, value]) => value.trim()).map(([key, value]) => (
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