import React from 'react';
import { Delete, CheckCircle2, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function Keypad({
  onDigit,
  onBackspace,
  onClear,
  onSubmit,
  isSubmitDisabled,
  isAnswerSubmitted,
  submitLabel = 'Tarkista',
  submitColor = 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white',
}) {
  const handleDigitClick = (digit) => {
    soundManager.playKeypad();
    onDigit(digit);
  };

  const handleBackspace = () => {
    soundManager.playKeypad();
    onBackspace();
  };

  const handleClear = () => {
    soundManager.playKeypad();
    onClear();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none mt-2">
      {/* 3x4 Grid for digits + comma + backspace */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 mb-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleDigitClick(num.toString())}
            disabled={isAnswerSubmitted}
            aria-label={`Numero ${num}`}
            className="keypad-btn h-14 sm:h-16 bg-white active:bg-blue-100 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 text-slate-800 shadow-sm active:shadow-inner text-2xl sm:text-3xl font-black rounded-2xl"
          >
            {num}
          </button>
        ))}

        {/* Comma (Finnish decimal separator) */}
        <button
          type="button"
          onClick={() => handleDigitClick(',')}
          disabled={isAnswerSubmitted}
          aria-label="Pilkku"
          className="keypad-btn h-14 sm:h-16 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border-2 border-slate-200 text-slate-700 text-2xl sm:text-3xl font-black rounded-2xl"
        >
          ,
        </button>

        {/* Zero */}
        <button
          type="button"
          onClick={() => handleDigitClick('0')}
          disabled={isAnswerSubmitted}
          aria-label="Numero 0"
          className="keypad-btn h-14 sm:h-16 bg-white active:bg-blue-100 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 text-slate-800 shadow-sm active:shadow-inner text-2xl sm:text-3xl font-black rounded-2xl"
        >
          0
        </button>

        {/* Backspace */}
        <button
          type="button"
          onClick={handleBackspace}
          disabled={isAnswerSubmitted}
          aria-label="Poista viimeinen merkki"
          className="keypad-btn h-14 sm:h-16 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 border-2 border-rose-200 text-rose-600 rounded-2xl flex items-center justify-center"
        >
          <Delete className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Action Row: Tyhjennä (Clear) and Tarkista/Vastaa (Submit) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
        <button
          type="button"
          onClick={handleClear}
          disabled={isAnswerSubmitted}
          className="h-14 sm:h-16 col-span-1 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border-2 border-slate-300 text-slate-700 font-bold text-base sm:text-lg flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
          title="Tyhjennä vastauskenttä"
        >
          <RotateCcw className="w-5 h-5 text-slate-500" />
          <span>Pyyhi</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={`h-14 sm:h-16 col-span-2 rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${submitColor} ${
            isSubmitDisabled ? 'opacity-40 cursor-not-allowed shadow-none' : 'hover:scale-[1.02]'
          }`}
        >
          <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
          <span>{submitLabel}</span>
        </button>
      </div>
    </div>
  );
}

