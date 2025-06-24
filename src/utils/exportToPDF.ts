import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    // Show enhanced loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; align-items: center; justify-content: center; color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="text-align: center; padding: 40px; background: rgba(255,255,255,0.1); border-radius: 16px; backdrop-filter: blur(10px);">
          <div style="width: 60px; height: 60px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid #3B82F6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 24px;"></div>
          <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">Generating PDF...</div>
          <div style="font-size: 14px; opacity: 0.8;">Please wait while we create your resume PDF with exact preview formatting</div>
          <div style="margin-top: 16px; font-size: 12px; opacity: 0.6;">This may take a few moments for complex layouts</div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </div>
    `;
    document.body.appendChild(loadingDiv);

    // Create a temporary container for export with exact A4 dimensions
    const exportContainer = document.createElement('div');
    exportContainer.style.cssText = `
      position: absolute;
      top: -99999px;
      left: -99999px;
      width: 794px;
      height: auto;
      background: white;
      font-family: inherit;
      overflow: visible;
      z-index: -1;
      transform: none;
      scale: 1;
      zoom: 1;
    `;

    // Clone the element and prepare it for export
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Reset all transform and zoom styles on the cloned element
    clonedElement.style.cssText = `
      transform: none !important;
      transform-origin: top left !important;
      width: 794px !important;
      height: auto !important;
      overflow: visible !important;
      position: relative !important;
      scale: 1 !important;
      zoom: 1 !important;
      margin: 0 !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      background: white !important;
    `;

    // Fix all child elements to prevent scaling issues
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((el: any) => {
      if (el.style) {
        // Remove any transform scaling
        if (el.style.transform && el.style.transform.includes('scale')) {
          el.style.transform = el.style.transform.replace(/scale\([^)]*\)/g, '');
        }
        // Ensure proper font rendering
        if (el.style.fontSize) {
          const fontSize = parseFloat(el.style.fontSize);
          if (!isNaN(fontSize)) {
            el.style.fontSize = `${fontSize}px`;
          }
        }
        // Fix line heights
        if (el.style.lineHeight && !el.style.lineHeight.includes('px') && !el.style.lineHeight.includes('%')) {
          const lineHeight = parseFloat(el.style.lineHeight);
          if (!isNaN(lineHeight) && lineHeight > 0 && lineHeight < 10) {
            el.style.lineHeight = lineHeight.toString();
          }
        }
        // Ensure proper positioning
        el.style.zoom = '1';
        el.style.scale = '1';
      }
    });

    // Handle resume pages specifically
    const resumePages = clonedElement.querySelectorAll('.resume-page');
    if (resumePages.length > 0) {
      resumePages.forEach((page: any, index) => {
        page.style.cssText = `
          width: 794px !important;
          min-height: 1123px !important;
          max-height: none !important;
          margin: 0 !important;
          padding: 32px !important;
          background: white !important;
          box-sizing: border-box !important;
          page-break-after: ${index < resumePages.length - 1 ? 'always' : 'auto'} !important;
          transform: none !important;
          scale: 1 !important;
          zoom: 1 !important;
          overflow: visible !important;
          position: relative !important;
          display: block !important;
        `;
      });
    } else {
      // Single page handling
      clonedElement.style.width = '794px';
      clonedElement.style.minHeight = '1123px';
      clonedElement.style.padding = '32px';
      clonedElement.style.boxSizing = 'border-box';
    }

    exportContainer.appendChild(clonedElement);
    document.body.appendChild(exportContainer);

    // Wait for fonts and layout to settle
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Force layout recalculation
    exportContainer.offsetHeight;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let isFirstPage = true;

    if (resumePages.length > 0) {
      // Multi-page export
      for (let i = 0; i < resumePages.length; i++) {
        const pageElement = exportContainer.querySelectorAll('.resume-page')[i] as HTMLElement;
        
        // Ensure page is properly sized
        pageElement.style.width = '794px';
        pageElement.style.height = 'auto';
        pageElement.style.minHeight = '1123px';
        
        // Force layout
        pageElement.offsetHeight;
        
        const canvas = await html2canvas(pageElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: 794,
          height: Math.max(1123, pageElement.scrollHeight),
          windowWidth: 794,
          windowHeight: Math.max(1123, pageElement.scrollHeight),
          removeContainer: false,
          foreignObjectRendering: true,
          imageTimeout: 0,
          onclone: (clonedDoc) => {
            // Ensure all fonts are loaded in the clone
            const style = clonedDoc.createElement('style');
            style.textContent = `
              * { 
                transform: none !important; 
                scale: 1 !important; 
                zoom: 1 !important; 
              }
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
              @import url('https://fonts.googleapis.com/css2?family=Times:wght@400;700&display=swap');
            `;
            clonedDoc.head.appendChild(style);
          }
        });

        if (!isFirstPage) {
          pdf.addPage();
        }

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(
          canvas.toDataURL('image/png', 1.0),
          'PNG',
          0,
          0,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        
        isFirstPage = false;
      }
    } else {
      // Single page export
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: Math.max(1123, clonedElement.scrollHeight),
        windowWidth: 794,
        windowHeight: Math.max(1123, clonedElement.scrollHeight),
        removeContainer: false,
        foreignObjectRendering: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * { 
              transform: none !important; 
              scale: 1 !important; 
              zoom: 1 !important; 
            }
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Times:wght@400;700&display=swap');
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= pageHeight;

      // Add additional pages if content overflows
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/png', 1.0),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        heightLeft -= pageHeight;
      }
    }

    // Clean up
    document.body.removeChild(exportContainer);
    document.body.removeChild(loadingDiv);

    // Save the PDF
    pdf.save(filename);
    
    console.log('PDF exported successfully with exact preview layout');
    
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #10B981, #059669); color: white; padding: 16px 24px; border-radius: 12px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 400px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 24px; height: 24px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <div>
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 2px;">Resume Downloaded Successfully!</div>
            <div style="font-size: 12px; opacity: 0.9;">Your PDF has been saved with exact preview formatting</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(successDiv);
    setTimeout(() => {
      if (document.body.contains(successDiv)) {
        document.body.removeChild(successDiv);
      }
    }, 4000);
    
  } catch (error) {
    console.error('Error exporting PDF:', error);
    
    // Clean up loading indicator
    const loadingDiv = document.querySelector('[style*="position: fixed"][style*="z-index: 9999"]');
    if (loadingDiv) {
      document.body.removeChild(loadingDiv);
    }
    
    // Show error message
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #EF4444, #DC2626); color: white; padding: 16px 24px; border-radius: 12px; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3); z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 400px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 24px; height: 24px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 2px;">Export Failed</div>
            <div style="font-size: 12px; opacity: 0.9;">Please try again or contact support if the issue persists</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(errorDiv);
    setTimeout(() => {
      if (document.body.contains(errorDiv)) {
        document.body.removeChild(errorDiv);
      }
    }, 5000);
  }
};

// Enhanced export function with better quality control
export const exportToHighQualityPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Create a high-quality export container
    const exportContainer = document.createElement('div');
    exportContainer.style.cssText = `
      position: absolute;
      top: -99999px;
      left: -99999px;
      width: 2480px;
      height: auto;
      background: white;
      font-family: inherit;
      overflow: visible;
      z-index: -1;
      transform: scale(3.125);
      transform-origin: top left;
    `;

    // Clone and scale up for higher quality
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.cssText = `
      width: 2480px !important;
      height: auto !important;
      transform: none !important;
      scale: 1 !important;
      zoom: 1 !important;
      overflow: visible !important;
      position: relative !important;
    `;

    // Scale up all font sizes and dimensions
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((el: any) => {
      if (el.style) {
        // Scale font sizes
        if (el.style.fontSize) {
          const fontSize = parseFloat(el.style.fontSize);
          if (!isNaN(fontSize)) {
            el.style.fontSize = `${fontSize * 3.125}px`;
          }
        }
        
        // Scale padding and margins
        ['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
         'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach(prop => {
          if (el.style[prop] && el.style[prop].includes('px')) {
            const value = parseFloat(el.style[prop]);
            if (!isNaN(value)) {
              el.style[prop] = `${value * 3.125}px`;
            }
          }
        });
      }
    });

    exportContainer.appendChild(clonedElement);
    document.body.appendChild(exportContainer);

    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas = await html2canvas(exportContainer, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 2480,
      height: exportContainer.scrollHeight
    });

    document.body.removeChild(exportContainer);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(
      canvas.toDataURL('image/png', 1.0),
      'PNG',
      0,
      0,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );

    pdf.save(filename);
    
  } catch (error) {
    console.error('Error exporting high quality PDF:', error);
    await exportToPDF(elementId, filename);
  }
};