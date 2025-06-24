import { ResumeData } from '../types/resume';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    jobTitle: 'Senior Software Engineer',
    dateOfBirth: '',
    nationality: '',
    gender: '',
    maritalStatus: '',
    summary: 'Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about creating efficient, user-focused solutions that drive business growth.'
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: [
        'Lead development of microservices architecture serving 10M+ users',
        'Reduced system latency by 40% through performance optimization',
        'Mentor junior developers and conduct technical interviews'
      ]
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description: [
        'Built responsive web applications using React and Node.js',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Collaborated with design team to improve user experience'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Stanford, CA',
      startDate: '2016-09',
      endDate: '2020-06',
      gpa: '3.8'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Expert' },
    { id: '2', name: 'React', level: 'Expert' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'Python', level: 'Advanced' },
    { id: '5', name: 'AWS', level: 'Intermediate' },
    { id: '6', name: 'Docker', level: 'Intermediate' }
  ],
  customSections: []
};