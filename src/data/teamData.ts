import type { Player, QuestNode } from '../types';

export const PORTFOLIO_URLS = {
  shreyas: 'https://shreyas-six.vercel.app/',
  rishit: 'https://rishit-lahoti-premiere.creamstar32.chatgpt.site',
  jeevesh: 'https://updatedportfoliowebsite.vercel.app/'
};

// Fallback / legacy alias
export const TARGET_PORTFOLIO_URL = PORTFOLIO_URLS.jeevesh;

export const TEAM_INFO = {
  name: 'TEAM OUTLIERS',
  institution: 'DJ Sanghvi College of Engineering (DJSCE), Mumbai',
  department: 'Artificial Intelligence & Data Science',
  season: '2026 Season',
  marquee: '5 WINS • ONE SEASON • ₹1.95L+ PRIZE POOL • STILL BUILDING',
  hackathonsWon: 5,
  prizeMoney: '₹1.95L+',
  coreMembers: 3,
  independentProjects: '6+',
  citiesTravelled: 3,
  email: 'team@outliers.dev',
  hireSquadMailto: 'mailto:team@outliers.dev?subject=Outliers%20Team%20Inquiry',
  teamPortfolioUrl: 'https://outliersteam.vercel.app',
  philosophy: [
    {
      step: '01',
      title: 'Find the real problem',
      desc: 'Every build starts by scoping a problem statement down to the constraint that actually matters — for a factory, a resort, a logistics chain, or a hospital — before writing a line of code.'
    },
    {
      step: '02',
      title: 'Ship a full stack, fast',
      desc: 'In a single sprint we move from data pipeline to backend API to a usable interface, leaning on FastAPI, Node/React and LLM orchestration frameworks to move quickly without cutting corners.'
    },
    {
      step: '03',
      title: 'Make it feel real',
      desc: 'Demos are judged in minutes, so we invest in interaction and visualization — dashboards, 3D views and live agents — so judges experience the product, not just a pitch.'
    }
  ]
};

export const PLAYERS: Record<string, Player> = {
  shreyas: {
    id: 'shreyas',
    name: 'Shreyas Kale',
    classTitle: 'GENAI & FULL-STACK DEVELOPER',
    persona: 'The Architect // Cyber Paladin',
    tagline: 'LLM Orchestration, Real-Time AI Microservices & Scalable Distributed Backends',
    bio: 'Builds the LLM orchestration and real-time backend layer — LangChain, CrewAI, AutoGen, and FastAPI — that each hackathon demo runs on. Top 8 in ICPC college round 2025; 9.20 CGPA at DJSCE.',
    color: '#00f0ff',
    accentColor: '#bd00ff',
    stats: [
      { name: 'LLM Orchestration', value: 98, color: '#00f0ff' },
      { name: 'Backend & FastAPI', value: 95, color: '#38bdf8' },
      { name: 'Algorithmic Speed', value: 94, color: '#a855f7' },
      { name: 'Full-Stack Delivery', value: 92, color: '#ec4899' }
    ],
    avatarImage: '/attempt1_ui/01_roster_select_screen.jpg',
    attackName: 'DATA SURGE',
    attackType: 'LLM Agent Swarm Blast',
    attackDescription: 'Fires high-throughput CrewAI/LangChain agent streams and real-time FastAPI logic packets across the arena.',
    soundType: 'sword',
    workspaceName: 'SHREYAS KALE // GENAI PORTFOLIO',
    workspaceUrl: PORTFOLIO_URLS.shreyas,
    githubUrl: 'https://github.com/vizsh/Outliers_Team',
    resumeUrl: PORTFOLIO_URLS.shreyas,
    specialMoveKey: 'Z'
  },
  rishit: {
    id: 'rishit',
    name: 'Rishit Lahoti',
    classTitle: 'AI & FULL-STACK ENGINEER',
    persona: 'The Visualizer // Neon Shinobi',
    tagline: 'Applied Generative AI, Data Analysis, Backend Systems & Agile Delivery',
    bio: 'Focuses on generative AI, data analysis, and backend systems, carrying agile delivery habits from case competitions into high-speed hackathon sprints. 8 hackathon wins and 2 case-competition wins across his career.',
    color: '#10b981',
    accentColor: '#f43f5e',
    stats: [
      { name: 'Applied GenAI', value: 96, color: '#10b981' },
      { name: 'Data Analysis', value: 94, color: '#34d399' },
      { name: 'Backend Systems', value: 95, color: '#f59e0b' },
      { name: 'Agile Delivery', value: 97, color: '#f43f5e' }
    ],
    avatarImage: '/attempt1_ui/01_roster_select_screen.jpg',
    attackName: 'DESIGN STRIKE',
    attackType: 'Applied AI Vector Strike',
    attackDescription: 'Leaps with chromatic multi-vector data beams, rapid analytic arrays, and high-velocity ninja shurikens.',
    soundType: 'smoke',
    workspaceName: 'RISHIT LAHOTI // PREMIERE PORTFOLIO',
    workspaceUrl: PORTFOLIO_URLS.rishit,
    githubUrl: 'https://github.com/vizsh/Outliers_Team',
    resumeUrl: PORTFOLIO_URLS.rishit,
    specialMoveKey: 'X'
  },
  jeevesh: {
    id: 'jeevesh',
    name: 'Jeevesh Bodhani',
    classTitle: 'AI & COMPUTER VISION ENGINEER',
    persona: 'The Engine // Heavy Cyber Mech',
    tagline: 'Computer Vision (PyTorch), 3D Interactive Spatial WebGL & Model Convergence',
    bio: 'Undergraduate in AI & Data Science at DJSCE (9.6 CGPA). Builds production computer vision pipelines (92% mAP50 benchmark), PyTorch deep learning models, and interactive Three.js 3D workstation environments. Five-time national hackathon champion.',
    color: '#06b6d4',
    accentColor: '#f97316',
    stats: [
      { name: 'Computer Vision', value: 98, color: '#06b6d4' },
      { name: 'PyTorch / Deep Learning', value: 95, color: '#3b82f6' },
      { name: '3D WebGL / Three.js', value: 94, color: '#eab308' },
      { name: 'Full-Stack Eng', value: 96, color: '#f97316' }
    ],
    avatarImage: '/attempt1_ui/01_roster_select_screen.jpg',
    attackName: 'MODEL CONVERGENCE',
    attackType: 'Seismic Tensor Shockwave',
    attackDescription: 'Slams hydraulic electric gauntlets into the deck, erupting 3D wireframe tensor matrices and blue electrical shockwaves.',
    soundType: 'mech',
    workspaceName: 'JEEVESH BODHANI // 3D DESKTOP WORKSPACE',
    workspaceUrl: PORTFOLIO_URLS.jeevesh,
    githubUrl: 'https://github.com/vizsh',
    resumeUrl: PORTFOLIO_URLS.jeevesh,
    specialMoveKey: 'C'
  }
};

