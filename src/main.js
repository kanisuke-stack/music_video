/**
 * Main Application Orchestrator
 * Integrates Canvas Stage, HTML5 Audio Synchronization, and Original Lyrics Display.
 */

import { TimelineManager } from './timeline.js';
import { AudioController } from './audio.js';
import { ParticleManager } from './particles.js';
import { SceneRenderer } from './scenes.js';

class RomanticMusicVideoApp {
  constructor() {
    this.canvas = document.getElementById('stage');
    this.ctx = this.canvas.getContext('2d');

    this.timeline = new TimelineManager();
    this.audio = new AudioController();
    this.particles = new ParticleManager(this.canvas);
    this.renderer = new SceneRenderer(this.canvas, this.particles);

    this.isPlaying = false;
    this.isSeeking = false;
    this.activeLyric = null;
    this.idleTimer = null;

    // Cache DOM Elements
    this.dom = {
      openingScreen: document.getElementById('opening-screen'),
      btnStart: document.getElementById('btn-start'),
      videoHud: document.getElementById('video-hud'),
      lyricsBox: document.getElementById('lyrics-box'),
      lyricMain: document.getElementById('lyric-main'),
      playerControls: document.getElementById('player-controls'),
      btnPlayPause: document.getElementById('btn-play-pause'),
      iconPlay: document.getElementById('icon-ctrl-play'),
      iconPause: document.getElementById('icon-ctrl-pause'),
      timeCurrent: document.getElementById('time-current'),
      timeTotal: document.getElementById('time-total'),
      progressContainer: document.getElementById('progress-container'),
      progressFill: document.getElementById('progress-fill'),
      progressHandle: document.getElementById('progress-handle'),
      btnVolume: document.getElementById('btn-volume'),
      iconVolOn: document.getElementById('icon-vol-on'),
      iconVolMute: document.getElementById('icon-vol-mute'),
      btnReplayHud: document.getElementById('btn-replay-hud')
    };

    this.init();
  }

  async init() {
    this._setupResize();
    this._setupAudioListeners();
    this._setupControls();
    this._setupInactivityTimer();

    // Preload original lyrics from lyrics.json
    await this.timeline.loadLyrics();

    // Start background render loop (renders ambient scene 0 before start)
    requestAnimationFrame(this._loop.bind(this));
  }

  /**
   * Responsive Canvas pixel density scaling
   */
  _setupResize() {
    const onResize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.canvas.width = Math.floor(width * dpr);
      this.canvas.height = Math.floor(height * dpr);
      this.ctx.resetTransform?.();
      this.ctx.scale(dpr, dpr);
      this.canvasWidth = width;
      this.canvasHeight = height;
    };

