
import React from 'react';
import { PresetAssetData, AssetCategory, CharacterAsset } from '../types';

// A more detailed chibi-style body base from the user-provided image
export const BASE_BODY: CharacterAsset = {
  id: 'body-base',
  category: AssetCategory.BODY,
  type: 'preset',
  src: React.createElement("svg", { viewBox: "0 0 200 350", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("g", null,
        React.createElement("path", { 
            d: "M80,285 C90,280 120,280 130,285 C120,295 90,295 80,285 Z", 
            fill: "rgba(0,0,0,0.15)",
            stroke: "none"
        }),
        React.createElement("g", { fill: "#F3D8C6", stroke: "#6B4F48", strokeWidth: "5", strokeLinejoin: "round", strokeLinecap: "round" },
            // Head
            React.createElement("path", { d: "M159.2,64.2C160.4,101.4,136,134.6,99.8,136.9C63.6,139.2,34.4,113.1,33.2,75.9 C32,38.7,56.4,5.5,92.6,3.2C128.8,0.9,158.1,27,159.2,64.2z" }),
            // Ear
            React.createElement("path", { d: "M143.2,100.9c-3.6,1.4-7.5,2.3-11.4,2.4c-7.8,0.2-15.4-3-20.9-8.5c-5.5-5.5-8.5-12.8-8.4-20.5 c0.1-5.8,1.9-11.2,5.2-15.8c-5-2.1-10.4-2.7-15.7-1.9c-5.2,0.8-10.2,3-14.4,6.4c-8.3,6.7-13.2,17-13.2,27.8 c0,13.9,7.7,26.5,19.8,33.2c12.1,6.7,26.8,6.7,39,0c6-3.3,10.8-8.3,13.8-14.2C148.9,103.7,146.8,99.5,143.2,100.9z" }),
            // Neck
            React.createElement("path", { d: "M99.5,135v15", fill: "none" }),
            // Right arm (character's left) and torso side
            React.createElement("path", { d: "M110,150c4,1,13,5,15,18c2,13-1,27-1,27l-5,20", fill: "none" }),
            React.createElement("path", { d: "M124.5,214c0,0,5.2-2.5,6.5,0.5s-4.3,6.5-6.3,5.5s-0.5-5,0-6Z" }), // Fist
            // Left arm (character's right) and torso side
            React.createElement("path", { d: "M89,150c-4,1-13,5-15,18c-2,13,1,27,1,27l5,20", fill: "none" }),
            // Legs
            React.createElement("path", { d: "M88,180 l-10,95 l-2,5 M112,180 l10,95 l2,5", fill: "none" })
        )
    )
  ),
  zIndex: 10,
  transform: { x: 0, y: 0, scale: 1, rotation: 0 }
};

export const PRESET_ASSETS: PresetAssetData[] = [
  // New default clothes
  {
    id: 'top-base', name: 'White Tank Top', category: AssetCategory.TOP, zIndex: 12,
    data: React.createElement("svg", { viewBox: "0 0 200 350", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement("g", { stroke: "#303A52", strokeWidth: "5", strokeLinejoin: "round", strokeLinecap: "round" },
        React.createElement("path", {
          d: "M89,150c-5,0-8-12-8-12s3-10,18-10s18,10,18,10s-3,12-8,12H89z",
          fill: "currentColor"
        }),
        React.createElement("path", {
          d: "M81,150 L81,180 L119,180 L119,150",
          fill: "currentColor"
        })
      )
    )
  },
  {
    id: 'bottom-base', name: 'White Pants', category: AssetCategory.BOTTOM, zIndex: 11,
    data: React.createElement("svg", { viewBox: "0 0 200 350", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement("g", { stroke: "#303A52", strokeWidth: "5", strokeLinejoin: "round", strokeLinecap: "round" },
        // Pants shape
        React.createElement("path", {
          d: "M81,175 L71,275 l10,5 l13-50 l12,50 l10,-5 L119,175 H81z",
          fill: "currentColor"
        }),
        // Belt
        React.createElement("path", {
          d: "M81,175 H119 v10 H81z",
          fill: "currentColor"
        }),
        React.createElement("path", {
          d: "M95,175 v10 h10 v-10 H95z",
          fill: "#E1E1E1",
          strokeWidth: "3"
        }),
        // Fly
        React.createElement("path", { d: "M100,185 v10", fill: "none", strokeLinecap:"round" })
      )
    )
  },
  // Eyes
  {
    id: 'eyes-1', name: 'Normal Eyes', category: AssetCategory.EYES, zIndex: 15,
    data: React.createElement("svg", { viewBox: "0 0 100 50" },
      React.createElement("circle", { cx: "25", cy: "25", r: "10", fill: "currentColor" }),
      React.createElement("circle", { cx: "75", cy: "25", r: "10", fill: "currentColor" }),
      React.createElement("circle", { cx: "27", cy: "23", r: "3", fill: "white" }),
      React.createElement("circle", { cx: "77", cy: "23", r: "3", fill: "white" })
    )
  },
  {
    id: 'eyes-2', name: 'Happy Eyes', category: AssetCategory.EYES, zIndex: 15,
    data: React.createElement("svg", { viewBox: "0 0 100 50" },
      React.createElement("path", { d: "M15,25 Q25,15 35,25", stroke: "currentColor", fill: "none", strokeWidth: "4" }),
      React.createElement("path", { d: "M65,25 Q75,15 85,25", stroke: "currentColor", fill: "none", strokeWidth: "4" })
    )
  },
  // Hair Back
  {
    id: 'hair-back-1', name: 'Long Hair', category: AssetCategory.HAIR_BACK, zIndex: 5,
    data: React.createElement("svg", { viewBox: "0 0 150 200" },
      React.createElement("path", { d: "M30,30 Q75,-10 120,30 L130,180 Q75,210 20,180 Z", fill: "currentColor" })
    )
  },
    {
    id: 'hair-back-2', name: 'Spiky Hair', category: AssetCategory.HAIR_BACK, zIndex: 5,
    data: React.createElement("svg", { viewBox: "0 0 150 200" },
      React.createElement("path", { d: "M30 40 L75 10 L120 40 L110 90 L90 70 L75 90 L60 70 L40 90 Z", fill: "currentColor" })
    )
  },
  // Hair Front
  {
    id: 'hair-front-1', name: 'Bangs', category: AssetCategory.HAIR_FRONT, zIndex: 20,
    data: React.createElement("svg", { viewBox: "0 0 100 50" },
      React.createElement("path", { d: "M0,10 Q50, -10 100,10 L100,30 L0,30 Z", fill: "currentColor" })
    )
  },
    {
    id: 'hair-front-2', name: 'Side Part', category: AssetCategory.HAIR_FRONT, zIndex: 20,
    data: React.createElement("svg", { viewBox: "0 0 100 50" },
      React.createElement("path", { d: "M0,40 Q30,-10 90,10 L100,40 L0,40 Z", fill: "currentColor" })
    )
  },
  // Top
  {
    id: 'top-1', name: 'T-Shirt', category: AssetCategory.TOP, zIndex: 12,
    data: React.createElement("svg", { viewBox: "0 0 100 100" },
      React.createElement("path", { d: "M10,10 L90,10 L90,80 Q50,100 10,80 Z", fill: "currentColor" }),
      React.createElement("path", { d: "M0,10 L20,20 L20,40 L0,30 Z", fill: "currentColor" }),
      React.createElement("path", { d: "M100,10 L80,20 L80,40 L100,30 Z", fill: "currentColor" })
    )
  },
  {
    id: 'top-2', name: 'Tank Top (alt)', category: AssetCategory.TOP, zIndex: 12,
    data: React.createElement("svg", { viewBox: "0 0 100 100" },
      React.createElement("path", { d: "M20,10 L80,10 L80,80 Q50,95 20,80 Z", fill: "currentColor" })
    )
  }
];
