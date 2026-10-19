import React, { useState } from 'react';
import { 
  QUEST_NODES, 
  TEAM_INFO, 
  HACKATHON_TROPHIES, 
  REAL_PROJECTS, 
  TOOLS_AND_TECH, 
  PORTFOLIO_URLS 
} from '../data/teamData';
import type { QuestNode } from '../types';
import { sound } from '../services/soundEngine';

interface CampaignDrawerProps {
  onClose: () => void;
  onOpenLivePreview: () => void;
}

export const CampaignDrawer: React.FC<CampaignDrawerProps> = ({
  onClose,
  onOpenLivePreview
}) => {
  const [activeTab, setActiveTab] = useState<'campaign' | 'projects' | 'trophies'>('campaign');
  const [selectedQuest, setSelectedQuest] = useState<QuestNode>(QUEST_NODES[0]);
  const [selectedTrophy, setSelectedTrophy] = useState<typeof HACKATHON_TROPHIES[0] | null>(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<string>('ai_fullstack');
  const [copiedProposal, setCopiedProposal] = useState<boolean>(false);

  const handleSelectNode = (quest: QuestNode) => {
    setSelectedQuest(quest);
    sound.playCursor();
  };

  const handleOpenTrophy = (trophy: typeof HACKATHON_TROPHIES[0]) => {
    setSelectedTrophy(trophy);
    sound.playTrophyFanfare();
  };

  const handleCopyProposal = () => {
    const text = `OUTLIERS SQUAD ENGAGEMENT PROPOSAL
Team: Shreyas (The Architect), Rishit (The Visualizer), Jeevesh (The Engine)
Target Scope: ${selectedTier === 'ai_fullstack' ? 'Full-Stack AI & Computer Vision Pipeline' : selectedTier === '3d_web' ? '3D WebGL Spatial Experience / Retro Desktop' : 'High-Throughput Distributed Microservices'}
Institution: ${TEAM_INFO.institution} (${TEAM_INFO.department})
Track Record: 5 Hackathons Won (₹1.95L+ Prize Money), 6+ Independent Projects
Contact: ${TEAM_INFO.email}
Team Hub: ${TEAM_INFO.teamPortfolioUrl}`;

    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    sound.playSelect();
    setTimeout(() => setCopiedProposal(false), 2500);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(6px)',
        userSelect: 'none'
      }}
    >
      {/* Outer Retro Modal Frame */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1060px',
          height: '90vh',
          maxHeight: '880px',
          display: 'flex',
          flexDirection: 'column',
          background: '#070a16',
          border: '3px solid var(--neon-cyan)',
          borderRadius: '8px',
          boxShadow: '0 0 45px rgba(0, 240, 255, 0.5)',
          overflow: 'hidden'
        }}
      >
        {/* Header Marquee */}
        <div 
          style={{
            padding: '14px 20px',
            background: '#0d1329',
            borderBottom: '2px solid rgba(0, 240, 255, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🗺️</span>
            <div>
              <h2 
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '16px',
                  color: 'var(--neon-cyan)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                OUTLIERS: CAMPAIGN MODE / SHARED QUESTS
              </h2>
              <div style={{ fontSize: '11px', color: 'var(--neon-magenta)', fontFamily: 'var(--font-mono)' }}>
                {TEAM_INFO.name} // HACKATHON WINS RECORD & PRODUCTION ARCHITECTURES
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playCursor();
              onClose();
            }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              background: '#dc2626',
              color: '#fff',
              fontWeight: 'bold',
              border: '1px solid #f87171',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            padding: '10px 20px',
            background: '#090e23',
            borderBottom: '1.5px solid rgba(0, 240, 255, 0.3)',
            fontFamily: 'var(--font-mono)',
            flexShrink: 0
          }}
        >
          {[
            { id: 'campaign', label: '🗺️ 16-BIT OVERWORLD & DOSSIER' },
            { id: 'trophies', label: '🏆 5 STAGE CHAMPIONSHIPS (PHOTOS)' },
            { id: 'projects', label: '💡 6 PRODUCTION PLATFORMS & TECH' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playCursor();
                setActiveTab(tab.id as typeof activeTab);
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1.5px solid',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
                background: activeTab === tab.id ? 'var(--neon-cyan)' : '#0f172a',
                borderColor: activeTab === tab.id ? '#00f0ff' : '#334155',
                color: activeTab === tab.id ? '#000000' : '#cbd5e1',
                boxShadow: activeTab === tab.id ? '0 0 15px rgba(0, 240, 255, 0.4)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Overworld & Quest Dossier */}
        {activeTab === 'campaign' && (
          <div 
            style={{
              flex: 1,
              overflowY: 'auto',
              minHeight: 0,
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {/* Left Column: Overworld Stage Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--neon-gold)', fontFamily: 'var(--font-mono)', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                <span>★ 16-BIT OVERWORLD STAGE SELECT</span>
                <span style={{ color: '#94a3b8' }}>[CLICK ANY CHECKPOINT OR TROPHY]</span>
              </div>

              {/* Overworld Map Canvas Frame */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '280px',
                  borderRadius: '6px',
                  border: '2px solid rgba(189, 0, 255, 0.7)',
                  overflow: 'hidden',
                  background: '#020617',
                  backgroundImage: `url('/attempt1_ui/03_campaign_quest_mode.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)'
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.4)', pointerEvents: 'none' }} />

                {/* Connecting SVG route lines */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
                  <polyline
                    points="70,90 150,140 230,100 270,180 100,200"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="2.5"
                    strokeDasharray="6,6"
                  />
                </svg>

                {/* Quest Checkpoint Pins */}
                {QUEST_NODES.map((quest) => {
                  const isSelected = selectedQuest.id === quest.id;
                  return (
                    <div
                      key={quest.id}
                      onClick={() => handleSelectNode(quest)}
                      style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        transform: 'translate(-50%, -50%)',
                        left: `${quest.mapCoords.x}%`,
                        top: `${quest.mapCoords.y}%`,
                        zIndex: 20
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {isSelected && (
                          <div style={{ color: 'var(--neon-gold)', fontSize: '11px', fontFamily: 'var(--font-pixel)', animation: 'arrowBounce 0.5s infinite alternate' }}>
                            ▼
                          </div>
                        )}
                        <div 
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid',
                            borderColor: isSelected ? '#ffffff' : 'var(--neon-cyan)',
                            background: isSelected ? 'var(--neon-gold)' : 'rgba(8, 51, 68, 0.9)',
                            color: isSelected ? '#000' : 'var(--neon-cyan)',
                            boxShadow: isSelected ? '0 0 15px #ffd700' : '0 0 10px #00f0ff',
                            transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span style={{ fontSize: '11px' }}>
                            {quest.status === 'CHAMPION' ? '👑' : '📍'}
                          </span>
                        </div>
                        <div 
                          style={{
                            fontSize: '9px',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 'bold',
                            padding: '2px 5px',
                            marginTop: '2px',
                            background: 'rgba(0,0,0,0.92)',
                            border: '1px solid rgba(0, 240, 255, 0.6)',
                            borderRadius: '2px',
                            color: 'var(--neon-cyan)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {quest.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clickable 5 Hackathon Trophies */}
              <div style={{ padding: '12px', borderRadius: '6px', background: '#0e1429', border: '1px solid rgba(255, 215, 0, 0.4)', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 215, 0, 0.3)', paddingBottom: '6px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--neon-gold)' }}>
                    🏆 5 NATIONAL HACKATHON TROPHIES [CLICK FOR STAGE AUDIT]
                  </span>
                  <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold' }}>₹1.95L+ WON</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {HACKATHON_TROPHIES.map((trophy, i) => (
                    <button
                      key={trophy.id}
                      onClick={() => handleOpenTrophy(trophy)}
                      style={{
                        padding: '8px',
                        borderRadius: '4px',
                        background: 'rgba(0,0,0,0.6)',
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '16px' }}>{i === 0 ? '🥇' : i === 1 ? '🏆' : i === 2 ? '👑' : i === 3 ? '🎖️' : '🥉'}</span>
                        <span style={{ fontSize: '9px', color: '#22c55e', fontWeight: 'bold' }}>{trophy.prize.split(' ')[0]}</span>
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--neon-gold)', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {trophy.title.split('(')[0]}
                      </div>
                      <div style={{ fontSize: '9px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {trophy.location}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Quest Dossier & Action */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px', padding: '16px', borderRadius: '6px', background: '#0e1429', border: '1.5px solid rgba(0, 240, 255, 0.5)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0, 240, 255, 0.25)', paddingBottom: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '2px', background: 'rgba(88, 28, 135, 0.6)', border: '1px solid #c084fc', color: '#e9d5ff' }}>
                    {selectedQuest.category}
                  </span>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '2px', background: 'rgba(113, 63, 18, 0.8)', border: '1px solid #facc15', color: '#fef08a', fontWeight: 'bold' }}>
                    ★ {selectedQuest.award}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: '16px', color: 'var(--neon-cyan)', marginBottom: '4px' }}>
                  {selectedQuest.title}
                </h3>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  {selectedQuest.subtitle}
                </div>

                <p style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: 'var(--font-mono)', lineHeight: '1.5', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '4px', border: '1px solid #1e293b' }}>
                  {selectedQuest.summary}
                </p>

                {/* Verified Metrics */}
                <div style={{ marginTop: '12px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--neon-magenta)', fontFamily: 'var(--font-mono)', fontWeight: 'bold', marginBottom: '4px' }}>
                    VERIFIED AUDIT BENCHMARKS:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>
                    {selectedQuest.metrics.map((m, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#10b981' }}>✔</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedQuest.tech.map((t) => (
                    <span key={t} style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '2px', background: '#1e293b', border: '1px solid #334155', color: '#94a3b8' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px', borderTop: '1px solid rgba(0, 240, 255, 0.25)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <a
                    href={selectedQuest.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arcade-btn"
                    style={{ textAlign: 'center', fontSize: '9px', padding: '8px' }}
                  >
                    <span>📦</span>
                    <span>CODE REPO ↗</span>
                  </a>

                  <a
                    href={selectedQuest.liveUrl || PORTFOLIO_URLS.jeevesh}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arcade-btn arcade-btn-gold"
                    style={{ textAlign: 'center', fontSize: '9px', padding: '8px' }}
                  >
                    <span>🚀</span>
                    <span>LIVE DEMO ↗</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    sound.playSelect();
                    setIsHireModalOpen(true);
                  }}
                  className="arcade-btn arcade-btn-magenta"
                  style={{ textAlign: 'center', fontSize: '10px', padding: '10px' }}
                >
                  <span>🤝</span>
                  <span>HIRE ALL 3 AS A SQUAD [PROPOSAL]</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Full Gallery of 5 Trophies with Stage Photos */}
        {activeTab === 'trophies' && (
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--neon-gold)', fontFamily: 'var(--font-mono)' }}>
                  ★ 5 NATIONAL HACKATHON VICTORIES // ONE SEASON RECORD
                </h3>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                  Total Prize Money Won: ₹1.95L+ across Pune, Gandhinagar, and Mumbai
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#22c55e', fontFamily: 'var(--font-mono)' }}>
                100% PODIUM CONVERSION
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {HACKATHON_TROPHIES.map((trophy) => (
                <div
                  key={trophy.id}
                  onClick={() => handleOpenTrophy(trophy)}
                  style={{
                    borderRadius: '6px',
                    background: '#0d1329',
                    border: '1.5px solid rgba(255, 215, 0, 0.4)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, border-color 0.2s ease'
                  }}
                >
                  {/* Stage Photo Banner */}
                  <div style={{ position: 'relative', height: '170px', background: '#000', overflow: 'hidden' }}>
                    <img 
                      src={trophy.image} 
                      alt={trophy.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.85)', padding: '3px 8px', borderRadius: '3px', fontSize: '10px', color: '#ffd700', fontWeight: 'bold', border: '1px solid #ffd700' }}>
                      {trophy.prize}
                    </div>
                    <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.85)', padding: '2px 6px', borderRadius: '3px', fontSize: '9px', color: '#38bdf8' }}>
                      📍 {trophy.location}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'space-between', fontFamily: 'var(--font-mono)' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--neon-gold)', fontWeight: 'bold' }}>
                        {trophy.rank}
                      </div>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', marginTop: '2px' }}>
                        {trophy.title}
                      </h4>
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
                        {trophy.organizer} • {trophy.date}
                      </div>
                      <p style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4', marginTop: '8px' }}>
                        {trophy.description}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenTrophy(trophy);
                      }}
                      className="arcade-btn arcade-btn-gold"
                      style={{ marginTop: '10px', fontSize: '9px', padding: '6px 10px', width: '100%' }}
                    >
                      VIEW AUDIT DETAILS & PROOF ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 6 Production Platforms & Full Tech Stack */}
        {activeTab === 'projects' && (
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
                💡 6 INDEPENDENT PRODUCTION PLATFORMS
              </h3>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                Beyond hackathon sprints, each member builds and ships independent platforms feeding into team capability.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
              {REAL_PROJECTS.map((proj) => (
                <div 
                  key={proj.id}
                  style={{
                    padding: '16px',
                    borderRadius: '6px',
                    background: '#0d1329',
                    border: '1px solid rgba(0, 240, 255, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '2px', background: 'rgba(0, 240, 255, 0.15)', border: '1px solid #00f0ff', color: '#38bdf8' }}>
                        {proj.category}
                      </span>
                      <span style={{ fontSize: '9px', color: '#94a3b8' }}>
                        {proj.tag}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', marginBottom: '6px' }}>
                      {proj.title}
                    </h4>

                    <p style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '10px' }}>
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', borderTop: '1px solid #1e293b', paddingTop: '8px' }}>
                      {proj.tech.map((t) => (
                        <span key={t} style={{ fontSize: '9px', padding: '2px 5px', borderRadius: '2px', background: '#1e293b', color: '#94a3b8' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tools & Tech We Reach For (From PDF Page 4) */}
            <div style={{ padding: '16px', borderRadius: '6px', background: '#0a0f24', border: '1px solid rgba(189, 0, 255, 0.4)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--neon-magenta)', marginBottom: '8px' }}>
                🛠️ CORE TOOLS & TECHNOLOGIES WE REACH FOR (PDF VERIFIED):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {TOOLS_AND_TECH.map((tool) => (
                  <span 
                    key={tool}
                    style={{
                      fontSize: '10px',
                      padding: '4px 10px',
                      borderRadius: '3px',
                      background: 'rgba(189, 0, 255, 0.12)',
                      border: '1px solid rgba(189, 0, 255, 0.5)',
                      color: '#e2e8f0',
                      fontWeight: 'bold'
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trophy Audit Modal Popup with Real Photograph */}
      {selectedTrophy && (
        <div 
          onClick={() => setSelectedTrophy(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10002,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(6px)',
            cursor: 'pointer'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              padding: '20px',
              maxWidth: '520px',
              width: '100%',
              background: '#0f172a',
              border: '2px solid var(--neon-gold)',
              borderRadius: '8px',
              boxShadow: '0 0 45px rgba(255,215,0,0.6)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#e2e8f0',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,215,0,0.4)', paddingBottom: '8px', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--neon-gold)', fontSize: '13px' }}>★ {selectedTrophy.rank}</span>
              <button onClick={() => setSelectedTrophy(null)} style={{ background: 'none', border: 'none', color: '#ff007f', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            {/* Real Winning Stage Cheque / Trophy Photo */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '230px',
                borderRadius: '6px',
                border: '2px solid rgba(255, 215, 0, 0.6)',
                overflow: 'hidden',
                marginBottom: '12px',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img 
                src={selectedTrophy.image} 
                alt={selectedTrophy.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '230px',
                  objectFit: 'contain'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.85)',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  color: 'var(--neon-gold)',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid #ffd700'
                }}
              >
                PROVED: {selectedTrophy.prize}
              </div>
            </div>

            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>
              {selectedTrophy.project}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--neon-cyan)', marginBottom: '8px' }}>
              {selectedTrophy.title} • {selectedTrophy.date}
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '12px' }}>
              Organizer: {selectedTrophy.organizer}
            </div>

            <p style={{ color: '#cbd5e1', lineHeight: '1.5', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '4px', border: '1px solid #1e293b', marginBottom: '12px' }}>
              {selectedTrophy.description}
            </p>

            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold', marginBottom: '14px' }}>
              ✔ {selectedTrophy.metrics}
            </div>

            <button
              onClick={() => setSelectedTrophy(null)}
              className="arcade-btn arcade-btn-gold"
              style={{ width: '100%', textAlign: 'center', padding: '10px' }}
            >
              CLOSE AUDIT [OK]
            </button>
          </div>
        </div>
      )}

      {/* Hire Squad Modal Popup */}
      {isHireModalOpen && (
        <div 
          onClick={() => setIsHireModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10002,
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
              maxWidth: '480px',
              width: '100%',
              background: '#0f172a',
              border: '2px solid var(--neon-magenta)',
              borderRadius: '8px',
              boxShadow: '0 0 35px rgba(255,0,127,0.5)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,0,127,0.4)', paddingBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--neon-magenta)', fontSize: '13px' }}>🤝 ONBOARD THE OUTLIERS SQUAD</span>
              <button onClick={() => setIsHireModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>✕</button>
            </div>

            <p style={{ color: '#cbd5e1', lineHeight: '1.4' }}>
              Deploy Shreyas (The Architect), Rishit (The Visualizer), and Jeevesh (The Engine) as a cohesive engineering triad for your initiative.
            </p>

            <div>
              <div style={{ fontSize: '10px', color: 'var(--neon-cyan)', fontWeight: 'bold', marginBottom: '6px' }}>SELECT INITIATIVE TRACK:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {[
                  { id: 'ai_fullstack', label: 'AI & CV Stack' },
                  { id: '3d_web', label: '3D Spatial Web' },
                  { id: 'distributed', label: 'Systems & Microservices' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '4px',
                      border: '1px solid',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      background: selectedTier === tier.id ? 'var(--neon-magenta)' : '#1e293b',
                      borderColor: selectedTier === tier.id ? '#ff007f' : '#475569',
                      color: selectedTier === tier.id ? '#fff' : '#cbd5e1'
                    }}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
              <button
                onClick={handleCopyProposal}
                className="arcade-btn"
                style={{ width: '100%', textAlign: 'center', padding: '10px' }}
              >
                <span>📋</span>
                <span>{copiedProposal ? 'COPIED TO CLIPBOARD! ✔' : 'COPY SQUAD PROPOSAL BRIEF'}</span>
              </button>

              <a
                href={TEAM_INFO.hireSquadMailto}
                className="arcade-btn arcade-btn-magenta"
                style={{ width: '100%', textAlign: 'center', padding: '10px' }}
              >
                <span>✉️</span>
                <span>DISPATCH EMAIL DIRECTLY (TEAM@OUTLIERS.DEV)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
