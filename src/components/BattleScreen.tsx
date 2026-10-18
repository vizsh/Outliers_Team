import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { PlayerId } from '../types';
import { PLAYERS } from '../data/teamData';
import { sound } from '../services/soundEngine';
import { FighterSprite, type FighterAction } from './FighterSprite';

interface BattleScreenProps {
  challengerId: PlayerId;
  onVictory: (winnerId: PlayerId) => void;
  onSkip: () => void;
}

interface HitSpark {
  id: number;
  x: number;
  y: number;
  text?: string;
  color: string;
}

interface ActiveProjectile {
  id: number;
  fromP1: boolean;
  type: 'katana' | 'kunai' | 'plasma';
  x: number; // percentage from left (0 to 100)
}

export const BattleScreen: React.FC<BattleScreenProps> = ({
  challengerId,
  onVictory,
  onSkip
}) => {
  const squadmates: PlayerId[] = ['shreyas', 'rishit', 'jeevesh'];
  const opponentId = squadmates.find((id) => id !== challengerId) || 'rishit';

  const challenger = PLAYERS[challengerId];
  const opponent = PLAYERS[opponentId];

  // Combatant Stats
  const [challengerHp, setChallengerHp] = useState<number>(100);
  const [opponentHp, setOpponentHp] = useState<number>(100);
  const [superMeter, setSuperMeter] = useState<number>(65); // starts with some energy so player can test super quickly
  const [roundTime, setRoundTime] = useState<number>(99);

  // P1 Fighter physical states
  const [p1Action, setP1Action] = useState<FighterAction>('idle');
  const [p1Lunge, setP1Lunge] = useState<number>(0);
  const [p1Jump, setP1Jump] = useState<number>(0);
  const [p1ShowShield, setP1ShowShield] = useState<boolean>(false);
  const [p1IsParrying, setP1IsParrying] = useState<boolean>(false);

  // P2 Fighter physical states
  const [p2Action, setP2Action] = useState<FighterAction>('idle');
  const [p2Lunge, setP2Lunge] = useState<number>(0);
  const [p2Jump, setP2Jump] = useState<number>(0);
  const [p2ShowShield, setP2ShowShield] = useState<boolean>(false);
  const [p2IsParrying, setP2IsParrying] = useState<boolean>(false);

  // Combat status & cinematic feedback
  const [combatText, setCombatText] = useState<string>('★ ROUND 1... COMPILE! CHOOSE YOUR ATTACK [1-5]');
  const [comboCount, setComboCount] = useState<number>(0);
  const [isScreenShaking, setIsScreenShaking] = useState<boolean>(false);
  const [superBanner, setSuperBanner] = useState<string | null>(null);
  const [isKoFreeze, setIsKoFreeze] = useState<boolean>(false);

  // Active Hit Sparks and Projectiles
  const [hitSparks, setHitSparks] = useState<HitSpark[]>([]);
  const [projectiles, setProjectiles] = useState<ActiveProjectile[]>([]);
  const [activeSlash, setActiveSlash] = useState<{ x: number; y: number; color: string } | null>(null);
  const [activeShockwave, setActiveShockwave] = useState<{ x: number; color: string } | null>(null);
  const nextId = useRef<number>(1);

  // Trigger screen shake
  const triggerScreenShake = useCallback((durationMs: number = 250) => {
    setIsScreenShaking(true);
    setTimeout(() => setIsScreenShaking(false), durationMs);
  }, []);

  // Spawn visual hit spark
  const addHitSpark = useCallback((x: number, y: number, text: string, color: string) => {
    const id = ++nextId.current;
    setHitSparks((prev) => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setHitSparks((prev) => prev.filter((s) => s.id !== id));
    }, 750);
  }, []);

  // Check victory / KO
  const checkVictory = useCallback((newOpponentHp: number) => {
    if (newOpponentHp <= 0) {
      setOpponentHp(0);
      setIsKoFreeze(true);
      setP2Action('hurt');
      setP2Lunge(-160);
      setP2Jump(40);
      sound.playImpact();
      sound.playVictory();
      setCombatText(`★★ K.O.! FLAWLESS DEPLOYMENT! ${challenger.name.toUpperCase()} WINS! ★★`);
      
      setTimeout(() => {
        onVictory(challengerId);
      }, 1800);
      return true;
    }
    return false;
  }, [challenger.name, challengerId, onVictory]);

  // ==========================================
  // ACTION 1: LIGHT JAB (Rapid dash poke)
  // ==========================================
  const handleLightAttack = useCallback(() => {
    if (p1Action !== 'idle' || opponentHp <= 0 || isKoFreeze) return;
    sound.playWhoosh();
    setP1Action('light_attack');
    setP1Lunge(240); // Dash into close combat range

    setTimeout(() => {
      // Check if P2 is defending
      if (p2ShowShield) {
        sound.playParryClang();
        setP2IsParrying(true);
        addHitSpark(62, 55, 'DEFLECTED! -3 HP', '#ffd700');
        setOpponentHp((hp) => Math.max(1, hp - 3));
        setCombatText(`${opponent.name} BLOCKED YOUR JAB!`);
        setTimeout(() => setP2IsParrying(false), 300);
      } else {
        sound.playSwordDraw();
        sound.playImpact();
        triggerScreenShake(180);
        setP2Action('hurt');
        setP2Lunge(-40);

        const dmg = 16;
        const nextHp = Math.max(0, opponentHp - dmg);
        setOpponentHp(nextHp);
        setSuperMeter((sm) => Math.min(100, sm + 20));
        setComboCount((c) => c + 1);
        setCombatText(`${challenger.name} DELIVERS HIGH-SPEED LOGIC JAB (-${dmg} HP)!`);
        addHitSpark(65, 52, `-${dmg} REFACTOR!`, '#00f0ff');
        setActiveSlash({ x: 66, y: 50, color: '#00f0ff' });
        setTimeout(() => setActiveSlash(null), 300);
        checkVictory(nextHp);
      }

      setTimeout(() => {
        setP1Action('idle');
        setP1Lunge(0);
        setP2Action('idle');
        setP2Lunge(0);
      }, 240);
    }, 160);
  }, [p1Action, opponentHp, isKoFreeze, p2ShowShield, challenger.name, opponent.name, triggerScreenShake, addHitSpark, checkVictory]);

  // ==========================================
  // ACTION 2: HEAVY SMASH (Jumping power slam)
  // ==========================================
  const handleHeavyAttack = useCallback(() => {
    if (p1Action !== 'idle' || opponentHp <= 0 || isKoFreeze) return;
    sound.playMechHydraulic();
    setP1Action('heavy_attack');
    setP1Lunge(180);
    setP1Jump(85); // High leap into air

    setTimeout(() => {
      // Smashes down into the opponent
      setP1Jump(0);
      setP1Lunge(280);
      sound.playAttackMech();
      sound.playImpact();
      triggerScreenShake(450);

      if (p2ShowShield) {
        sound.playParryClang();
        setP2IsParrying(true);
        addHitSpark(65, 55, 'GUARD BROKEN! -12 HP', '#ffd700');
        setOpponentHp((hp) => Math.max(1, hp - 12));
        setP2ShowShield(false);
        setCombatText(`SHIELD CRACKED BY HEAVY SMASH! (-12 HP)`);
        setTimeout(() => setP2IsParrying(false), 300);
      } else {
        setP2Action('hurt');
        setP2Lunge(-110);
        setP2Jump(30);

        const dmg = 35;
        const nextHp = Math.max(0, opponentHp - dmg);
        setOpponentHp(nextHp);
        setSuperMeter((sm) => Math.min(100, sm + 35));
        setComboCount((c) => c + 2);
        setCombatText(`CRITICAL IMPACT! ${challenger.name} CRUSHES DEFENSES (-${dmg} HP)!`);
        addHitSpark(68, 48, `💥 -${dmg} HEAVY CRUSH!`, '#ffd700');
        setActiveSlash({ x: 68, y: 50, color: '#ffd700' });
        setActiveShockwave({ x: 68, color: '#ffd700' });
        setTimeout(() => { setActiveSlash(null); setActiveShockwave(null); }, 380);
        checkVictory(nextHp);
      }

      setTimeout(() => {
        setP1Action('idle');
        setP1Lunge(0);
        setP2Action('idle');
        setP2Lunge(0);
        setP2Jump(0);
      }, 340);
    }, 240);
  }, [p1Action, opponentHp, isKoFreeze, p2ShowShield, challenger.name, triggerScreenShake, addHitSpark, checkVictory]);

  // ==========================================
  // ACTION 3: CYBER SHIELD / PARRY
  // ==========================================
  const handleDefend = useCallback(() => {
    if (p1Action !== 'idle' || isKoFreeze) return;
    sound.playShield();
    setP1ShowShield(true);
    setP1Action('defend');
    setCombatText(`🛡️ ${challenger.name} RAISES CI/CD CYBER FORCEFIELD! (-90% DAMAGE)`);

    // Shield stays active for 2.2 seconds
    setTimeout(() => {
      setP1ShowShield(false);
      setP1Action('idle');
    }, 2200);
  }, [p1Action, isKoFreeze, challenger.name]);

  // ==========================================
  // ACTION 4: 3-HIT COMBO RUSH
  // ==========================================
  const handleComboRush = useCallback(() => {
    if (p1Action !== 'idle' || opponentHp <= 0 || isKoFreeze) return;
    setP1Action('light_attack');
    setP1Lunge(200);
    sound.playWhoosh();
    sound.playComboHit(1);

    // Hit 1: Dash Jab
    setTimeout(() => {
      sound.playImpact();
      setP2Action('hurt');
      setP2Lunge(-30);
      setComboCount(1);
      addHitSpark(62, 54, 'HIT 1: PARSE!', '#00f0ff');
      setActiveSlash({ x: 62, y: 54, color: '#00f0ff' });

      // Hit 2: Deep Slash / Cross
      setTimeout(() => {
        sound.playComboHit(2);
        sound.playImpact();
        setP1Lunge(270);
        setP2Lunge(-60);
        setComboCount(2);
        addHitSpark(66, 48, 'HIT 2: OPTIMIZE!', '#ff007f');
        setActiveSlash({ x: 66, y: 48, color: '#ff007f' });

        // Hit 3: Heavy Finisher Launch
        setTimeout(() => {
          sound.playComboHit(3);
          sound.playAttackTech();
          triggerScreenShake(500);
          setP1Action('heavy_attack');
          setP1Lunge(320);
          setP2Action('hurt');
          setP2Lunge(-130);
          setP2Jump(50);

          const dmg = 48;
          const nextHp = Math.max(0, opponentHp - dmg);
          setOpponentHp(nextHp);
          setSuperMeter((sm) => Math.min(100, sm + 45));
          setComboCount(3);
          setCombatText(`★ 3-HIT COMBO EXECUTED! (-${dmg} HP) ★`);
          addHitSpark(70, 42, `💥 -${dmg} COMBO FINISH!`, '#ffd700');
          setActiveSlash({ x: 70, y: 44, color: '#ffd700' });
          setActiveShockwave({ x: 70, color: '#ff007f' });
          setTimeout(() => { setActiveSlash(null); setActiveShockwave(null); }, 400);

          setTimeout(() => {
            setP1Action('idle');
            setP1Lunge(0);
            setP2Action('idle');
            setP2Lunge(0);
            setP2Jump(0);
            checkVictory(nextHp);
          }, 380);
        }, 180);
      }, 180);
    }, 150);
  }, [p1Action, opponentHp, isKoFreeze, triggerScreenShake, addHitSpark, checkVictory]);

  // ==========================================
  // ACTION 5: TECH PROJECTILE BLAST
  // ==========================================
  const handleProjectile = useCallback(() => {
    if (p1Action !== 'idle' || opponentHp <= 0 || isKoFreeze) return;
    sound.playWhoosh();
    setP1Action('projectile');

    // Determine projectile style
    const projType: 'katana' | 'kunai' | 'plasma' = 
      challengerId === 'shreyas' ? 'katana' : challengerId === 'rishit' ? 'kunai' : 'plasma';

    const pId = ++nextId.current;
    setProjectiles((prev) => [...prev, { id: pId, fromP1: true, type: projType, x: 28 }]);

    if (projType === 'katana') sound.playSwordDraw();
    else if (projType === 'kunai') sound.playAttackDesign();
    else sound.playAttackTech();

    setCombatText(`${challenger.name} UNLEASHES ${projType.toUpperCase()} ENERGY BEAM!`);

    // Projectile travels across screen and hits P2
    setTimeout(() => {
      // Remove projectile
      setProjectiles((prev) => prev.filter((p) => p.id !== pId));

      if (p2ShowShield) {
        sound.playParryClang();
        setP2IsParrying(true);
        addHitSpark(72, 55, 'DEFLECTED! -4 HP', '#ffd700');
        setOpponentHp((hp) => Math.max(1, hp - 4));
        setTimeout(() => setP2IsParrying(false), 300);
      } else {
        sound.playImpact();
        triggerScreenShake(280);
        setP2Action('hurt');
        setP2Lunge(-70);

        const dmg = 24;
        const nextHp = Math.max(0, opponentHp - dmg);
        setOpponentHp(nextHp);
        setSuperMeter((sm) => Math.min(100, sm + 25));
        setCombatText(`DIRECT HIT! PROJECTILE INFLICTS -${dmg} HP!`);
        addHitSpark(75, 50, `⚡ -${dmg} TECH BLAST!`, '#00f0ff');
        setActiveSlash({ x: 74, y: 50, color: '#00f0ff' });
        setTimeout(() => setActiveSlash(null), 300);
        checkVictory(nextHp);

        setTimeout(() => {
          setP2Action('idle');
          setP2Lunge(0);
        }, 280);
      }

      setP1Action('idle');
    }, 420);
  }, [p1Action, opponentHp, isKoFreeze, challengerId, challenger.name, p2ShowShield, triggerScreenShake, addHitSpark, checkVictory]);

  // ==========================================
  // ACTION 6: ULTIMATE SUPER FINISHER [SPACE]
  // ==========================================
  const handleSuperMove = useCallback(() => {
    if (superMeter < 50 || p1Action !== 'idle' || opponentHp <= 0 || isKoFreeze) return;
    setSuperMeter(0);
    sound.playSuperAlarm();
    setSuperBanner(`★★ ULTIMATE SPECIAL: ${challenger.attackName}! ★★`);

    // Cinematic Super Freeze Frame
    setTimeout(() => {
      setSuperBanner(null);
      setP1Action('super');
      setP1Lunge(340);
      triggerScreenShake(700);

      if (challenger.attackName === 'DATA SURGE') sound.playAttackTech();
      else if (challenger.attackName === 'DESIGN STRIKE') sound.playAttackDesign();
      else sound.playAttackMech();

      setTimeout(() => {
        sound.playImpact();
        sound.playVictory();
        setP2Action('hurt');
        setP2Lunge(-180);
        setP2Jump(60);

        const dmg = 65;
        const nextHp = Math.max(0, opponentHp - dmg);
        setOpponentHp(nextHp);
        setCombatText(`★★★ ${challenger.attackName} DESTROYS THE SERVER! (-${dmg} HP) ★★★`);
        addHitSpark(75, 40, `💥 -${dmg} SERVER WIPEOUT!`, '#ff007f');
        setActiveSlash({ x: 75, y: 45, color: '#ff007f' });
        setActiveShockwave({ x: 75, color: '#ff007f' });
        setTimeout(() => { setActiveSlash(null); setActiveShockwave(null); }, 500);

        setTimeout(() => {
          setP1Action('idle');
          setP1Lunge(0);
          setP2Action('idle');
          setP2Lunge(0);
          setP2Jump(0);
          checkVictory(nextHp);
        }, 450);
      }, 280);
    }, 480);
  }, [superMeter, p1Action, opponentHp, isKoFreeze, challenger.attackName, triggerScreenShake, addHitSpark, checkVictory]);

  // ==========================================
  // OPPONENT DYNAMIC AI COMBAT ENGINE
  // ==========================================
  useEffect(() => {
    if (isKoFreeze) return;

    const aiInterval = setInterval(() => {
      if (opponentHp <= 0 || p1Action === 'super' || p2Action !== 'idle') return;

      // Pick an intelligent tactical AI move (1 = Light, 2 = Heavy, 3 = Shield, 4 = Projectile)
      const roll = Math.random();

      if (roll < 0.25) {
        // AI raises shield
        setP2ShowShield(true);
        setP2Action('defend');
        setCombatText(`${opponent.name} ENTERS DEFENSIVE STANCE!`);
        setTimeout(() => {
          setP2ShowShield(false);
          setP2Action('idle');
        }, 1600);
      } else if (roll < 0.55) {
        // AI Light Jab
        sound.playWhoosh();
        setP2Action('light_attack');
        setP2Lunge(220);

        setTimeout(() => {
          if (p1ShowShield) {
            sound.playParryClang();
            setP1IsParrying(true);
            addHitSpark(35, 55, 'BLOCKED! ONLY -2 HP', '#ffd700');
            setChallengerHp((hp) => Math.max(5, hp - 2));
            setSuperMeter((sm) => Math.min(100, sm + 25));
            setCombatText(`⚡ PARRY SUCCESSFUL! GAINED +25% SUPER!`);
            setTimeout(() => setP1IsParrying(false), 300);
          } else {
            sound.playImpact();
            triggerScreenShake(200);
            setP1Action('hurt');
            setP1Lunge(-35);

            const dmg = 15;
            setChallengerHp((hp) => Math.max(5, hp - dmg));
            addHitSpark(32, 50, `-${dmg} ENEMY HIT!`, '#f43f5e');
            setCombatText(`${opponent.name} COUNTER-STRIKES FOR -${dmg} HP!`);

            setTimeout(() => {
              setP1Action('idle');
              setP1Lunge(0);
            }, 250);
          }

          setP2Action('idle');
          setP2Lunge(0);
        }, 180);
      } else if (roll < 0.8) {
        // AI Heavy Smash
        sound.playMechHydraulic();
        setP2Action('heavy_attack');
        setP2Lunge(280);
        setP2Jump(70);

        setTimeout(() => {
          setP2Jump(0);
          sound.playImpact();

          if (p1ShowShield) {
            sound.playParryClang();
            setP1IsParrying(true);
            addHitSpark(35, 55, 'DEFLECTED! -6 HP', '#ffd700');
            setChallengerHp((hp) => Math.max(5, hp - 6));
            setCombatText(`HEAVY SMASH DEFLECTED BY SHIELD!`);
            setTimeout(() => setP1IsParrying(false), 300);
          } else {
            triggerScreenShake(380);
            setP1Action('hurt');
            setP1Lunge(-90);
            const dmg = 28;
            setChallengerHp((hp) => Math.max(5, hp - dmg));
            addHitSpark(30, 45, `💥 -${dmg} CRITICAL SMASH!`, '#f43f5e');
            setCombatText(`⚠️ WARNING! ${opponent.name} LANDS HEAVY CRUSH (-${dmg} HP)!`);

            setTimeout(() => {
              setP1Action('idle');
              setP1Lunge(0);
            }, 300);
          }

          setP2Action('idle');
          setP2Lunge(0);
        }, 250);
      } else {
        // AI Projectile
        sound.playWhoosh();
        setP2Action('projectile');
        const pId = ++nextId.current;
        setProjectiles((prev) => [...prev, { id: pId, fromP1: false, type: 'kunai', x: 72 }]);

        setTimeout(() => {
          setProjectiles((prev) => prev.filter((p) => p.id !== pId));

          if (p1ShowShield) {
            sound.playParryClang();
            setP1IsParrying(true);
            addHitSpark(35, 55, 'DEFLECTED! -3 HP', '#ffd700');
            setChallengerHp((hp) => Math.max(5, hp - 3));
            setTimeout(() => setP1IsParrying(false), 300);
          } else {
            sound.playImpact();
            triggerScreenShake(220);
            setP1Action('hurt');
            setP1Lunge(-40);
            const dmg = 18;
            setChallengerHp((hp) => Math.max(5, hp - dmg));
            addHitSpark(32, 50, `⚡ -${dmg} ENERGY BLAST!`, '#f43f5e');

            setTimeout(() => {
              setP1Action('idle');
              setP1Lunge(0);
            }, 250);
          }

          setP2Action('idle');
        }, 380);
      }
    }, 3200);

    return () => clearInterval(aiInterval);
  }, [opponentHp, p1Action, p2Action, p1ShowShield, opponent.name, isKoFreeze, triggerScreenShake, addHitSpark]);

  // Round timer
  useEffect(() => {
    if (isKoFreeze) return;
    const timer = setInterval(() => {
      setRoundTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isKoFreeze]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') handleLightAttack();
      else if (e.key === '2') handleHeavyAttack();
      else if (e.key === '3') handleDefend();
      else if (e.key === '4') handleComboRush();
      else if (e.key === '5') handleProjectile();
      else if (e.key === ' ' || e.key === 'z' || e.key === 'Z') {
        if (superMeter >= 50) handleSuperMove();
        else handleHeavyAttack();
      } else if (e.key === 'Escape') onSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleLightAttack, handleHeavyAttack, handleDefend, handleComboRush, handleProjectile, handleSuperMove, onSkip, superMeter]);

  return (
    <div 
      className="battle-container"
      style={{
        animation: isScreenShaking ? 'screenShake 0.15s infinite' : 'none'
      }}
    >
      {/* Pristine Cyber Stadium Arena Stage Floor Background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/attempt1_ui/cyber_arena_stage.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          zIndex: 1
        }}
      />

      {/* Cinematic Super Banner Overlay */}
      {superBanner && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div 
            style={{
              padding: '20px 40px',
              background: 'linear-gradient(90deg, #bd00ff, #ff007f)',
              border: '3px solid #ffffff',
              borderRadius: '8px',
              fontFamily: 'var(--font-pixel)',
              fontSize: '22px',
              color: '#ffffff',
              textShadow: '0 0 20px #000',
              boxShadow: '0 0 60px #ff007f',
              letterSpacing: '2px',
              textAlign: 'center',
              animation: 'sparkPop 0.4s ease-out'
            }}
          >
            {superBanner}
          </div>
        </div>
      )}

      {/* Active Projectile VFX */}
      {projectiles.map((proj) => (
        <div
          key={proj.id}
          style={{
            position: 'absolute',
            left: `${proj.x}%`,
            bottom: '220px',
            zIndex: 35,
            pointerEvents: 'none',
            animation: proj.fromP1 ? 'projectileTravelP1 0.42s linear forwards' : 'projectileTravelP2 0.38s linear forwards'
          }}
        >
          {proj.type === 'katana' && (
            <div 
              style={{
                width: '120px',
                height: '40px',
                background: 'linear-gradient(90deg, #00f0ff, transparent)',
                borderRadius: '50%',
                boxShadow: '0 0 25px #00f0ff, inset 0 0 10px #ffffff',
                border: '2px solid #ffffff',
                filter: 'drop-shadow(0 0 15px #00f0ff)'
              }}
            />
          )}
          {proj.type === 'kunai' && (
            <div 
              style={{
                width: '60px',
                height: '24px',
                background: 'linear-gradient(90deg, #ff007f, #10b981)',
                clipPath: 'polygon(0% 50%, 40% 0%, 100% 50%, 40% 100%)',
                boxShadow: '0 0 20px #10b981',
                filter: 'drop-shadow(0 0 10px #ff007f)'
              }}
            />
          )}
          {proj.type === 'plasma' && (
            <div 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ffffff 10%, #38bdf8 60%, transparent 90%)',
                boxShadow: '0 0 35px #38bdf8, 0 0 15px #ffffff',
                animation: 'shieldPulse 0.15s infinite alternate'
              }}
            />
          )}
        </div>
      ))}

      {/* Dynamic Hit Sparks & Damage Floaters */}
      {hitSparks.map((spark) => (
        <div
          key={spark.id}
          style={{
            position: 'absolute',
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-pixel)',
            fontSize: '16px',
            fontWeight: 900,
            color: spark.color,
            textShadow: `0 0 15px ${spark.color}, 2px 2px 0 #000`,
            background: 'rgba(0, 0, 0, 0.9)',
            border: `2px solid ${spark.color}`,
            borderRadius: '4px',
            padding: '5px 12px',
            zIndex: 85,
            pointerEvents: 'none',
            animation: 'sparkPop 0.7s ease-out forwards'
          }}
        >
          {spark.text}
        </div>
      ))}

      {/* Dynamic Neon Slash Cut Effect */}
      {activeSlash && (
        <div 
          style={{
            position: 'absolute',
            left: `${activeSlash.x}%`,
            top: `${activeSlash.y}%`,
            width: '240px',
            height: '7px',
            background: `linear-gradient(90deg, transparent, ${activeSlash.color}, #ffffff, ${activeSlash.color}, transparent)`,
            boxShadow: `0 0 35px ${activeSlash.color}, 0 0 15px #ffffff`,
            borderRadius: '4px',
            zIndex: 80,
            pointerEvents: 'none',
            animation: 'slashCut 0.35s ease-out forwards'
          }}
        />
      )}

      {/* Dynamic Ground Impact Shockwave */}
      {activeShockwave && (
        <div 
          style={{
            position: 'absolute',
            left: `${activeShockwave.x}%`,
            bottom: '120px',
            width: '280px',
            height: '20px',
            background: `radial-gradient(ellipse at center, ${activeShockwave.color} 0%, rgba(0, 240, 255, 0.4) 50%, transparent 80%)`,
            boxShadow: `0 0 40px ${activeShockwave.color}, 0 0 15px #00f0ff`,
            borderRadius: '50%',
            zIndex: 25,
            pointerEvents: 'none',
            animation: 'groundShockwave 0.45s ease-out forwards'
          }}
        />
      )}

      {/* Top Arcade Matchup Header & Dual Health Bars */}
      <header className="battle-header-box" style={{ position: 'relative', zIndex: 20 }}>
        <div className="stage-badge">
          STAGE 01: PORTFOLIO DUEL • {challenger.name.toUpperCase()} VS {opponent.name.toUpperCase()}
        </div>

        <div className="battle-hud-row">
          {/* P1: Challenger */}
          <div className="fighter-hp-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>[P1] {challenger.name}</span>
              <span style={{ color: 'var(--neon-gold)', fontWeight: 'bold' }}>{challengerHp}% HP</span>
            </div>
            <div className="fighter-hp-bar">
              <div className="fighter-hp-fill" style={{ width: `${challengerHp}%` }} />
            </div>

            {/* Super Gauge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: 'var(--neon-magenta)' }}>SUPER:</span>
              <div style={{ flex: 1, height: '8px', background: '#020617', border: '1px solid rgba(255,0,127,0.5)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${superMeter}%`, background: 'linear-gradient(90deg, #bd00ff, #ff007f)' }} />
              </div>
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--neon-gold)' }}>{superMeter}%</span>
            </div>
          </div>

          {/* Center Round Timer */}
          <div className="round-timer-box">
            {roundTime}
          </div>

          {/* P2: Opponent */}
          <div className="fighter-hp-container" style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--neon-gold)', fontWeight: 'bold' }}>{opponentHp}% HP</span>
              <span style={{ color: 'var(--neon-magenta)', fontWeight: 'bold' }}>[P2] {opponent.name}</span>
            </div>
            <div className="fighter-hp-bar fighter-hp-bar-p2">
              <div className="fighter-hp-fill fighter-hp-fill-p2" style={{ width: `${opponentHp}%` }} />
            </div>
            <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginTop: '3px' }}>
              CLASS: {opponent.classTitle}
            </div>
          </div>
        </div>
      </header>

      {/* Main Fighting Arena Stage Floor with Fighters Standing Directly on the Stage */}
      <main 
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '1150px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 60px',
          minHeight: '380px',
          marginBottom: '20px'
        }}
      >
        {/* P1: Challenger Fighter Standing on Left */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FighterSprite 
            id={challengerId} 
            action={p1Action} 
            isFacingLeft={false} 
            lungeOffset={p1Lunge}
            jumpOffset={p1Jump}
            showShield={p1ShowShield}
            isParrying={p1IsParrying}
          />
          <div 
            style={{ 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '14px', 
              color: 'var(--neon-cyan)',
              marginTop: '4px',
              textTransform: 'uppercase',
              textShadow: '0 0 10px #00f0ff'
            }}
          >
            {challenger.name}
          </div>
        </div>

        {/* Center Clash Indicator & Combo Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px', zIndex: 10 }}>
          <div 
            style={{ 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '44px', 
              fontWeight: 900,
              color: 'var(--neon-gold)',
              textShadow: '0 0 25px #ffd700, 2px 2px 0 #000'
            }}
          >
            VS
          </div>

          {comboCount > 0 && (
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '12px', color: '#ffd700', background: 'rgba(0,0,0,0.85)', padding: '4px 12px', border: '2px solid #ffd700', borderRadius: '4px', marginTop: '6px' }}>
              ★ {comboCount}-HIT COMBO!
            </div>
          )}
        </div>

        {/* P2: Opponent Fighter Standing on Right (Facing Left) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FighterSprite 
            id={opponentId} 
            action={p2Action} 
            isFacingLeft={true} 
            lungeOffset={p2Lunge}
            jumpOffset={p2Jump}
            showShield={p2ShowShield}
            isParrying={p2IsParrying}
          />
          <div 
            style={{ 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '14px', 
              color: 'var(--neon-magenta)',
              marginTop: '4px',
              textTransform: 'uppercase',
              textShadow: '0 0 10px #ff007f'
            }}
          >
            {opponent.name}
          </div>
        </div>
      </main>

      {/* Bottom Battle Announcer & Combat Command Action Menu */}
      <footer style={{ position: 'relative', zIndex: 20, width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="battle-announcer-box">
          <div className="battle-announcer-text">
            {combatText}
          </div>
        </div>

        {/* Dynamic Combat Tactical Action Buttons */}
        <div className="battle-action-bar">
          <button 
            onClick={handleLightAttack} 
            className="arcade-btn"
            title="Fast punch/strike (16 DMG, +20% Super)"
          >
            <span>[1]</span>
            <span>LIGHT JAB</span>
          </button>

          <button 
            onClick={handleHeavyAttack} 
            className="arcade-btn arcade-btn-magenta"
            title="Deep jump heavy crush (35 DMG, +35% Super)"
          >
            <span>[2]</span>
            <span>HEAVY SMASH</span>
          </button>

          <button 
            onClick={handleDefend} 
            className="arcade-btn arcade-btn-gold"
            title="Raise forcefield (-90% damage, perfect parry)"
          >
            <span>[3]</span>
            <span>CYBER SHIELD</span>
          </button>

          <button 
            onClick={handleComboRush} 
            className="arcade-btn"
            style={{ background: '#083344', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}
            title="Execute 3-hit rapid sequence (48 DMG)"
          >
            <span>[4]</span>
            <span>3-HIT COMBO</span>
          </button>

          <button 
            onClick={handleProjectile} 
            className="arcade-btn"
            style={{ background: '#1e1b4b', borderColor: '#818cf8', color: '#c7d2fe' }}
            title="Launch ranged tech energy blast (24 DMG)"
          >
            <span>[5]</span>
            <span>PROJECTILE</span>
          </button>

          <button
            onClick={handleSuperMove}
            disabled={superMeter < 50}
            className="arcade-btn"
            style={{
              background: superMeter >= 50 ? 'linear-gradient(90deg, #bd00ff, #ff007f)' : '#1e293b',
              borderColor: superMeter >= 50 ? '#ff007f' : '#475569',
              cursor: superMeter >= 50 ? 'pointer' : 'not-allowed',
              opacity: superMeter >= 50 ? 1 : 0.5,
              boxShadow: superMeter >= 50 ? '0 0 25px #ff007f' : 'none'
            }}
            title="Unleash signature discipline finisher (65 DMG)"
          >
            <span>★</span>
            <span>SUPER: {challenger.attackName} [SPACE]</span>
          </button>

          <button 
            onClick={onSkip} 
            className="arcade-btn" 
            style={{ background: '#020617', borderColor: '#475569', fontSize: '9px' }}
          >
            <span>⏩ SKIP [ESC]</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
