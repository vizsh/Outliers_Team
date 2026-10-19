import React, { useState } from 'react';
import { PLAYERS, QUEST_NODES, TEAM_INFO, TARGET_PORTFOLIO_URL } from '../data/teamData';
import type { PlayerId } from '../types';
import { sound } from '../services/soundEngine';
import { PixelCharacterSprite } from './PixelCharacterSprite';

interface RecruiterFastModeProps {
  onExitFastMode: () => void;
  onOpenLivePreview: (memberId: PlayerId) => void;
}

export const RecruiterFastMode: React.FC<RecruiterFastModeProps> = ({
  onExitFastMode,
  onOpenLivePreview
}) => {
  const [filter, setFilter] = useState<'all' | 'systems' | 'design' | 'ai'>('all');

  const filteredPlayers = Object.values(PLAYERS).filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'systems') return p.id === 'shreyas';
    if (filter === 'design') return p.id === 'rishit';
    if (filter === 'ai') return p.id === 'jeevesh';
    return true;
  });

  return (
    <div className="recruiter-container">
      {/* Background Subtle Cyber Glow */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url('/attempt1_ui/06_recruiter_speedrun_hub.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1140px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Top Header Navigation */}
        <header className="recruiter-header">
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
              OUTLIERS: RECRUITER FAST-MODE DIRECTORY
            </h1>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
              DIRECT MEMBER PORTFOLIO HUBS // SHREYAS • RISHIT • JEEVESH
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              onClick={() => {
                sound.playCursor();
                onExitFastMode();
              }}
              className="arcade-btn arcade-btn-gold"
              style={{ fontSize: '10px', padding: '8px 14px' }}
            >
              <span>🎮</span>
              <span>RESUME ARCADE MODE [ESC]</span>
            </button>

            <a
              href={TEAM_INFO.hireSquadMailto}
              className="arcade-btn arcade-btn-magenta"
              style={{ fontSize: '10px', padding: '8px 14px' }}
            >
              <span>✉️</span>
              <span>[CONTACT SQUAD]</span>
            </a>
          </div>
        </header>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <span style={{ color: '#94a3b8' }}>FILTER:</span>
          {[
            { id: 'all', label: 'ALL SQUAD (3)' },
            { id: 'systems', label: 'SYSTEMS ARCHITECTURE' },
            { id: 'design', label: 'UI/UX & 3D MOTION' },
            { id: 'ai', label: 'AI/ML & COMPUTER VISION' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                sound.playCursor();
                setFilter(btn.id as typeof filter);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                background: filter === btn.id ? 'var(--neon-cyan)' : '#0e1429',
                borderColor: filter === btn.id ? '#00f0ff' : '#334155',
                color: filter === btn.id ? '#000' : '#cbd5e1'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* 3 Squad Engineer Cards with Pixel Sprites & Direct Launchers */}
        <main className="recruiter-grid">
          {filteredPlayers.map((player, idx) => (
            <div key={player.id} className="recruiter-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '8px' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '3px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--neon-cyan)' }}>
                    {idx + 1}
                  </span>
                  <span style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
                    {player.stats[0]?.value || 95}% MATCH
                  </span>
                </div>

                {/* Pixel Avatar Banner */}
                <div style={{ height: '140px', borderRadius: '4px', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '12px', border: '1px solid #1e293b' }}>
                  <PixelCharacterSprite id={player.id} size="sm" />
                </div>

                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                  {player.name} <span style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--neon-cyan)' }}>({player.classTitle})</span>
                </h2>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  {player.persona}
                </div>

                <p style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: 'var(--font-mono)', marginTop: '10px', lineHeight: '1.4' }}>
                  {player.bio}
                </p>

                {/* Stats Summary */}
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #1e293b', paddingTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                  {player.stats.map((st) => (
                    <div key={st.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>{st.name}:</span>
                      <span style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>{st.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Leads to TARGET_PORTFOLIO_URL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid #1e293b', paddingTop: '10px' }}>
                <a
                  href={player.workspaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arcade-btn"
                  style={{ width: '100%', fontSize: '10px', padding: '10px', background: 'var(--neon-cyan)', color: '#000', fontWeight: 'bold' }}
                >
                  <span>🚀</span>
                  <span>OPEN FULLSCREEN TAB ↗</span>
                </a>

                <button
                  onClick={() => onOpenLivePreview(player.id)}
                  className="arcade-btn arcade-btn-gold"
                  style={{ width: '100%', fontSize: '10px', padding: '8px' }}
                >
                  <span>🖥️</span>
                  <span>PREVIEW IN WINDOW</span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '2px' }}>
                  <a
                    href={player.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arcade-btn"
                    style={{ background: '#1e293b', borderColor: '#475569', fontSize: '9px', padding: '6px' }}
                  >
                    GITHUB ↗
                  </a>
                  <a
                    href={player.workspaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arcade-btn"
                    style={{ background: '#1e293b', borderColor: '#475569', fontSize: '9px', padding: '6px' }}
                  >
                    DIRECT SITE ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* Featured Hackathon Projects List */}
        <section style={{ padding: '20px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.95)', border: '1.5px solid rgba(0, 240, 255, 0.3)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
              ★ 5 NATIONAL HACKATHON VICTORIES // VERIFIED TRACK RECORD
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--neon-gold)', fontFamily: 'var(--font-mono)' }}>
              {TEAM_INFO.hackathonsWon} WINS • {TEAM_INFO.prizeMoney} PRIZE POOL • 2026 SEASON
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {QUEST_NODES.map((q) => (
              <div key={q.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid #0f172a' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff', fontFamily: 'var(--font-mono)' }}>{q.title}</span>
                    <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '2px', background: '#083344', color: '#38bdf8', border: '1px solid #0e7490', fontFamily: 'var(--font-mono)' }}>
                      {q.event}
                    </span>
                    <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '2px', background: '#422006', color: '#facc15', border: '1px solid #a16207', fontFamily: 'var(--font-mono)' }}>
                      {q.award}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginTop: '3px' }}>
                    {q.summary}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={q.liveUrl || TARGET_PORTFOLIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arcade-btn arcade-btn-gold"
                    style={{ fontSize: '9px', padding: '6px 10px' }}
                  >
                    [LIVE DEMO ↗]
                  </a>
                  <a
                    href={q.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arcade-btn"
                    style={{ background: '#1e293b', borderColor: '#475569', fontSize: '9px', padding: '6px 10px' }}
                  >
                    [CODE REPO ↗]
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
