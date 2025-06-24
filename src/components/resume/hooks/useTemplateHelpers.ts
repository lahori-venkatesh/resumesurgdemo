import { ResumeData, SectionOrder } from '../../../types/resume';

interface UseTemplateHelpersProps {
  resumeData: ResumeData;
  sectionOrder: SectionOrder[];
}

export const useTemplateHelpers = ({ resumeData, sectionOrder }: UseTemplateHelpersProps) => {
  const getOrderedSections = () => {
    return sectionOrder.filter(section => section.visible);
  };

  const isSectionVisible = (sectionId: string) => {
    const section = sectionOrder.find(s => s.id === sectionId);
    return section ? section.visible : false;
  };

  const getVisibleExperience = () => {
    return resumeData.experience.filter(exp => exp.visible !== false);
  };

  const getVisibleEducation = () => {
    return resumeData.education.filter(ed => ed.visible !== false);
  };

  return {
    getOrderedSections,
    isSectionVisible,
    getVisibleExperience,
    getVisibleEducation
  };
};