import type { Player, QuestNode } from '../types';

export const TARGET_PORTFOLIO_URL = 'https://updatedportfoliowebsite.vercel.app/';

export const TEAM_INFO = {
  name: 'OUTLIERS CO-OP',
  marquee: '3 PLAYERS READY // LEVEL 99 SYNERGY',
  hackathonsWon: 12,
  systemsShipped: 24,
  bugsSlain: '99K+',
  commitsTotal: '1,420+',
  email: 'team@outliers.dev',
  portfolioUrl: TARGET_PORTFOLIO_URL,
  hireSquadMailto: 'mailto:team@outliers.dev?subject=Hiring%20The%20Outliers%20Squad&body=Hello%20Outliers%20Team,%0D%0A%0D%0AWe%20are%20interested%20in%20onboarding%20your%20squad%20for%20our%20engineering%20initiative.%0D%0A%0D%0ABest%20regards,'
};

export const PLAYERS: Record<string, Player> = {
  shreyas: {
    id: 'shreyas',
    name: 'Shreyas',
    classTitle: 'THE ARCHITECT',
    persona: 'Cyber Knight Paladin',
    tagline: 'Master of Scalable Systems, Backend Architecture & Algorithmic Pipelines',
    bio: 'Specializing in resilient distributed architectures, zero-latency microservices, and robust database design. Champions clean system boundaries, Kubernetes orchestration, and high-throughput pipelines.',
    color: '#00f0ff',
    accentColor: '#bd00ff',
    stats: [
      { name: 'System Design', value: 98, color: '#00f0ff' },
      { name: 'Backend Arch', value: 94, color: '#38bdf8' },
      { name: 'Algorithms', value: 92, color: '#a855f7' },
      { name: 'Distributed Systems', value: 95, color: '#ec4899' }
    ],
    avatarImage: '/attempt1_ui/01_roster_select_screen.jpg',
    attackName: 'DATA SURGE',
    attackType: 'Backend Tech Blast',
    attackDescription: 'Fires high-voltage binary streams, logic gates, and server terminal packets across the arena deck.',
    soundType: 'sword',
    workspaceName: 'THE ARCHITECT WORKSPACE (3D RETRO OS)',
    workspaceUrl: `${TARGET_PORTFOLIO_URL}?member=shreyas`,
    githubUrl: 'https://github.com/outliers-coop',
    resumeUrl: '#',
    specialMoveKey: 'Z'
  },
  rishit: {
    id: 'rishit',
    name: 'Rishit',
    classTitle: 'THE VISUALIZER',
    persona: 'Neon Shinobi Ninja',
    tagline: 'Creative Motion Architect, Shader Specialist & High-Fidelity Interaction Designer',
    bio: 'Crafts bespoke digital experiences with procedural GLSL shaders, 60fps micro-animations, and hyper-polished design systems that captivate users from first glance.',
    color: '#10b981',
    accentColor: '#f43f5e',
    stats: [
      { name: 'UI / UX Design', value: 96, color: '#10b981' },
      { name: 'Motion & Shaders', value: 95, color: '#34d399' },
      { name: 'Interaction Eng', value: 93, color: '#f59e0b' },
      { name: 'Visual Polish', value: 97, color: '#f43f5e' }
    ],
    avatarImage: '/attempt1_ui/01_roster_select_screen.jpg',
    attackName: 'DESIGN STRIKE',
    attackType: 'Creative Explosion',
    attackDescription: 'Leaps with chromatic paint splatters, glowing bezier curves, and dynamic vector ribbons.',
    soundType: 'smoke',
    workspaceName: 'THE VISUALIZER LAB (3D RETRO OS)',
    workspaceUrl: `${TARGET_PORTFOLIO_URL}?member=rishit`,
    githubUrl: 'https://github.com/outliers-coop',
    resumeUrl: '#',
    specialMoveKey: 'X'
  },
  jeevesh: {
    id: 'jeevesh',
    name: 'Jeevesh',
    classTitle: 'THE ENGINE',
    persona: 'Heavy Mech Cyber Brawler',
    tagline: 'AI / ML Computer Vision Engineer, Production Full-Stack & Model Convergence',
    bio: 'Undergraduate in AI & Data Science (9.6 CGPA, DJSCE). Builds real-time computer vision pipelines (92% mAP50), quantitative financial models, and Henry Heffernan 3D retro workstations.',
    color: '#06b6d4',
    accentColor: '#f97316',
    stats: [
      { name: 'Full-Stack Eng', value: 96, color: '#06b6d4' },
      { name: 'AI / ML Models', value: 94, color: '#3b82f6' },
      { name: 'Cloud & Ops', value: 90, color: '#eab308' },
      { name: 'Computer Vision', value: 95, color: '#f97316' }
    ],
    avatarImage: '/attempt1_ui/01_roster_select_screen.jpg',
    attackName: 'MODEL CONVERGENCE',
    attackType: 'Mech Overclock',
    attackDescription: 'Slams hydraulic gauntlets into the deck, projecting 3D wireframe tensor matrices and seismic shockwaves.',
    soundType: 'mech',
    workspaceName: 'HENRY HEFFERNAN 3D WORKSTATION',
    workspaceUrl: `${TARGET_PORTFOLIO_URL}?member=jeevesh`,
    githubUrl: 'https://github.com/vizsh',
    resumeUrl: `${TARGET_PORTFOLIO_URL}`,
    specialMoveKey: 'C'
  }
};

