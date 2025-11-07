
import React from 'react';
import { CharacterAsset } from '../types';

interface CharacterCanvasProps {
  assets: CharacterAsset[];
  selectedAssetId: string | null;
  onSelectAsset: (id: string | null) => void;
  background: string;
}

const CharacterCanvas: React.FC<CharacterCanvasProps> = ({ assets, selectedAssetId, onSelectAsset, background }) => {
  const sortedAssets = [...assets].sort((a, b) => a.zIndex - b.zIndex);
  
  const backgroundStyle: React.CSSProperties = {};
  if (background.startsWith('data:image/')) {
    backgroundStyle.backgroundImage = `url(${background})`;
    backgroundStyle.backgroundSize = 'cover';
    backgroundStyle.backgroundPosition = 'center';
  } else {
    backgroundStyle.backgroundColor = background;
  }

  return (
    <div 
        className="w-[300px] h-[500px] md:w-[400px] md:h-[600px] rounded-lg shadow-inner relative overflow-hidden"
        style={backgroundStyle}
        onClick={() => onSelectAsset(null)}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[400px]">
        {sortedAssets.map(asset => {
          const isSelected = asset.id === selectedAssetId;
          const isCustom = asset.type === 'custom';
          
          const transformStyle = {
            transform: `translate(${asset.transform.x}px, ${asset.transform.y}px) rotate(${asset.transform.rotation}deg) scale(${asset.transform.scale})`,
            color: asset.color,
          };
          
          return (
            <div
              key={asset.id}
              className={`absolute w-full h-full top-0 left-0 transition-all duration-100 ${isCustom ? 'cursor-pointer' : ''}`}
              style={{ 
                zIndex: asset.zIndex,
                ...transformStyle
              }}
              onClick={(e) => {
                if (isCustom) {
                  e.stopPropagation();
                  onSelectAsset(asset.id);
                }
              }}
            >
              {typeof asset.src === 'string' 
                ? <img src={asset.src} alt="custom asset" className="w-full h-full object-contain pointer-events-none" />
                : <div className="w-full h-full pointer-events-none">{asset.src}</div>
              }
              {isSelected && isCustom && (
                <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-lg pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterCanvas;