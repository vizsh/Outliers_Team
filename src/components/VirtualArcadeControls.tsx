import React from 'react';
import { sound } from '../services/soundEngine';

interface VirtualArcadeControlsProps {
  onLeft: () => void;
  onRight: () => void;
  onDown: () => void;
  onActionA: () => void; // Fight / Select
  onActionB: () => void; // Launch / Skip
}

export const VirtualArcadeControls: React.FC<VirtualArcadeControlsProps> = ({
  onLeft,
  onRight,
  onDown,
  onActionA,
  onActionB
}) => {
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '12px',
        left: '12px',
        right: '12px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        userSelect: 'none'
      }}
    >
      {/* Virtual D-Pad (Left) */}
      <div 
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(2, 6, 23, 0.9)',
          padding: '8px',
          borderRadius: '8px',
          border: '1.5px solid rgba(0, 240, 255, 0.5)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)'
        }}
      >
        <button
          onClick={() => {
            sound.playCursor();
            onLeft();
          }}
          className="arcade-btn"
          style={{ width: '40px', height: '40px', padding: 0 }}
          aria-label="Previous"
        >
          ◀
        </button>

        <button
          onClick={() => {
            sound.playCursor();
            onDown();
          }}
          className="arcade-btn arcade-btn-gold"
          style={{ width: '40px', height: '40px', padding: 0 }}
          title="Shared Campaign"
          aria-label="Campaign"
        >
          ▼
        </button>

        <button
          onClick={() => {
            sound.playCursor();
            onRight();
          }}
          className="arcade-btn"
          style={{ width: '40px', height: '40px', padding: 0 }}
          aria-label="Next"
        >
          ▶
        </button>
      </div>

      {/* Action Buttons (Right) */}
      <div 
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(2, 6, 23, 0.9)',
          padding: '8px',
          borderRadius: '8px',
          border: '1.5px solid rgba(255, 0, 127, 0.5)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)'
        }}
      >
        <button
          onClick={() => {
            sound.playSelect();
            onActionA();
          }}
          className="arcade-btn"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            background: 'var(--neon-cyan)',
            color: '#000000',
            boxShadow: '0 0 15px #00f0ff'
          }}
        >
          <span>A</span>
          <span style={{ fontSize: '8px', fontWeight: 'bold' }}>FIGHT</span>
        </button>

        <button
          onClick={() => {
            sound.playWarp();
            onActionB();
          }}
          className="arcade-btn arcade-btn-magenta"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            background: 'var(--neon-magenta)',
            color: '#ffffff',
            boxShadow: '0 0 15px #ff007f'
          }}
        >
          <span>B</span>
          <span style={{ fontSize: '8px', fontWeight: 'bold' }}>LAUNCH</span>
        </button>
      </div>
    </div>
  );
};
