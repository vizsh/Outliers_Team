import React, { useEffect, useState } from 'react';
import { sound } from '../services/soundEngine';

interface BootScreenProps {
  onStart: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onStart }) => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        handleTriggerStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTriggerStart = () => {
    sound.init();
    sound.playCoin();
    setTimeout(() => {
      sound.playBoot();
      onStart();
    }, 200);
  };

  return (
    <div onClick={handleTriggerStart} className="boot-container">
      {/* Perspective Grid Floor */}
      <div className="cyber-grid-floor" />

      {/* Main Arcade Marquee Card */}
      <div className="boot-marquee-box">
        <div className="boot-tagline">
          ★ OUTLIERS CO-OP ARCADE SYSTEM v2.6 ★
        </div>

        <h1 className="boot-title">
          OUTLIERS
        </h1>

        <div className="boot-subtitle">
          3 PLAYERS READY // LEVEL 99 SYNERGY
        </div>

        {/* Coin Slot Box */}
        <div className="boot-coin-slot">
          <div 
            className="boot-coin-text"
            style={{ opacity: blink ? 1 : 0.2 }}
          >
            INSERT COIN / PRESS START
          </div>
          <div className="boot-coin-sub">
            [ CLICK ANYWHERE OR PRESS SPACE ]
          </div>
        </div>

        {/* Audio unlock note */}
        <div style={{ marginTop: '16px', fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
          🔊 CLICK TO INITIALIZE 16-BIT AUDIO & RETRO SYNTHESIZER
        </div>

        <div className="boot-credit">
          ENGINEERED BY SHREYAS • RISHIT • JEEVESH // © 2026
        </div>
      </div>
    </div>
  );
};
