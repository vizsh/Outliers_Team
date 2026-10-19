import React, { useState } from 'react';
import { PLAYERS } from '../data/teamData';
import type { PlayerId } from '../types';
import { sound } from '../services/soundEngine';

interface LivePortfolioModalProps {
  memberId: PlayerId;
  onClose: () => void;
}

export const LivePortfolioModal: React.FC<LivePortfolioModalProps> = ({
  memberId,
  onClose
}) => {
  const player = PLAYERS[memberId];
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const targetUrl = player.workspaceUrl;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isFullscreen ? '0' : '16px',
        background: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(8px)',
        userSelect: 'none'
      }}
    >
      {/* Vintage Window Frame */}
      <div 
        className="retro-window"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: isFullscreen ? '100vw' : '100%',
          maxWidth: isFullscreen ? 'none' : '1100px',
          height: isFullscreen ? '100vh' : '90vh',
          borderRadius: isFullscreen ? '0' : '6px',
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 240, 255, 0.4)',
          overflow: 'hidden',
          transition: 'all 0.2s ease'
        }}
      >
        {/* Retro Header Bar */}
        <div className="retro-window-header" style={{ padding: '6px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>🖥️</span>
            <span style={{ fontWeight: 'bold', fontSize: '11px', letterSpacing: '0.5px' }}>
              OUTLIERS OS v2.6 - [{player.name.toUpperCase()} WORKSPACE // {player.classTitle}]
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Pop out in new tab */}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="arcade-btn"
              style={{
                padding: '3px 8px',
                fontSize: '9px',
                background: '#e2e8f0',
                color: '#000000',
                border: '1px solid #000'
              }}
              title="Open full page in new tab"
            >
              <span>↗</span>
              <span>OPEN EXTERNAL TAB</span>
            </a>

            {/* Maximize */}
            <button
              onClick={() => {
                sound.playCursor();
                setIsFullscreen((prev) => !prev);
              }}
              style={{
                width: '24px',
                height: '22px',
                background: '#e2e8f0',
                color: '#000',
                border: '1px solid #000',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              title={isFullscreen ? 'Restore' : 'Maximize'}
            >
              {isFullscreen ? '❐' : '□'}
            </button>

            {/* Close */}
            <button
              onClick={() => {
                sound.playCursor();
                onClose();
              }}
              style={{
                width: '24px',
                height: '22px',
                background: '#dc2626',
                color: '#ffffff',
                border: '1px solid #7f1d1d',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              title="Close window"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Address / Status Bar */}
        <div 
          style={{
            background: '#f1f5f9',
            borderBottom: '1px solid #94a3b8',
            padding: '5px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: '#334155'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <span style={{ fontWeight: 'bold' }}>TARGET URL:</span>
            <span style={{ color: '#1d4ed8', textDecoration: 'underline' }}>{targetUrl}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span>CONNECTED (LIVE DISPATCH)</span>
          </div>
        </div>

        {/* Iframe Viewport Loading Individual Portfolio Website */}
        <div style={{ position: 'relative', flex: 1, width: '100%', background: '#020617', overflow: 'hidden' }}>
          <iframe
            src={targetUrl}
            title={`${player.name} Portfolio`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="eager"
          />
        </div>

        {/* Retro Status Footer */}
        <div 
          style={{
            background: '#e2e8f0',
            borderTop: '1px solid #cbd5e1',
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: '#64748b'
          }}
        >
          <span>ENGINEERING DISPATCH NODE: {player.name.toUpperCase()} • 2026 SEASON</span>
          <span>PRESS ESC TO RETURN</span>
        </div>
      </div>
    </div>
  );
};
