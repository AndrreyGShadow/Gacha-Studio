import React, { useState, useRef } from 'react';
import { CharacterAsset, AssetCategory, Transform } from '../types';
import { generateAsset } from '../services/geminiService';
import { UploadIcon, SparklesIcon } from './icons';

interface CustomAssetManagerProps {
  onAssetAdd: (asset: Omit<CharacterAsset, 'id'>) => void;
}

const CustomAssetManager: React.FC<CustomAssetManagerProps> = ({ onAssetAdd }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAsset: Omit<CharacterAsset, 'id'> = {
          src: e.target?.result as string,
          type: 'custom',
          category: AssetCategory.CUSTOM,
          zIndex: 50,
          transform: { x: 0, y: 0, scale: 0.5, rotation: 0 }
        };
        onAssetAdd(newAsset);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for the asset.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const base64Image = await generateAsset(prompt);
      const newAsset: Omit<CharacterAsset, 'id'> = {
        src: `data:image/png;base64,${base64Image}`,
        type: 'custom',
        category: AssetCategory.CUSTOM,
        zIndex: 50,
        transform: { x: 0, y: 0, scale: 0.5, rotation: 0 }
      };
      onAssetAdd(newAsset);
      setPrompt('');
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">Upload Your Own</h3>
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

      <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">Generate with AI</h3>
        <div className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., cool blue wizard hat with stars"
            rows={3}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <SparklesIcon className="w-5 h-5" />
            )}
            <span>{isLoading ? 'Generating...' : 'Generate Asset'}</span>
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {isLoading && (
            <div className="mt-4 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">AI is creating your masterpiece...</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-blue-600 h-2.5 rounded-full animate-indeterminate-progress"></div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomAssetManager;