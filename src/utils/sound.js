// Gentle Web Audio API synthesizer for child-friendly feedback without external audio files

class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    try {
      const saved = localStorage.getItem('matikka_sound_enabled');
      if (saved !== null) {
        this.enabled = JSON.parse(saved);
      }
    } catch {
      this.enabled = true;
    }
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    try {
      localStorage.setItem('matikka_sound_enabled', JSON.stringify(this.enabled));
    } catch (e) {
      console.warn(e);
    }
    if (this.enabled) {
      this.playTone(523.25, 'triangle', 0.12, 0.2); // Cheerful confirmation chirp
    }
    return this.enabled;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.15) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  playKeypad() {
    this.playTone(440, 'triangle', 0.05, 0.08);
  }

  playCorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      // Play joyful ascending arpeggio (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const time = this.ctx.currentTime + index * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.25);
      });
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  playWrong() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      // Soft, gentle "try again" non-scary low notes (F#3 -> F3)
      const notes = [370, 349];
      notes.forEach((freq, index) => {
        const time = this.ctx.currentTime + index * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.2);
      });
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  playFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const melody = [
        { f: 523.25, d: 0.12 }, // C
        { f: 659.25, d: 0.12 }, // E
        { f: 783.99, d: 0.12 }, // G
        { f: 1046.50, d: 0.35 } // C6
      ];
      let delay = 0;
      melody.forEach(item => {
        const time = this.ctx.currentTime + delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, time);

        gain.gain.setValueAtTime(0.22, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + item.d);
        delay += 0.12;
      });
    } catch (e) {
      console.warn('Audio error', e);
    }
  }
}

export const soundManager = new SoundManager();

