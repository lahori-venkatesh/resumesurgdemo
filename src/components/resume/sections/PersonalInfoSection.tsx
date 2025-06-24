import React from 'react';
import { PersonalInfo, ResumeCustomization } from '../../../types/resume';
import { getLinkIcon } from '../utils/iconHelpers';

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  customization: ResumeCustomization;
  template?: string;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personalInfo,
  customization,
  template
}) => {
  const isHarvardTemplate = template === 'harvard-classic';
  
  // Check if we have any contact information to display
  const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.location || 
                        personalInfo.website || personalInfo.linkedin || personalInfo.github ||
                        (personalInfo.customLinks && personalInfo.customLinks.length > 0);
  
  // Check if we have additional personal information
  const hasAdditionalInfo = personalInfo.dateOfBirth || personalInfo.nationality || 
                           personalInfo.passportOrId || personalInfo.maritalStatus || 
                           personalInfo.militaryService || personalInfo.drivingLicense || 
                           personalInfo.gender || personalInfo.visa;
  
  const getNameStyles = () => {
    if (isHarvardTemplate) {
      return {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: '8px',
        textAlign: 'center' as const,
        border: 'none',
        textDecoration: 'none'
      };
    }

    return {
      fontSize: `${customization.fontSize.name}px`,
      fontWeight: customization.fontWeight.name,
      color: customization.colors.primary,
      marginBottom: `${customization.spacing.line}px`,
      textAlign: customization.layout.headerAlignment as const,
      border: 'none',
      textDecoration: 'none'
    };
  };

  const getJobTitleStyles = () => {
    if (isHarvardTemplate) {
      return {
        fontSize: '16px',
        fontWeight: 'normal',
        color: '#333333',
        marginBottom: '16px',
        textAlign: 'center' as const,
        border: 'none',
        textDecoration: 'none'
      };
    }

    return {
      fontSize: `${customization.fontSize.heading}px`,
      fontWeight: customization.fontWeight.heading,
      color: customization.colors.secondary,
      marginBottom: `${customization.spacing.section}px`,
      textAlign: customization.layout.headerAlignment as const,
      border: 'none',
      textDecoration: 'none'
    };
  };

  const getContactStyles = () => {
    if (isHarvardTemplate) {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '16px',
        fontSize: '12px',
        color: '#333333',
        marginBottom: '24px',
        border: 'none',
        textDecoration: 'none'
      };
    }

    return {
      display: 'flex',
      justifyContent: customization.layout.headerAlignment === 'center' ? 'center' : 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      gap: `${customization.spacing.line}px`,
      fontSize: `${customization.fontSize.body}px`,
      color: customization.colors.text,
      marginBottom: `${customization.spacing.section}px`,
      border: 'none',
      textDecoration: 'none'
    };
  };

  const getAdditionalInfoStyles = () => {
    if (isHarvardTemplate) {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '8px',
        fontSize: '11px',
        color: '#555555',
        marginBottom: '16px',
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        border: '1px solid #e9ecef'
      };
    }

    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: `${customization.spacing.line}px`,
      fontSize: `${customization.fontSize.small}px`,
      color: customization.colors.textLight,
      marginBottom: `${customization.spacing.section}px`,
      padding: `${customization.spacing.item}px`,
      backgroundColor: `${customization.colors.primary}05`,
      borderRadius: `${customization.roundedCorners}px`,
      border: `1px solid ${customization.colors.primary}20`
    };
  };

  const getContactItemStyles = () => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    textDecoration: 'none',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer'
  });

  const iconSize = isHarvardTemplate ? '14px' : '16px';
  const iconColor = isHarvardTemplate ? '#333333' : customization.colors.primary;

  // Professional Email Icon (filled envelope)
  const EmailIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={iconColor} style={{ border: 'none' }}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );

  // Professional Phone Icon (filled phone)
  const PhoneIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={iconColor} style={{ border: 'none' }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );

  // Professional Location Icon (filled map pin)
  const LocationIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={iconColor} style={{ border: 'none' }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );

  // Professional Website Icon (filled globe)
  const WebsiteIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={iconColor} style={{ border: 'none' }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  );

  // Professional LinkedIn Icon (filled)
  const LinkedInIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={iconColor} style={{ border: 'none' }}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  // Professional GitHub Icon (filled)
  const GitHubIcon = () => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={iconColor} style={{ border: 'none' }}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const handleLinkClick = (url: string) => {
    if (!url) return;
    
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      fullUrl = `https://${url}`;
    }
    
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateStr; // Return original if parsing fails
    }
  };

  // Don't render anything if no personal info exists
  if (!personalInfo.firstName && !personalInfo.lastName && !personalInfo.jobTitle && !hasContactInfo && !personalInfo.summary && !hasAdditionalInfo) {
    return null;
  }

  return (
    <div style={{
      marginBottom: `${customization.spacing.section}px`,
      textAlign: customization.layout.headerAlignment,
      border: 'none',
      borderBottom: 'none',
      paddingBottom: (hasContactInfo || hasAdditionalInfo) ? `${customization.spacing.line}px` : '0'
    }}>
      {/* Name - only show if we have a name */}
      {(personalInfo.firstName || personalInfo.lastName) && (
        <h1 style={getNameStyles()}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
      )}

      {/* Job Title - only show if exists */}
      {personalInfo.jobTitle && (
        <h2 style={getJobTitleStyles()}>
          {personalInfo.jobTitle}
        </h2>
      )}

      {/* Contact Information - only show if we have contact info */}
      {hasContactInfo && (
        <div style={getContactStyles()}>
          {personalInfo.email && (
            <div style={getContactItemStyles()} onClick={() => handleLinkClick(`mailto:${personalInfo.email}`)}>
              <EmailIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={getContactItemStyles()} onClick={() => handleLinkClick(`tel:${personalInfo.phone}`)}>
              <PhoneIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={getContactItemStyles()}>
              <LocationIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div style={getContactItemStyles()} onClick={() => handleLinkClick(personalInfo.website!)}>
              <WebsiteIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={getContactItemStyles()} onClick={() => handleLinkClick(personalInfo.linkedin!)}>
              <LinkedInIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{isHarvardTemplate ? 'LinkedIn' : personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div style={getContactItemStyles()} onClick={() => handleLinkClick(personalInfo.github!)}>
              <GitHubIcon />
              <span style={{ border: 'none', textDecoration: 'none' }}>{isHarvardTemplate ? 'GitHub' : personalInfo.github}</span>
            </div>
          )}
          {/* Custom Links */}
          {personalInfo.customLinks && personalInfo.customLinks.map((link) => {
            const Icon = getLinkIcon(link.url, link.label);
            return (
              <div key={link.id} style={getContactItemStyles()} onClick={() => handleLinkClick(link.url)}>
                <Icon style={{ width: iconSize, height: iconSize, fill: iconColor, color: iconColor, border: 'none' }} />
                <span style={{ border: 'none', textDecoration: 'none' }}>{link.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Additional Personal Information - only show if we have additional info */}
      {hasAdditionalInfo && (
        <div style={getAdditionalInfoStyles()}>
          {personalInfo.dateOfBirth && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Date of Birth:</strong>
              <span>{formatDate(personalInfo.dateOfBirth)}</span>
            </div>
          )}
          {personalInfo.nationality && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Nationality:</strong>
              <span>{personalInfo.nationality}</span>
            </div>
          )}
          {personalInfo.passportOrId && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Passport/ID:</strong>
              <span>{personalInfo.passportOrId}</span>
            </div>
          )}
          {personalInfo.maritalStatus && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Marital Status:</strong>
              <span>{personalInfo.maritalStatus}</span>
            </div>
          )}
          {personalInfo.militaryService && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Military Service:</strong>
              <span>{personalInfo.militaryService}</span>
            </div>
          )}
          {personalInfo.drivingLicense && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Driving License:</strong>
              <span>{personalInfo.drivingLicense}</span>
            </div>
          )}
          {personalInfo.gender && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Gender/Pronoun:</strong>
              <span>{personalInfo.gender}</span>
            </div>
          )}
          {personalInfo.visa && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>Visa Status:</strong>
              <span>{personalInfo.visa}</span>
            </div>
          )}
        </div>
      )}

      {/* Summary - only show if exists and not Harvard template */}
      {personalInfo.summary && !isHarvardTemplate && (
        <div style={{
          fontSize: `${customization.fontSize.body}px`,
          lineHeight: customization.lineHeight.body,
          color: customization.colors.text,
          textAlign: 'justify',
          marginTop: `${customization.spacing.line}px`,
          border: 'none',
          textDecoration: 'none'
        }}>
          {personalInfo.summary}
        </div>
      )}
    </div>
  );
};