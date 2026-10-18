import React from 'react';
import type { PlayerId } from '../types';

export type FighterAction = 
  | 'idle' 
  | 'light_attack' 
  | 'heavy_attack' 
  | 'defend' 
  | 'projectile'
  | 'super' 
  | 'hurt' 
  | 'victory';

interface FighterSpriteProps {
  id: PlayerId;
  action: FighterAction;
  isFacingLeft?: boolean;
  lungeOffset?: number; // Horizontal offset in px
  jumpOffset?: number;  // Vertical jump height in px
  showShield?: boolean;
  isParrying?: boolean;
}

export const FighterSprite: React.FC<FighterSpriteProps> = ({
  id,
  action,
  isFacingLeft = false,
  lungeOffset = 0,
  jumpOffset = 0,
  showShield = false,
  isParrying = false
}) => {
  // Determine which transparent sprite PNG to use based on action
  let poseName: 'idle' | 'attack' | 'hurt' = 'idle';
  if (action === 'light_attack' || action === 'heavy_attack' || action === 'projectile' || action === 'super') {
    poseName = 'attack';
  } else if (action === 'hurt') {
    poseName = 'hurt';
  } else {
    poseName = 'idle';
  }

  const spriteSrc = `/sprites/${id}_${poseName}.png`;

  const directionFactor = isFacingLeft ? -1 : 1;
  const currentTranslateX = lungeOffset * directionFactor;
  const currentTranslateY = -jumpOffset; // Jump up is negative Y

  // Character specific theme colors for auras
  const themeColors = {
    shreyas: '#00f0ff',
    rishit: '#10b981',
    jeevesh: '#38bdf8'
  }[id];

  return (
    <div 
      style={{
        position: 'relative',
        width: '320px',
        height: '350px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
        transform: `translate(${currentTranslateX}px, ${currentTranslateY}px) scaleX(${directionFactor})`,
        transition: action === 'hurt' 
          ? 'transform 0.08s ease-out' 
          : action === 'heavy_attack'
          ? 'transform 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          : 'transform 0.16s ease-out',
        zIndex: action === 'super' ? 40 : 10
      }}
    >
      {/* Dynamic Ground Shadow (scales with jumping) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2px',
          width: `${Math.max(80, 190 - jumpOffset * 0.8)}px`,
          height: '22px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)',
          opacity: Math.max(0.3, 1 - jumpOffset / 120),
          transform: `scale(${Math.max(0.6, 1 - jumpOffset / 150)})`,
          transition: 'all 0.16s ease',
          zIndex: 1
        }}
      />

      {/* Cyber Shield / Parry Forcefield Barrier */}
      {(action === 'defend' || showShield) && (
        <div 
          style={{
            position: 'absolute',
            inset: '-15px',
            borderRadius: '50%',
            border: isParrying ? '4px solid #ffd700' : '3px solid var(--neon-cyan)',
            background: isParrying 
              ? 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 215, 0, 0.05) 70%)'
              : 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, rgba(0, 240, 255, 0.04) 70%)',
            boxShadow: isParrying 
              ? '0 0 45px #ffd700, inset 0 0 25px #ffd700'
              : '0 0 35px var(--neon-cyan), inset 0 0 20px var(--neon-cyan)',
            animation: isParrying ? 'shieldParryShock 0.3s ease-out' : 'shieldPulse 0.4s infinite alternate',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 35
          }}
        >
          {/* Hexagonal cyber grid overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, transparent 20%, rgba(0, 240, 255, 0.1) 21%, transparent 22%)',
              backgroundSize: '16px 16px',
              borderRadius: '50%',
              opacity: 0.6
            }}
          />
          <div 
            style={{ 
              position: 'absolute', 
              top: '15px', 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '11px', 
              color: isParrying ? '#ffd700' : 'var(--neon-cyan)', 
              fontWeight: 'bold',
              textShadow: isParrying ? '0 0 10px #ffd700' : '0 0 10px #00f0ff',
              letterSpacing: '1px'
            }}
          >
            {isParrying ? '⚡ PERFECT PARRY! ⚡' : '🛡️ CI/CD BARRIER'}
          </div>
        </div>
      )}

      {/* Speed / Dash Motion Trail Shadows when attacking */}
      {(action === 'light_attack' || action === 'heavy_attack' || action === 'super') && (
        <>
          <div 
            style={{
              position: 'absolute',
              left: '-40px',
              bottom: 0,
              height: '310px',
              width: 'auto',
              opacity: 0.45,
              filter: `drop-shadow(0 0 15px ${themeColors}) blur(2px)`,
              pointerEvents: 'none',
              zIndex: 2
            }}
          >
            <img 
              src={spriteSrc} 
              alt="ghost trail" 
              style={{ height: '310px', width: 'auto', objectFit: 'contain', imageRendering: 'pixelated' }}
            />
          </div>
          <div 
            style={{
              position: 'absolute',
              left: '-80px',
              bottom: 0,
              height: '310px',
              width: 'auto',
              opacity: 0.2,
              filter: `drop-shadow(0 0 20px ${themeColors}) blur(4px)`,
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <img 
              src={spriteSrc} 
              alt="ghost trail" 
              style={{ height: '310px', width: 'auto', objectFit: 'contain', imageRendering: 'pixelated' }}
            />
          </div>
        </>
      )}

      {/* Super Saiyan / Overclock Flaming Energy Aura */}
      {action === 'super' && (
        <div 
          style={{
            position: 'absolute',
            inset: '-20px',
            background: 'radial-gradient(circle, rgba(255, 0, 127, 0.45) 0%, rgba(189, 0, 255, 0.2) 50%, transparent 75%)',
            filter: 'blur(8px)',
            animation: 'superAuraPulse 0.3s infinite alternate',
            zIndex: 3
          }}
        />
      )}

      {/* Primary Fighter High-Definition Transparent Sprite Image */}
      <img
        src={spriteSrc}
        alt={`${id} ${action}`}
        style={{
          maxHeight: '330px',
          maxWidth: '320px',
          height: 'auto',
          width: 'auto',
          objectFit: 'contain',
          imageRendering: 'pixelated',
          filter: action === 'hurt'
            ? 'brightness(3.2) contrast(1.6) drop-shadow(0 0 20px #ff0055)'
            : action === 'super'
            ? 'drop-shadow(0 0 30px #ff007f) drop-shadow(0 0 15px #00f0ff) brightness(1.2)'
            : action === 'heavy_attack'
            ? 'drop-shadow(0 0 20px #ffd700) brightness(1.1)'
            : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.75))',
          animation: action === 'idle' ? 'fighterBob 2.4s infinite ease-in-out' : 'none',
          position: 'relative',
          zIndex: 10
        }}
      />
    </div>
  );
};