export const HACKATHON_TROPHIES = [
  {
    id: 'trophy-hackout',
    title: 'Hackout 2026 (DA-IICT Gandhinagar)',
    rank: '🏆 WINNING TEAM // 1ST PLACE & GOLD MEDALS',
    project: 'Flagship 3-Day National Hackathon Champion',
    prize: 'Prize Pool ₹1,25,000+',
    date: '11–13 Sept 2026',
    location: 'Gandhinagar, Gujarat',
    organizer: 'DA-IICT Gandhinagar · Powered by Unstop',
    image: '/team_photos/hackout_da_iict_win.png',
    metrics: '1st Place Overall • Gold Medals • Trophy • ₹1.25L+ Pool',
    description: 'Travelled to DA-IICT Gandhinagar for Hackout 2026, a rigorous 3-day national hackathon with a prize pool of over ₹1.25 lakh, and returned with the championship trophy and gold medals on stage.'
  },
  {
    id: 'trophy-fusion',
    title: 'Fusion Hackathon (Pune)',
    rank: '🏆 1ST PLACE — WINNER (₹70,000 PRIZE)',
    project: 'Multi-Sponsor Enterprise Hackathon Champion',
    prize: '₹70,000 Cash Prize',
    date: '10 Sept 2026',
    location: 'Pune, Maharashtra',
    organizer: 'IEEE · eCell · SIGN IEEE · SKNCOE Pune · GridAI',
    image: '/team_photos/fusion_win_70k.png',
    metrics: '₹70,000 Cash Prize • 1st Place • SKNCOE Pune / IEEE',
    description: 'Took first place at Fusion, a multi-sponsor hackathon backed by IEEE, eCell and GriidAI, walking away with the team’s largest single hackathon cheque to date.'
  },
  {
    id: 'trophy-drishti',
    title: 'Drishti AI National Hackathon',
    rank: '🏆 WINNING TEAM // 1ST PLACE (₹1,00,000 PRIZE)',
    project: 'AI-Focused National Hackathon Champion',
    prize: '₹1,00,000 Cash Prize',
    date: '2026 Season',
    location: 'National AI Arena',
    organizer: 'Drishti AI Committee',
    image: '/team_photos/drishti_ai_win_100k.png',
    metrics: '₹1,00,000 Prize Cheque • AI-Focused National Champion',
    description: 'Closed out the season with an outright win at Drishti AI, an AI-focused national hackathon, taking home the team’s six-figure prize cheque and receiving honors alongside the organizing committee.'
  },
  {
    id: 'trophy-zenith',
    title: 'Zenith 1.0 Hackathon (Mumbai)',
    rank: '🏆 1ST PLACE — WINNER (₹15,000 PRIZE)',
    project: 'Inaugural Zenith-1.0 Hackathon Champion',
    prize: '₹15,000 Cash Prize',
    date: 'Sept 2026',
    location: 'Mumbai, Maharashtra',
    organizer: 'Sathaye College, Mumbai · Dept. of IT & Computer Society of India (CSI)',
    image: '/team_photos/zenith_win_15k.png',
    metrics: '₹15,000 Prize • 1st Place Winner • Sathaye College CSI',
    description: 'Won the inaugural Zenith–1.0 Hackathon at Sathaye College, one of five hackathons the team has topped in a single 2026 season.'
  },
  {
    id: 'trophy-craftverse',
    title: 'Craftverse Hackathon (Pune)',
    rank: '🏆 3RD PLACE WINNER (₹10,000 PRIZE)',
    project: 'High-Pressure Rapid Prototyping Build',
    prize: '₹10,000 Cash Prize',
    date: '6 Oct 2026',
    location: 'Pune, Maharashtra',
    organizer: 'PCCOER, Pune · Department of Computer Engineering · Unstop',
    image: '/team_photos/craftverse_win.png',
    metrics: '₹10,000 Prize • 3rd Place Podium • PCCOER Pune',
    description: 'Competed against top teams across Pune at PCCOE Research’s flagship build-and-pitch hackathon, placing third with a rapidly prototyped full-stack AI solution delivered under tight sprint pressure.'
  }
];

