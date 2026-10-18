import React from 'react';
import type { PlayerId } from '../types';

interface PixelCharacterSpriteProps {
  id: PlayerId;
  size?: 'sm' | 'md' | 'lg';
  action?: 'idle' | 'attack' | 'victory';
}

export const PixelCharacterSprite: React.FC<PixelCharacterSpriteProps> = ({
  id,
  size = 'md',
  action = 'idle'
}) => {
  // Dimensions
  const dimensions = {
    sm: { width: '100px', height: '120px' },
    md: { width: '170px', height: '190px' },
    lg: { width: '220px', height: '250px' }
  }[size];

  // Precise crop offsets in 01_roster_select_screen.jpg
  const backgroundPosition = {
    shreyas: '22% 52%',
    rishit: '50% 52%',
    jeevesh: '78% 52%'
  }[id];

  const themeColor = id === 'shreyas' ? '#00f0ff' : id === 'rishit' ? '#10b981' : '#06b6d4';

  return (
    <div 
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
        ...dimensions
      }}
    >
      {/* Background Sprite Box with authentic image crop from attempt1_ui */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '4px',
          border: `2px solid ${themeColor}`,
          backgroundImage: `url('/attempt1_ui/01_roster_select_screen.jpg')`,
          backgroundSize: '360% 180%',
          backgroundPosition: backgroundPosition,
          imageRendering: 'pixelated',
          boxShadow: `0 0 20px ${themeColor}66`
        }}
      />

      {/* Specialty Readiness Tag */}
      <div 
        style={{
          position: 'absolute',
          bottom: '4px',
          left: '4px',
          right: '4px',
          padding: '3px 6px',
          background: 'rgba(2, 6, 23, 0.92)',
          border: `1px solid ${themeColor}`,
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          fontWeight: 'bold',
          color: themeColor,
          letterSpacing: '1px'
        }}
      >
        {id === 'shreyas' && '⚡ CODE KATANA READY'}
        {id === 'rishit' && '🎨 DIGITAL STYLUS READY'}
        {id === 'jeevesh' && '⚙️ ARC REACTOR 100%'}
      </div>
    </div>
  );
};
