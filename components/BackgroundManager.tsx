
import React, { useRef } from 'react';
import { UploadIcon } from './icons';

interface BackgroundManagerProps {
  onBackgroundChange: (background: string) => void;
}

const PRESET_COLORS = [
  '#FFFFFF', // White
  '#F3F4F6', // Gray 100
  '#A5F3FC', // Cyan 200
  '#FBCFE8', // Pink 200
  '#D8B4FE', // Purple 300
  '#A7F3D0', // Green 200
  '#FEF08A', // Yellow 200
  '#6B7280', // Gray 500
];

const BackgroundManager: React.FC<BackgroundManagerProps> = ({ onBackgroundChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onBackgroundChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">Preset Colors</h3>
        <div className="grid grid-cols-4 gap-3">
          {PRESET_COLORS.map(color => (
            <button
              key={color}
              onClick={() => onBackgroundChange(color)}
              className="aspect-square rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700"></div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">Upload Background</h3>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-lg transition-colors"
        >
          <UploadIcon className="w-5 h-5" />
          <span>Upload Image</span>
        </button>
      </div>
    </div>
  );
};

export default BackgroundManager;
