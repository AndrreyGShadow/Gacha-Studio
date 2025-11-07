
import React from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const COLORS = [
  '#000000', // Black
  '#FFFFFF', // White
  '#EF4444', // Red
  '#F97316', // Orange
  '#EAB308', // Yellow
  '#22C55E', // Green
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#78350F', // Brown
  '#A8A29E', // Gray
  '#FDE047', // Blonde
];

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Color</label>
      <div className="flex flex-wrap gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110
              ${color.toUpperCase() === c.toUpperCase() ? 'border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
