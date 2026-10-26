import React from 'react';
import { Volume2, VolumeX, History, Home, Sparkles } from 'lucide-react';

export default function Header({
  currentView,
  onNavigate,
  soundEnabled,
  onToggleSound,
}) {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b-2 border-indigo-100 sticky top-0 z-40 px-3 sm:px-6 py-2.5 sm:py-3.5 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate('config')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-amber-400 via-pink-400 to-indigo-500 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-md group-hover:scale-105 transition-transform">
            🎒
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight">
                Matikka<span className="text-blue-600">peli</span>
              </span>
              <Sparkles className="w-4 h-4 text-amber-500 hidden sm:inline animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-slate-500 hidden sm:block">
              1.–2. luokan matematiikkaa
            </p>
          </div>
        </button>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mykistä äänet' : 'Ota äänet käyttöön'}
            title={soundEnabled ? 'Äänet päällä' : 'Äänet pois'}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all ${
              soundEnabled
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          {/* History / Reports button */}
          {currentView !== 'reports' && (
            <button
              type="button"
              onClick={() => onNavigate('reports')}
              className="flex items-center gap-1.5 px-3 sm:px-4 h-10 sm:h-11 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-2xl transition-all border border-indigo-200 active:scale-95 text-sm sm:text-base"
              title="Näytä harjoitushistoria"
            >
              <History className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span>Historia</span>
            </button>
          )}

          {/* Return Home button if in reports */}
          {currentView === 'reports' && (
            <button
              type="button"
              onClick={() => onNavigate('config')}
              className="flex items-center gap-1.5 px-3 sm:px-4 h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-md active:scale-95 text-sm sm:text-base"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Etusivulle</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

