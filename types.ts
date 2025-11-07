import React from 'react';

export enum AssetCategory {
  BACKGROUND = 'Background',
  HAIR_BACK = 'Hair (Back)',
  BODY = 'Body',
  EYES = 'Eyes',
  TOP = 'Top',
  BOTTOM = 'Bottom',
  HAIR_FRONT = 'Hair (Front)',
  CUSTOM = 'Custom',
}

export interface PresetAssetData {
  id: string;
  name: string;
  category: AssetCategory;
  zIndex: number;
  data: React.ReactElement;
}

export interface Transform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface CharacterAsset {
  id: string;
  src: string | React.ReactElement;
  type: 'preset' | 'custom';
  category: AssetCategory;
  zIndex: number;
  color?: string;
  transform: Transform;
}