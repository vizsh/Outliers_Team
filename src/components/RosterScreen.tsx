import React, { useEffect, useCallback } from 'react';
import type { PlayerId } from '../types';
import { PLAYERS, TEAM_INFO } from '../data/teamData';
import { sound } from '../services/soundEngine';
import { PixelCharacterSprite } from './PixelCharacterSprite';

interface RosterScreenProps {
  selectedId: PlayerId;
  onSelectPlayer: (id: PlayerId) => void;
  onStartBattle: (challengerId: PlayerId) => void;
  onQuickLaunch: (id: PlayerId) => void;
  onOpenCampaign: () => void;
  onOpenFastMode: () => void;
}

export const RosterScreen: React.FC<RosterScreenProps> = ({
  selectedId,
  onSelectPlayer,
  onStartBattle,
  onQuickLaunch,
  onOpenCampaign,
  onOpenFastMode
}) => {
  const playerIds: PlayerId[] = ['shreyas', 'rishit', 'jeevesh'];

  const handleSwitchPlayer = useCallback((newId: PlayerId) => {
    if (newId === selectedId) return;
    onSelectPlayer(newId);
    sound.playCursor();
    const targetPlayer = PLAYERS[newId];
    if (targetPlayer.soundType === 'sword') sound.playSwordDraw();
    else if (targetPlayer.soundType === 'smoke') sound.playSmokePoof();
    else if (targetPlayer.soundType === 'mech') sound.playMechHydraulic();
  }, [selectedId, onSelectPlayer]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = playerIds.indexOf(selectedId);
      if (e.key === 'ArrowLeft') {
        const nextIdx = (currentIndex - 1 + playerIds.length) % playerIds.length;
        handleSwitchPlayer(playerIds[nextIdx]);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = (currentIndex + 1) % playerIds.length;
        handleSwitchPlayer(playerIds[nextIdx]);
      } else if (e.key === 'ArrowDown') {
        onOpenCampaign();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        sound.playSelect();
        onStartBattle(selectedId);
      } else if (e.key === 'Enter') {
        sound.playSelect();
        onQuickLaunch(selectedId);
      } else if (e.key === 'Escape') {
        onOpenFastMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, handleSwitchPlayer, onStartBattle, onQuickLaunch, onOpenCampaign, onOpenFastMode]);

  return (
    <div className="roster-container">
      {/* Background Cyber Stadium */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/attempt1_ui/01_roster_select_screen.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          pointerEvents: 'none'
        }}
      />
      <div className="cyber-grid-floor" />

      {/* Top Header Marquee */}
      <header className="roster-header-box">
        <h1 className="roster-title">
          CHOOSE YOUR PLAYER
        </h1>
        <div className="roster-subtitle">
          {TEAM_INFO.name}: {TEAM_INFO.marquee}
        </div>

        {/* Live Team Metrics Ticker with Real PDF Stats */}
        <div className="roster-stats-ticker">
          <span style={{ color: '#ffd700' }}>
            🏆 HACKATHONS WON: <strong>{TEAM_INFO.hackathonsWon}</strong>
          </span>
          <span style={{ color: '#10b981' }}>
            💰 PRIZE WON: <strong>{TEAM_INFO.prizeMoney}</strong>
          </span>
          <span style={{ color: '#38bdf8' }}>
            🚀 SHIPPED PROJECTS: <strong>{TEAM_INFO.independentProjects}</strong>
          </span>
          <span style={{ color: '#f43f5e' }}>
            📍 CITIES: <strong>{TEAM_INFO.citiesTravelled} (PUNE, GANDHINAGAR, MUMBAI)</strong>
          </span>
          <span style={{ color: '#c084fc' }}>
            🎓 <strong>DJSCE AI & DS</strong>
          </span>
        </div>
      </header>

      {/* Main Roster Columns */}
      <main className="roster-grid">
        {playerIds.map((id) => {
          const player = PLAYERS[id];
          const isSelected = selectedId === id;

          // Member-specific highlight credential from PDF
          const highlightBadge = 
            id === 'shreyas' ? '★ 9.20 CGPA • TOP 8 ICPC 2025' :
            id === 'rishit' ? '★ 8 HACKATHON WINS • 2 CASE COMPS' :
            '★ 9.6 CGPA • 5x NATIONAL CHAMPION';

          return (
            <div
              key={id}
              onClick={() => handleSwitchPlayer(id)}
              className={`player-card ${isSelected ? 'active' : ''}`}
              style={{
                borderColor: isSelected ? player.color : undefined,
                boxShadow: isSelected ? `0 0 30px ${player.color}66, inset 0 0 15px ${player.color}22` : undefined
              }}
            >
              {/* Floating Selection Pointer Arrow */}
              {isSelected && (
                <div className="player-cursor-arrow">
                  <div className="player-cursor-icon">▼</div>
                  <span className="player-cursor-label">ACTIVE</span>
                </div>
              )}

              {/* Player Header */}
              <div className="player-card-header">
                <h2 
                  className="player-name-text"
                  style={{ 
                    color: player.color,
                    textShadow: `0 0 12px ${player.color}aa`
                  }}
                >
                  {player.name}
                </h2>
                <div className="player-class-badge">
                  "{player.classTitle}"
                </div>
                <div 
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 'bold',
                    color: '#ffd700',
                    background: 'rgba(255, 215, 0, 0.12)',
                    border: '1px solid rgba(255, 215, 0, 0.4)',
                    padding: '3px 8px',
                    borderRadius: '3px',
                    marginTop: '4px',
                    textAlign: 'center'
                  }}
                >
                  {highlightBadge}
                </div>
                <div className="player-persona-text" style={{ marginTop: '4px' }}>
                  {player.persona}
                </div>
              </div>

              {/* Character Avatar Visual / Sprite Frame */}
              <div className="player-avatar-box">
                <PixelCharacterSprite id={id} size="md" action={isSelected ? 'idle' : undefined} />

                {/* Specialty Attack Preview Tag */}
                <div className="player-special-tag">
                  <span style={{ color: 'var(--neon-magenta)', fontWeight: 'bold' }}>SPECIAL:</span>
                  <span style={{ color: 'var(--neon-gold)' }}>{player.attackName}</span>
                </div>
              </div>

              {/* 4 LED Stat Meters */}
              <div className="stat-bars-box">
                {player.stats.map((stat) => (
                  <div key={stat.name} className="stat-row">
                    <div className="stat-info">
                      <span>{stat.name}</span>
                      <span style={{ color: stat.color, fontWeight: 'bold' }}>{stat.value}%</span>
                    </div>
                    {/* Segmented LED blocks */}
                    <div className="stat-led-grid">
                      {Array.from({ length: 10 }).map((_, i) => {
                        const filled = (i + 1) * 10 <= stat.value;
                        return (
                          <div
                            key={i}
                            className="stat-led-block"
                            style={{
                              backgroundColor: filled ? stat.color : '#1e293b',
                              boxShadow: filled ? `0 0 6px ${stat.color}` : 'none'
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Action Buttons */}
              <div className="card-actions-box">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playSelect();
                    onStartBattle(id);
                  }}
                  className="arcade-btn"
                  style={{ width: '100%' }}
                >
                  <span>⚔️</span>
                  <span>FIGHT & ENTER</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playSelect();
                    onQuickLaunch(id);
                  }}
                  className="arcade-btn arcade-btn-magenta"
                  style={{ width: '100%', fontSize: '9px', padding: '8px 12px' }}
                >
                  <span>⚡</span>
                  <span>LAUNCH {player.name.split(' ')[0].toUpperCase()}'S SITE ↗</span>
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {/* Bottom Navigation & Campaign Mode Drawer Prompt */}
      <footer className="roster-footer">
        <div className="keybindings-list">
          <span className="key-badge">← / → : SELECT</span>
          <span className="key-badge" style={{ color: 'var(--neon-gold)' }}>SPACE : BATTLE</span>
          <span className="key-badge" style={{ color: 'var(--neon-magenta)' }}>ENTER : LAUNCH</span>
          <span className="key-badge" style={{ color: 'var(--neon-green)' }}>ESC : FAST MODE</span>
        </div>

        <button
          onClick={onOpenCampaign}
          className="arcade-btn arcade-btn-gold"
          style={{ fontSize: '11px', padding: '10px 18px' }}
        >
          <span>🗺️</span>
          <span>SHARED CAMPAIGN (TEAM PROJECTS) [↓]</span>
        </button>
      </footer>
    </div>
  );
};