export const HACKATHON_TROPHIES = [
  {
    id: 'trophy-di',
    title: 'Decentralised Intelligence Hackathon (2026)',
    rank: '🏆 CHAMPION // 1ST PLACE',
    project: 'NeuroScope 3D — Cranial Tumor Segmentation',
    metrics: '17/17 Judge Verification Tests Passed • MONAI SegResNet Model',
    date: 'February 2026',
    description: 'Developed an in-browser 3D raymarching DICOM viewer with synchronized MPR slices (axial, coronal, sagittal) displaying tumour volumes with Dice confidence metrics.'
  },
  {
    id: 'trophy-drishti',
    title: 'Drishti AI National Hackathon (2026)',
    rank: '🏆 1ST PLACE WINNER',
    project: 'Kinesis AI — Exam Behavioral Surveillance',
    metrics: '92% mAP50 Benchmark • Zero Facial Biometric Retention',
    date: 'March 2026',
    description: 'Engineered a real-time computer vision pipeline monitoring exam-hall behavior from standard CCTV footage without collecting facial biometrics, resolving identity via camera-calibrated seat positioning.'
  },
  {
    id: 'trophy-sih',
    title: 'Smart India Hackathon (2026)',
    rank: '🏆 NATIONAL FINALIST // MHA & SSB',
    project: 'SIH IBVAP — Border Surveillance System',
    metrics: 'Sub-second ANPR OCR • Cross-Checkpoint Vehicle Re-ID',
    date: 'January 2026',
    description: 'Built cross-post vehicle-person correlation algorithms and dirt-occlusion robust number plate recognition addressing national border security specifications.'
  }
];

export const QUEST_NODES: QuestNode[] = [
  {
    id: 'neuroscope',
    title: 'NeuroScope 3D',
    subtitle: 'Cranial Tumor Segmentation & Trust Engine',
    category: 'Health-Tech',
    event: 'Decentralised Intelligence Hackathon (2026)',
    award: 'Champion & Judge Verified (17/17 Tests)',
    year: '2026',
    summary: 'A web-based 3D digital twin of the brain with nested WT / TC / ET tumor isosurfaces linked to synchronised MPR slices. Validated with MONAI SegResNet and real-time volumetric analysis.',
    tech: ['Three.js', 'MONAI', 'PyTorch', 'WebGL', 'FastAPI'],
    metrics: ['17/17 Judge Verification Tests', '3D Raymarching DICOM', 'Sub-100ms Inference'],
    repoUrl: 'https://github.com/vizsh/NeuroScope3D',
    liveUrl: TARGET_PORTFOLIO_URL,
    status: 'CHAMPION',
    mapCoords: { x: 22, y: 35 }
  },
  {
    id: 'kinesis-ai',
    title: 'Kinesis AI / Drishti',
    subtitle: 'Exam Behavioral Surveillance Without Biometrics',
    category: 'Computer Vision',
    event: 'Drishti AI Hackathon (2026)',
    award: '1st Place Winner',
    year: '2026',
    summary: 'Engineered real-time behavioral posture anomaly detection on standard CCTV streams without collecting or storing facial biometric data, resolving student identity via camera-calibrated seat positioning.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'TensorRT', 'FastAPI'],
    metrics: ['92% mAP50 Benchmark', '25K+ Trained Images', 'Zero Biometric Retention'],
    repoUrl: 'https://github.com/vizsh',
    liveUrl: TARGET_PORTFOLIO_URL,
    status: 'CHAMPION',
    mapCoords: { x: 48, y: 52 }
  },
  {
    id: 'sih-ibvap',
    title: 'SIH IBVAP',
    subtitle: 'Border Security & Vehicle Correlation System',
    category: 'Defense & Border Security',
    event: 'Smart India Hackathon (2026)',
    award: 'National Finalist (MHA / SSB)',
    year: '2026',
    summary: 'Engineered automatic number plate recognition (ANPR) and cross-post vehicle-person re-identification algorithms against official Ministry of Home Affairs / SSB specifications.',
    tech: ['Python', 'OpenCV', 'ANPR OCR', 'Vehicle Re-ID', 'PyTorch'],
    metrics: ['Sub-second Plate Detection', 'Cross-checkpoint Tracking', 'Dirt Occlusion Robust'],
    repoUrl: 'https://github.com/vizsh',
    liveUrl: TARGET_PORTFOLIO_URL,
    status: 'VERIFIED',
    mapCoords: { x: 74, y: 68 }
  },
  {
    id: 'jarvis-hedge-fund',
    title: 'Jarvis Hedge Fund',
    subtitle: 'Bilingual Quantitative Valuation Engine',
    category: 'FinTech & Quant',
    event: 'Engineering Production (2025-2026)',
    award: '532 Passing Tests // Production Grade',
    year: '2026',
    summary: 'High-throughput algorithmic valuation engine supporting bilingual English & Hindi workflows with deterministic DCF modeling and Monte Carlo risk simulations.',
    tech: ['Python', 'FastAPI', 'Pandas', 'NumPy', 'PyTest'],
    metrics: ['532 Unit & Integration Tests', 'Bilingual EN/HI', '100% Deterministic'],
    repoUrl: 'https://github.com/vizsh',
    liveUrl: TARGET_PORTFOLIO_URL,
    status: 'VERIFIED',
    mapCoords: { x: 38, y: 78 }
  },
  {
    id: 'zenith-rapid',
    title: 'Zenith Architecture',
    subtitle: 'Full-Stack Rapid Team Deployment',
    category: 'Rapid Engineering',
    event: 'Sathaye College Hackathon (2026)',
    award: 'Rapid Engineering Winner',
    year: '2026',
    summary: 'Complete end-to-end full-stack web and API architecture delivered under tight 24-hour hackathon constraints.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    metrics: ['Delivered in 24h', 'Zero Downtime', 'Modular Monorepo'],
    repoUrl: 'https://github.com/vizsh',
    liveUrl: TARGET_PORTFOLIO_URL,
    status: 'COMPLETED',
    mapCoords: { x: 82, y: 32 }
  }
];