export const REAL_PROJECTS = [
  {
    id: 'email-sequencing',
    title: 'Email Sequencing Module',
    category: 'GenAI · Automation',
    tag: 'LLM Orchestration',
    description: 'An AI email automation system that schedules sends, parses replies, and generates context-aware, on-thread responses automatically.',
    tech: ['LangChain', 'OpenAI API', 'FastAPI', 'Node.js', 'Redis / BullMQ']
  },
  {
    id: 'nexus-carbon',
    title: 'Nexus — Carbon Circular Economy',
    category: 'Sustainability',
    tag: 'Decarbonisation Platform',
    description: 'A factory decarbonisation platform that tracks emissions, simulates reduction strategies, and matches industrial waste streams to verified buyers.',
    tech: ['Python', 'React', 'FastAPI', 'PostgreSQL', 'Data Analytics']
  },
  {
    id: 'resort-x',
    title: 'Resort X — Revenue Intelligence',
    category: 'Hospitality · AI',
    tag: 'Revenue & Operations Engine',
    description: 'A resort operations platform covering dynamic pricing, staffing and inventory, built around an LLM-powered autonomous guest concierge.',
    tech: ['Next.js', 'FastAPI', 'Claude / Gemini APIs', 'CrewAI', 'MongoDB']
  },
  {
    id: 'logi-x',
    title: 'Logi-X — Supply Chain Platform',
    category: 'Logistics',
    tag: 'Live Monitoring',
    description: 'A logistics platform for live shipment tracking, warehouse monitoring, predictive ETA modeling and end-to-end order management.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Leaflet / Maps']
  },
  {
    id: 'smart-clubs',
    title: 'Smart Clubs Portal',
    category: 'Campus Tech',
    tag: 'Club Management System',
    description: 'A college club management system with role-based dashboards, event analytics, attendance verification, and AI-based poster design analysis.',
    tech: ['React', 'FastAPI', 'PyTorch / Vision', 'Tailwind', 'PostgreSQL']
  },
  {
    id: 'sipify',
    title: 'SIPify — Mutual Fund Investing',
    category: 'Fintech',
    tag: 'Curated Portfolios',
    description: 'An investment app that turns SIPs into curated portfolios, featuring AI fund recommendations, risk assessment and live NAV tracking.',
    tech: ['React / Next.js', 'Python', 'FastAPI', 'Financial APIs', 'MongoDB']
  }
];

