import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Zap, Sparkles, Eye, EyeOff, Save, RotateCcw } from 'lucide-react';
import { Education } from '../types/resume';

interface EducationFormProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

interface EducationEntryProps {
  ed: Education;
  isEditing: boolean;
  onEdit: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateEducation: (id: string, field: keyof Education, value: string | boolean) => void;
  onEnhanceWithAI: (id: string, field: keyof Education, currentValue: string) => void;
  onSave: () => void;
  onClear: () => void;
  isSaving: boolean;
  saveMessage: string;
}

const EducationEntry: React.FC<EducationEntryProps> = ({
  ed,
  isEditing,
  onEdit,
  onToggleVisibility,
  onDelete,
  onUpdateEducation,
  onEnhanceWithAI,
  onSave,
  onClear,
  isSaving,
  saveMessage,
}) => {
  const AIEnhanceButton = ({ onClick, isLoading = false }: { onClick: () => void; isLoading?: boolean }) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50"
      title="Enhance with AI"
    >
      {isLoading ? (
        <div className="animate-spin">
          <Sparkles className="w-4 h-4" />
        </div>
      ) : (
        <Zap className="w-4 h-4" />
      )}
    </button>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onEdit(ed.id)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? 'Collapse' : 'Edit'}</span>
          </button>
          <button
            onClick={() => onToggleVisibility(ed.id)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md text-sm transition-colors ${
              ed.visible !== false
                ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
            }`}
            title={ed.visible !== false ? 'Hide from resume' : 'Show in resume'}
          >
            {ed.visible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{ed.visible !== false ? 'Visible' : 'Hidden'}</span>
          </button>
        </div>
        <button
          onClick={() => onDelete(ed.id)}
          className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Institution Name"
              value={ed.institution}
              onChange={(e) => onUpdateEducation(ed.id, 'institution', e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AIEnhanceButton 
              onClick={() => onEnhanceWithAI(ed.id, 'institution', ed.institution)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Degree"
                value={ed.degree}
                onChange={(e) => onUpdateEducation(ed.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <AIEnhanceButton 
                onClick={() => onEnhanceWithAI(ed.id, 'degree', ed.degree)}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Field of Study"
                value={ed.field}
                onChange={(e) => onUpdateEducation(ed.id, 'field', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <AIEnhanceButton 
                onClick={() => onEnhanceWithAI(ed.id, 'field', ed.field)}
              />
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Location"
              value={ed.location}
              onChange={(e) => onUpdateEducation(ed.id, 'location', e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AIEnhanceButton 
              onClick={() => onEnhanceWithAI(ed.id, 'location', ed.location)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                value={ed.startDate}
                onChange={(e) => onUpdateEducation(ed.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="month"
                value={ed.endDate}
                onChange={(e) => onUpdateEducation(ed.id, 'endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
              <input
                type="text"
                placeholder="3.8"
                value={ed.gpa || ''}
                onChange={(e) => onUpdateEducation(ed.id, 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={`${ed.visible === false ? 'opacity-50' : ''}`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{ed.degree || 'Degree'} {ed.field && `in ${ed.field}`}</h4>
              <p className="text-gray-700">{ed.institution || 'Institution'}</p>
              <p className="text-sm text-gray-500">{ed.location}</p>
            </div>
            {ed.visible === false && (
              <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                Hidden from resume
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons for Each Education Entry */}
      <div className="flex justify-end items-center space-x-3 mt-4">
        {saveMessage && (
          <span className={`text-sm font-medium ${
            saveMessage.includes('success') ? 'text-green-600' : 
            saveMessage.includes('Failed') ? 'text-red-600' : 'text-blue-600'
          }`}>
            {saveMessage}
          </span>
        )}
        <button
          onClick={onClear}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Clear</span>
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
};

const EducationForm: React.FC<EducationFormProps> = ({ education, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const addEducation = () => {
    const newEd: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      visible: true
    };
    onUpdate([...education, newEd]);
    setEditingId(newEd.id);
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    onUpdate(education.map(ed => 
      ed.id === id ? { ...ed, [field]: value } : ed
    ));
  };

  const deleteEducation = (id: string) => {
    onUpdate(education.filter(ed => ed.id !== id));
  };

  const toggleVisibility = (id: string) => {
    updateEducation(id, 'visible', !education.find(ed => ed.id === id)?.visible);
  };

  const enhanceWithAI = async (id: string, field: keyof Education, currentValue: string) => {
    if (!currentValue.trim()) return;
    const enhancedContent = await simulateAIEnhancement(currentValue, field);
    updateEducation(id, field, enhancedContent);
  };

  const simulateAIEnhancement = async (content: string, field: keyof Education): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    switch (field) {
      case 'degree':
        if (content.toLowerCase().includes('bachelor')) {
          return content.includes('of Science') ? content : `${content} of Science`;
        }
        if (content.toLowerCase().includes('master')) {
          return content.includes('of Arts') ? content : `${content} of Arts`;
        }
        return content;
      case 'field':
        if (content.toLowerCase().includes('computer')) {
          return 'Computer Science and Engineering';
        }
        if (content.toLowerCase().includes('business')) {
          return 'Business Administration and Management';
        }
        return content;
      case 'institution':
        return content.includes('University') ? content : `${content} University`;
      default:
        return content;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('resumeEducation', JSON.stringify(education));
      setSaveMessage('Education saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all education entries? This action cannot be undone.')) {
      onUpdate([]);
      setEditingId(null);
      setSaveMessage('All education entries cleared.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Education Button */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Education</h3>
          <p className="text-gray-600 text-sm">Add your educational background and qualifications</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length > 0 ? (
        education.map((ed) => (
          <EducationEntry
            key={ed.id}
            ed={ed}
            isEditing={editingId === ed.id}
            onEdit={(id) => setEditingId(editingId === id ? null : id)}
            onToggleVisibility={toggleVisibility}
            onDelete={deleteEducation}
            onUpdateEducation={updateEducation}
            onEnhanceWithAI={enhanceWithAI}
            onSave={handleSave}
            onClear={handleClear}
            isSaving={isSaving}
            saveMessage={saveMessage}
          />
        ))
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Education Added Yet</h3>
          <p className="text-gray-600 mb-4">Add your educational background to showcase your qualifications</p>
          <button
            onClick={addEducation}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Your First Education
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationForm;