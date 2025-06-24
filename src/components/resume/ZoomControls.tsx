import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

interface ZoomControlsProps {
  currentZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleFullscreen: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  currentZoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFullscreen
}) => {
  const zoomLevels = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
  const currentZoomIndex = zoomLevels.findIndex(level => Math.abs(level - currentZoom) < 0.01);

  return (
    <div className="sticky top-4 z-20 mb-6">
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 flex items-center space-x-3">
          {/* Zoom Out */}
          <button
            onClick={onZoomOut}
            disabled={currentZoomIndex <= 0}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom Out (Ctrl + -)"
          >
            <ZoomOut className="w-4 h-4 text-gray-600" />
          </button>

          {/* Zoom Level Display */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
              {Math.round(currentZoom * 100)}%
            </span>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-200"
                style={{ width: `${(currentZoomIndex / (zoomLevels.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Zoom In */}
          <button
            onClick={onZoomIn}
            disabled={currentZoomIndex >= zoomLevels.length - 1}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Zoom In (Ctrl + +)"
          >
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </button>

          {/* Reset Zoom */}
          <button
            onClick={onResetZoom}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Reset Zoom (Ctrl + 0)"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Toggle Fullscreen (F11)"
          >
            <Maximize2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-center mt-2">
        <p className="text-xs text-gray-500">
          Use Ctrl + / Ctrl - to zoom, or scroll with Ctrl held
        </p>
      </div>
    </div>
  );
};