    window.addEventListener('resize', onResize);
    onResize();
  }

  /**
   * Connect AudioController hooks
   */
  _setupAudioListeners() {
    this.audio.onLoadedMetadataCallback = (duration) => {
      if (duration && !isNaN(duration)) {
        this.timeline.calibrateDuration(duration);
        this.dom.timeTotal.textContent = this._formatTime(duration);
      }
    };

    this.audio.onPlayStateChangeCallback = (isPlaying) => {
      this.isPlaying = isPlaying;
      if (isPlaying) {
        this.dom.iconPause.classList.remove('hidden');
        this.dom.iconPlay.classList.add('hidden');
      } else {
        this.dom.iconPause.classList.add('hidden');
        this.dom.iconPlay.classList.remove('hidden');
      }
    };

    this.audio.onEndedCallback = () => {
      this.isPlaying = false;
      this.dom.iconPause.classList.add('hidden');
      this.dom.iconPlay.classList.remove('hidden');
      // Hide any lingering lyric box at audio completion
      this.dom.lyricsBox.classList.add('fading');
      this.dom.lyricMain.textContent = '';
      this.activeLyric = null;
    };
  }

  /**
   * User interaction listeners
   */
  _setupControls() {
    // "Start" button: required by browsers to trigger audio playback
    this.dom.btnStart.addEventListener('click', async () => {
      this.dom.openingScreen.classList.remove('active');
      this.dom.openingScreen.classList.add('hidden');
      this.dom.videoHud.classList.remove('hidden');

      await this.audio.play();
    });

    // Play / Pause toggle
    this.dom.btnPlayPause.addEventListener('click', () => {
      this.audio.togglePlay();
    });

    // Volume / Mute
    this.dom.btnVolume.addEventListener('click', () => {
      const isMuted = this.audio.toggleMute();
      if (isMuted) {
        this.dom.iconVolOn.classList.add('hidden');
        this.dom.iconVolMute.classList.remove('hidden');
      } else {
        this.dom.iconVolOn.classList.remove('hidden');
        this.dom.iconVolMute.classList.add('hidden');
      }
    });

    // Scrubber seeking
    const handleSeek = (e) => {
      const rect = this.dom.progressContainer.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const targetTime = pos * this.audio.duration;
      this.audio.seek(targetTime);
      this._updateScrubber(pos);
    };

    this.dom.progressContainer.addEventListener('mousedown', (e) => {
      this.isSeeking = true;
      handleSeek(e);
      const onMove = (ev) => { if (this.isSeeking) handleSeek(ev); };
      const onUp = () => {
        this.isSeeking = false;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });

    // Touch support for scrubber
    this.dom.progressContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.isSeeking = true;
        handleSeek(e.touches[0]);
      }
    }, { passive: true });

    this.dom.progressContainer.addEventListener('touchmove', (e) => {
      if (this.isSeeking && e.touches.length > 0) {
        handleSeek(e.touches[0]);
      }
    }, { passive: true });

    this.dom.progressContainer.addEventListener('touchend', () => {
      this.isSeeking = false;
    });

    // Replay button
    this.dom.btnReplayHud.addEventListener('click', async () => {
      this.audio.seek(0);
      await this.audio.play();
    });
  }

  /**
   * Auto-hide controls when user is idle
   */
  _setupInactivityTimer() {
    const resetIdle = () => {
      this.dom.playerControls.classList.remove('idle');
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        if (this.isPlaying) {
          this.dom.playerControls.classList.add('idle');
        }
      }, 3500);
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('touchstart', resetIdle, { passive: true });
    window.addEventListener('keydown', resetIdle);
  }

  /**
   * Main Render Loop
   */
  _loop() {
    const currentTime = this.audio.currentTime;
    const duration = this.audio.duration;

    // Timeline state calculation
    const sceneState = this.timeline.getSceneState(currentTime);

    // Render Canvas Stage
    this.renderer.render(sceneState, currentTime);

    // Update Scrubber & time labels
    if (!this.isSeeking) {
      const progress = duration > 0 ? (currentTime / duration) : 0;
      this._updateScrubber(progress);
      this.dom.timeCurrent.textContent = this._formatTime(currentTime);
    }

    // Update Synchronized Lyrics (only original Hindi line, no subtext)
    this._updateLyrics(currentTime);

    requestAnimationFrame(this._loop.bind(this));
  }

  _updateScrubber(progress) {
    const pct = Math.max(0, Math.min(100, progress * 100));
    this.dom.progressFill.style.width = `${pct}%`;
    this.dom.progressHandle.style.left = `${pct}%`;
    this.dom.progressContainer.setAttribute('aria-valuenow', Math.round(pct));
  }

  _updateLyrics(currentTime) {
    const lyric = this.timeline.getCurrentLyric(currentTime);

    if (lyric && lyric.text !== 'आलाप...' && lyric !== this.activeLyric) {
      this.activeLyric = lyric;
      if (this.dom.lyricMain) {
        this.dom.lyricMain.textContent = lyric.text || '';
      }
    } else if ((!lyric || lyric.text === 'आलाप...') && this.activeLyric) {
      this.activeLyric = null;
      if (this.dom.lyricMain) {
        this.dom.lyricMain.textContent = '';
      }
    }
  }

  _formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds || 0));
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}

// Initialize on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  new RomanticMusicVideoApp();
});
