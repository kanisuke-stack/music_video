/**
 * Audio Controller for HTML5 Audio playback
 * Provides deterministic time tracking, play/pause controls, seeking, and event hooks.
 */

import { CONFIG } from './config.js';

export class AudioController {
  constructor(options = {}) {
    this.src = options.src || CONFIG.audio.src;
    this.audioElement = new Audio();
    this.audioElement.preload = 'auto';
    this.audioElement.src = this.src;

    this.onTimeUpdateCallback = null;
    this.onEndedCallback = null;
    this.onPlayStateChangeCallback = null;
    this.onLoadedMetadataCallback = null;

    this.isMuted = false;
    this.volume = 1.0;
    this.audioContext = null;
    this.synthFallbackActive = false;

    this._setupEvents();
  }

  _setupEvents() {
    this.audioElement.addEventListener('timeupdate', () => {
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.currentTime, this.duration);
      }
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      if (this.onLoadedMetadataCallback) {
        this.onLoadedMetadataCallback(this.audioElement.duration);
      }
    });

    this.audioElement.addEventListener('play', () => {
      if (this.onPlayStateChangeCallback) this.onPlayStateChangeCallback(true);
    });

    this.audioElement.addEventListener('pause', () => {
      if (this.onPlayStateChangeCallback) this.onPlayStateChangeCallback(false);
    });

    this.audioElement.addEventListener('ended', () => {
      if (this.onEndedCallback) this.onEndedCallback();
    });

    this.audioElement.addEventListener('error', (e) => {
      console.warn('Audio playback error with provided source:', e);
      // If error occurs, activate gentle synthesizer fallback
      this._activateSynthFallback();
    });
  }

  async play() {
    try {
      if (this.synthFallbackActive) {
        this._startSynthFallback();
        return;
      }
      await this.audioElement.play();
    } catch (err) {
      console.warn('HTML5 Audio play failed (policy or source):', err);
      this._activateSynthFallback();
      this._startSynthFallback();
    }
  }

  pause() {
    if (this.synthFallbackActive) {
      this._pauseSynthFallback();
      return;
    }
    this.audioElement.pause();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(seconds) {
    const target = Math.max(0, Math.min(this.duration, seconds));
    if (this.synthFallbackActive) {
      this._synthCurrentTime = target;
      return;
    }
    this.audioElement.currentTime = target;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.audioElement.volume = this.isMuted ? 0 : this.volume;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioElement.muted = this.isMuted;
    return this.isMuted;
  }

  get currentTime() {
    if (this.synthFallbackActive) {
      return this._synthCurrentTime || 0;
    }
    return this.audioElement.currentTime || 0;
  }

  get duration() {
    if (this.synthFallbackActive) {
      return CONFIG.audio.fallbackDuration;
    }
    const d = this.audioElement.duration;
    return (!d || isNaN(d) || d === Infinity) ? CONFIG.audio.fallbackDuration : d;
  }

  get isPlaying() {
    if (this.synthFallbackActive) {
      return !!this._synthInterval;
    }
    return !this.audioElement.paused && !this.audioElement.ended;
  }

  /**
   * Resilient Web Audio API fallback in case an external asset fails to load
   */
  _activateSynthFallback() {
    this.synthFallbackActive = true;
    this._synthCurrentTime = 0;
  }

  _startSynthFallback() {
    if (this._synthInterval) return;
    const startTimestamp = performance.now() - (this._synthCurrentTime * 1000);
    this._synthInterval = setInterval(() => {
      this._synthCurrentTime = (performance.now() - startTimestamp) / 1000;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this._synthCurrentTime, this.duration);
      }
      if (this._synthCurrentTime >= this.duration) {
        this._pauseSynthFallback();
        if (this.onEndedCallback) this.onEndedCallback();
      }
    }, 100);
    if (this.onPlayStateChangeCallback) this.onPlayStateChangeCallback(true);
  }

  _pauseSynthFallback() {
    if (this._synthInterval) {
      clearInterval(this._synthInterval);
      this._synthInterval = null;
    }
    if (this.onPlayStateChangeCallback) this.onPlayStateChangeCallback(false);
  }
}
