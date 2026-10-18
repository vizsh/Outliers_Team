export type PlayerId = 'shreyas' | 'rishit' | 'jeevesh';

export interface PlayerStat {
  name: string;
  value: number; // 0 - 100
  color: string;
}

export interface Player {
  id: PlayerId;
  name: string;
  classTitle: string;
  persona: string;
  tagline: string;
  bio: string;
  color: string;
  accentColor: string;
  stats: PlayerStat[];
  avatarImage: string;
  attackName: string;
  attackType: string;
  attackDescription: string;
  soundType: 'sword' | 'smoke' | 'mech';
  workspaceUrl: string;
  workspaceName: string;
  githubUrl: string;
  resumeUrl: string;
  specialMoveKey: string;
}

export interface QuestNode {
  id: string;
  title: string;
  subtitle: string;
  category: 'Health-Tech' | 'Computer Vision' | 'Defense & Border Security' | 'FinTech & Quant' | 'Rapid Engineering';
  event: string;
  award: string;
  year: string;
  summary: string;
  tech: string[];
  metrics: string[];
  repoUrl: string;
  liveUrl?: string;
  status: 'COMPLETED' | 'CHAMPION' | 'VERIFIED';
  mapCoords: { x: number; y: number }; // Percentage 0-100 on the overworld map
}

export type GamePhase = 'boot' | 'roster' | 'battle' | 'victory';

export interface BattleState {
  challenger: PlayerId;
  opponent: PlayerId;
  challengerHp: number; // 0 - 100
  opponentHp: number;   // 0 - 100
  roundTime: number;
  mashCount: number;
  mashTarget: number;
  combatLog: string[];
  winner: PlayerId | null;
  phase: 'intro' | 'fighting' | 'special' | 'ko';
}
