
import React, { useState, useCallback } from 'react';
import { CharacterAsset, AssetCategory } from './types';
import { PRESET_ASSETS, BASE_BODY } from './constants/assets';
import CharacterCanvas from './components/CharacterCanvas';
import AssetEditor from './components/AssetEditor';

const App: React.FC = () => {
  const [characterAssets, setCharacterAssets] = useState<CharacterAsset[]>(() => {
    const initialTop = PRESET_ASSETS.find(p => p.id === 'top-base');
    const initialBottom = PRESET_ASSETS.find(p => p.id === 'bottom-base');
    
    const assets: CharacterAsset[] = [BASE_BODY];
    
    if (initialTop) {
        assets.push({
            id: initialTop.id,
            src: initialTop.data,
            category: initialTop.category,
            type: 'preset',
            zIndex: initialTop.zIndex,
            color: '#FFFFFF',
            transform: { x: 0, y: 0, scale: 1, rotation: 0 }
        });
    }
    if (initialBottom) {
        assets.push({
            id: initialBottom.id,
            src: initialBottom.data,
            category: initialBottom.category,
            type: 'preset',
            zIndex: initialBottom.zIndex,
            color: '#FFFFFF',
            transform: { x: 0, y: 0, scale: 1, rotation: 0 }
        });
    }
    return assets;
  });
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [background, setBackground] = useState<string>('#FFFFFF');

  const findAssetByCategory = (category: AssetCategory) => {
    return characterAssets.find(a => a.category === category);
  };

  const handlePresetSelect = useCallback((preset) => {
    setCharacterAssets(prevAssets => {
      const currentAssetInCategory = prevAssets.find(a => a.category === preset.category);
      const newAssets = prevAssets.filter(asset => asset.category !== preset.category);

      if (currentAssetInCategory?.id === preset.id) {
        // Deselect if the same item is clicked
        return newAssets;
      } else {
        // Add new preset
        return [...newAssets, {
          id: preset.id,
          src: preset.data,
          category: preset.category,
          type: 'preset',
          zIndex: preset.zIndex,
          color: ['top-base', 'bottom-base'].includes(preset.id) ? '#FFFFFF' : '#000000',
          transform: { x: 0, y: 0, scale: 1, rotation: 0 }
        }];
      }
    });
    setSelectedAssetId(null);
  }, []);

  const handleCustomAssetAdd = useCallback((asset: Omit<CharacterAsset, 'id'>) => {
    setCharacterAssets(prevAssets => {
      const newAsset = { ...asset, id: `custom-${Date.now()}` };
      return [...prevAssets, newAsset];
    });
  }, []);

  const updateAsset = useCallback((id: string, updates: Partial<CharacterAsset>) => {
    setCharacterAssets(prevAssets =>
      prevAssets.map(asset => (asset.id === id ? { ...asset, ...updates } : asset))
    );
  }, []);

  const updateAssetTransform = useCallback((id: string, transformUpdates: Partial<CharacterAsset['transform']>) => {
    setCharacterAssets(prevAssets =>
      prevAssets.map(asset =>
        asset.id === id
          ? { ...asset, transform: { ...asset.transform, ...transformUpdates } }
          : asset
      )
    );
  }, []);

  const removeAsset = useCallback((id: string) => {
    setCharacterAssets(prevAssets => prevAssets.filter(asset => asset.id !== id));
    if (selectedAssetId === id) {
      setSelectedAssetId(null);
    }
  }, [selectedAssetId]);
  
  const handleBackgroundChange = useCallback((newBg: string) => {
    setBackground(newBg);
  }, []);
  
  const selectedAsset = characterAssets.find(a => a.id === selectedAssetId);

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 overflow-hidden">
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative bg-slate-200 dark:bg-slate-900">
        <CharacterCanvas
          assets={characterAssets}
          selectedAssetId={selectedAssetId}
          onSelectAsset={setSelectedAssetId}
          background={background}
        />
      </main>
      <aside className="w-full md:w-96 bg-white dark:bg-slate-800 shadow-lg border-l border-slate-200 dark:border-slate-700 flex flex-col">
        <AssetEditor
          presets={PRESET_ASSETS}
          onPresetSelect={handlePresetSelect}
          onCustomAssetAdd={handleCustomAssetAdd}
          selectedAsset={selectedAsset}
          updateAsset={updateAsset}
          updateAssetTransform={updateAssetTransform}
          removeAsset={removeAsset}
          getAppliedPresetId={(category) => findAssetByCategory(category)?.id}
          onBackgroundChange={handleBackgroundChange}
        />
      </aside>
    </div>
  );
};

export default App;
