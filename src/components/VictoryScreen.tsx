import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import type { PlayerId } from '../types';
import { PLAYERS } from '../data/teamData';
import { sound } from '../services/soundEngine';
import { PixelCharacterSprite } from './PixelCharacterSprite';

interface VictoryScreenProps {
  winnerId: PlayerId;
  onBackToRoster: () => void;
  onOpenLivePreview: (memberId: PlayerId) => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  winnerId,
  onBackToRoster,
  onOpenLivePreview
}) => {
  const winner = PLAYERS[winnerId];
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [bootStep, setBootStep] = useState<number>(0);

  useEffect(() => {
    sound.playVictory();

    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff007f', '#ffd700', '#10b981']
      });
    } catch {}

    const s1 = setTimeout(() => setBootStep(1), 300);
    const s2 = setTimeout(() => setBootStep(2), 700);
    const s3 = setTimeout(() => setBootStep(3), 1100);
    const s4 = setTimeout(() => setBootStep(4), 1500);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
    };
  }, []);

  const handleLaunchExternal = () => {
    sound.playWarp();
    setIsWarping(true);

    setTimeout(() => {
      window.open(winner.workspaceUrl, '_blank', 'noopener,noreferrer');
      setIsWarping(false);
    }, 700);
  };

  const handleLaunchEmbedded = () => {
    sound.playSelect();
    onOpenLivePreview(winnerId);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleLaunchExternal();
      } else if (e.key === 'p' || e.key === 'P') {
        handleLaunchEmbedded();
      } else if (e.key === 'Escape') {
        onBackToRoster();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [winner.workspaceUrl, onBackToRoster, onOpenLivePreview, winnerId]);

  return (
    <div className={`victory-container ${isWarping ? 'screen-warp-collapse' : ''}`}>
      {/* Background Cyber Stadium */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/attempt1_ui/04_victory_launch_screen.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          pointerEvents: 'none'
        }}
      />
      <div className="cyber-grid-floor" />

      {/* Top Victory Banner */}
      <header className="victory-banner-box">
        <h1 className="victory-title">
          VICTORY! {winner.name.toUpperCase()} WINS!
        </h1>
        <div className="victory-subtitle">
          ★ FLAWLESS COMPILATION // ZERO RUNTIME ERRORS ★
        </div>
      </header>

      {/* Center Winner Champion Stance */}
      <main style={{ position: 'relative', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto 0' }}>
        <PixelCharacterSprite id={winnerId} size="lg" action="victory" />

        <div 
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '24px',
            fontWeight: 900,
            color: 'var(--neon-gold)',
            marginTop: '12px',
            textShadow: '0 0 15px #ffd700',
            textTransform: 'uppercase'
          }}
        >
          {winner.name}
        </div>
        <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
          "{winner.classTitle}"
        </div>
        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#cbd5e1', maxWidth: '420px', textAlign: 'center', marginTop: '4px' }}>
          {winner.tagline}
        </div>
      </main>

      {/* Bottom Retro OS Dialog & Launch Portal */}
      <footer style={{ position: 'relative', zIndex: 20, width: '100%', maxWidth: '720px' }}>
        <div className="retro-window">
          <div className="retro-window-header">
            <span>{winner.name.toUpperCase()}.EXE - [PORTFOLIO WORKSPACE DISPATCH]</span>
            <div style={{ display: 'flex', gap: '3px' }}>
              <span style={{ padding: '0 4px', background: '#e2e8f0', color: '#000', border: '1px solid #000', fontSize: '9px' }}>_</span>
              <span style={{ padding: '0 4px', background: '#e2e8f0', color: '#000', border: '1px solid #000', fontSize: '9px' }}>□</span>
              <span onClick={onBackToRoster} style={{ padding: '0 4px', background: '#e2e8f0', color: '#000', border: '1px solid #000', fontSize: '9px', cursor: 'pointer' }}>✕</span>
            </div>
          </div>

          <div style={{ padding: '16px', background: '#0f172a', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>&gt; BIOS VERIFY: 640K CONVENTIONAL RAM ... [OK]</div>
            {bootStep >= 1 && (
              <div>&gt; MOUNTING {winner.name.toUpperCase()}_WORKSPACE.EXE ... [OK]</div>
            )}
            {bootStep >= 2 && (
              <div>&gt; INITIALIZING 3D ENVIRONMENT ({winner.workspaceName}) ... [OK]</div>
            )}
            {bootStep >= 3 && (
              <div>&gt; CONNECTING EDGE NODE: {winner.workspaceUrl} ... [CONNECTED]</div>
            )}
            {bootStep >= 4 && (
              <div style={{ color: 'var(--neon-gold)', fontWeight: 'bold', marginTop: '4px' }}>
                &gt; READY TO LAUNCH // CHOOSE LAUNCH MODE BELOW:
              </div>
            )}

            {/* Launch CTA Buttons */}
            <div style={{ paddingTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button
                onClick={handleLaunchExternal}
                className="arcade-btn"
                style={{ flex: 1, minWidth: '220px', background: 'var(--neon-cyan)', color: '#000', fontWeight: 'bold' }}
              >
                <span>🚀</span>
                <span>OPEN FULLSCREEN TAB [ENTER] ↗</span>
              </button>

              <button
                onClick={handleLaunchEmbedded}
                className="arcade-btn arcade-btn-gold"
                style={{ flex: 1, minWidth: '200px' }}
              >
                <span>🖥️</span>
                <span>PREVIEW IN RETRO WINDOW [P]</span>
              </button>

              <button
                onClick={onBackToRoster}
                className="arcade-btn arcade-btn-magenta"
                style={{ minWidth: '130px' }}
              >
                ← ROSTER [ESC]
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
