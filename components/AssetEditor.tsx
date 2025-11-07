
import React, { useState } from 'react';
import { PresetAssetData, CharacterAsset, AssetCategory } from '../types';
import PresetAssetGrid from './PresetAssetGrid';
import CustomAssetManager from './CustomAssetManager';
import TransformControls from './TransformControls';
import ColorPicker from './ColorPicker';
import BackgroundManager from './BackgroundManager';

interface AssetEditorProps {
  presets: PresetAssetData[];
  onPresetSelect: (preset: PresetAssetData) => void;
  onCustomAssetAdd: (asset: Omit<CharacterAsset, 'id'>) => void;
  selectedAsset: CharacterAsset | undefined;
  updateAsset: (id: string, updates: Partial<CharacterAsset>) => void;
  updateAssetTransform: (id: string, transformUpdates: Partial<CharacterAsset['transform']>) => void;
  removeAsset: (id: string) => void;
  getAppliedPresetId: (category: AssetCategory) => string | undefined;
  onBackgroundChange: (background: string) => void;
}

const TABS_ORDER: AssetCategory[] = [
    AssetCategory.BACKGROUND,
    AssetCategory.HAIR_BACK,
    AssetCategory.EYES,
    AssetCategory.HAIR_FRONT,
    AssetCategory.TOP,
    AssetCategory.BOTTOM,
    AssetCategory.CUSTOM,
];


const AssetEditor: React.FC<AssetEditorProps> = (props) => {
  const [activeTab, setActiveTab] = useState<AssetCategory>(AssetCategory.BACKGROUND);

  const { selectedAsset, updateAsset, updateAssetTransform, removeAsset } = props;

  const presetsForTab = props.presets.filter(p => p.category === activeTab);
  
  const handleColorChange = (color: string) => {
    if (selectedAsset?.id) {
        updateAsset(selectedAsset.id, { color });
    } else {
        const assetToColor = props.presets.find(p => p.id === props.getAppliedPresetId(activeTab));
        if (assetToColor) {
            // This is a bit tricky. We need to update the asset in the main state.
            // Let's find the character asset and update its color.
            updateAsset(assetToColor.id, { color });
        }
    }
  };
  
  const appliedPreset = props.getAppliedPresetId(activeTab);
  const selectedPresetDetails = props.presets.find(p => p.id === appliedPreset);
  const isPresetTab = ![AssetCategory.CUSTOM, AssetCategory.BACKGROUND, AssetCategory.BODY].includes(activeTab);

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gacha Studio AI</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Customize your character</p>
        </div>
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="flex flex-wrap -mb-px p-2" aria-label="Tabs">
          {TABS_ORDER.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 border border-transparent whitespace-nowrap text-sm font-medium rounded-md px-3 py-2 m-1 ${
                activeTab === tab
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === AssetCategory.BACKGROUND ? (
          <BackgroundManager onBackgroundChange={props.onBackgroundChange} />
        ) : activeTab === AssetCategory.CUSTOM ? (
          <CustomAssetManager onAssetAdd={props.onCustomAssetAdd} />
        ) : (
          <PresetAssetGrid
            presets={presetsForTab}
            onSelect={props.onPresetSelect}
            appliedId={props.getAppliedPresetId(activeTab)}
          />
        )}
      </div>

      {activeTab !== AssetCategory.BACKGROUND && (selectedAsset || (isPresetTab && appliedPreset)) && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
           <h3 className="text-lg font-semibold mb-3">
             {selectedAsset ? 'Edit Custom Asset' : `${selectedPresetDetails?.name} Settings` }
           </h3>
           
           {selectedAsset && selectedAsset.type === 'custom' && (
              <TransformControls
                transform={selectedAsset.transform}
                onTransformChange={(updates) => updateAssetTransform(selectedAsset.id, updates)}
                onLayerChange={(direction) => updateAsset(selectedAsset.id, { zIndex: selectedAsset.zIndex + direction})}
              />
           )}

           {(selectedAsset || (isPresetTab && appliedPreset)) && (
               <ColorPicker
                color={selectedAsset?.color || '#000000'}
                onChange={handleColorChange}
              />
           )}
           
           {selectedAsset && selectedAsset.type === 'custom' && (
             <button
               onClick={() => removeAsset(selectedAsset.id)}
               className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
             >
               Remove Asset
             </button>
           )}
        </div>
      )}
    </div>
  );
};

export default AssetEditor;