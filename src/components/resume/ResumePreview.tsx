import React, { useRef, useEffect, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, X } from 'lucide-react';
import { ResumeData, SectionOrder, ResumeCustomization } from '../../types/resume';
import { resumeTemplates } from '../../data/templates';
import { ZoomControls } from './ZoomControls';
import { HarvardClassicTemplate } from './templates/HarvardClassicTemplate';
import { DefaultTemplate } from './templates/DefaultTemplate';
import { useResumePreview } from './hooks/useResumePreview';

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  customization: ResumeCustomization;
  sectionOrder: SectionOrder[];
  showZoomControls?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  selectedTemplate,
  customization,
  sectionOrder,
  showZoomControls = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const {
    currentZoom,
    pages,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleFullscreen: handleToggleFullscreen
  } = useResumePreview({
    resumeData,
    selectedTemplate,
    customization,
    sectionOrder,
    containerRef
  });

  const template = resumeTemplates.find(t => t.id === selectedTemplate);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    handleToggleFullscreen();
  };

  return (
    <div className="relative">
      {/* Zoom Controls */}
      {showZoomControls && (
        <ZoomControls
          currentZoom={currentZoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetZoom={resetZoom}
          onToggleFullscreen={toggleFullscreen}
        />
      )}

      {/* Resume Content Container */}
      <div 
        ref={containerRef}
        className={`transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-gray-100 overflow-auto p-8' 
            : 'relative'
        }`}
        style={{
          transform: `scale(${currentZoom})`,
          transformOrigin: 'top center'
        }}
      >
        <div id="resume-preview">
          {/* Harvard Classic Template */}
          {selectedTemplate === 'harvard-classic' ? (
            <HarvardClassicTemplate
              resumeData={resumeData}
              customization={customization}
              sectionOrder={sectionOrder}
            />
          ) : (
            /* Other Templates */
            <DefaultTemplate
              resumeData={resumeData}
              customization={customization}
              sectionOrder={sectionOrder}
              template={template}
              pages={pages}
            />
          )}
        </div>
      </div>

      {/* Fullscreen Close Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-60 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default ResumePreview;