export const QUEST_NODES: QuestNode[] = [
  {
    id: 'hackout-node',
    title: 'Hackout 2026 Champion',
    subtitle: 'DA-IICT Gandhinagar Gold Medals & Trophy',
    category: 'National Hackathon',
    event: 'Hackout 2026 (DA-IICT Gandhinagar)',
    award: 'Winning Team (Gold Medals)',
    year: '2026',
    summary: 'Travelled to DA-IICT Gandhinagar for Hackout 2026, a 3-day national hackathon with a prize pool of over ₹1.25 lakh, returning with the championship trophy.',
    tech: ['FastAPI', 'React', 'PyTorch', 'LangChain', 'Docker'],
    metrics: ['1st Place Overall', '₹1,25,000+ Prize Pool', 'DA-IICT Gandhinagar'],
    repoUrl: 'https://github.com/vizsh/Outliers_Team',
    liveUrl: PORTFOLIO_URLS.jeevesh,
    status: 'CHAMPION',
    mapCoords: { x: 20, y: 30 }
  },
  {
    id: 'fusion-node',
    title: 'Fusion Hackathon 1st Place',
    subtitle: 'IEEE & GriidAI Largest Cash Prize Winner',
    category: 'Enterprise AI',
    event: 'Fusion Hackathon (SKNCOE Pune)',
    award: '1st Place — Winner (₹70,000 Prize)',
    year: '2026',
    summary: 'Took first place at Fusion, a multi-sponsor hackathon backed by IEEE, eCell and GriidAI, walking away with ₹70,000 cash prize.',
    tech: ['FastAPI', 'CrewAI', 'Computer Vision', 'React', 'PostgreSQL'],
    metrics: ['₹70,000 Cash Prize', '1st Place Winner', 'IEEE / GriidAI Sponsored'],
    repoUrl: 'https://github.com/vizsh/Outliers_Team',
    liveUrl: PORTFOLIO_URLS.shreyas,
    status: 'CHAMPION',
    mapCoords: { x: 45, y: 48 }
  },
  {
    id: 'drishti-node',
    title: 'Drishti AI Winner',
    subtitle: 'National AI Arena Champion',
    category: 'Computer Vision & AI',
    event: 'Drishti AI Hackathon (2026)',
    award: 'Winning Team (₹1,00,000 Prize)',
    year: '2026',
    summary: 'Closed out the 2026 season with a six-figure championship win at Drishti AI, receiving the cheque on stage.',
    tech: ['PyTorch', 'Computer Vision', 'FastAPI', 'Three.js', 'Docker'],
    metrics: ['₹1,00,000 Prize', 'National AI Champions', 'Stage Cheque Award'],
    repoUrl: 'https://github.com/vizsh/Outliers_Team',
    liveUrl: PORTFOLIO_URLS.rishit,
    status: 'CHAMPION',
    mapCoords: { x: 68, y: 35 }
  },
  {
    id: 'zenith-node',
    title: 'Zenith 1.0 Hackathon',
    subtitle: 'Sathaye College CSI Hackathon Champion',
    category: 'Full-Stack Systems',
    event: 'Zenith 1.0 Hackathon (Mumbai)',
    award: '1st Place — Winner (₹15,000 Prize)',
    year: '2026',
    summary: 'Won the inaugural Zenith–1.0 Hackathon at Sathaye College organized by CSI and Department of Information Technology.',
    tech: ['FastAPI', 'React', 'MongoDB', 'LangChain'],
    metrics: ['1st Place Winner', '₹15,000 Prize', 'Mumbai Champion'],
    repoUrl: 'https://github.com/vizsh/Outliers_Team',
    liveUrl: PORTFOLIO_URLS.jeevesh,
    status: 'CHAMPION',
    mapCoords: { x: 80, y: 65 }
  },
  {
    id: 'craftverse-node',
    title: 'Craftverse 2026',
    subtitle: 'PCCOER Pune Computer Engineering Build',
    category: 'Rapid Prototyping',
    event: 'Craftverse Hackathon (PCCOER Pune)',
    award: '3rd Place Winner (₹10,000 Prize)',
    year: '2026',
    summary: 'Competed at PCCOE Research flagship build-and-pitch hackathon under time pressure, earning third place podium.',
    tech: ['Python', 'FastAPI', 'React', 'Tailwind'],
    metrics: ['3rd Place Podium', '₹10,000 Prize', 'PCCOER Pune'],
    repoUrl: 'https://github.com/vizsh/Outliers_Team',
    liveUrl: PORTFOLIO_URLS.shreyas,
    status: 'VERIFIED',
    mapCoords: { x: 30, y: 72 }
  }
];

export const TOOLS_AND_TECH = [
  'Python', 'TypeScript', 'LangChain', 'CrewAI', 'AutoGen', 
  'OpenAI / Gemini / Claude APIs', 'FastAPI', 'Flask', 'Node.js / Express',
  'React / Next.js', 'Three.js / React Three Fiber', 'PyTorch', 
  'MongoDB', 'PostgreSQL', 'Redis / BullMQ', 'n8n'
];
