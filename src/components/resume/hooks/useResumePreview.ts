import { useState, useEffect, useRef } from 'react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../../types/resume';

interface UseResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useResumePreview = ({
  resumeData,
  selectedTemplate,
  customization,
  sectionOrder,
  containerRef
}: UseResumePreviewProps) => {
  const [currentZoom, setCurrentZoom] = useState(1);
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  
  const zoomLevels = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
  const currentZoomIndex = zoomLevels.findIndex(level => Math.abs(level - currentZoom) < 0.01);

  // Zoom control functions
  const zoomIn = () => {
    if (currentZoomIndex < zoomLevels.length - 1) {
      setCurrentZoom(zoomLevels[currentZoomIndex + 1]);
    }
  };

  const zoomOut = () => {
    if (currentZoomIndex > 0) {
      setCurrentZoom(zoomLevels[currentZoomIndex - 1]);
    }
  };

  const resetZoom = () => {
    setCurrentZoom(1);
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault();
            zoomIn();
            break;
          case '-':
            e.preventDefault();
            zoomOut();
            break;
          case '0':
            e.preventDefault();
            resetZoom();
            break;
        }
      }
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [currentZoomIndex]);

  // Split content into pages based on height
  useEffect(() => {
    const splitIntoPages = () => {
      const pageHeight = customization.layout.pageHeight * 96; // Convert inches to pixels (96 DPI)
      const maxContentHeight = pageHeight - (customization.spacing.page * 2) - 100; // Account for padding and margins
      
      const orderedSections = sectionOrder.filter(section => section.visible);
      const newPages: React.ReactNode[] = [];
      let currentPageContent: string[] = [];
      let currentPageHeight = 0;

      // Add header to first page
      const headerHeight = 200; // Estimated header height
      currentPageHeight += headerHeight;

      orderedSections.forEach((sectionConfig) => {
        const section = sectionConfig.id;
        if (!section) return;

        const estimatedSectionHeight = 150; // Estimated section height
        
        if (currentPageHeight + estimatedSectionHeight > maxContentHeight && currentPageContent.length > 0) {
          // Start new page
          currentPageContent = [section];
          currentPageHeight = estimatedSectionHeight;
        } else {
          currentPageContent.push(section);
          currentPageHeight += estimatedSectionHeight;
        }
      });

      // Limit to max pages
      const limitedPages = newPages.slice(0, customization.layout.maxPages);
      setPages(limitedPages);
    };

    splitIntoPages();
  }, [resumeData, customization, sectionOrder]);

  return {
    currentZoom,
    pages,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleFullscreen
  };
};