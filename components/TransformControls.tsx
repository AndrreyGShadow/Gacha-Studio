
import React from 'react';
import { Transform } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from './icons';

interface TransformControlsProps {
  transform: Transform;
  onTransformChange: (updates: Partial<Transform>) => void;
  onLayerChange: (direction: number) => void;
}

const TransformControls: React.FC<TransformControlsProps> = ({ transform, onTransformChange, onLayerChange }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTransformChange({ [e.target.name]: parseFloat(e.target.value) });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTransformChange({ [e.target.name]: parseInt(e.target.value, 10) || 0 });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="x" className="block text-sm font-medium text-slate-700 dark:text-slate-300">X Position</label>
          <input type="number" name="x" value={transform.x} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900"/>
        </div>
        <div>
          <label htmlFor="y" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Y Position</label>
          <input type="number" name="y" value={transform.y} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900"/>
        </div>
      </div>
      <div>
        <label htmlFor="scale" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Scale ({transform.scale.toFixed(2)})</label>
        <input type="range" name="scale" min="0.1" max="3" step="0.05" value={transform.scale} onChange={handleSliderChange} className="mt-1 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"/>
      </div>
      <div>
        <label htmlFor="rotation" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Rotation ({transform.rotation}°)</label>
        <input type="range" name="rotation" min="0" max="360" value={transform.rotation} onChange={handleSliderChange} className="mt-1 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Layering</label>
        <div className="mt-1 grid grid-cols-2 gap-2">
            <button onClick={() => onLayerChange(1)} className="flex items-center justify-center gap-1 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-md transition-colors">
                <ArrowUpIcon className="w-4 h-4" /> Bring Forward
            </button>
            <button onClick={() => onLayerChange(-1)} className="flex items-center justify-center gap-1 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 rounded-md transition-colors">
                <ArrowDownIcon className="w-4 h-4" /> Send Backward
            </button>
        </div>
      </div>
    </div>
  );
};

export default TransformControls;
