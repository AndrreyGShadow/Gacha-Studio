
import React from 'react';
import { PresetAssetData } from '../types';

interface PresetAssetGridProps {
  presets: PresetAssetData[];
  onSelect: (preset: PresetAssetData) => void;
  appliedId?: string;
}

const PresetAssetGrid: React.FC<PresetAssetGridProps> = ({ presets, onSelect, appliedId }) => {
  if (presets.length === 0) {
      return <div className="text-center text-slate-500 dark:text-slate-400 py-8">No assets in this category.</div>
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {presets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onSelect(preset)}
          className={`aspect-square rounded-lg flex items-center justify-center p-2 transition-all duration-200
            ${appliedId === preset.id 
              ? 'bg-blue-500 text-white ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-800' 
              : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
            }`}
          title={preset.name}
        >
          <div className="w-16 h-16">{preset.data}</div>
        </button>
      ))}
    </div>
  );
};

export default PresetAssetGrid;
