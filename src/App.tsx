import React, { useState, useEffect } from 'react';
import type { GamePhase, PlayerId } from './types';
import { BootScreen } from './components/BootScreen';
import { RosterScreen } from './components/RosterScreen';
import { BattleScreen } from './components/BattleScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { CampaignDrawer } from './components/CampaignDrawer';
import { RecruiterFastMode } from './components/RecruiterFastMode';
import { LivePortfolioModal } from './components/LivePortfolioModal';
import { VirtualArcadeControls } from './components/VirtualArcadeControls';
import { CRTOverlay } from './components/CRTOverlay';

export const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('boot');
  const [isFastMode, setIsFastMode] = useState<boolean>(false);
  const [isCampaignOpen, setIsCampaignOpen] = useState<boolean>(false);
  const [livePreviewMember, setLivePreviewMember] = useState<PlayerId | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<PlayerId>('rishit');
  const [challengerId, setChallengerId] = useState<PlayerId>('rishit');
  const [winnerId, setWinnerId] = useState<PlayerId>('rishit');

  const playerIds: PlayerId[] = ['shreyas', 'rishit', 'jeevesh'];

  // Global escape key handler to toggle fast mode or close drawers
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (livePreviewMember) {
          setLivePreviewMember(null);
        } else if (isCampaignOpen) {
          setIsCampaignOpen(false);
        } else if (phase !== 'battle') {
          setIsFastMode((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [livePreviewMember, isCampaignOpen, phase]);

  const handleStartGame = () => {
    setPhase('roster');
  };

  const handleStartBattle = (pId: PlayerId) => {
    setChallengerId(pId);
    setPhase('battle');
  };

  const handleQuickLaunch = (pId: PlayerId) => {
    setWinnerId(pId);
    setPhase('victory');
  };

  const handleBattleVictory = (wId: PlayerId) => {
    setWinnerId(wId);
    setPhase('victory');
  };

  const handleSkipBattle = () => {
    setWinnerId(challengerId);
    setPhase('victory');
  };

  const handleBackToRoster = () => {
    setPhase('roster');
  };

  // Mobile virtual arcade handlers
  const handleVirtualLeft = () => {
    const currentIndex = playerIds.indexOf(selectedPlayerId);
    const nextIdx = (currentIndex - 1 + playerIds.length) % playerIds.length;
    setSelectedPlayerId(playerIds[nextIdx]);
  };

  const handleVirtualRight = () => {
    const currentIndex = playerIds.indexOf(selectedPlayerId);
    const nextIdx = (currentIndex + 1) % playerIds.length;
    setSelectedPlayerId(playerIds[nextIdx]);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black text-white font-sans">
      {/* CRT Scanline Filter and Top-Right HUD Bar */}
      <CRTOverlay
        isFastMode={isFastMode}
        onToggleFastMode={() => setIsFastMode((prev) => !prev)}
      />

      {/* Main Screen Router */}
      {isFastMode ? (
        <RecruiterFastMode
          onExitFastMode={() => setIsFastMode(false)}
          onOpenLivePreview={(id) => setLivePreviewMember(id)}
        />
      ) : (
        <>
          {phase === 'boot' && <BootScreen onStart={handleStartGame} />}

          {phase === 'roster' && (
            <>
              <RosterScreen
                selectedId={selectedPlayerId}
                onSelectPlayer={setSelectedPlayerId}
                onStartBattle={handleStartBattle}
                onQuickLaunch={handleQuickLaunch}
                onOpenCampaign={() => setIsCampaignOpen(true)}
                onOpenFastMode={() => setIsFastMode(true)}
              />
              {/* Virtual Arcade Controls for Mobile Users */}
              <VirtualArcadeControls
                onLeft={handleVirtualLeft}
                onRight={handleVirtualRight}
                onDown={() => setIsCampaignOpen(true)}
                onActionA={() => handleStartBattle(selectedPlayerId)}
                onActionB={() => handleQuickLaunch(selectedPlayerId)}
              />
            </>
          )}

          {phase === 'battle' && (
            <BattleScreen
              challengerId={challengerId}
              onVictory={handleBattleVictory}
              onSkip={handleSkipBattle}
            />
          )}

          {phase === 'victory' && (
            <VictoryScreen
              winnerId={winnerId}
              onBackToRoster={handleBackToRoster}
              onOpenLivePreview={(id) => setLivePreviewMember(id)}
            />
          )}
        </>
      )}

      {/* Shared Campaign / Team Quests Modal Drawer */}
      {isCampaignOpen && (
        <CampaignDrawer
          onClose={() => setIsCampaignOpen(false)}
          onOpenLivePreview={() => setLivePreviewMember(selectedPlayerId)}
        />
      )}

      {/* In-Browser CRT Live Preview Modal (Rendering https://updatedportfoliowebsite.vercel.app/) */}
      {livePreviewMember && (
        <LivePortfolioModal
          memberId={livePreviewMember}
          onClose={() => setLivePreviewMember(null)}
        />
      )}
    </div>
  );
};

export default App;
