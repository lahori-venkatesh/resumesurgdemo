export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  jobTitle?: string;
  dateOfBirth?: string;
  nationality?: string;
  gender?: string;
  maritalStatus?: string;
  passportOrId?: string;
  militaryService?: string;
  drivingLicense?: string;
  visa?: string;
  summary: string;
  customLinks?: CustomLink[];
}

export interface CustomLink {
  id: string;
  label: string;
  url: string;
  platform?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  customFields?: { [key: string]: string };
  visible?: boolean; // Add visibility control for individual experiences
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  customFields?: { [key: string]: string };
  visible?: boolean; // Add visibility control for individual education items
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'text' | 'list' | 'achievements' | 'projects';
  content: any;
  description?: string;
  customFields?: { [key: string]: string };
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  customSections: CustomSection[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  preview: string;
  type: 'tech' | 'professional' | 'creative' | 'executive' | 'academic' | 'healthcare' | 'minimal' | 'startup';
  country: 'US' | 'UK' | 'DE' | 'FR' | 'JP' | 'IN' | 'AU' | 'CA' | 'SG' | 'AE' | 'BR' | 'ZA' | 'SE' | 'EU' | 'INTL';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
  features: string[];
  layout: 'single-column' | 'two-column' | 'minimal' | 'german-standard' | 'japanese-standard' | 'europass';
  style: 'modern' | 'traditional' | 'creative' | 'professional' | 'scholarly' | 'clinical' | 'elegant' | 'academic' | 'classic';
  tier: 'free' | 'premium';
  atsScore: number;
  category: string;
}

export interface SectionOrder {
  id: string;
  title: string;
  component: string;
  visible: boolean;
  icon?: React.ElementType;
  customSectionId?: string;
}

export interface ResumeCustomization {
  fontFamily: string;
  fontSize: {
    name: number;
    heading: number;
    body: number;
    small: number;
  };
  fontWeight: {
    name: number;
    heading: number;
    body: number;
  };
  lineHeight: {
    heading: number;
    body: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    background: string;
    border: string;
  };
  spacing: {
    page: number;
    section: number;
    item: number;
    line: number;
  };
  layout: {
    pageWidth: number;
    pageHeight: number;
    columns: number;
    headerAlignment: 'left' | 'center' | 'right';
    sectionSpacing: number;
    pageFormat: 'A4' | 'Letter' | 'Legal' | 'Custom';
    orientation: 'portrait' | 'landscape';
    maxPages: number;
    pageBreakBehavior: 'auto' | 'manual' | 'avoid';
    showPageNumbers: boolean;
    pageNumberPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    headerOnAllPages: boolean;
    footerText: string;
  };
  borders: {
    sectionBorder: boolean;
    sectionBorderWidth: number;
    sectionBorderStyle: 'solid' | 'dashed' | 'dotted';
    headerBorder: boolean;
    headerBorderWidth: number;
    pageBorder: boolean;
    pageBorderWidth: number;
    pageBorderColor: string;
  };
  shadows: boolean;
  roundedCorners: number;
  bulletStyle: 'disc' | 'circle' | 'square' | 'dash' | 'arrow';
}

export interface CountryFormat {
  dateFormat: string;
  phoneFormat: string;
  addressFormat: string;
  photoRequired: boolean;
  personalDetailsLevel: 'minimal' | 'moderate' | 'detailed' | 'comprehensive';
  preferredLength: string;
  commonSections: string[];
}