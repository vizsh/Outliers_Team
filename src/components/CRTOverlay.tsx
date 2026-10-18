import React, { useState } from 'react';
import { sound } from '../services/soundEngine';

interface CRTOverlayProps {
  isFastMode: boolean;
  onToggleFastMode: () => void;
}

export const CRTOverlay: React.FC<CRTOverlayProps> = ({ isFastMode, onToggleFastMode }) => {
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <>
      {/* Visual CRT Scanline Filter */}
      <div className="crt-overlay crt-flicker pointer-events-none" />

      {/* Floating HUD Controls (Top Right) */}
      <div className="hud-top-bar">
        {/* Fast Mode Toggle Pill */}
        <button
          onClick={onToggleFastMode}
          className={`hud-pill ${isFastMode ? 'active' : ''}`}
        >
          <span>⚡</span>
          <span>{isFastMode ? 'ARCADE MODE' : 'FAST MODE (ESC)'}</span>
        </button>

        {/* Audio Mute/Unmute */}
        <button
          onClick={handleToggleSound}
          className="hud-btn"
          title={isMuted ? 'Unmute 16-Bit Audio' : 'Mute Audio'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        {/* Help / Controls Info */}
        <button
          onClick={() => setShowHelp((prev) => !prev)}
          className="hud-btn"
          title="Arcade Controls & Keys"
        >
          ?
        </button>
      </div>

      {/* Keystrokes Modal */}
      {showHelp && (
        <div 
          onClick={() => setShowHelp(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(4px)',
            cursor: 'pointer'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: '20px',
              maxWidth: '380px',
              width: '100%',
              background: '#0f172a',
              border: '2px solid var(--neon-cyan)',
              borderRadius: '8px',
              boxShadow: '0 0 30px rgba(0,240,255,0.6)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#e2e8f0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,240,255,0.4)', paddingBottom: '8px', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--neon-cyan)' }}>ARCADE CABINET CONTROLS</span>
              <button onClick={() => setShowHelp(false)} style={{ background: 'none', border: 'none', color: '#ff007f', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>✕</button>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--neon-gold)' }}>← / → :</span>
                <span>Cycle Squad Roster</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--neon-gold)' }}>SPACE / Z :</span>
                <span>Fight in Portfolio Duel</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--neon-gold)' }}>ENTER :</span>
                <span>Quick Launch Portfolio</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--neon-gold)' }}>↓ ARROW :</span>
                <span>Open Shared Campaign</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--neon-gold)' }}>ESC :</span>
                <span>Toggle Recruiter Fast Mode</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
