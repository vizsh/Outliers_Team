import React, { useState } from 'react';
import { TARGET_PORTFOLIO_URL, PLAYERS } from '../data/teamData';
import type { PlayerId } from '../types';
import { sound } from '../services/soundEngine';

interface LivePortfolioModalProps {
  memberId: PlayerId;
  onClose: () => void;
}

export const LivePortfolioModal: React.FC<LivePortfolioModalProps> = ({
  memberId,
  onClose
}) => {
  const player = PLAYERS[memberId];
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const targetUrl = `${TARGET_PORTFOLIO_URL}?member=${memberId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/90 backdrop-blur-md select-none animate-fadeIn">
      {/* Vintage Window Frame */}
      <div 
        className={`relative flex flex-col retro-window shadow-2xl transition-all duration-300 ${
          isFullscreen ? 'w-full h-full max-w-none max-h-none' : 'w-full max-w-5xl h-[88vh]'
        }`}
      >
        {/* Retro Header Bar */}
        <div className="retro-window-header flex items-center justify-between px-3 py-1.5 select-none">
          <div className="flex items-center gap-2">
            <span className="text-xs">🖥️</span>
            <span className="font-bold text-[11px] truncate">
              OUTLIERS OS v2.6 - [{player.name.toUpperCase()} WORKSPACE // 3D RETRO ENVIRONMENT]
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Pop out in new tab */}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 bg-gray-200 text-black text-[10px] font-mono border border-black hover:bg-white flex items-center gap-1"
              title="Open full page in new tab"
            >
              <span>↗</span>
              <span className="hidden sm:inline">FULLSCREEN TAB</span>
            </a>

            {/* Maximize */}
            <button
              onClick={() => {
                sound.playCursor();
                setIsFullscreen((prev) => !prev);
              }}
              className="w-5 h-5 bg-gray-200 text-black text-[10px] font-bold border border-black hover:bg-white flex items-center justify-center"
              title={isFullscreen ? 'Restore' : 'Maximize'}
            >
              {isFullscreen ? '❐' : '□'}
            </button>

            {/* Close */}
            <button
              onClick={() => {
                sound.playCursor();
                onClose();
              }}
              className="w-5 h-5 bg-red-600 text-white text-[10px] font-bold border border-black hover:bg-red-500 flex items-center justify-center"
              title="Close window"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Address / Status Bar */}
        <div className="bg-gray-100 border-b border-gray-400 px-3 py-1 flex items-center justify-between text-[11px] font-mono text-gray-700">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold">LOCATION:</span>
            <span className="text-blue-800 underline truncate">{targetUrl}</span>
          </div>
          <div className="flex items-center gap-2 text-green-700 font-bold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span>CONNECTED (VERCEL EDGE)</span>
          </div>
        </div>

        {/* Iframe Viewport Loading Live 3D Retro Desktop */}
        <div className="relative flex-1 w-full bg-slate-900 overflow-hidden">
          <iframe
            src={targetUrl}
            title={`${player.name} 3D Portfolio`}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="eager"
          />
        </div>

        {/* Retro Status Footer */}
        <div className="bg-gray-200 border-t border-gray-400 px-3 py-1 flex items-center justify-between text-[10px] font-mono text-gray-600">
          <span>PORTFOLIO SYSTEM: READY • 3D WORKSTATION ACTIVE</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
