import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Sliders, 
  History, 
  Clock, 
  Star, 
  CheckCircle2, 
  XCircle,
  Award,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function ResultsScreen({
  sessionResult,
  onRetrySame,
  onNewConfig,
  onViewReports,
}) {
  const {
    score = 0,
    questionCount = 10,
    percentage = 0,
    timeTakenSeconds = 0,
    items = [],
    feedbackMode = 'immediate',
  } = sessionResult || {};

  useEffect(() => {
    // Fanfare sound
    soundManager.playFanfare();

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
      });
      if (percentage >= 80) {
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
        }, 350);
      }
    } catch (e) {
      console.warn(e);
    }
  }, [percentage]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m === 0) return `${s} sekuntia`;
    return `${m} min ${s} s`;
  };

  // Determine star rating (1-3 stars)
  const getStars = () => {
    if (percentage === 100) return 3;
    if (percentage >= 70) return 2;
    return 1;
  };

  const getCheerMessage = () => {
    if (percentage === 100) return 'Täydellistä! Kaikki oikein! 🏆';
    if (percentage >= 80) return 'Mahtavaa työtä! Olet tosi taitava! 🌟';
    if (percentage >= 50) return 'Hyvin tehty! Harjoitus tekee mestarin! 👍';
    return 'Hienoa yrittämistä! Uudella kerralla menee vielä paremmin! 🚀';
  };

  const starCount = getStars();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8">
      {/* Trophy / Stars Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-200 text-center relative overflow-hidden mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl shadow-lg mb-4 animate-bounce-short">
          🏆
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {[1, 2, 3].map((starNum) => (
            <Star
              key={starNum}
              className={`w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 ${
                starNum <= starCount
                  ? 'fill-amber-400 text-amber-500 scale-110 drop-shadow-md'
                  : 'fill-slate-200 text-slate-300'
              }`}
            />
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1">
          {getCheerMessage()}
        </h2>
        <p className="text-slate-500 font-semibold text-sm sm:text-base mb-6">
          Harjoitus on suoritettu ja tulokset tallennettu muistiin.
        </p>

        {/* Score & Time Metrics */}
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-2">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3">
            <span className="text-xs font-bold text-blue-700 block">Pisteet</span>
            <span className="text-2xl sm:text-3xl font-black text-blue-900">
              {score} / {questionCount}
            </span>
            <span className="text-xs font-semibold text-blue-600 block mt-0.5">
              ({percentage}%)
            </span>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3">
            <span className="text-xs font-bold text-emerald-700 block">Käytetty aika</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-900 flex items-center justify-center gap-1">
              <Clock className="w-5 h-5 text-emerald-600 inline" />
              <span>{Math.floor(timeTakenSeconds / 60)}:{(timeTakenSeconds % 60).toString().padStart(2, '0')}</span>
            </span>
            <span className="text-xs font-semibold text-emerald-600 block mt-0.5">
              {formatTime(timeTakenSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <button
          type="button"
          onClick={onRetrySame}
          className="py-4 px-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Yritä uudelleen</span>
        </button>

        <button
          type="button"
          onClick={onNewConfig}
          className="py-4 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-lg rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <Sliders className="w-5 h-5" />
          <span>Uusi harjoitus</span>
        </button>

        <button
          type="button"
          onClick={onViewReports}
          className="py-4 px-4 bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 text-indigo-700 border-2 border-indigo-200 font-black text-lg rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <History className="w-5 h-5 text-indigo-600" />
          <span>Katso historiaa</span>
        </button>
      </div>

      {/* Detailed Mistakes & Questions Review */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-slate-100">
        <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <span>📋</span>
          <span>Kaikki harjoituksen laskut ({items.length} kpl)</span>
        </h3>

        <div className="space-y-2.5">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                item.isCorrect
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/60 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white/80 font-bold text-xs flex items-center justify-center text-slate-600 border border-slate-200">
                  {idx + 1}
                </span>
                <span className="font-mono font-bold text-lg sm:text-xl">
                  {item.problem} =
                </span>
                <span className="font-mono font-black text-xl sm:text-2xl">
                  {item.userAnswer || '–'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.isCorrect ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm bg-emerald-100/80 px-2.5 py-1 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="hidden sm:inline">Oikein!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-700 font-bold text-sm bg-rose-100/80 px-2.5 py-1 rounded-xl">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Oikea vastaus: <strong>{item.correctAnswer}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

