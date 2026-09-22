import React from 'react';

/**
 * Minimalist colorful water droplet logo
 * Spec: Logo should use Blue (#3B82F6), Purple (#8B5CF6), Pink (#EC4899), keep it simple.
 */
export const DropletLogo = ({ size = 64, className = '' }) => {
  return (
    <div 
      className={`water-droplet-logo ${className}`} 
      style={{ width: size, height: size }}
      aria-label="Water Sort Logo"
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dropletGrad" x1="20" y1="10" x2="80" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="dropletHighlight" x1="30" y1="30" x2="60" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Droplet Silhouette */}
        <path 
          d="M50 8C50 8 16 52 16 80C16 98.7777 31.2223 114 50 114C68.7777 114 84 98.7777 84 80C84 52 50 8 50 8Z" 
          fill="url(#dropletGrad)" 
        />

        {/* Soft Modern Inner Fluid Ripple */}
        <path 
          d="M26 82C26 95.2548 36.7452 106 50 106C63.2548 106 74 95.2548 74 82C68 85 58 79 50 82C42 85 32 79 26 82Z" 
          fill="#EC4899" 
          fillOpacity="0.4"
        />

        {/* Glass Sheen / Highlight */}
        <path 
          d="M40 28C38 35 28 58 28 76C28 85 31 92 35 96C32 90 32 82 34 74C36 62 45 42 46 36C47 30 45 25 40 28Z" 
          fill="url(#dropletHighlight)" 
        />
      </svg>
    </div>
  );
};
