import React from 'react';
import { CustomSection, ResumeCustomization } from '../../../types/resume';

interface CustomSectionRendererProps {
  section: CustomSection;
  customization: ResumeCustomization;
  template?: string;
}

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({
  section,
  customization,
  template
}) => {
  const isHarvardTemplate = template === 'harvard-classic';

  // Don't render if no section title or content
  if (!section.title || (!section.content && !section.description)) {
    return null;
  }

  // Check if content has meaningful data
  const hasContent = () => {
    if (section.type === 'text') {
      return section.content && section.content.trim();
    }
    if (section.type === 'list' || section.type === 'achievements') {
      return Array.isArray(section.content) && section.content.some(item => item && item.trim());
    }
    return false;
  };

  // Don't render if no meaningful content and no description
  if (!hasContent() && (!section.description || !section.description.trim())) {
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

  const renderFormattedText = (text: string) => {
    if (!text) return text;
    // Process links: [text](url) -> <a href="url">text</a>
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>');
    // Process bold: [[bold]]text[[/bold]] -> <b>text</b>
    text = text.replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, '<b>$1</b>');
    return text;
  };

  const renderContent = () => {
    switch (section.type) {
      case 'text':
        if (!section.content || !section.content.trim()) return null;
        return (
          <div style={{
            fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.body}px`,
            lineHeight: customization.lineHeight.body,
            color: isHarvardTemplate ? '#000000' : customization.colors.text,
            whiteSpace: 'pre-wrap'
          }} dangerouslySetInnerHTML={{ __html: renderFormattedText(section.content || '') }} />
        );

      case 'list':
      case 'achievements':
        const items = Array.isArray(section.content) ? section.content.filter(item => item && item.trim()) : [];
        if (items.length === 0) return null;
        
        return (
          <ul style={{
            margin: 0,
            paddingLeft: isHarvardTemplate ? '16px' : '20px',
            listStyleType: customization.bulletStyle === 'disc' ? 'disc' : 'none'
          }}>
            {items.map((item: string, index: number) => (
              <li key={index} style={{
                fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.body}px`,
                lineHeight: customization.lineHeight.body,
                color: isHarvardTemplate ? '#000000' : customization.colors.text,
                marginBottom: `${customization.spacing.line / 2}px`
              }} dangerouslySetInnerHTML={{ __html: renderFormattedText(item) }} />
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  const content = renderContent();
  const hasDescription = section.description && section.description.trim();

  // Don't render if no content and no description
  if (!content && !hasDescription) {
    return null;
  }

  return (
    <div style={{ marginBottom: `${customization.spacing.section}px` }}>
      <h2 style={getSectionTitleStyles()}>
        {isHarvardTemplate ? section.title.toUpperCase() : section.title}
      </h2>
      
      {content}

      {hasDescription && (
        <div style={{
          fontSize: isHarvardTemplate ? '12px' : `${customization.fontSize.body}px`,
          lineHeight: customization.lineHeight.body,
          color: isHarvardTemplate ? '#000000' : customization.colors.text,
          marginTop: content ? `${customization.spacing.line}px` : '0',
          whiteSpace: 'pre-wrap'
        }} dangerouslySetInnerHTML={{ __html: renderFormattedText(section.description) }} />
      )}

      {/* Custom Fields - only show if they have values */}
      {section.customFields && Object.keys(section.customFields).length > 0 && (
        <div style={getItemSpacing()}>
          {Object.entries(section.customFields).filter(([key, value]) => value && value.trim()).map(([key, value]) => (
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
  );
};