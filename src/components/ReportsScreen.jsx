import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  Calendar, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  Play, 
  BarChart2,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { OPERATION_CONFIG } from '../utils/mathGenerator';

export default function ReportsScreen({
  sessions = [],
  stats = {},
  onClearHistory,
  onDeleteSession,
  onStartNew,
}) {
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const toggleExpand = (id) => {
    setExpandedSessionId(expandedSessionId === id ? null : id);
  };

  const formatDuration = (secs) => {
    if (!secs) return '0 s';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m === 0) return `${s} s`;
    return `${m} min ${s} s`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-6">
      {/* Title & Back button */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-2">
            <span>📊</span>
            <span>Harjoitushistoria ja raportit</span>
          </h1>
          <p className="text-slate-500 font-semibold text-xs sm:text-sm mt-0.5">
            Kaikki laitteelle tallennetut harjoituskerrat
          </p>
        </div>

        <button
          type="button"
          onClick={onStartNew}
          className="flex items-center gap-1.5 px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-sm transition-all active:scale-95 text-sm sm:text-base shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Uusi harjoitus</span>
        </button>
      </div>

      {/* Overview Stats Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
        <div className="bg-white rounded-2xl p-3.5 border-2 border-slate-100 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 block">Harjoituskerrat</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-600">
            {stats.totalTests || 0}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">kpl tehty</span>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border-2 border-slate-100 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 block">Laskuja ratkaistu</span>
          <span className="text-2xl sm:text-3xl font-black text-purple-600">
            {stats.totalQuestions || 0}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">tehtävää</span>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border-2 border-slate-100 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 block">Osumatarkkuus</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600">
            {stats.averagePercentage || 0}%
          </span>
          <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">keskiarvo</span>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border-2 border-slate-100 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 block">Yhteisaika</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600">
            {Math.floor((stats.totalTimeSeconds || 0) / 60)} min
          </span>
          <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">harjoiteltu</span>
        </div>
      </div>

      {/* History List or Empty State */}
      {sessions.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
            🎒
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
            Ei vielä tallennettuja harjoituksia
          </h3>
          <p className="text-slate-500 font-medium text-sm sm:text-base max-w-md mx-auto mb-6">
            Kun suoritat matikan harjoituksen, sen tulokset, käytetty aika ja ratkaisut tallentuvat tähän näkymään!
          </p>
          <button
            type="button"
            onClick={onStartNew}
            className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Aloita ensimmäinen harjoitus!</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-bold text-slate-600 text-sm">
              Viimeisimmät harjoitukset ({sessions.length})
            </span>
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Tyhjennä koko historia</span>
            </button>
          </div>

          {sessions.map((session) => {
            const isExpanded = expandedSessionId === session.id;
            return (
              <div
                key={session.id}
                className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:border-blue-300 transition-all overflow-hidden"
              >
                {/* Session Card Header */}
                <div
                  onClick={() => toggleExpand(session.id)}
                  className="p-3.5 sm:p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                >
                  <div className="flex items-center gap-3">
                    {/* Operations Icons */}
                    <div className="flex -space-x-1">
                      {(session.operations || ['addition']).map((opId) => {
                        const conf = OPERATION_CONFIG[opId];
                        return (
                          <span
                            key={opId}
                            className="w-9 h-9 rounded-xl bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-lg shrink-0"
                            title={conf?.nameFi || opId}
                          >
                            {conf?.icon || '🔢'}
                          </span>
                        );
                      })}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-800 text-base sm:text-lg">
                          {(session.operations || [])
                            .map((op) => OPERATION_CONFIG[op]?.nameFi.split(' ')[0])
                            .join(', ')}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">
                          {session.feedbackMode === 'end' ? 'Koe' : 'Välitön'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{session.dateStr}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDuration(session.timeTakenSeconds)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Score Pill & Expand Arrow */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-right">
                      <div className="flex items-center gap-1 font-black text-lg sm:text-xl text-slate-800">
                        <span
                          className={
                            session.percentage >= 80
                              ? 'text-emerald-600'
                              : session.percentage >= 50
                              ? 'text-blue-600'
                              : 'text-amber-600'
                          }
                        >
                          {session.score} / {session.questionCount}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">
                          ({session.percentage}%)
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label="Näytä tehtävät"
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-transform"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Session Details (Questions breakdown) */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50 border-t-2 border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-700">
                        Laskujen tarkastelu ({session.items?.length || 0} kpl):
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                        className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Poista tämä kerta</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(session.items || []).map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-sm ${
                            item.isCorrect
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                              : 'bg-rose-50/70 border-rose-200 text-rose-900'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-white text-xs font-bold text-slate-500 flex items-center justify-center border border-slate-200">
                              {idx + 1}
                            </span>
                            <span className="font-mono font-bold">
                              {item.problem} = {item.userAnswer || '–'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {item.isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <span className="text-xs font-bold text-rose-600">
                                Oikein: {item.correctAnswer}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal to Clear All History */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border-4 border-slate-100">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
              🗑️
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">
              Tyhjennetäänkö koko historia?
            </h3>
            <p className="text-slate-600 text-sm font-medium mb-6">
              Tämä poistaa kaikki laitteelle tallennetut harjoituskerrat ja tulokset. Tätä ei voi perua.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors"
              >
                Peruuta
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearHistory();
                  setShowClearConfirm(false);
                }}
                className="py-3 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm transition-colors shadow-md"
              >
                Kyllä, tyhjennä
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

