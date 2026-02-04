/**
 * Sound system for correct/wrong/level-up feedback.
 * Preference is persisted in localStorage (key: grade9_sounds_enabled) and restored on load.
 */
class SoundSystem {
  private enabled: boolean = false;
  private audioContext: AudioContext | null = null;

  constructor() {
    const stored = localStorage.getItem('grade9_sounds_enabled');
    this.enabled = stored === 'true';
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  toggle(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem('grade9_sounds_enabled', String(this.enabled));
    return this.enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(value: boolean): void {
    this.enabled = value;
    localStorage.setItem('grade9_sounds_enabled', String(this.enabled));
  }

  playCorrect() {
    if (!this.enabled) return;
    this.playTone(880, 0.05, 0.1, 'sine');
  }

  playWrong() {
    if (!this.enabled) return;
    this.playTone(220, 0.1, 0.15, 'triangle');
  }

  playLevelUp() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    [523, 659, 784].forEach((freq, i) => {
      this.playTone(freq, 0.08, 0.12, 'sine', now + i * 0.1);
    });
  }

  playGrade9Finish() {
    if (!this.enabled) return;
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    [523, 659, 784, 1047].forEach((freq, i) => {
      this.playTone(freq, 0.06, 0.1, 'sine', now + i * 0.08);
    });
  }

  private playTone(
    frequency: number,
    volume: number,
    duration: number,
    type: OscillatorType = 'sine',
    startTime?: number
  ) {
    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      const start = startTime || ctx.currentTime;
      gainNode.gain.setValueAtTime(volume, start);
      gainNode.gain.exponentialRampToValueAtTime(0.01, start + duration);

      oscillator.start(start);
      oscillator.stop(start + duration);
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }
}

export const soundSystem = new SoundSystem();
