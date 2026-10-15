/**
 * Kinetic-Graphics Dream-Theatre Scene Renderer
 * 
 * Choreography for 28 timestamped beats synchronized to "Tum Jo Aaye (Zindagi Mein)":
 * - Devanagari lyrics act as living kinetic objects (stretching, folding, rotating,
 *   colliding, joining, blooming, floating, forming arches, trees, and paths).
 * - Two expressive silhouette characters scaled to 20-25% of frame height.
 * - Key words & metaphorical objects occupy 35-70% of frame when in focus.
 * - Meaningful state changes every 0.5-1.5s with varied romantic pacing.
 * - 100% deterministic time tracking via audio.currentTime.
 */

import { CharacterSystem } from './character.js';

export class SceneRenderer {
  constructor(canvas, particleManager) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = particleManager;
  }

  /**
   * Main render dispatch for current audio timestamp
   */
  render(state, currentTime) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    const { index, progress, isGap, gapProgress, inOverlap, overlapProgress, isAlaap, isOutro } = state;

    // Cinematic subtle camera breathing
    ctx.save();
    const zoom = 1.0 + 0.02 * Math.sin(progress * Math.PI);
    ctx.translate(width * 0.5, height * 0.5);
    ctx.scale(zoom, zoom);
    ctx.translate(-width * 0.5, -height * 0.5);

    // Dispatch to one of 28 choreography beats
    switch (index) {
      case 0:
        this._renderBeat01(width, height, currentTime, progress, state);
        break;
      case 1:
        this._renderBeat02(width, height, currentTime, progress, state);
        break;
      case 2:
        this._renderBeat03(width, height, currentTime, progress, state);
        break;
      case 3:
        this._renderBeat04(width, height, currentTime, progress, state);
        break;
      case 4:
        this._renderBeat05(width, height, currentTime, progress, state);
        break;
      case 5:
        this._renderBeat06(width, height, currentTime, progress, state);
        break;
      case 6:
        this._renderBeat07(width, height, currentTime, progress, state);
        break;
      case 7:
        this._renderBeat08(width, height, currentTime, progress, state);
        break;
      case 8:
        this._renderBeat09(width, height, currentTime, progress, state);
        break;
      case 9:
        this._renderBeat10(width, height, currentTime, progress, state);
        break;
      case 10:
        this._renderBeat11(width, height, currentTime, progress, state);
        break;
      case 11:
        this._renderBeat12(width, height, currentTime, progress, state);
        break;
      case 12:
        this._renderBeat13(width, height, currentTime, progress, state);
        break;
      case 13:
        this._renderBeat14(width, height, currentTime, progress, state);
        break;
      case 14:
        this._renderBeat15(width, height, currentTime, progress, state);
        break;
      case 15:
        this._renderBeat16Alaap(width, height, currentTime, progress, state);
        break;
      case 16:
        this._renderBeat17(width, height, currentTime, progress, state);
        break;
      case 17:
        this._renderBeat18(width, height, currentTime, progress, state);
        break;
      case 18:
        this._renderBeat19(width, height, currentTime, progress, state);
        break;
      case 19:
        this._renderBeat20(width, height, currentTime, progress, state);
        break;
      case 20:
        this._renderBeat21(width, height, currentTime, progress, state);
        break;
      case 21:
        this._renderBeat22(width, height, currentTime, progress, state);
        break;
      case 22:
        this._renderBeat23(width, height, currentTime, progress, state);
        break;
      case 23:
        this._renderBeat24(width, height, currentTime, progress, state);
        break;
      case 24:
        this._renderBeat25(width, height, currentTime, progress, state);
        break;
      case 25:
        this._renderBeat26(width, height, currentTime, progress, state);
        break;
      case 26:
        this._renderBeat27(width, height, currentTime, progress, state);
        break;
      case 27:
      default:
        this._renderBeat28(width, height, currentTime, progress, state);
        break;
    }

    // Outro fade to warm black (152.5s - 153.5s)
    if (isOutro) {
      const outroFade = Math.min(1.0, gapProgress);
      ctx.fillStyle = `rgba(7, 9, 22, ${outroFade})`;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
  }

  // =========================================================================
  // HELPER SUITE: KINETIC TYPOGRAPHY & VECTOR GEOMETRY
  // =========================================================================

  _drawSkyGradient(topColor, bottomColor, width, height) {
    const ctx = this.ctx;
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, topColor);
    grad.addColorStop(1, bottomColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  _drawHills(width, height, palette = { h1: '#121526', h2: '#0b0e1c', h3: '#060812' }, groundYRatio = 0.8) {
    const ctx = this.ctx;
    ctx.save();

    // Distant hill
    ctx.fillStyle = palette.h1;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, height * (groundYRatio - 0.14));
    ctx.bezierCurveTo(width * 0.35, height * (groundYRatio - 0.2), width * 0.65, height * (groundYRatio - 0.08), width, height * (groundYRatio - 0.16));
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Middle slope
    ctx.fillStyle = palette.h2;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, height * (groundYRatio - 0.05));
    ctx.bezierCurveTo(width * 0.3, height * (groundYRatio - 0.06), width * 0.55, height * (groundYRatio + 0.06), width, height * groundYRatio);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Foreground knoll
    ctx.fillStyle = palette.h3;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, height * (groundYRatio + 0.04));
    ctx.bezierCurveTo(width * 0.4, height * (groundYRatio - 0.02), width * 0.75, height * (groundYRatio + 0.08), width, height * (groundYRatio + 0.06));
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  _drawCrescentMoon(x, y, radius = 24, alpha = 1.0, angle = -0.3, color = '#ffe5a8') {
    if (radius <= 1 || alpha <= 0) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Soft outer moon glow
    ctx.shadowColor = color;
    ctx.shadowBlur = radius * 0.7;

    // Draw crescent by clipping difference of two arcs
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(radius * 0.45, -radius * 0.1, radius * 0.88, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
  }

  _drawRadiantSun(x, y, radius = 35, alpha = 1.0, color = '#f3c76d') {
    if (radius <= 1 || alpha <= 0) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.0);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.35, color);
    grad.addColorStop(1, 'rgba(243, 199, 109, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  _drawFlower(x, y, bloom = 1.0, color = '#e899af', stalkHeight = 32) {
    if (bloom <= 0.04) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    const b = Math.min(1.0, bloom);

    ctx.strokeStyle = '#283626';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(Math.sin(x * 0.1) * 4, -stalkHeight * 0.5 * b, 0, -stalkHeight * b);
    ctx.stroke();

    ctx.translate(0, -stalkHeight * b);
    ctx.scale(b, b);

    ctx.fillStyle = color;
    for (let p = 0; p < 5; p++) {
      ctx.save();
      ctx.rotate((p / 5) * Math.PI * 2);
      ctx.beginPath();
      ctx.ellipse(0, -6, 3.5, 6.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.fillStyle = '#f3c76d';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  _drawKineticText(text, x, y, options = {}) {
    if (!text || text === 'आलाप...') return;
    const ctx = this.ctx;
    ctx.save();

    const fontSize = options.fontSize || 36;
    const scaleX = options.scaleX ?? 1.0;
    const scaleY = options.scaleY ?? 1.0;
    const rotation = options.rotation || 0;
    const alpha = options.alpha ?? 1.0;
    const color = options.color || '#fff7ee';
    const align = options.align || 'center';
    const baseline = options.baseline || 'middle';
    const glow = options.glow || false;
    const glowColor = options.glowColor || 'rgba(243, 199, 109, 0.7)';
    const glowBlur = options.glowBlur || 14;

    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.translate(x, y);
    if (rotation) ctx.rotate(rotation);
    if (scaleX !== 1.0 || scaleY !== 1.0) ctx.scale(scaleX, scaleY);

    ctx.font = `${options.fontWeight || 600} ${fontSize}px "Noto Serif Devanagari", serif`;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;

    if (glow) {
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = glowBlur;
    }

    if (options.metallic === 'gold') {
      const grad = ctx.createLinearGradient(-100, -fontSize, 100, fontSize);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, '#f7d070');
      grad.addColorStop(0.7, '#d49b38');
      grad.addColorStop(1, '#fff5d8');
      ctx.fillStyle = grad;
    } else if (options.metallic === 'silver') {
      const grad = ctx.createLinearGradient(-100, -fontSize, 100, fontSize);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.4, '#d8e1f5');
      grad.addColorStop(0.8, '#8ba2d4');
      grad.addColorStop(1, '#ffffff');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = color;
    }

    ctx.fillText(text, 0, 0);

    // Optional subtle outline for high contrast
    if (options.stroke) {
      ctx.strokeStyle = options.strokeColor || 'rgba(8, 10, 22, 0.6)';
      ctx.lineWidth = options.strokeWidth || 2;
      ctx.strokeText(text, 0, 0);
    }

    ctx.restore();
  }

  _drawTextArched(text, cx, cy, radius, startAngle, endAngle, options = {}) {
    if (!text || text === 'आलाप...') return;
    const ctx = this.ctx;
    ctx.save();
    const fontSize = options.fontSize || 32;
    ctx.font = `${options.fontWeight || 600} ${fontSize}px "Noto Serif Devanagari", serif`;
    ctx.fillStyle = options.color || '#fff7ee';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = options.alpha ?? 1.0;

    if (options.glow) {
      ctx.shadowColor = options.glowColor || 'rgba(243, 199, 109, 0.7)';
      ctx.shadowBlur = options.glowBlur || 12;
    }

    const words = text.split(' ');
    const count = words.length;
    for (let i = 0; i < count; i++) {
      const t = count > 1 ? i / (count - 1) : 0.5;
      const angle = startAngle + (endAngle - startAngle) * t;
      const wx = cx + Math.cos(angle) * radius;
      const wy = cy + Math.sin(angle) * radius;
      ctx.save();
      ctx.translate(wx, wy);
      ctx.rotate(angle + Math.PI * 0.5);
      ctx.fillText(words[i], 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  _drawDreamPortal(x, y, w, h, type, time, alpha = 1.0) {
    if (alpha <= 0.05) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);

    // Portal glowing frame
    ctx.strokeStyle = 'rgba(232, 153, 175, 0.8)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#8be9fd';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(-w * 0.5, -h * 0.5, w, h, 16);
    ctx.stroke();

    // Clip inner content
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(-w * 0.5 + 2, -h * 0.5 + 2, w - 4, h - 4, 14);
    ctx.clip();

    if (type === 0) {
      // Memory 1: Rain turning into sparkling starlight
      const bg = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5);
      bg.addColorStop(0, '#0d152b');
      bg.addColorStop(1, '#231e38');
      ctx.fillStyle = bg;
      ctx.fillRect(-w * 0.5, -h * 0.5, w, h);

      ctx.strokeStyle = 'rgba(243, 199, 109, 0.7)';
      ctx.lineWidth = 1.5;
      for (let r = 0; r < 6; r++) {
        const rx = -w * 0.4 + r * (w * 0.16);
        const ry = ((-h * 0.5 + (time * 40 + r * 15)) % h) - h * 0.5;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 3, ry + 12);
        ctx.stroke();
      }
      // Mini couple silhouettes dancing in glitter
      CharacterSystem.drawCoupleDancing(ctx, 0, h * 0.28, 0.28, time * 2, { color: '#ffffff' });
    } else if (type === 1) {
      // Memory 2: Little house with warm window lighting up
      const bg = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5);
      bg.addColorStop(0, '#1a142e');
      bg.addColorStop(1, '#42243d');
      ctx.fillStyle = bg;
      ctx.fillRect(-w * 0.5, -h * 0.5, w, h);

      // House silhouette
      ctx.fillStyle = '#080a18';
      ctx.fillRect(-16, -2, 32, 24);
      ctx.beginPath();
      ctx.moveTo(-20, -2);
      ctx.lineTo(0, -18);
      ctx.lineTo(20, -2);
      ctx.closePath();
      ctx.fill();

      // Glowing window
      ctx.fillStyle = '#ffe5a8';
      ctx.shadowColor = '#f3c76d';
      ctx.shadowBlur = 8;
      ctx.fillRect(-5, 4, 10, 10);
    } else if (type === 2) {
      // Memory 3: Boat gliding across calm water
      const bg = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5);
      bg.addColorStop(0, '#091024');
      bg.addColorStop(1, '#13354b');
      ctx.fillStyle = bg;
      ctx.fillRect(-w * 0.5, -h * 0.5, w, h);

      // Water waves
      ctx.strokeStyle = 'rgba(139, 233, 253, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, h * 0.15);
      ctx.quadraticCurveTo(0, h * 0.1, w * 0.5, h * 0.18);
      ctx.stroke();

      // Mini boat gliding
      const bx = Math.sin(time * 1.5) * 15;
      ctx.fillStyle = '#080a16';
      ctx.beginPath();
      ctx.moveTo(bx - 16, h * 0.12);
      ctx.lineTo(bx + 16, h * 0.12);
      ctx.lineTo(bx + 10, h * 0.24);
      ctx.lineTo(bx - 10, h * 0.24);
      ctx.closePath();
      ctx.fill();
    } else {
      // Memory 4: Couple walking as autumn leaves spiral
      const bg = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5);
      bg.addColorStop(0, '#241428');
      bg.addColorStop(1, '#4e2832');
      ctx.fillStyle = bg;
      ctx.fillRect(-w * 0.5, -h * 0.5, w, h);

      CharacterSystem.drawCoupleHoldingHands(ctx, 0, h * 0.3, 0.28, time * 2, { color: '#ffffff' });

      // Spiraling leaf particles
      ctx.fillStyle = '#f3c76d';
      for (let l = 0; l < 5; l++) {
        const lx = Math.cos(time * 2 + l) * 25;
        const ly = -h * 0.3 + ((time * 25 + l * 20) % (h * 0.6));
        ctx.fillRect(lx, ly, 4, 3);
      }
    }

    ctx.restore();
    ctx.restore();
  }

  _drawConstellation(cx, cy, alpha = 1.0, scale = 1.0) {
    if (alpha <= 0.05) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    const stars = [
      { x: -70, y: -90 },
      { x: -35, y: -125 },
      { x: 0, y: -105 },
      { x: 35, y: -125 },
      { x: 70, y: -90 },
      { x: 0, y: -70 }
    ];

    ctx.strokeStyle = 'rgba(243, 199, 109, 0.65)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(stars[0].x, stars[0].y);
    ctx.lineTo(stars[1].x, stars[1].y);
    ctx.lineTo(stars[2].x, stars[2].y);
    ctx.lineTo(stars[3].x, stars[3].y);
    ctx.lineTo(stars[4].x, stars[4].y);
    ctx.moveTo(stars[2].x, stars[2].y);
    ctx.lineTo(stars[5].x, stars[5].y);
    ctx.stroke();

    for (const s of stars) {
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#8be9fd';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // =========================================================================
  // 28 CHOREOGRAPHY BEATS (IMPLEMENTATION CONTRACT)
  // =========================================================================

  // Beat 01: 00.5–03.0 | Finding and destiny
  _renderBeat01(width, height, time, progress, state) {
    this._drawSkyGradient('#060814', '#0e1428', width, height);
    this.particles.drawStars(width, height, time, 0.4);
    this._drawHills(width, height, { h1: '#0d1020', h2: '#080b18', h3: '#040610' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;

    // Distant lights
    const p1X = width * 0.28;
    const p2X = width * 0.72;

    // Character 1 reaches forward
    CharacterSystem.drawChar1(this.ctx, p1X, groundY, charScale, 'reach', 0, 1);

    // Large magnetic "पाया" drops and ripples
    const wordY = height * 0.38 + (1 - Math.min(1.0, progress * 2)) * -60;
    const bounce = Math.sin(Math.min(1.0, progress * 2.2) * Math.PI) * 12;
    this._drawKineticText('पाया', width * 0.5, wordY - bounce, {
      fontSize: Math.min(width, height) * 0.18,
      color: '#f3c76d',
      glow: true,
      alpha: Math.min(1.0, progress * 3)
    });

    // Ripple across hill
    if (progress > 0.3) {
      const rip = (progress - 0.3) / 0.7;
      this.ctx.save();
      this.ctx.strokeStyle = `rgba(243, 199, 109, ${1.0 - rip})`;
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.ellipse(width * 0.5, groundY, rip * width * 0.45, rip * 30, 0, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Two golden paths meet + falling star
    if (progress > 0.55) {
      const pProg = (progress - 0.55) / 0.45;
      this.ctx.save();
      this.ctx.strokeStyle = '#f3c76d';
      this.ctx.lineWidth = 2.5;
      this.ctx.shadowColor = '#f3c76d';
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.moveTo(p1X + 20, groundY);
      this.ctx.lineTo(p1X + 20 + (width * 0.5 - (p1X + 20)) * pProg, groundY);
      this.ctx.moveTo(p2X - 20, groundY);
      this.ctx.lineTo(p2X - 20 + (width * 0.5 - (p2X - 20)) * pProg, groundY);
      this.ctx.stroke();

      // Falling star
      const sx = width * 0.75 - pProg * (width * 0.25);
      const sy = height * 0.15 + pProg * (groundY - height * 0.15);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  // Beat 02: 03.0–05.5 | A person becomes a melody
  _renderBeat02(width, height, time, progress, state) {
    this._drawSkyGradient('#0a0d24', '#1f1535', width, height);
    this.particles.drawStars(width, height, time, 0.6);
    this._drawHills(width, height, { h1: '#16132b', h2: '#100e20', h3: '#080814' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Joined point blooms like a flower
    this._drawFlower(cx, groundY, Math.min(1.0, progress * 1.5), '#e899af', 45);

    // Three oversized musical ribbons looping around Char 2 sketch
    const ctx = this.ctx;
    ctx.save();
    for (let r = 0; r < 3; r++) {
      ctx.strokeStyle = r === 0 ? 'rgba(243, 199, 109, 0.7)' : (r === 1 ? 'rgba(232, 153, 175, 0.7)' : 'rgba(139, 233, 253, 0.6)');
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      for (let x = width * 0.05; x <= width * 0.85; x += 25) {
        const wave = Math.sin((x * 0.015) + (time * 4) + r * 1.6) * (20 + r * 8);
        const y = height * 0.45 + wave;
        if (x === width * 0.15) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();

    // Sketch of Char 2 appearing
    CharacterSystem.drawChar1(ctx, width * 0.32, groundY, charScale, 'reach', 0, 1);
    CharacterSystem.drawChar2(ctx, width * 0.68, groundY, charScale, 'idle', 0, -1, { aura: true, auraColor: 'rgba(232, 153, 175, 0.6)' });

    // Curved kinetic lyric: "होंठों पे सजाया तुम्हें, नग़मे सा गाया तुम्हें"
    this._drawKineticText('होंठों पे सजाया तुम्हें', cx, height * 0.24, {
      fontSize: Math.min(width, height) * 0.055,
      scaleX: 1.0 + Math.sin(progress * Math.PI) * 0.08,
      glow: true
    });
    this._drawKineticText('नग़मे सा गाया तुम्हें', cx, height * 0.34, {
      fontSize: Math.min(width, height) * 0.065,
      color: '#f3c76d',
      glow: true
    });
  }

  // Beat 03: 05.8–08.5 | A secret is sheltered
  _renderBeat03(width, height, time, progress, state) {
    this._drawSkyGradient('#070916', '#141628', width, height);
    this.particles.drawStars(width, height, time, 0.4);
    this._drawHills(width, height, { h1: '#0e1122', h2: '#0a0d1a', h3: '#060812' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Protective leaf/canopy closing around couple
    const canopyW = width * (0.35 + (1 - progress) * 0.15);
    const canopyH = height * 0.48;
    const ctx = this.ctx;

    ctx.save();
    ctx.fillStyle = 'rgba(20, 24, 48, 0.85)';
    ctx.strokeStyle = '#f3c76d';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - canopyW * 0.5, groundY);
    ctx.quadraticCurveTo(cx - canopyW * 0.4, groundY - canopyH, cx, groundY - canopyH * 0.9);
    ctx.quadraticCurveTo(cx + canopyW * 0.4, groundY - canopyH, cx + canopyW * 0.5, groundY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Playful glimpse gap
    const gapOpen = Math.sin(progress * Math.PI) * 18;
    if (gapOpen > 2) {
      ctx.fillStyle = 'rgba(255, 230, 160, 0.25)';
      ctx.beginPath();
      ctx.ellipse(cx, groundY - canopyH * 0.4, gapOpen, 35, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Inside silhouettes
    CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale * 0.9, 0, { aura: true });

    this._drawKineticText('सब से छुपाया तुम्हें', cx, height * 0.22, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#f8cfdc',
      glow: true
    });
  }

  // Beat 04: 08.5–11.5 | A dream takes shape
  _renderBeat04(width, height, time, progress, state) {
    this._drawSkyGradient('#0e1026', '#2a1a36', width, height);
    this.particles.drawStars(width, height, time, 0.7);
    this._drawHills(width, height, { h1: '#17132e', h2: '#100d22', h3: '#080716' });

    const groundY = height * 0.82;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Character 1 reclines gazing at floating dream bubble
    CharacterSystem.drawChar1(this.ctx, width * 0.35, groundY, charScale, 'recline', 0, 1);

    // Giant translucent dream bubble (45-60% of frame)
    const bubbleR = Math.min(width, height) * (0.24 + progress * 0.05);
    const bubbleX = width * 0.62;
    const bubbleY = height * 0.44 + Math.sin(time * 2) * 8;

    const ctx = this.ctx;
    ctx.save();
    // Bubble sheen
    const bg = ctx.createRadialGradient(bubbleX, bubbleY, 0, bubbleX, bubbleY, bubbleR);
    bg.addColorStop(0, 'rgba(255, 240, 200, 0.35)');
    bg.addColorStop(0.7, 'rgba(232, 153, 175, 0.2)');
    bg.addColorStop(1, 'rgba(139, 233, 253, 0.65)');
    ctx.fillStyle = bg;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(bubbleX, bubbleY, bubbleR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Mini Char 2 dancing inside dream bubble
    CharacterSystem.drawChar2(ctx, bubbleX, bubbleY + bubbleR * 0.45, charScale * 0.55, 'dance', time * 3, 1, { color: '#ffffff' });
    ctx.restore();

    // Typography "सपना" curved along bubble rim
    this._drawTextArched('सपना बनाया तुम्हें', bubbleX, bubbleY, bubbleR + 25, -Math.PI * 0.8, -Math.PI * 0.2, {
      fontSize: Math.min(width, height) * 0.05,
      color: '#f3c76d',
      glow: true
    });
    this._drawKineticText('नींदों में बुलाया तुम्हें', width * 0.38, groundY + 20, {
      fontSize: Math.min(width, height) * 0.045,
      color: '#d6cee8'
    });
  }

  // Beat 05: 11.5–16.5 | Arrival changes everything
  _renderBeat05(width, height, time, progress, state) {
    // Before/After color wave sweeping across frame
    const waveT = Math.min(1.0, (progress * 1.0) -0.3);
    const skyTop = waveT > 0.4 ? '#18153b' : '#080a16';
    const skyBottom = waveT > 0.4 ? '#5c2d49' : '#14182b';
    this._drawSkyGradient(skyTop, skyBottom, width, height);

    this.particles.drawStars(width, height, time, 0.8);
    // Smoothly blend the hills from the pre-arrival palette to the after-arrival palette.
    const hillT = Math.max(0, Math.min(1, (waveT - 0.25) / 0.3));
    const hillEase = hillT * hillT * (3 - 2 * hillT);
    const blendColor = (from, to) => {
      const parse = color => color.match(/[\da-f]{2}/gi).map(value => parseInt(value, 16));
      const [fr, fg, fb] = parse(from);
      const [tr, tg, tb] = parse(to);
      return `rgb(${Math.round(fr + (tr - fr) * hillEase)}, ${Math.round(fg + (tg - fg) * hillEase)}, ${Math.round(fb + (tb - fb) * hillEase)})`;
    };
    this._drawHills(width, height, {
      h1: blendColor('#0d1020', '#2b1c38'),
      h2: blendColor('#090c19', '#1d1329'),
      h3: blendColor('#050711', '#120a1c')
    });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Characters approach through large word doorway
    const c1X = width * 0.25 + progress * (width * 0.18);
    const c2X = width * 0.75 - progress * (width * 0.18);

    CharacterSystem.drawChar1(this.ctx, c1X, groundY, charScale, progress > 0.85 ? 'hold_hands' : 'walk', time * 3, 1, { aura: true });
    CharacterSystem.drawChar2(this.ctx, c2X, groundY, charScale, progress > 0.85 ? 'hold_hands' : 'walk', time * 3, -1, { aura: true });

    // Blooming flowers chain reaction
    const fCount = 10;
    for (let f = 0; f < fCount; f++) {
      const fx = width * (0.1 + f * 0.09);
      const bloom = Math.max(0, Math.min(1.0, (progress - 0.2) * 2 - (f * 0.08)));
      this._drawFlower(fx, groundY + 10, bloom, f % 2 === 0 ? '#f8cfdc' : '#f3c76d', 34);
    }

    // Kinetic typography: "तुम जो आये ज़िन्दगी में बात बन गयी"
    this._drawKineticText('तुम जो आये ज़िन्दगी में', cx, height * 0.25, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#fff7ee',
      glow: true,
      scaleX: 1.0 + Math.sin(progress * Math.PI) * 0.08
    });
    this._drawKineticText('बात बन गयी', cx, height * 0.38, {
      fontSize: Math.min(width, height) * 0.085,
      color: '#f3c76d',
      metallic: 'gold',
      glow: true
    });
  }

  // Beat 06: 16.8–22.0 | Love becomes identity
  _renderBeat06(width, height, time, progress, state) {
    this._drawSkyGradient('#161233', '#48203f', width, height);
    this.particles.drawStars(width, height, time, 0.8);
    this._drawHills(width, height, { h1: '#261b36', h2: '#1a1329', h3: '#0f0a1c' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Couple holding hands with joined shadow
    CharacterSystem.drawCoupleHoldingHands(this.ctx, cx, groundY, charScale, 0, { aura: true });

    // Abstract Rosette / Mandala formed from curved letter orbits
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(cx, groundY - 60);
    const rotSpeed = time * 0.8;
    ctx.rotate(rotSpeed);

    const petalsCount = 8;
    for (let p = 0; p < petalsCount; p++) {
      ctx.save();
      ctx.rotate((p / petalsCount) * Math.PI * 2);
      ctx.strokeStyle = p % 2 === 0 ? 'rgba(243, 199, 109, 0.65)' : 'rgba(232, 153, 175, 0.65)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.ellipse(0, -45, 18, 45, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();

    // Two instances of "इश्क़" orbiting
    this._drawKineticText('इश्क़ मजहब', cx, height * 0.2, {
      fontSize: Math.min(width, height) * 0.065,
      color: '#ffffff',
      glow: true
    });
    this._drawKineticText('इश्क़ मेरी ज़ात बन गयी', cx, height * 0.3, {
      fontSize: Math.min(width, height) * 0.075,
      metallic: 'gold',
      glow: true
    });
  }

  // Beat 07: 22.5–25.8 | Finding, revisited with certainty
  _renderBeat07(width, height, time, progress, state) {
    this._drawSkyGradient('#121535', '#3d2242', width, height);
    this.particles.drawDust(width, height, time, 0.7);
    this._drawHills(width, height, { h1: '#241a34', h2: '#181226', h3: '#0e0b1a' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Couple walks briskly toward each other with golden path snapping under feet
    const c1X = width * 0.3 + progress * (width * 0.15);
    const c2X = width * 0.7 - progress * (width * 0.15);
    CharacterSystem.drawChar1(this.ctx, c1X, groundY, charScale, 'walk', time * 3.5, 1);
    CharacterSystem.drawChar2(this.ctx, c2X, groundY, charScale, 'walk', time * 3.5, -1);

    // Glowing path beneath feet
    this.ctx.save();
    this.ctx.strokeStyle = '#f3c76d';
    this.ctx.lineWidth = 4;
    this.ctx.shadowColor = '#f3c76d';
    this.ctx.shadowBlur = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(c1X, groundY);
    this.ctx.lineTo(c2X, groundY);
    this.ctx.stroke();
    this.ctx.restore();

    // Bouncing kinetic text "पाया"
    const bounceY = Math.abs(Math.sin(time * 5)) * 25;
    this._drawKineticText('पाया तुम्हें', cx, height * 0.28 - bounceY, {
      fontSize: Math.min(width, height) * 0.08,
      color: '#f3c76d',
      glow: true
    });
    this._drawKineticText('रब ने मिलाया तुम्हें', cx, height * 0.42, {
      fontSize: Math.min(width, height) * 0.065,
      color: '#fff7ee'
    });
  }

  // Beat 08: 26.0–28.5 | Melody becomes a shared path
  _renderBeat08(width, height, time, progress, state) {
    this._drawSkyGradient('#15183d', '#422849', width, height);
    this.particles.drawPetals(width, height, time, 0.6);
    this._drawHills(width, height, { h1: '#271b38', h2: '#1b122a', h3: '#100b1d' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;

    // Thick flowing sound ribbon
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = '#f3c76d';
    ctx.lineWidth = 6;
    ctx.shadowColor = '#f3c76d';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 20) {
      const y = groundY - 10 + Math.sin(x * 0.015 + time * 5) * 18;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    // Couple riding undulating crest
    const coupleX = width * 0.4 + progress * (width * 0.2);
    const coupleY = groundY - 10 + Math.sin(coupleX * 0.015 + time * 5) * 18;
    CharacterSystem.drawCoupleHoldingHands(ctx, coupleX, coupleY, charScale, time * 3, { aura: true });

    this._drawKineticText('होंठों पे सजाया तुम्हें', width * 0.5, height * 0.24, {
      fontSize: Math.min(width, height) * 0.06,
      color: '#fff7ee'
    });
    this._drawKineticText('नग़मे सा गाया तुम्हें', width * 0.5, height * 0.35, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#f8cfdc',
      glow: true
    });
  }

  // Beat 09: 28.8–31.0 | Their private world
  _renderBeat09(width, height, time, progress, state) {
    this._drawSkyGradient('#0a0d20', '#1c1836', width, height);
    this._drawHills(width, height, { h1: '#12122b', h2: '#0b0c1e', h3: '#070815' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Flower bud origami shelter closing
    const petalW = width * 0.28;
    const petalH = height * 0.5;
    const ctx = this.ctx;

    ctx.save();
    // Warm interior glow
    const intGlow = ctx.createRadialGradient(cx, groundY - 50, 0, cx, groundY - 50, 90);
    intGlow.addColorStop(0, 'rgba(255, 230, 160, 0.85)');
    intGlow.addColorStop(1, 'rgba(232, 153, 175, 0)');
    ctx.fillStyle = intGlow;
    ctx.beginPath();
    ctx.arc(cx, groundY - 50, 90, 0, Math.PI * 2);
    ctx.fill();

    // Origami petals
    ctx.fillStyle = 'rgba(30, 22, 45, 0.9)';
    ctx.strokeStyle = '#e899af';
    ctx.lineWidth = 2.5;
    // Left petal
    ctx.beginPath();
    ctx.moveTo(cx, groundY - petalH);
    ctx.quadraticCurveTo(cx - petalW, groundY - petalH * 0.5, cx, groundY);
    ctx.fill();
    ctx.stroke();
    // Right petal
    ctx.beginPath();
    ctx.moveTo(cx, groundY - petalH);
    ctx.quadraticCurveTo(cx + petalW, groundY - petalH * 0.5, cx, groundY);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    CharacterSystem.drawCoupleSitting(ctx, cx, groundY, charScale * 0.95);

    this._drawKineticText('सब से छुपाया तुम्हें', cx, height * 0.2, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#f8cfdc',
      glow: true
    });
  }

  // Beat 10: 31.0–34.5 | Dreaming together
  _renderBeat10(width, height, time, progress, state) {
    this._drawSkyGradient('#0a0d24', '#261638', width, height);
    this.particles.drawStars(width, height, time, 0.85);
    this.particles.drawFireflies(width, height, time, 0.7);
    this._drawHills(width, height, { h1: '#191530', h2: '#120f24', h3: '#0a0818' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Couple standing on hill
    CharacterSystem.drawCoupleHoldingHands(this.ctx, cx, groundY, charScale, 0);

    // Dream lantern tracing figure-eight
    const t8 = time * 2;
    const lx = cx + Math.sin(t8) * (width * 0.28);
    const ly = height * 0.35 + Math.sin(t8 * 2) * (height * 0.12);
    const lr = 35;

    const ctx = this.ctx;
    ctx.save();
    const lGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr * 1.8);
    lGrad.addColorStop(0, '#ffffff');
    lGrad.addColorStop(0.4, 'rgba(255, 230, 140, 0.8)');
    lGrad.addColorStop(1, 'rgba(243, 199, 109, 0)');
    ctx.fillStyle = lGrad;
    ctx.beginPath();
    ctx.arc(lx, ly, lr * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Two dancing silhouettes inside lantern
    CharacterSystem.drawCoupleDancing(ctx, lx, ly + 8, 0.25, time * 3, { color: '#ffffff' });
    ctx.restore();

    this._drawKineticText('सपना बनाया तुम्हें', cx, height * 0.18, {
      fontSize: Math.min(width, height) * 0.065,
      color: '#f3c76d',
      glow: true
    });
  }

  // Beat 11: 35.0–39.0 | Everything clicks into place
  _renderBeat11(width, height, time, progress, state) {
    this._drawSkyGradient('#1b1236', '#4e2348', width, height);
    this.particles.drawPetals(width, height, time, 0.9);
    this._drawHills(width, height, { h1: '#2a1a36', h2: '#1e1229', h3: '#120a1c' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Couple steps together
    CharacterSystem.drawCoupleHoldingHands(this.ctx, cx, groundY, charScale, time * 2.5, { aura: true });

    // Blooming cherry-blossom tree in background assembled from strokes
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = '#080a18';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(cx, groundY);
    ctx.quadraticCurveTo(cx - 20, groundY - 100, cx, groundY - 180);
    ctx.stroke();

    // Branches & blossom clouds
    const bloomAlpha = Math.min(1.0, progress * 1.8);
    ctx.globalAlpha = bloomAlpha;
    const cloudColors = ['#f8cfdc', '#e899af', '#ffd2de'];
    for (let c = 0; c < 7; c++) {
      const clx = cx + Math.cos(c * 0.9) * (50 + c * 10);
      const cly = (groundY - 180) + Math.sin(c * 0.9) * (40 + c * 6);
      ctx.fillStyle = cloudColors[c % 3];
      ctx.beginPath();
      ctx.arc(clx, cly, 26 + (c % 3) * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    this._drawKineticText('तुम जो आये ज़िन्दगी में', cx, height * 0.22, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#fff7ee',
      glow: true
    });
    this._drawKineticText('बात बन गयी', cx, height * 0.34, {
      fontSize: Math.min(width, height) * 0.09,
      metallic: 'gold',
      glow: true
    });
  }

  // Beat 12: 40.5–44.0 | A shared identity
  _renderBeat12(width, height, time, progress, state) {
    this._drawSkyGradient('#161033', '#441d40', width, height);
    this.particles.drawPetals(width, height, time, 0.7);
    this._drawHills(width, height, { h1: '#261b36', h2: '#1b1229', h3: '#0f091c' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Couple dancing
    CharacterSystem.drawCoupleDancing(this.ctx, cx, groundY, charScale, time * 2.8, { aura: true });

    // Orbiting blossom & gold rings
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(cx, groundY - 35);
    ctx.rotate(time * 0.9);
    ctx.strokeStyle = 'rgba(243, 199, 109, 0.75)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.22, height * 0.1, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(232, 153, 175, 0.75)';
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.22, height * 0.1, Math.PI * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    this._drawKineticText('इश्क़ मजहब', cx, height * 0.2, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#ffffff'
    });
    this._drawKineticText('इश्क़ मेरी ज़ात बन गयी', cx, height * 0.32, {
      fontSize: Math.min(width, height) * 0.075,
      metallic: 'gold',
      glow: true
    });
  }

  // Beat 13: 45.5–54.5 | Many dreams, one love
  _renderBeat13(width, height, time, progress, state) {
    this._drawSkyGradient('#080d22', '#1a193d', width, height);
    this.particles.drawStars(width, height, time, 0.85);

    const groundY = height * 0.86;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Couple stargazing near bottom of frame
    CharacterSystem.drawCoupleReclining(this.ctx, cx, groundY, charScale);

    // 4 Animated Dream Portals
    const portalW = Math.min(width, height) * 0.22;
    const portalH = portalW * 0.78;

    const portals = [
      { x: width * 0.22, y: height * 0.32, type: 0, delay: 0.1 },
      { x: width * 0.78, y: height * 0.28, type: 1, delay: 0.25 },
      { x: width * 0.26, y: height * 0.60, type: 2, delay: 0.4 },
      { x: width * 0.74, y: height * 0.58, type: 3, delay: 0.55 }
    ];

    for (let i = 0; i < portals.length; i++) {
      const p = portals[i];
      const pAlpha = Math.max(0, Math.min(1.0, (progress - p.delay) * 3));
      const floatY = p.y + Math.sin(time * 2 + i) * 6;
      this._drawDreamPortal(p.x, floatY, portalW, portalH, p.type, time, pAlpha);
    }

    this._drawKineticText('सपने तेरी चाहतों के देखता हूँ अब कई', cx, height * 0.15, {
      fontSize: Math.min(width, height) * 0.065,
      color: '#f8cfdc',
      glow: true
    });
  }

  // Beat 14: 54.5–60.0 | Gold day becomes silver night
  _renderBeat14(width, height, time, progress, state) {
    const cx = width * 0.5;
    const splitProgress = Math.min(1.0, progress * 1.5);
    const ctx = this.ctx;

    // Dual split merging into twilight
    if (splitProgress < 0.8) {
      // Left side: Gold Day
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, cx, height);
      ctx.clip();
      const goldSky = ctx.createLinearGradient(0, 0, 0, height);
      goldSky.addColorStop(0, '#362208');
      goldSky.addColorStop(1, '#664010');
      ctx.fillStyle = goldSky;
      ctx.fillRect(0, 0, cx, height);
      this._drawRadiantSun(width * 0.25, height * 0.32, 45, 1.0, '#f3c76d');
      ctx.restore();

      // Right side: Silver Night
      ctx.save();
      ctx.beginPath();
      ctx.rect(cx, 0, width - cx, height);
      ctx.clip();
      const silverSky = ctx.createLinearGradient(0, 0, 0, height);
      silverSky.addColorStop(0, '#060a18');
      silverSky.addColorStop(1, '#151f3b');
      ctx.fillStyle = silverSky;
      ctx.fillRect(cx, 0, width - cx, height);
      this._drawCrescentMoon(width * 0.75, height * 0.3, 30, 1.0, -0.3, '#d8e1f5');
      ctx.restore();

      // Dividing gold/silver line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
    } else {
      // Merged harmonic twilight
      this._drawSkyGradient('#14102d', '#582b48', width, height);
      this._drawRadiantSun(width * 0.38, height * 0.3, 38, 0.9, '#f3c76d');
      this._drawCrescentMoon(width * 0.62, height * 0.28, 25, 0.9, -0.2, '#ffffff');
    }

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;

    // Couple walking together across center
    CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, time * 2.5, { aura: true });

    this._drawKineticText('दिन है सोना', width * 0.28, height * 0.18, {
      fontSize: Math.min(width, height) * 0.065,
      metallic: 'gold',
      glow: true
    });
    this._drawKineticText('और चाँदी रात बन गयी', width * 0.72, height * 0.18, {
      fontSize: Math.min(width, height) * 0.065,
      metallic: 'silver',
      glow: true
    });
  }

  // Beat 15: 60.5–65.0 | The refrain becomes a kinetic orbit
  _renderBeat15(width, height, time, progress, state) {
    this._drawSkyGradient('#161234', '#4c2447', width, height);
    this.particles.drawStars(width, height, time, 0.8);
    this._drawHills(width, height, { h1: '#261b36', h2: '#1b1229', h3: '#0f091c' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Couple in center
    CharacterSystem.drawCoupleHoldingHands(this.ctx, cx, groundY, charScale, time * 2);

    // Rotating kinetic stage ring
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(cx, groundY - 15);
    ctx.rotate(time * 1.5);
    ctx.strokeStyle = '#f3c76d';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#f3c76d';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.26, 25, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    this._drawKineticText('तुम जो आये ज़िन्दगी में', cx, height * 0.24, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#ffffff',
      glow: true
    });
    this._drawKineticText('बात बन गयी', cx, height * 0.36, {
      fontSize: Math.min(width, height) * 0.085,
      metallic: 'gold',
      glow: true
    });
  }

  // Beat 16: 65.5–77.0 | Alaap: weightless visual breathing (NO TEXT DISPLAYED)
  _renderBeat16Alaap(width, height, time, progress, state) {
    this._drawSkyGradient('#040510', '#141433', width, height);
    this.particles.drawStars(width, height, time, 1.0);
    this.particles.drawDust(width, height, time, 0.9);

    const cx = width * 0.5;
    const cy = height * 0.5;

    // Weightless floating couple
    const floatY = cy + Math.sin(time * 1.2) * 20;
    const charH = height * 0.22;
    const charScale = charH / 85;

    // Two continuous looping ribbons forming heart-like negative space
    const ctx = this.ctx;
    ctx.save();
    for (let r = 0; r < 2; r++) {
      ctx.strokeStyle = r === 0 ? 'rgba(243, 199, 109, 0.65)' : 'rgba(232, 153, 175, 0.65)';
      ctx.lineWidth = 4;
      ctx.shadowColor = r === 0 ? '#f3c76d' : '#e899af';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.1) {
        const radX = (width * 0.25) + Math.sin(a * 2 + time * 1.5 + r) * 35;
        const radY = (height * 0.2) + Math.cos(a + time + r) * 30;
        const px = cx + Math.cos(a) * radX;
        const py = floatY + Math.sin(a) * radY;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();

    CharacterSystem.drawCoupleDancing(ctx, cx, floatY, charScale * 0.9, time * 1.2, { aura: true });

    // Liquid wave preparing to sweep down (toward end of alaap)
    if (progress > 0.8) {
      const wProg = (progress - 0.8) / 0.2;
      ctx.save();
      ctx.fillStyle = `rgba(139, 233, 253, ${wProg * 0.35})`;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * (1 - wProg * 0.3));
      ctx.quadraticCurveTo(cx, height * (1 - wProg * 0.4), width, height * (1 - wProg * 0.3));
      ctx.lineTo(width, height);
      ctx.fill();
      ctx.restore();
    }
  }

  // Beat 17: 77.0–87.0 | Dull turns sweet
  _renderBeat17(width, height, time, progress, state) {
    // Desaturated grey transitioning to rich warm watercolor
    const colorMix = Math.min(1.0, progress * 1.3 - 0.5);
    const greySky = '#101216';
    const richSkyTop = '#18153c';
    const richSkyBottom = '#5c2d49';

    this._drawSkyGradient(colorMix > 0.3 ? richSkyTop : greySky, colorMix > 0.3 ? richSkyBottom : '#1c1f24', width, height);

    this._drawHills(width, height, {
      h1: colorMix > 0.4 ? '#2b1c38' : '#14161a',
      h2: colorMix > 0.4 ? '#1d1329' : '#0e1014',
      h3: colorMix > 0.4 ? '#120a1c' : '#08090c'
    });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Char 1 on left, Char 2 walks in from right with warm ribbon
    const c2X = width * 0.85 - progress * (width * 0.3);
    CharacterSystem.drawChar1(this.ctx, width * 0.35, groundY, charScale, 'reach', 0, 1, { aura: colorMix > 0.5 });
    CharacterSystem.drawChar2(this.ctx, c2X, groundY, charScale, 'walk', time * 2.8, -1, { aura: true, auraColor: 'rgba(243, 199, 109, 0.7)' });

    // Blooming meadow in wake of Char 2
    for (let f = 0; f < 8; f++) {
      const fx = width * 0.85 - f * (width * 0.05);
      if (fx > c2X) {
        this._drawFlower(fx, groundY + 12, 1.0, f % 2 === 0 ? '#e899af' : '#f3c76d', 32);
      }
    }

    this._drawKineticText('तेरे बिना फीकी सी थी मेरी ज़िंदगानी ये', cx, height * 0.22, {
      fontSize: Math.min(width, height) * 0.055,
      color: colorMix > 0.5 ? '#fff7ee' : '#7f8899'
    });
    this._drawKineticText('तेरे संग मीठी हो गयी', cx, height * 0.34, {
      fontSize: Math.min(width, height) * 0.075,
      color: colorMix > 0.5 ? '#f8cfdc' : '#7f8899',
      glow: colorMix > 0.5
    });
  }

  // Beat 18: 88.5–99.0 | Joy is something they can catch & The world transforms
  _renderBeat18(width, height, time, progress, state) {
    if (time < 95.0) {
      this._renderBeat18A(width, height, time, state);
    } else {
      this._renderBeat18B(width, height, time, state);
    }
  }

  // 18A — 88.5–95.0 | Happiness rushes past; they catch it and embrace it
  // Lyric: आता-जाता खुशियों के मैं गले लग जाता हूँ,
  _renderBeat18A(width, height, time, state) {
    const ctx = this.ctx;
    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Atmospheric warm background carrying over from watercolor bloom
    this._drawSkyGradient('#19163c', '#542848', width, height);

    // Dynamic ground undulation responding to kinetic action
    let groundWaveAmp = 0;
    if (time >= 92.5 && time < 94.2) {
      groundWaveAmp = 12 * Math.sin((time - 92.5) * Math.PI * 4);
    }

    // Background hills
    ctx.save();
    ctx.fillStyle = '#2c1c3a';
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, groundY - 60);
    ctx.bezierCurveTo(width * 0.35, groundY - 90 + groundWaveAmp, width * 0.7, groundY - 40 - groundWaveAmp, width, groundY - 70);
    ctx.lineTo(width, height);
    ctx.fill();

    // Foreground hill knoll
    ctx.fillStyle = '#110a1c';
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, groundY + 15);
    ctx.bezierCurveTo(width * 0.4, groundY - 10 + groundWaveAmp, width * 0.75, groundY + 30 - groundWaveAmp, width, groundY + 10);
    ctx.lineTo(width, height);
    ctx.fill();
    ctx.restore();

    // -------------------------------------------------------------------------
    // Phase 1: 88.5–89.3s — आता-जाता (Broad elastic loop, characters run & dart)
    // -------------------------------------------------------------------------
    if (time < 90) {
      const t = Math.max(0, Math.min(1.0, (time - 89) / 0.9));
      const sweep = Math.sin(t * Math.PI);
      const loopX = width * (0.2 + 0.52 * sweep);
      const loopY = height * (0.58 - 0.24 * sweep);

      // Broad elastic ribbon loop sweeping left-to-right then rebounding
      ctx.save();
      const loopGrad = ctx.createLinearGradient(width * 0.1, groundY, loopX, loopY);
      loopGrad.addColorStop(0, '#f7a072');
      loopGrad.addColorStop(0.5, '#f3c76d');
      loopGrad.addColorStop(1, '#e899af');
      ctx.strokeStyle = loopGrad;
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#f3c76d';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, groundY - 20);
      ctx.bezierCurveTo(width * 0.3, groundY - 140 * sweep, loopX - 40, loopY - 60, loopX, loopY);
      ctx.stroke();
      ctx.restore();

      // Lyric rides the loop as one readable word group
      const loopAngle = (1 - 2 * t) * 0.22;
      this._drawKineticText('आता-जाता', loopX, loopY - 28, {
        fontSize: Math.min(width, height) * 0.08,
        color: '#fff7ee',
        rotation: loopAngle,
        glow: true,
        glowColor: 'rgba(243, 199, 109, 0.9)'
      });

      // Character 1 runs after it from left
      const c1X = width * (0.16 + 0.2 * t);
      CharacterSystem.drawChar1(ctx, c1X, groundY, charScale, 'walk', time * 6, 1, { aura: true });

      // Character 2 darts in from opposite side
      const c2X = width * (0.84 - 0.2 * t);
      CharacterSystem.drawChar2(ctx, c2X, groundY, charScale, 'walk', time * 6, -1, { aura: true });
    }

    // -------------------------------------------------------------------------
    // Phase 2: 89.3–90.4s — खुशियों के (Swells to ~50% frame, springs open into 3 objects)
    // -------------------------------------------------------------------------
    else if (time < 91) {
      const t = Math.max(0, Math.min(1.0, (time - 90)/1));

      // Characters advancing with anticipation
      const c1X = width * (0.36 + 0.06 * t);
      const c2X = width * (0.64 - 0.06 * t);
      CharacterSystem.drawChar1(ctx, c1X, groundY, charScale, 'reach', 0, 1, { aura: true });
      CharacterSystem.drawChar2(ctx, c2X, groundY, charScale, 'reach', 0, -1, { aura: true });

      if (t < 1) {
        // Swells to occupy roughly half the frame
        const swellProg = t / 0.6;
        const fontScale = 1.0 + 0.65 * Math.sin(swellProg * Math.PI * 0.8);
        this._drawKineticText('खुशियों के', cx, height * 0.42, {
          fontSize: Math.min(width, height) * 0.09 * fontScale,
          metallic: 'gold',
          glow: true,
          glowBlur: 22
        });
      } 
      // else {
      //   // Springs open into three oversized, expressive passing forms
      //   const openT = (t - 0.6  )/0.4;

      //   // 1. Glowing Orb: rebounds like an energetic ball toward Char 1
      //   const orbX = cx - openT * (width * 0.12);
      //   const orbBounce = Math.abs(Math.sin(openT * Math.PI * 3)) * 50;
      //   const orbY = height * 0.52 - orbBounce;
      //   ctx.save();
      //   const oGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 32);
      //   oGrad.addColorStop(0, '#ffffff');
      //   oGrad.addColorStop(0.4, '#f7d070');
      //   oGrad.addColorStop(1, 'rgba(247, 208, 112, 0)');
      //   ctx.fillStyle = oGrad;
      //   ctx.beginPath();
      //   ctx.arc(orbX, orbY, 32, 0, Math.PI * 2);
      //   ctx.fill();
      //   ctx.restore();

      //   // 2. Petal-like burst: loops overhead
      //   const petArc = Math.sin(openT * Math.PI);
      //   const petX = cx + (openT - 0.5) * (width * 0.35);
      //   const petY = height * 0.38 - petArc * (height * 0.22);
      //   ctx.save();
      //   ctx.translate(petX, petY);
      //   ctx.rotate(openT * Math.PI * 1.5);
      //   ctx.fillStyle = '#f8cfdc';
      //   ctx.shadowColor = '#e899af';
      //   ctx.shadowBlur = 14;
      //   ctx.beginPath();
      //   ctx.ellipse(0, 0, 28, 14, 0, 0, Math.PI * 2);
      //   ctx.fill();
      //   ctx.restore();

      //   // 3. Curling Ribbon: snakes between the characters
      //   ctx.save();
      //   ctx.strokeStyle = '#18a4a4';
      //   ctx.lineWidth = 5.5;
      //   ctx.shadowColor = '#18a4a4';
      //   ctx.shadowBlur = 14;
      //   ctx.beginPath();
      //   for (let rx = c1X; rx <= c2X; rx += 15) {
      //     const ry = groundY - 45 + Math.sin((rx * 0.04) + openT * Math.PI * 3) * 25;
      //     if (rx === c1X) ctx.moveTo(rx, ry);
      //     else ctx.lineTo(rx, ry);
      //   }
      //   ctx.stroke();
      //   ctx.restore();

      //   this._drawKineticText('खुशियों के', cx, height * 0.22, {
      //     fontSize: Math.min(width, height) * 0.065,
      //     color: '#ffffff',
      //     alpha: 1.0 - openT * 0.5
      //   });
      // }
    }

    // -------------------------------------------------------------------------
    // Phase 3: 90.4–92.5s — मैं गले लग जाता हूँ (Anticipation -> Catches -> Embrace -> Bloom)
    // -------------------------------------------------------------------------
    else if (time < 92.5) {
      const t = Math.max(0, Math.min(1.0, (time - 91) / 1.5));

      // Action 1 (90.4–91.0s, t < 0.28): Char 1 catches orb against chest with squash & pop
      if (t < 0.28) {
        const catchT = t / 0.28;
        const c1X = width * 0.44;
        const c2X = width * 0.58;

        // Orb squashes against Char 1 chest then pops into light ring
        const squashX = 1.0 + 0.7 * Math.sin(catchT * Math.PI);
        const squashY = 1.0 - 0.45 * Math.sin(catchT * Math.PI);
        const orbX = c1X + 10;
        const orbY = groundY - 50;

        ctx.save();
        ctx.translate(orbX, orbY);
        ctx.scale(squashX, squashY);
        const oGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
        oGrad.addColorStop(0, '#ffffff');
        oGrad.addColorStop(0.5, '#f7d070');
        oGrad.addColorStop(1, 'rgba(247, 208, 112, 0)');
        ctx.fillStyle = oGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Expanding light ring shockwave
        if (catchT > 0.4) {
          const ringR = (catchT - 0.4) * 160;
          ctx.save();
          ctx.strokeStyle = `rgba(255, 245, 200, ${1.0 - catchT})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(orbX, orbY, ringR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        CharacterSystem.drawChar1(ctx, c1X, groundY, charScale, 'reach', 0, 1, { aura: true });
        CharacterSystem.drawChar2(ctx, c2X, groundY, charScale, 'reach', 0, -1, { aura: true });
      }

      // Action 2 (91.0–91.8s, 0.28 <= t < 0.67): Char 2 catches ribbon, wraps like playful scarf
      else if (t < 0.67) {
        const wrapT = (t - 0.28) / 0.39;
        const c1X = width * (0.44 + 0.03 * wrapT);
        const c2X = width * (0.58 - 0.03 * wrapT);

        // Ribbon wraps playfully around both characters in a spiral scarf
        ctx.save();
        ctx.strokeStyle = '#18a4a4';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#18a4a4';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        const scarfR = width * (0.16 - 0.05 * wrapT);
        ctx.ellipse(cx, groundY - 48, scarfR, 26, wrapT * Math.PI, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Pulling into side-by-side embrace
        CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, 0, { aura: true });
      }

      // Action 3 (91.8–92.5s, t >= 0.67): Petal form swoops down, opens on contact into large flower
      else {
        const bloomT = (t - 0.67) / 0.33;

        // Large flower blooming at contact point
        const flowerR = 30 + bloomT * 55;
        ctx.save();
        ctx.translate(cx, groundY - 50);
        ctx.rotate(bloomT * 0.8);
        for (let p = 0; p < 6; p++) {
          ctx.save();
          ctx.rotate((p / 6) * Math.PI * 2);
          ctx.fillStyle = p % 2 === 0 ? '#f7a072' : '#f7d070';
          ctx.shadowColor = '#f3c76d';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.ellipse(0, -flowerR * 0.5, flowerR * 0.28, flowerR * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();

        CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, 0, { aura: true });
      }

      this._drawKineticText('मैं गले लग जाता हूँ', cx, height * 0.24, {
        fontSize: Math.min(width, height) * 0.08,
        color: '#fff7ee',
        glow: true,
        glowColor: 'rgba(247, 160, 114, 0.9)'
      });
    }

    // -------------------------------------------------------------------------
    // Phase 4: 92.5–94.2s — Joy becomes contagious (Arcs whip, loop spin, wave through hills)
    // -------------------------------------------------------------------------
    else if (time < 94.2) {
      const t = Math.max(0, Math.min(1.0, (time - 92.5) / 1.7));

      // Whipping colored arcs radiating across foreground
      ctx.save();
      const arcColors = ['#f7a072', '#18a4a4', '#f7d070', '#e899af', '#8be9fd'];
      for (let a = 0; a < 5; a++) {
        const aDist = (t * width * 0.55 + a * 40) % (width * 0.6);
        const aAngle = a * 1.25 + time * 3;
        const ax = cx + Math.cos(aAngle) * aDist;
        const ay = (groundY - 45) + Math.sin(aAngle) * (aDist * 0.45);

        ctx.strokeStyle = arcColors[a % arcColors.length];
        ctx.lineWidth = 4.5;
        ctx.shadowColor = arcColors[a % arcColors.length];
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(ax, ay, 20 + a * 8, 0, Math.PI * 0.8);
        ctx.stroke();
      }
      ctx.restore();

      // Characters run loop around each other and complete one quick shared spin
      const spinAngle = (time - 92.5) * 5.5;
      CharacterSystem.drawCoupleDancing(ctx, cx, groundY, charScale, spinAngle, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.8)'
      });

      // Kinetic lyric contracts toward their joined hands
      const contractDist = (1.0 - t) * (height * 0.16);
      this._drawKineticText('गले लग जाता हूँ', cx, (groundY - 50) - contractDist, {
        fontSize: Math.min(width, height) * (0.075 - t * 0.02),
        metallic: 'gold',
        glow: true
      });
    }

    // -------------------------------------------------------------------------
    // Phase 5: 94.2–95.0s — Transition trigger (Joined-hand pulse -> Giant circular lens)
    // -------------------------------------------------------------------------
    else {
      const t = Math.max(0, Math.min(1.0, (time - 94.2) / 0.8));
      const lensR = 20 + t * Math.max(width, height) * 0.95;

      CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, 0, { aura: true });

      // Giant magnifying circular lens with chromatic rim
      ctx.save();
      ctx.strokeStyle = 'rgba(247, 208, 112, 0.95)';
      ctx.lineWidth = 5 + t * 5;
      ctx.shadowColor = '#18a4a4';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(cx, groundY - 40, lensR, 0, Math.PI * 2);
      ctx.stroke();

      // Inner lens magnification glow
      const lensGrad = ctx.createRadialGradient(cx, groundY - 40, 0, cx, groundY - 40, lensR);
      lensGrad.addColorStop(0, `rgba(255, 250, 220, ${0.15 + t * 0.25})`);
      lensGrad.addColorStop(0.85, 'rgba(24, 164, 164, 0.15)');
      lensGrad.addColorStop(1, 'rgba(247, 208, 112, 0.4)');
      ctx.fillStyle = lensGrad;
      ctx.beginPath();
      ctx.arc(cx, groundY - 40, lensR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // 18B — 95.0–99.0 | दुनिया भी लगती है नयी — the world transforms around them
  // Lyric: दुनिया भी लगती है नयी
  _renderBeat18B(width, height, time, state) {
    const ctx = this.ctx;
    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Palette expands: turquoise (#137a85), coral (#d95d4e), gold (#f7d070), lavender (#5b366a)
    this._drawSkyGradient('#137a85', '#5b366a', width, height);

    // -------------------------------------------------------------------------
    // Phase 1: 95.0–95.6s — दुनिया (Giant horizon-ring opens, camera whip-arc, hills hinge)
    // -------------------------------------------------------------------------
    if (time < 95.6) {
      const t = Math.max(0, Math.min(1.0, (time - 95.0) / 0.6));

      // Whip-arc camera tilt
      ctx.save();
      const whipAngle = (1 - t) * -0.05;
      ctx.translate(cx, height * 0.5);
      ctx.rotate(whipAngle);
      ctx.translate(-cx, -height * 0.5);

      // Hinged rolling hills
      ctx.fillStyle = '#1e382b';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, groundY - 40);
      ctx.quadraticCurveTo(cx * t, groundY - 80 + (1 - t) * 30, width, groundY - 40);
      ctx.lineTo(width, height);
      ctx.fill();

      // Horizon ring arc across sky
      ctx.strokeStyle = 'rgba(247, 208, 112, 0.85)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(cx, groundY - 80, width * 0.48, 45, 0, Math.PI, 0);
      ctx.stroke();

      CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, 0, { aura: true });

      // Intact word "दुनिया" sweeps along the curve
      const sweepX = cx + (t - 0.5) * (width * 0.3);
      this._drawKineticText('दुनिया', sweepX, height * 0.28, {
        fontSize: Math.min(width, height) * 0.11,
        metallic: 'gold',
        glow: true,
        glowBlur: 20
      });
      ctx.restore();
    }

    // -------------------------------------------------------------------------
    // Phase 2: 95.6–96.4s — भी लगती है (Hands thrown outward, pop-up slabs, river shoots out)
    // -------------------------------------------------------------------------
    else if (time < 96.4) {
      const t = Math.max(0, Math.min(1.0, (time - 95.6) / 0.8));

      // Pop-up landscape slabs sliding into new positions
      this._drawPopUpSlabs(width, height, groundY, t, {
        s1: '#26593a',
        s2: '#1b452c',
        s3: '#102a1b'
      });

      // Curved turquoise ribbon shoots out drawing a river across the ground
      ctx.save();
      ctx.strokeStyle = '#26d0ce';
      ctx.lineWidth = 7;
      ctx.shadowColor = '#26d0ce';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(cx, groundY - 20);
      const rivProgX = cx - t * (width * 0.45);
      const rivProgY = (groundY - 20) + t * (height * 0.18);
      ctx.quadraticCurveTo(cx - width * 0.15, groundY + 10, rivProgX, rivProgY);
      ctx.stroke();
      ctx.restore();

      // Couple with hands thrown outward in expansive joy
      CharacterSystem.drawChar1(ctx, cx - 22 * charScale, groundY, charScale, 'reach', 0, -1, { aura: true });
      CharacterSystem.drawChar2(ctx, cx + 22 * charScale, groundY, charScale, 'reach', 0, 1, { aura: true });

      this._drawKineticText('भी लगती है', cx, height * 0.25, {
        fontSize: Math.min(width, height) * 0.08,
        color: '#f7a072',
        glow: true
      });
    }

    // -------------------------------------------------------------------------
    // Phase 3: 96.4–98.1s — नयी (नयी arrives large, fan trees unfold, flowers snap, birds arc)
    // -------------------------------------------------------------------------
    else if (time < 98.1) {
      const t = Math.max(0, Math.min(1.0, (time - 96.4) / 1.7));

      // Lush transformed pop-up hills
      this._drawPopUpSlabs(width, height, groundY, 1.0, {
        s1: '#26593a',
        s2: '#1b452c',
        s3: '#102a1b'
      });

      // Sparkling river catching the light
      ctx.save();
      ctx.strokeStyle = '#26d0ce';
      ctx.lineWidth = 8;
      ctx.shadowColor = '#f7d070';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(cx, groundY - 20);
      ctx.quadraticCurveTo(cx - width * 0.2, groundY + 15, width * 0.05, height * 0.98);
      ctx.stroke();
      ctx.restore();

      // Abstract fan-trees unfolding
      const treeUnfold = Math.min(1.0, t * 1.8);
      this._drawFanTree(width * 0.18, groundY + 5, 42, treeUnfold, '#36824a');
      this._drawFanTree(width * 0.32, groundY - 10, 52, treeUnfold, '#2b6e40');
      this._drawFanTree(width * 0.82, groundY + 10, 48, treeUnfold, '#36824a');

      // Large stylized flowers snapping open
      for (let f = 0; f < 6; f++) {
        const fx = width * (0.42 + f * 0.08);
        const fBloom = Math.min(1.0, (t - 0.15) * 2.5 - f * 0.08);
        if (fBloom > 0) {
          this._drawFlower(fx, groundY + 18 + (f % 2) * 8, fBloom, f % 2 === 0 ? '#d95d4e' : '#f7d070', 36);
        }
      }

      // Birds sweep close across foreground and arc into sky
      ctx.save();
      ctx.strokeStyle = '#0a101d';
      ctx.lineWidth = 2.8;
      for (let b = 0; b < 7; b++) {
        const birdProg = ((t * 2.2 + b * 0.14) % 1.0);
        const bx = -width * 0.1 + birdProg * (width * 1.2);
        const by = height * 0.65 - Math.sin(birdProg * Math.PI) * (height * 0.5) + (b % 3) * 15;
        ctx.beginPath();
        ctx.moveTo(bx - 12, by + 5);
        ctx.quadraticCurveTo(bx - 6, by - 6, bx, by);
        ctx.quadraticCurveTo(bx + 6, by - 6, bx + 12, by + 5);
        ctx.stroke();
      }
      ctx.restore();

      CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, time * 3, { aura: true });

      // Word "नयी" arrives large with forward rush and elastic settle
      const rushScale = t < 0.4 ? (0.3 + 0.85 * (t / 0.4)) : (1.15 - 0.15 * ((t - 0.4) / 0.6));
      this._drawKineticText('नयी', cx, height * 0.28, {
        fontSize: Math.min(width, height) * 0.16 * rushScale,
        metallic: 'gold',
        glow: true,
        glowBlur: 24
      });
    }

    // -------------------------------------------------------------------------
    // Phase 4: 98.1–99.0s+ (into 99.0–100.0s gap) — Discovery in motion
    // -------------------------------------------------------------------------
    else {
      const t = Math.max(0, Math.min(1.0, (time - 98.1) / 0.9));

      // Pop-up hills and unfolded fan trees settled
      this._drawPopUpSlabs(width, height, groundY, 1.0, {
        s1: '#26593a',
        s2: '#1b452c',
        s3: '#102a1b'
      });
      this._drawFanTree(width * 0.18, groundY + 5, 42, 1.0, '#36824a');
      this._drawFanTree(width * 0.32, groundY - 10, 52, 1.0, '#2b6e40');
      this._drawFanTree(width * 0.82, groundY + 10, 48, 1.0, '#36824a');

      // The river ribbon begins to rise at the far end, setting up the archway in Scene 19!
      const archRiseH = t * 75;
      ctx.save();
      ctx.strokeStyle = '#26d0ce';
      ctx.lineWidth = 7;
      ctx.shadowColor = '#f7d070';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(width * 0.05, height * 0.98);
      ctx.quadraticCurveTo(cx - width * 0.2, groundY + 15, cx, groundY - 20);
      // River curves upward setting up Scene 19 archway
      ctx.quadraticCurveTo(cx, groundY - 20 - archRiseH * 0.5, cx, groundY - 20 - archRiseH);
      ctx.stroke();
      ctx.restore();

      // Couple sprints two steps eastward and pulls into a joyful half-turn
      const sprintX = cx + t * (width * 0.08);
      const spinAngle = t * Math.PI;
      CharacterSystem.drawCoupleDancing(ctx, sprintX, groundY, charScale, spinAngle, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.85)'
      });

      this._drawKineticText('दुनिया भी लगती है नयी', cx, height * 0.22, {
        fontSize: Math.min(width, height) * 0.07,
        metallic: 'gold',
        glow: true,
        alpha: Math.max(0, 1.0 - t * 0.5)
      });
    }
  }

  // Helper: Fan-tree unfolding like paper fan
  _drawFanTree(x, y, size, unfoldProg, color = '#36824a') {
    if (unfoldProg <= 0.05) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);

    // Tree trunk
    ctx.fillStyle = '#0a0d18';
    ctx.fillRect(-3, -size * 0.6, 6, size * 0.6);

    // Unfolding fan canopy
    ctx.translate(0, -size * 0.6);
    const blades = 6;
    for (let b = 0; b < blades; b++) {
      const angle = (-Math.PI * 0.75 + (b / (blades - 1)) * Math.PI * 1.5) * unfoldProg;
      ctx.save();
      ctx.rotate(angle);
      ctx.fillStyle = b % 2 === 0 ? color : '#429e5a';
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.45, size * 0.18, size * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  // Helper: Pop-up landscape slabs
  _drawPopUpSlabs(width, height, groundY, progress, palette) {
    const ctx = this.ctx;
    const ease = progress < 1.0 ? (1 + 1.70158 * Math.pow(progress - 1, 3) + 1.70158 * Math.pow(progress - 1, 2)) : 1.0;
    ctx.save();

    // Slab 1 (Back)
    ctx.fillStyle = palette.s1;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, groundY - 60 * ease);
    ctx.bezierCurveTo(width * 0.35, groundY - 95 * ease, width * 0.7, groundY - 50 * ease, width, groundY - 75 * ease);
    ctx.lineTo(width, height);
    ctx.fill();

    // Slab 2 (Mid)
    ctx.fillStyle = palette.s2;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, groundY - 20 * ease);
    ctx.bezierCurveTo(width * 0.3, groundY - 45 * ease, width * 0.65, groundY - 10 * ease, width, groundY - 30 * ease);
    ctx.lineTo(width, height);
    ctx.fill();

    // Slab 3 (Front knoll)
    ctx.fillStyle = palette.s3;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, groundY + 20);
    ctx.bezierCurveTo(width * 0.4, groundY + 5, width * 0.75, groundY + 30, width, groundY + 15);
    ctx.lineTo(width, height);
    ctx.fill();

    ctx.restore();
  }

  // Helper: Monumental ornamental archway that dynamically assembles, opens curved panels, and responds to lighting
  _drawOrnamentalArchway(cx, groundY, archW, archH, asmProg, doorAngle, glowAlpha, time) {
    if (asmProg <= 0.02) return;
    const ctx = this.ctx;
    ctx.save();

    const leftX = cx - archW * 0.5;
    const rightX = cx + archW * 0.5;
    const archR = archW * 0.5;
    const springY = groundY - archH * 0.55;
    const apexY = springY - archR;

    // 1. Interior Radial Glow / Portal Light
    if (glowAlpha > 0.05) {
      const pGrad = ctx.createRadialGradient(cx, springY, archR * 0.1, cx, springY, archR * 1.5);
      pGrad.addColorStop(0, `rgba(255, 245, 200, ${glowAlpha * 0.7})`);
      pGrad.addColorStop(0.35, `rgba(247, 208, 112, ${glowAlpha * 0.4})`);
      pGrad.addColorStop(0.75, `rgba(232, 153, 175, ${glowAlpha * 0.2})`);
      pGrad.addColorStop(1, 'rgba(25, 17, 54, 0)');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.ellipse(cx, springY, archW * 0.75, archH * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Light beams spilling through opening doors
      if (doorAngle > 0.05) {
        ctx.save();
        ctx.globalAlpha = Math.min(1.0, doorAngle * 1.6) * glowAlpha;
        const beamGrad = ctx.createLinearGradient(cx, springY, cx, groundY + 45);
        beamGrad.addColorStop(0, 'rgba(255, 248, 220, 0.48)');
        beamGrad.addColorStop(1, 'rgba(243, 199, 109, 0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(leftX + (1 - Math.cos(doorAngle)) * archR * 0.35, springY);
        ctx.lineTo(cx - archW * 0.75, groundY + 45);
        ctx.lineTo(cx + archW * 0.75, groundY + 45);
        ctx.lineTo(rightX - (1 - Math.cos(doorAngle)) * archR * 0.35, springY);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    // 2. Double Ornamental Curved Doors / Panels
    if (asmProg > 0.35) {
      const doorAlpha = Math.min(1.0, (asmProg - 0.35) / 0.4);
      ctx.save();
      ctx.globalAlpha = doorAlpha;

      // Left Door
      const leftDoorWidth = archR * Math.cos(doorAngle);
      const leftDoorSkew = Math.sin(doorAngle) * 16;
      ctx.fillStyle = 'rgba(18, 12, 36, 0.88)';
      ctx.strokeStyle = '#f3c76d';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(leftX, groundY);
      ctx.lineTo(leftX, springY);
      ctx.quadraticCurveTo(leftX + leftDoorWidth * 0.5, springY - archR * 0.6 - leftDoorSkew, leftX + leftDoorWidth, springY - leftDoorSkew);
      ctx.lineTo(leftX + leftDoorWidth, groundY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right Door
      const rightDoorWidth = archR * Math.cos(doorAngle);
      const rightDoorSkew = Math.sin(doorAngle) * 16;
      ctx.beginPath();
      ctx.moveTo(rightX, groundY);
      ctx.lineTo(rightX, springY);
      ctx.quadraticCurveTo(rightX - rightDoorWidth * 0.5, springY - archR * 0.6 - rightDoorSkew, rightX - rightDoorWidth, springY - rightDoorSkew);
      ctx.lineTo(rightX - rightDoorWidth, groundY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    // 3. Dynamic Outer Arch Frame (assembled with asmProg)
    ctx.strokeStyle = '#f3c76d';
    ctx.lineWidth = 4.8;
    ctx.shadowColor = '#f7d070';
    ctx.shadowBlur = 14 * Math.max(0.4, glowAlpha);
    ctx.lineCap = 'round';

    // Left pillar
    if (asmProg > 0) {
      const pProg = Math.min(1.0, asmProg / 0.4);
      const curY = groundY - (groundY - springY) * pProg;
      ctx.beginPath();
      ctx.moveTo(leftX, groundY);
      ctx.lineTo(leftX, curY);
      ctx.stroke();

      // Inner ornamental trim
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(leftX + 8, groundY);
      ctx.lineTo(leftX + 8, curY);
      ctx.stroke();
      ctx.lineWidth = 4.8;
    }

    // Curved Arch Top (semicircle arc from PI to 0)
    if (asmProg > 0.35) {
      const aProg = Math.min(1.0, (asmProg - 0.35) / 0.45);
      const currentAngle = Math.PI - aProg * Math.PI;
      ctx.beginPath();
      ctx.arc(cx, springY, archR, Math.PI, currentAngle, true);
      ctx.stroke();

      // Inner ornamental arc
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, springY, archR - 8, Math.PI, currentAngle, true);
      ctx.stroke();
      ctx.lineWidth = 4.8;
    }

    // Right pillar
    if (asmProg > 0.6) {
      const rProg = Math.min(1.0, (asmProg - 0.6) / 0.4);
      const curY = springY + (groundY - springY) * rProg;
      ctx.beginPath();
      ctx.moveTo(rightX, springY);
      ctx.lineTo(rightX, curY);
      ctx.stroke();

      // Inner ornamental trim
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rightX - 8, springY);
      ctx.lineTo(rightX - 8, curY);
      ctx.stroke();
      ctx.lineWidth = 4.8;
    }

    // Keystone / Crown Ornament at Apex
    if (asmProg >= 0.8) {
      const kAlpha = Math.min(1.0, (asmProg - 0.8) / 0.2);
      ctx.save();
      ctx.globalAlpha = kAlpha;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#f7d070';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(cx, apexY - 6, 6, 0, Math.PI * 2);
      ctx.fill();

      // Stylized crown petals
      ctx.fillStyle = '#f3c76d';
      for (let p = -2; p <= 2; p++) {
        const px = cx + p * 10;
        const py = apexY - 14 - (2 - Math.abs(p)) * 4;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    ctx.restore();
  }

  // Helper: Hanging ornamental lantern with chain and realistic pendulum swing
  _drawHangingLantern(x, y, chainLen, swingAngle, glowColor = '#f3c76d', scale = 1.0) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(swingAngle);
    ctx.scale(scale, scale);

    // Delicate golden chain
    ctx.strokeStyle = '#d49b38';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, chainLen);
    ctx.stroke();

    ctx.translate(0, chainLen);

    // Lantern Cap / Roof
    ctx.fillStyle = '#d49b38';
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(0, -6);
    ctx.lineTo(8, 0);
    ctx.closePath();
    ctx.fill();

    // Lantern Glass Body with warm glow
    const glow = ctx.createRadialGradient(0, 8, 0, 0, 8, 18);
    glow.addColorStop(0, '#ffffff');
    glow.addColorStop(0.35, glowColor);
    glow.addColorStop(1, 'rgba(243, 199, 109, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 8, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff9e6';
    ctx.fillRect(-5, 0, 10, 16);

    // Lantern Frame Ribs
    ctx.strokeStyle = '#5a3d16';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(-5, 0, 10, 16);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 16);
    ctx.stroke();

    // Bottom finial
    ctx.fillStyle = '#d49b38';
    ctx.beginPath();
    ctx.moveTo(-6, 16);
    ctx.lineTo(0, 21);
    ctx.lineTo(6, 16);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // Helper: Braided golden and rose-pink double-helix path rising into sky
  _drawBraidedStrand(cx, startY, endY, progress, time) {
    if (progress <= 0.01) return;
    const ctx = this.ctx;
    ctx.save();

    const currentY = startY + (endY - startY) * progress;
    const totalDist = Math.abs(startY - currentY);
    const steps = Math.max(12, Math.floor(totalDist / 4));

    // Strand 1: Golden strand
    ctx.strokeStyle = '#f3c76d';
    ctx.lineWidth = 4.0;
    ctx.shadowColor = '#f7d070';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = startY + (currentY - startY) * t;
      const wave = Math.sin(t * 18 - time * 4) * (7 * (1 - t * 0.35));
      const x = cx + wave;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Strand 2: Rose-Pink strand
    ctx.strokeStyle = '#e899af';
    ctx.shadowColor = '#e899af';
    ctx.lineWidth = 4.0;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = startY + (currentY - startY) * t;
      const wave = Math.sin(t * 18 - time * 4 + Math.PI) * (7 * (1 - t * 0.35));
      const x = cx + wave;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Luminous core spark traveling along strand apex
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(cx, currentY, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Beat 19: 100.0–108.0 | The heart's doorway lights up
  // Split into 19A (100.0–106.0s) and 19B (106.0–108.0s + gap)
  _renderBeat19(width, height, time, progress, state) {
    this._drawSkyGradient('#181033', '#522444', width, height);
    this.particles.drawStars(width, height, time, 0.6);
    this._drawHills(width, height, { h1: '#2b1736', h2: '#1d0f28', h3: '#10081a' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;
    const archW = width * 0.32;
    const archH = height * 0.54;
    const ctx = this.ctx;

    // -------------------------------------------------------------------------
    // 19A (100.0–106.0s): रौनकें हैं दिल के दर पे
    // Archway dynamically assembles from moving typography, opens in curved panels,
    // and responds to the couple's movements.
    // -------------------------------------------------------------------------
    if (time < 106.0) {
      const t19A = Math.max(0, Math.min(1.0, (time - 100.0) / 6.0));

      // 1. River ribbon from Beat 18 sweeps into center and assembles archway
      const asmProg = Math.min(1.0, (time - 100.0) / 2.6);
      if (asmProg < 1.0) {
        // Cyan-to-gold sweep entering from bottom left
        ctx.save();
        ctx.strokeStyle = '#26d0ce';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#f7d070';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(width * 0.05, height * 0.98);
        ctx.quadraticCurveTo(cx - width * 0.2, groundY + 15, cx - archW * 0.5, groundY);
        ctx.stroke();
        ctx.restore();
      }

      // 2. Door opening progression (0° -> 63°)
      const doorProg = Math.max(0, Math.min(1.0, (time - 101.8) / 3.0));
      const doorAngle = (doorProg < 1.0 ? (1 - Math.cos(doorProg * Math.PI)) * 0.5 : 1.0) * (Math.PI * 0.35);

      // 3. Render dynamic monumental archway
      const glowIntensity = 0.5 + 0.5 * Math.sin(t19A * Math.PI);
      this._drawOrnamentalArchway(cx, groundY, archW, archH, asmProg, doorAngle, glowIntensity, time);

      // 4. Hanging lanterns swaying along arch rim
      const lanternY = groundY - archH * 0.55;
      const lRadius = archW * 0.5;
      const lanternOffsets = [-0.65, -0.22, 0.22, 0.65];
      for (let i = 0; i < 4; i++) {
        const angle = lanternOffsets[i];
        const lx = cx + Math.sin(angle) * lRadius;
        const ly = lanternY - Math.cos(angle) * lRadius + 14;
        const swing = Math.sin(time * 2.2 + i * 1.1) * 0.08;
        this._drawHangingLantern(lx, ly, 22, swing, '#f3c76d', 1.0);
      }

      // 5. Stylized flowers blooming along the base jambs
      for (let f = 0; f < 6; f++) {
        const isLeft = f < 3;
        const fx = isLeft ? (cx - archW * 0.52 - f * 18) : (cx + archW * 0.52 + (f - 3) * 18);
        const fBloom = Math.min(1.0, Math.max(0, (time - 101.5) * 1.5 - f * 0.18));
        if (fBloom > 0) {
          this._drawFlower(fx, groundY + 12 + (f % 2) * 6, fBloom, f % 2 === 0 ? '#e899af' : '#f7d070', 30);
        }
      }

      // 6. Couple advances toward the archway threshold
      // Scale slightly zooms from 1.04 to 0.92 to show perspective depth
      const walkProg = Math.min(1.0, (time - 100.0) / 5.5);
      const walkScale = charScale * (1.04 - walkProg * 0.12);
      const coupleY = groundY + (1 - walkProg) * 10;
      CharacterSystem.drawCoupleHoldingHands(ctx, cx, coupleY, walkScale, time * 2.6, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.6)'
      });

      // 7. Kinetic typography for 19A: "रौनकें हैं दिल के दर पे"
      // Assembles dynamically with the archway strokes, then rests gracefully above apex
      const textAlpha = Math.min(1.0, (time - 100.5) / 1.2);
      const textY = groundY - archH - 24;
      this._drawKineticText('रौनकें हैं दिल के दर पे', cx, textY, {
        fontSize: Math.min(width, height) * 0.072,
        metallic: 'gold',
        glow: true,
        glowBlur: 18,
        alpha: textAlpha,
        scaleX: 1.0 + Math.sin(time * 2) * 0.03,
        scaleY: 1.0 + Math.sin(time * 2) * 0.03
      });
    }

    // -------------------------------------------------------------------------
    // 19B (106.0–108.0s + gap 108.0–108.2s): धड़कनें हैं सुरमयी
    // Heartbeat triggers two distinct pulses (lub-dub), then "सुरमयी" becomes the visual centerpiece,
    // stretching into large flowing musical ribbons that swing lanterns and bloom flowers,
    // transforming into Scene 20's destiny threads.
    // -------------------------------------------------------------------------
    else {
      const t19B = Math.max(0, (time - 106.0) / 2.0);

      // Doors fully open, arch fully present
      this._drawOrnamentalArchway(cx, groundY, archW, archH, 1.0, Math.PI * 0.35, 0.85, time);

      // Couple stands at threshold
      const coupleScale = charScale * 0.92;
      CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, coupleScale, 0, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.75)'
      });

      // Sub-phase 1: 106.0 to 106.8s — Heartbeat double-pulse on "धड़कनें"
      if (time < 106.8) {
        const pulseCycle = (time - 106.0);
        let pulseIntensity = 0;
        let waveRadius = 0;
        let pulseTextScale = 1.0;

        if (pulseCycle < 0.38) {
          // Pulse 1 (lub)
          const p1 = pulseCycle / 0.38;
          pulseIntensity = Math.sin(p1 * Math.PI);
          waveRadius = p1 * width * 0.45;
          pulseTextScale = 1.0 + pulseIntensity * 0.28;
        } else {
          // Pulse 2 (dub)
          const p2 = (pulseCycle - 0.38) / 0.42;
          pulseIntensity = Math.sin(p2 * Math.PI);
          waveRadius = p2 * width * 0.55;
          pulseTextScale = 1.05 + pulseIntensity * 0.35;
        }

        // Shockwave rings expanding from arch base
        ctx.save();
        ctx.strokeStyle = `rgba(255, 107, 139, ${Math.max(0, 1 - waveRadius / (width * 0.6))})`;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#f3c76d';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.ellipse(cx, groundY, waveRadius, waveRadius * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Lanterns lift and swing with heartbeat
        const lanternY = groundY - archH * 0.55;
        const lRadius = archW * 0.5;
        const lanternOffsets = [-0.65, -0.22, 0.22, 0.65];
        for (let i = 0; i < 4; i++) {
          const angle = lanternOffsets[i];
          const lx = cx + Math.sin(angle) * lRadius;
          const lift = -12 * pulseIntensity;
          const ly = lanternY - Math.cos(angle) * lRadius + 14 + lift;
          const swing = Math.sin((time - 106.0) * 10 + i * 1.5) * 0.22 * pulseIntensity;
          this._drawHangingLantern(lx, ly, 22, swing, '#ff6b8b', 1.0);
        }

        // Blooming flowers along knoll responding to heartbeat
        for (let f = 0; f < 8; f++) {
          const fx = width * (0.15 + f * 0.1);
          this._drawFlower(fx, groundY + 12 + (f % 2) * 6, 1.0, f % 2 === 0 ? '#ff6b8b' : '#f7d070', 32);
        }

        // Kinetic typography for "धड़कनें"
        this._drawKineticText('धड़कनें', cx, height * 0.26, {
          fontSize: Math.min(width, height) * 0.088 * pulseTextScale,
          color: '#ffffff',
          glow: true,
          glowColor: 'rgba(255, 107, 139, 0.85)',
          glowBlur: 24
        });
      }

      // Sub-phase 2: 106.8 to 108.0s (+ gap to 108.2s) — "सुरमयी" centerpiece & flowing musical ribbons
      else {
        const tMelody = (time - 106.8) / 1.2;

        // Lanterns continue natural harmonic swing
        const lanternY = groundY - archH * 0.55;
        const lRadius = archW * 0.5;
        const lanternOffsets = [-0.65, -0.22, 0.22, 0.65];
        for (let i = 0; i < 4; i++) {
          const angle = lanternOffsets[i];
          const lx = cx + Math.sin(angle) * lRadius;
          const ly = lanternY - Math.cos(angle) * lRadius + 14;
          const swing = Math.sin((time - 106.8) * 5 + i * 0.8) * 0.18;
          this._drawHangingLantern(lx, ly, 22, swing, '#f3c76d', 1.0);
        }

        // Sequential flower blooming from center outward
        for (let f = 0; f < 10; f++) {
          const fx = width * (0.1 + f * 0.088);
          const distFromCenter = Math.abs(fx - cx) / (width * 0.5);
          const bloomProg = Math.max(0, Math.min(1.0, (time - 106.8) * 2.8 - distFromCenter * 1.5));
          if (bloomProg > 0) {
            this._drawFlower(fx, groundY + 10 + (f % 2) * 6, bloomProg, f % 2 === 0 ? '#e899af' : '#f7d070', 34);
          }
        }

        // 3 flowing musical ribbons undulating across frame (Gold, Rose-Pink, Cyan)
        // In transition window 107.8–108.2s:
        // Musical ribbons sweep to the screen edges, seeding Scene 20's destiny threads!
        if (time >= 107.8) {
          ctx.save();
          // Gold ribbon anchoring to bottom left
          ctx.strokeStyle = '#f3c76d';
          ctx.lineWidth = 6;
          ctx.shadowColor = '#f3c76d';
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.moveTo(cx, height * 0.48);
          ctx.quadraticCurveTo(width * 0.2, groundY, width * 0.05, height * 0.88);
          ctx.stroke();

          // Rose ribbon anchoring to bottom right
          ctx.strokeStyle = '#e899af';
          ctx.shadowColor = '#e899af';
          ctx.beginPath();
          ctx.moveTo(cx, height * 0.48);
          ctx.quadraticCurveTo(width * 0.8, groundY, width * 0.95, height * 0.88);
          ctx.stroke();
          ctx.restore();
        }

        // Centerpiece typography: "सुरमयी"
        const centerScale = Math.min(1.2, 0.7 + tMelody * 0.5);
        this._drawKineticText('सुरमयी', cx, height * 0.28, {
          fontSize: Math.min(width, height) * 0.13 * centerScale,
          metallic: 'gold',
          glow: true,
          glowBlur: 24
        });
      }
    }
  }

  // Beat 20: 108.2–114.0 | Two destinies braid together
  // Lyric: मेरी क़िस्मत भी तुम्हारे साथ बन गयी
  _renderBeat20(width, height, time, progress, state) {
    this._drawSkyGradient('#100a26', '#3f1738', width, height);
    this.particles.drawStars(width, height, time, 0.8);
    this._drawHills(width, height, { h1: '#281736', h2: '#1b0f28', h3: '#0f081a' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;
    const ctx = this.ctx;

    // Archway softly visible in background framing the couple
    const archW = width * 0.32;
    const archH = height * 0.54;
    this._drawOrnamentalArchway(cx, groundY, archW, archH, 1.0, Math.PI * 0.35, 0.45, time);

    // -------------------------------------------------------------------------
    // Sub-beat 1: 108.2–109.5s | Turn toward each other, raise hands with hesitation
    // -------------------------------------------------------------------------
    if (time < 109.5) {
      let reachProg = 0;
      if (time < 108.9) {
        // Raising hands
        reachProg = ((time - 108.2) / 0.7) * 0.45;
      } else {
        // Emotional hesitation: slight pause and delicate tremor
        reachProg = 0.45 + Math.sin((time - 108.9) * 12) * 0.02;
      }

      // Destiny threads sweep in from left (gold) and right (pink)
      const threadInProg = Math.min(1.0, (time - 108.2) / 1.3);
      ctx.save();
      // Gold thread from left edge (seeded by 19B)
      ctx.strokeStyle = '#f3c76d';
      ctx.lineWidth = 5.5;
      ctx.shadowColor = '#f3c76d';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(width * 0.05, height * 0.88);
      const curLeftX = width * 0.05 + threadInProg * (cx - width * 0.05);
      const curLeftY = height * 0.88 + Math.sin(threadInProg * Math.PI) * -35;
      ctx.quadraticCurveTo(width * 0.22, groundY + 15, curLeftX, curLeftY);
      ctx.stroke();

      // Pink thread from right edge (seeded by 19B)
      ctx.strokeStyle = '#e899af';
      ctx.shadowColor = '#e899af';
      ctx.beginPath();
      ctx.moveTo(width * 0.95, height * 0.88);
      const curRightX = width * 0.95 - threadInProg * (width * 0.95 - cx);
      const curRightY = height * 0.88 + Math.sin(threadInProg * Math.PI) * -35;
      ctx.quadraticCurveTo(width * 0.78, groundY + 15, curRightX, curRightY);
      ctx.stroke();
      ctx.restore();

      // Couple reaching toward each other
      CharacterSystem.drawCoupleReaching(ctx, cx, groundY, charScale, reachProg, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.65)'
      });

      // Kinetic typography: "मेरी क़िस्मत" enters above
      const alphaText = Math.min(1.0, (time - 108.2) / 0.6);
      this._drawKineticText('मेरी क़िस्मत', cx, height * 0.18, {
        fontSize: Math.min(width, height) * 0.076,
        metallic: 'gold',
        glow: true,
        glowBlur: 18,
        alpha: alphaText
      });
    }

    // -------------------------------------------------------------------------
    // Sub-beat 2: 109.5–111.2s | Hands slowly move closer; typography gently converges
    // -------------------------------------------------------------------------
    else if (time < 111.2) {
      const t = (time - 109.5) / 1.7;
      const reachProg = 0.45 + t * 0.43; // 0.45 to 0.88

      // Threads coil around couple's knoll and converge toward their hands
      ctx.save();
      // Gold thread coiling to center
      ctx.strokeStyle = '#f3c76d';
      ctx.lineWidth = 5.5;
      ctx.shadowColor = '#f3c76d';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(width * 0.05, height * 0.88);
      ctx.bezierCurveTo(width * 0.25, groundY + 20, cx - 40 * charScale, groundY - 10, cx, groundY - 35 * charScale * t);
      ctx.stroke();

      // Pink thread coiling to center
      ctx.strokeStyle = '#e899af';
      ctx.shadowColor = '#e899af';
      ctx.beginPath();
      ctx.moveTo(width * 0.95, height * 0.88);
      ctx.bezierCurveTo(width * 0.75, groundY + 20, cx + 40 * charScale, groundY - 10, cx, groundY - 35 * charScale * t);
      ctx.stroke();
      ctx.restore();

      // Couple reaching closer
      CharacterSystem.drawCoupleReaching(ctx, cx, groundY, charScale, reachProg, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.75)'
      });

      // Typography converges gently inward
      const textOffset = (1 - t) * (width * 0.06);
      this._drawKineticText('मेरी क़िस्मत', cx - textOffset, height * 0.18, {
        fontSize: Math.min(width, height) * 0.068,
        metallic: 'gold',
        glow: true
      });
      this._drawKineticText('भी तुम्हारे', cx + textOffset, height * 0.26, {
        fontSize: Math.min(width, height) * 0.068,
        color: '#f8cfdc',
        glow: true
      });
    }

    // -------------------------------------------------------------------------
    // Sub-beat 3: 111.2–112.6s | Fingertips touch, handhold settles; "साथ" becomes typographic focal point
    // -------------------------------------------------------------------------
    else if (time < 112.6) {
      const t = (time - 111.2) / 1.4;
      const claspY = groundY - 33 * charScale;

      // Contact spark radiating outward
      const sparkR = Math.min(32 * charScale, t * 45 * charScale);
      ctx.save();
      const sparkGrad = ctx.createRadialGradient(cx, claspY, 0, cx, claspY, sparkR);
      sparkGrad.addColorStop(0, '#ffffff');
      sparkGrad.addColorStop(0.3, 'rgba(247, 208, 112, 0.9)');
      sparkGrad.addColorStop(0.7, 'rgba(232, 153, 175, 0.5)');
      sparkGrad.addColorStop(1, 'rgba(247, 208, 112, 0)');
      ctx.fillStyle = sparkGrad;
      ctx.beginPath();
      ctx.arc(cx, claspY, sparkR, 0, Math.PI * 2);
      ctx.fill();

      // Floating glitter motes around clasp
      for (let m = 0; m < 8; m++) {
        const ma = m * (Math.PI / 4) + t * 2;
        const mr = 12 * charScale + (t * 20 * charScale) * ((m % 3 + 1) * 0.4);
        const mx = cx + Math.cos(ma) * mr;
        const my = claspY + Math.sin(ma) * mr;
        ctx.fillStyle = m % 2 === 0 ? '#ffffff' : '#f7d070';
        ctx.beginPath();
        ctx.arc(mx, my, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Braided strand beginning to rise from clasp
      this._drawBraidedStrand(cx, groundY, claspY - t * (height * 0.25), 1.0, time);

      // Settled handhold
      CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, 0, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.9)'
      });

      // Context lyric phrase above
      this._drawKineticText('मेरी क़िस्मत भी तुम्हारे', cx, height * 0.12, {
        fontSize: Math.min(width, height) * 0.052,
        color: '#f8cfdc',
        glow: true,
        alpha: 0.85
      });

      // "साथ" is the massive typographic focal point!
      const focalScale = 1.0 + Math.sin(t * Math.PI) * 0.12;
      this._drawKineticText('साथ', cx, height * 0.24, {
        fontSize: Math.min(width, height) * 0.135 * focalScale,
        metallic: 'gold',
        glow: true,
        glowBlur: 28
      });
    }

    // -------------------------------------------------------------------------
    // Sub-beat 4: 112.6–114.0s | Fingers close together, step closer, quiet glance, constellation
    // -------------------------------------------------------------------------
    else {
      const t = Math.min(1.0, (time - 112.6) / 1.4);
      const claspY = groundY - 33 * charScale;
      const apexConstY = height * 0.22;

      // Braided strand rising all the way into the sky
      const currentApexY = claspY - t * (claspY - apexConstY);
      this._drawBraidedStrand(cx, claspY, currentApexY, 1.0, time);

      // Constellation branches out at apex of braided path
      if (t > 0.3) {
        const constAlpha = Math.min(1.0, (t - 0.3) / 0.5);
        this._drawConstellation(cx, apexConstY, constAlpha, 1.2);
      }

      // Couple takes half-step closer and shares quiet glance
      const intimateSpacing = (18 - t * 5) * charScale;
      CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, 0, {
        spacing: intimateSpacing,
        char2Facing: -1,
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.95)'
      });

      // Full completed typography
      this._drawKineticText('मेरी क़िस्मत भी तुम्हारे', cx, height * 0.11, {
        fontSize: Math.min(width, height) * 0.048,
        color: '#f8cfdc',
        glow: true,
        alpha: 0.8
      });

      this._drawKineticText('साथ', cx, height * 0.33, {
        fontSize: Math.min(width, height) * 0.105,
        metallic: 'gold',
        glow: true,
        glowBlur: 22
      });

      // "बन गयी" completes the phrase
      this._drawKineticText('बन गयी', cx, height * 0.43, {
        fontSize: Math.min(width, height) * 0.075,
        color: '#fff7ee',
        glow: true,
        glowBlur: 16,
        alpha: Math.min(1.0, t * 1.5)
      });
    }
  }

  // Beat 21: 114.5–120.5 | The world locks into place again
  _renderBeat21(width, height, time, progress, state) {
    this._drawSkyGradient('#191136', '#562747', width, height);
    this.particles.drawStars(width, height, time, 0.85);
    this._drawHills(width, height, { h1: '#2b1836', h2: '#1d1029', h3: '#10081a' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Giant circular frame locking into place around couple
    const frameR = Math.min(width, height) * 0.26;
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(cx, groundY - 50);
    ctx.strokeStyle = '#f3c76d';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#f3c76d';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, 0, frameR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, time * 2, { aura: true });

    this._drawKineticText('तुम जो आये ज़िन्दगी में', cx, height * 0.22, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#ffffff',
      glow: true
    });
    this._drawKineticText('बात बन गयी', cx, height * 0.34, {
      fontSize: Math.min(width, height) * 0.085,
      metallic: 'gold',
      glow: true
    });
  }

  // Beat 22: 120.5–128.0 | Dream portals return, now connected
  _renderBeat22(width, height, time, progress, state) {
    this._drawSkyGradient('#0c0f28', '#22193d', width, height);
    this.particles.drawStars(width, height, time, 0.85);
    this._drawHills(width, height, { h1: '#181432', h2: '#100e24', h3: '#080716' });

    const groundY = height * 0.82;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    CharacterSystem.drawCoupleHoldingHands(this.ctx, cx, groundY, charScale, 0, { aura: true });

    // Connected orbiting dream portals
    const portalW = Math.min(width, height) * 0.18;
    const portalH = portalW * 0.75;
    const orbitR = Math.min(width, height) * 0.32;

    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = 'rgba(243, 199, 109, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(cx, height * 0.45, orbitR, orbitR * 0.55, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + time * 0.4;
      const px = cx + Math.cos(angle) * orbitR;
      const py = height * 0.45 + Math.sin(angle) * orbitR * 0.55;
      this._drawDreamPortal(px, py, portalW, portalH, i, time, 0.95);
    }

    this._drawKineticText('सपने तेरी चाहतों के देखता हूँ अब कई', cx, height * 0.16, {
      fontSize: Math.min(width, height) * 0.065,
      color: '#f8cfdc',
      glow: true
    });
  }

  // Beat 23: 128.0–134.0 | Gold and silver return, transformed
  _renderBeat23(width, height, time, progress, state) {
    this._drawSkyGradient('#15102d', '#542646', width, height);
    this.particles.drawStars(width, height, time, 0.7);
    this._drawHills(width, height, { h1: '#281736', h2: '#1c1028', h3: '#0f0818' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Dancing celestial sun disc and silver moon crescent
    const danceA = time * 1.2;
    const rad = Math.min(width, height) * 0.25;
    const sunX = cx + Math.cos(danceA) * rad;
    const sunY = height * 0.38 + Math.sin(danceA) * (rad * 0.45);
    const moonX = cx + Math.cos(danceA + Math.PI) * rad;
    const moonY = height * 0.38 + Math.sin(danceA + Math.PI) * (rad * 0.45);

    this._drawRadiantSun(sunX, sunY, 36, 0.95, '#f3c76d');
    this._drawCrescentMoon(moonX, moonY, 26, 0.95, -0.2, '#ffffff');

    CharacterSystem.drawCoupleHoldingHands(this.ctx, cx, groundY, charScale, time * 2, { aura: true });

    this._drawKineticText('दिन है सोना', cx - 120, height * 0.18, {
      fontSize: Math.min(width, height) * 0.065,
      metallic: 'gold',
      glow: true
    });
    this._drawKineticText('और चाँदी रात बन गयी', cx + 110, height * 0.28 , {
      fontSize: Math.min(width, height) * 0.065,
      metallic: 'silver',
      glow: true
    });
  }

  // Helper: Stepping stone platform with glowing bedrock and kinetic lyric
  _drawSteppingStone(x, y, w, h, text, isPressed, time) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y + (isPressed ? 4 : 0));

    // Platform glow
    ctx.shadowColor = isPressed ? '#ffffff' : '#f3c76d';
    ctx.shadowBlur = isPressed ? 18 : 10;

    // Platform bedrock slab
    const grad = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5);
    grad.addColorStop(0, isPressed ? '#4a355f' : '#2d1f40');
    grad.addColorStop(1, '#150c22');
    ctx.fillStyle = grad;
    ctx.strokeStyle = isPressed ? '#ffffff' : '#f3c76d';
    ctx.lineWidth = isPressed ? 3.0 : 2.0;

    ctx.beginPath();
    ctx.roundRect(-w * 0.5, -h * 0.5, w, h, 12);
    ctx.fill();
    ctx.stroke();

    // Inscribed kinetic lyric
    ctx.shadowBlur = 0;
    this._drawKineticText(text, 0, 0, {
      fontSize: Math.min(w * 0.32, h * 0.7),
      metallic: isPressed ? 'gold' : undefined,
      color: isPressed ? undefined : '#f8cfdc',
      glow: isPressed,
      glowColor: '#f7d070',
      glowBlur: 14
    });

    ctx.restore();
  }

  // Helper: Draw floating memory object (petal, mini portal, star, moon sliver)
  _drawMetaphoricalObject(type, x, y, size, angle, alpha = 1.0) {
    if (alpha <= 0.02) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(angle);

    if (type === 'petal') {
      // Rose-Pink Petal
      ctx.fillStyle = '#e899af';
      ctx.shadowColor = '#e899af';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.45, size * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();
      // Petal vein
      ctx.strokeStyle = '#fff0f5';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.7);
      ctx.lineTo(0, size * 0.7);
      ctx.stroke();
    } else if (type === 'portal') {
      // Mini Dream Portal
      const pw = size * 1.2;
      const ph = size * 0.9;
      ctx.strokeStyle = '#8be9fd';
      ctx.lineWidth = 2.0;
      ctx.shadowColor = '#8be9fd';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.roundRect(-pw * 0.5, -ph * 0.5, pw, ph, 6);
      ctx.stroke();
      const pGrad = ctx.createLinearGradient(0, -ph * 0.5, 0, ph * 0.5);
      pGrad.addColorStop(0, 'rgba(13, 21, 43, 0.85)');
      pGrad.addColorStop(1, 'rgba(35, 30, 56, 0.85)');
      ctx.fillStyle = pGrad;
      ctx.fill();
    } else if (type === 'star') {
      // 4-Pointed Golden Star
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#f3c76d';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(0, 0, size, 0);
      ctx.quadraticCurveTo(0, 0, 0, size);
      ctx.quadraticCurveTo(0, 0, -size, 0);
      ctx.quadraticCurveTo(0, 0, 0, -size);
      ctx.closePath();
      ctx.fill();
      // Core gem
      ctx.fillStyle = '#f3c76d';
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'moon') {
      // Silver Moon Sliver
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#d8e1f5';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(size * 0.35, -size * 0.1, size * 0.62, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.restore();
  }

  // Beat 24: 134.0–139.5 | Refrain: the world rearranges around them
  // Lyric: तुम जो आये ज़िन्दगी में बात बन गयी
  _renderBeat24(width, height, time, progress, state) {
    this._drawSkyGradient('#151032', '#4e2348', width, height);
    this.particles.drawStars(width, height, time, 0.7);
    this._drawHills(width, height, { h1: '#261633', h2: '#1a0e24', h3: '#0d0716' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;
    const ctx = this.ctx;

    // -------------------------------------------------------------------------
    // Phase 1: 134.0–134.7s | तुम: Oversized word drops, compresses, rebounds;
    // Ground bounces; couple performs a synchronized hop
    // -------------------------------------------------------------------------
    if (time < 134.7) {
      const t1 = (time - 134.0) / 0.7;

      // Sun and Moon from Scene 23 still moving into upper sky
      const sunX = cx + Math.cos(time * 1.1) * (width * 0.32);
      const sunY = height * 0.22 + Math.sin(time * 1.1) * (height * 0.08);
      const moonX = cx + Math.cos(time * 1.1 + Math.PI) * (width * 0.32);
      const moonY = height * 0.22 + Math.sin(time * 1.1 + Math.PI) * (height * 0.08);
      this._drawRadiantSun(sunX, sunY, 32, 0.9, '#f3c76d');
      this._drawCrescentMoon(moonX, moonY, 24, 0.9, -0.2, '#ffffff');

      // Drop dynamics for "तुम"
      const dropDur = 0.36;
      let wordY, scaleX = 1.0, scaleY = 1.0;
      let hopY = 0, groundDeflect = 0;

      if (time - 134.0 < dropDur) {
        // Falling with acceleration
        const pDrop = (time - 134.0) / dropDur;
        wordY = -height * 0.1 + (height * 0.46) * (pDrop * pDrop);
      } else {
        // Impact at 134.36s: squash and elastic rebound
        const postImpact = (time - 134.0 - dropDur) / (0.7 - dropDur);
        wordY = height * 0.36;

        if (postImpact < 0.35) {
          // Compression (squash)
          const comp = Math.sin((postImpact / 0.35) * Math.PI);
          scaleX = 1.0 + comp * 0.42;
          scaleY = 1.0 - comp * 0.42;
          groundDeflect = comp * 16;
        } else {
          // Elastic rebound
          const reb = Math.sin(((postImpact - 0.35) / 0.65) * Math.PI);
          scaleX = 1.0 - reb * 0.14;
          scaleY = 1.0 + reb * 0.18;
          groundDeflect = -reb * 4;
        }

        // Synchronized hop/step of couple on impact
        const hopP = Math.min(1.0, postImpact / 0.85);
        hopY = -Math.sin(hopP * Math.PI) * 24;

        // Ground shockwave ripple expanding from impact
        const shockR = postImpact * width * 0.45;
        ctx.save();
        ctx.strokeStyle = `rgba(243, 199, 109, ${Math.max(0, 1 - postImpact)})`;
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.ellipse(cx, groundY + groundDeflect, shockR, shockR * 0.2, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Ground line reflecting elastic bounce
      ctx.save();
      ctx.strokeStyle = '#f3c76d';
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.quadraticCurveTo(cx, groundY + groundDeflect * 1.5, width, groundY);
      ctx.stroke();
      ctx.restore();

      // Couple reacts with synchronized hop/step
      const walkProg = (time - 134.0) * 3;
      CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY + hopY + groundDeflect, charScale, walkProg, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.7)'
      });

      // Oversized kinetic "तुम"
      this._drawKineticText('तुम', cx, wordY, {
        fontSize: Math.min(width, height) * 0.18,
        scaleX,
        scaleY,
        metallic: 'gold',
        glow: true,
        glowBlur: 26
      });
    }

    // -------------------------------------------------------------------------
    // Phase 2: 134.7–135.5s | जो आये: आये splits into curved doors, couple passes through;
    // Halves flip into sun and moon shooting to corners; ripple races outward
    // -------------------------------------------------------------------------
    else if (time < 135.5) {
      const t2 = (time - 134.7) / 0.8;
      const openProg = Math.min(1.0, t2 / 0.55);
      const easeOpen = 1 - Math.cos(openProg * Math.PI * 0.5);

      // "जो" appears above
      this._drawKineticText('जो', cx, height * 0.18, {
        fontSize: Math.min(width, height) * 0.075,
        color: '#f8cfdc',
        glow: true,
        glowBlur: 14
      });

      // Door halves positions
      const splitDist = easeOpen * (width * 0.22);
      const doorAngle = easeOpen * (Math.PI * 0.32);

      // Morphing into Sun & Moon as couple passes through (t2 > 0.45)
      const morphT = Math.max(0, (t2 - 0.45) / 0.35);

      // Left Half: 'आ' -> Sun shooting to upper left
      const leftDoorX = (cx - 70 - splitDist) * (1 - morphT) + (width * 0.14) * morphT;
      const leftDoorY = (height * 0.38) * (1 - morphT) + (height * 0.16) * morphT;

      // Right Half: 'ये' -> Moon shooting to upper right
      const rightDoorX = (cx + 70 + splitDist) * (1 - morphT) + (width * 0.86) * morphT;
      const rightDoorY = (height * 0.38) * (1 - morphT) + (height * 0.16) * morphT;

      if (morphT < 0.8) {
        // Left Door Panel 'आ'
        ctx.save();
        ctx.translate(leftDoorX, leftDoorY);
        ctx.rotate(-doorAngle * (1 - morphT));
        ctx.fillStyle = 'rgba(25, 17, 45, 0.85)';
        ctx.strokeStyle = '#f3c76d';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(-45, -60, 90, 120, [16, 4, 4, 16]);
        ctx.fill();
        ctx.stroke();
        this._drawKineticText('आ', 0, 0, {
          fontSize: Math.min(width, height) * 0.10,
          metallic: 'gold',
          glow: true
        });
        ctx.restore();

        // Right Door Panel 'ये'
        ctx.save();
        ctx.translate(rightDoorX, rightDoorY);
        ctx.rotate(doorAngle * (1 - morphT));
        ctx.fillStyle = 'rgba(25, 17, 45, 0.85)';
        ctx.strokeStyle = '#f3c76d';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(-45, -60, 90, 120, [4, 16, 16, 4]);
        ctx.fill();
        ctx.stroke();
        this._drawKineticText('ये', 0, 0, {
          fontSize: Math.min(width, height) * 0.10,
          metallic: 'silver',
          glow: true
        });
        ctx.restore();
      }

      // Sun and Moon appear/shoot to corners
      if (morphT > 0.2) {
        const celestialAlpha = Math.min(1.0, (morphT - 0.2) / 0.5);
        this._drawRadiantSun(leftDoorX, leftDoorY, 34, celestialAlpha, '#f3c76d');
        this._drawCrescentMoon(rightDoorX, rightDoorY, 26, celestialAlpha, -0.3, '#ffffff');
      }

      // Visible ripple racing outward through landscape
      const rippleR = t2 * width * 0.85;
      ctx.save();
      ctx.strokeStyle = 'rgba(139, 233, 253, 0.8)';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#f3c76d';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.ellipse(cx, groundY + 8, rippleR, rippleR * 0.16, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Couple steps through the opening together
      const stepProg = t2 * 3;
      const coupleScale = charScale * (0.92 + t2 * 0.12);
      const coupleY = groundY + (1 - openProg) * 8;
      CharacterSystem.drawCoupleHoldingHands(ctx, cx, coupleY, coupleScale, stepProg, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.85)'
      });
    }

    // -------------------------------------------------------------------------
    // Phase 3: 135.5–137.0s | ज़िन्दगी में: Letters stretch into separate stepping stones;
    // Couple takes 2 buoyant steps; sequential transformations: hill rolls up, river draws, flowers unfold
    // -------------------------------------------------------------------------
    else if (time < 137.0) {
      const t3 = (time - 135.5) / 1.5;

      // Sun and Moon settled in upper corners
      this._drawRadiantSun(width * 0.14, height * 0.16, 34, 0.95, '#f3c76d');
      this._drawCrescentMoon(width * 0.86, height * 0.16, 26, 0.95, -0.3, '#ffffff');

      // Camera push & parallax effect
      ctx.save();
      const camPush = 1.0 + t3 * 0.05;
      ctx.translate(cx, groundY);
      ctx.scale(camPush, camPush);
      ctx.translate(-cx, -groundY);

      // Sequential Transformation 1: Hill rolls up behind them on step 1 (t3 >= 0.22)
      if (t3 > 0.22) {
        const hillT = Math.min(1.0, (t3 - 0.22) / 0.35);
        const easeHill = 1 - Math.cos(hillT * Math.PI * 0.5);
        ctx.save();
        ctx.fillStyle = '#1e382b';
        ctx.beginPath();
        ctx.moveTo(width * 0.1, groundY);
        ctx.quadraticCurveTo(cx, groundY - 70 * easeHill, width * 0.9, groundY);
        ctx.lineTo(width * 0.9, groundY + 40);
        ctx.lineTo(width * 0.1, groundY + 40);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Sequential Transformation 2: River draws itself across ground on step 2 (t3 >= 0.55)
      if (t3 > 0.55) {
        const riverT = Math.min(1.0, (t3 - 0.55) / 0.35);
        ctx.save();
        ctx.strokeStyle = '#26d0ce';
        ctx.lineWidth = 5.5;
        ctx.shadowColor = '#f3c76d';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(0, groundY + 16);
        const curRiverX = riverT * width;
        ctx.quadraticCurveTo(width * 0.5, groundY + 30, curRiverX, groundY + 10);
        ctx.stroke();
        ctx.restore();
      }

      // Stepping stones layout: "ज़िन्दगी" into separate wide stone shapes
      const stone1X = cx - width * 0.18;
      const stone2X = cx;
      const stone3X = cx + width * 0.18;
      const stoneY = groundY - 8;

      // Determine active step
      const step1Active = t3 >= 0.15 && t3 < 0.50;
      const step2Active = t3 >= 0.50 && t3 < 0.85;
      const step3Active = t3 >= 0.85;

      this._drawSteppingStone(stone1X, stoneY, 96, 36, 'ज़िन्द', step1Active, time);
      this._drawSteppingStone(stone2X, stoneY - 14, 96, 36, 'गी', step2Active, time);
      this._drawSteppingStone(stone3X, stoneY, 96, 36, 'में', step3Active, time);

      // Couple positions across stepping stones
      let coupleX, coupleHopY;
      if (t3 < 0.5) {
        // Step 1: Hop to Stone 1 & 2
        const p1 = t3 / 0.5;
        coupleX = stone1X - 30 + p1 * (stone2X - (stone1X - 30));
        coupleHopY = -Math.sin(p1 * Math.PI) * 26;
      } else if (t3 < 0.85) {
        // Step 2: Hop from Stone 2 to Stone 3
        const p2 = (t3 - 0.5) / 0.35;
        coupleX = stone2X + p2 * (stone3X - stone2X);
        coupleHopY = -Math.sin(p2 * Math.PI) * 28;
      } else {
        // Landing on Stone 3
        coupleX = stone3X;
        coupleHopY = 0;
      }

      CharacterSystem.drawCoupleHoldingHands(ctx, coupleX, stoneY + coupleHopY, charScale * 1.02, t3 * 4, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.8)'
      });

      // Sequential Transformation 3: Oversized flowers unfold toward camera on landing (t3 >= 0.78)
      if (t3 > 0.78) {
        const flowerT = Math.min(1.0, (t3 - 0.78) / 0.22);
        this._drawFlower(width * 0.08, groundY + 28, flowerT, '#d95d4e', 50);
        this._drawFlower(width * 0.92, groundY + 28, flowerT, '#f7d070', 48);
        this._drawFlower(width * 0.24, groundY + 36, flowerT * 0.85, '#e899af', 42);
        this._drawFlower(width * 0.76, groundY + 36, flowerT * 0.85, '#26d0ce', 42);
      }

      ctx.restore(); // restore camera push
    }

    // -------------------------------------------------------------------------
    // Phase 4: 137.0–138.2s | बात: Floating memory shapes scramble in;
    // Couple turns together and guides them; pieces snap into balanced arrangement with elastic bounce
    // -------------------------------------------------------------------------
    else if (time < 138.2) {
      const t4 = (time - 137.0) / 1.2;

      // Sun and Moon in corners
      this._drawRadiantSun(width * 0.14, height * 0.16, 34, 0.95, '#f3c76d');
      this._drawCrescentMoon(width * 0.86, height * 0.16, 26, 0.95, -0.3, '#ffffff');

      // Couple turns together guiding the pieces with joined hands
      const turnAngle = t4 * Math.PI * 2.5;
      CharacterSystem.drawCoupleDancing(ctx, cx, groundY, charScale, turnAngle, {
        aura: true,
        auraColor: 'rgba(247, 208, 112, 0.9)'
      });

      // Swirling golden starlight connecting hands and guiding shapes
      ctx.save();
      ctx.strokeStyle = 'rgba(243, 199, 109, 0.85)';
      ctx.lineWidth = 3.0;
      ctx.shadowColor = '#f7d070';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      const guideR = 85 + Math.sin(t4 * 4) * 15;
      ctx.ellipse(cx, height * 0.32, guideR, guideR * 0.65, time * 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Center word: "बात"
      const wordScale = 1.0 + Math.sin(Math.min(1.0, t4 * 1.5) * Math.PI) * 0.15;
      this._drawKineticText('बात', cx, height * 0.32, {
        fontSize: Math.min(width, height) * 0.13 * wordScale,
        metallic: 'gold',
        glow: true,
        glowBlur: 24
      });

      // 4 Floating Metaphorical Shapes:
      // Petal, Dream Portal, Star, Moon Sliver
      const snapProg = Math.max(0, Math.min(1.0, (t4 - 0.45) / 0.55));
      const easeBack = (t) => {
        if (t <= 0) return 0;
        if (t >= 1) return 1;
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };
      const eb = easeBack(snapProg);

      // Target symmetrical positions around "बात"
      const targets = [
        { type: 'star', targetX: cx, targetY: height * 0.19, startX: width * 0.85, startY: height * 0.12, size: 14 },
        { type: 'petal', targetX: cx - 110, targetY: height * 0.32, startX: -width * 0.05, startY: height * 0.22, size: 22 },
        { type: 'moon', targetX: cx + 110, targetY: height * 0.32, startX: width * 1.05, startY: height * 0.42, size: 20 },
        { type: 'portal', targetX: cx, targetY: height * 0.45, startX: width * 0.2, startY: height * 0.9, size: 26 }
      ];

      for (let i = 0; i < targets.length; i++) {
        const item = targets[i];
        const curX = item.startX + (item.targetX - item.startX) * eb;
        const curY = item.startY + (item.targetY - item.startY) * eb;
        const spin = (1 - snapProg) * 6 + i * 1.5;
        this._drawMetaphoricalObject(item.type, curX, curY, item.size, spin, 1.0);
      }
    }

    // -------------------------------------------------------------------------
    // Phase 5: 138.2–139.5s | बन गयी: Letters slide into clean composition;
    // Couple completes quick hand-in-hand turn; flowers pop open in a wave;
    // Composition settles; single star lifts for Scene 25 falling-star callback!
    // -------------------------------------------------------------------------
    else {
      const t5 = Math.min(1.0, (time - 138.2) / 1.3);

      // Sun and Moon in corners
      this._drawRadiantSun(width * 0.14, height * 0.16, 34, 0.95, '#f3c76d');
      this._drawCrescentMoon(width * 0.86, height * 0.16, 26, 0.95, -0.3, '#ffffff');

      // Hand-in-hand turn (138.2–138.85s) then settle (138.85–139.5s)
      if (t5 < 0.5) {
        const turnA = (t5 / 0.5) * Math.PI * 2;
        CharacterSystem.drawCoupleDancing(ctx, cx, groundY, charScale, turnA, {
          aura: true,
          auraColor: 'rgba(247, 208, 112, 0.9)'
        });
      } else {
        CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, 0, {
          aura: true,
          auraColor: 'rgba(247, 208, 112, 0.85)'
        });
      }

      // Flower wave pops open across foreground
      for (let f = 0; f < 10; f++) {
        const fx = width * (0.08 + f * 0.093);
        const distFromCenter = Math.abs(fx - cx) / (width * 0.45);
        const flowerBloom = Math.max(0, Math.min(1.0, (t5 * 2.5) - distFromCenter * 0.8));
        if (flowerBloom > 0) {
          const flowerColor = f % 3 === 0 ? '#d95d4e' : (f % 3 === 1 ? '#f7d070' : '#e899af');
          this._drawFlower(fx, groundY + 18 + (f % 2) * 8, flowerBloom, flowerColor, 36);
        }
      }

      // Memory objects in balanced arrangement around center
      this._drawMetaphoricalObject('petal', cx - 110, height * 0.32, 22, 0, 1.0);
      this._drawMetaphoricalObject('moon', cx + 110, height * 0.32, 20, 0, 1.0);
      this._drawMetaphoricalObject('portal', cx, height * 0.45, 26, 0, 1.0);

      // Single star lifts from final arrangement and ascends to (width * 0.20, height * 0.10)
      // Becoming the falling-star callback for Scene 25!
      if (time >= 139.0) {
        const liftT = Math.min(1.0, (time - 139.0) / 0.5);
        const startStarX = cx;
        const startStarY = height * 0.19;
        const destStarX = width * 0.20;
        const destStarY = height * 0.10;

        const starX = startStarX + (destStarX - startStarX) * liftT;
        const starY = startStarY + (destStarY - startStarY) * liftT - Math.sin(liftT * Math.PI) * 25;

        // Sparkling comet trail behind lifting star
        ctx.save();
        ctx.strokeStyle = 'rgba(243, 199, 109, 0.7)';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(startStarX, startStarY);
        ctx.quadraticCurveTo((startStarX + starX) * 0.5, (startStarY + starY) * 0.5 - 20, starX, starY);
        ctx.stroke();
        ctx.restore();

        this._drawMetaphoricalObject('star', starX, starY, 16, time * 3, 1.0);
      } else {
        this._drawMetaphoricalObject('star', cx, height * 0.19, 14, 0, 1.0);
      }

      // Clean, readable lyric typography layout above the couple
      const slideProg = Math.min(1.0, t5 / 0.4);
      const textSlide = (1 - slideProg) * 20;

      // Top line: "तुम जो आये ज़िन्दगी में"
      this._drawKineticText('तुम जो आये ज़िन्दगी में', cx, height * 0.19 - textSlide, {
        fontSize: Math.min(width, height) * 0.062,
        color: '#ffffff',
        glow: true,
        glowBlur: 14,
        alpha: slideProg
      });

      // Centerpiece line: "बात बन गयी"
      this._drawKineticText('बात बन गयी', cx, height * 0.31, {
        fontSize: Math.min(width, height) * 0.088,
        metallic: 'gold',
        glow: true,
        glowBlur: 24
      });
    }
  }

  // Beat 25: 140.0–142.5 | Finding, final reprise
  _renderBeat25(width, height, time, progress, state) {
    this._drawSkyGradient('#10122e', '#3a1e3e', width, height);
    this.particles.drawStars(width, height, time, 0.8);
    this._drawHills(width, height, { h1: '#201832', h2: '#161026', h3: '#0c0717' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Two star streaks converging above couple
    const streakProg = Math.min(1.0, progress * 1.5);
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f3c76d';
    ctx.shadowBlur = 12;
    // Streak 1
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.1);
    ctx.lineTo(cx - 30 + 30 * streakProg, height * 0.35);
    ctx.stroke();
    // Streak 2
    ctx.beginPath();
    ctx.moveTo(width * 0.8, height * 0.1);
    ctx.lineTo(cx + 30 - 30 * streakProg, height * 0.35);
    ctx.stroke();
    ctx.restore();

    this._drawConstellation(cx, height * 0.35, streakProg, 0.85);

    CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, 0, { aura: true });

    this._drawKineticText('पाया मैंने, पाया तुम्हें', cx, height * 0.18, {
      fontSize: Math.min(width, height) * 0.065,
      color: '#f3c76d',
      glow: true
    });
    this._drawKineticText('रब ने मिलाया तुम्हें', cx, height * 0.28, {
      fontSize: Math.min(width, height) * 0.06,
      color: '#fff7ee'
    });
  }

  // Beat 26: 142.8–145.0 | The world sings
  _renderBeat26(width, height, time, progress, state) {
    this._drawSkyGradient('#111330', '#3e2040', width, height);
    this.particles.drawPetals(width, height, time, 0.6);
    this._drawHills(width, height, { h1: '#221934', h2: '#161026', h3: '#0c0717' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Broad musical ribbons wrapping couple in moving frame
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = 'rgba(243, 199, 109, 0.7)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.ellipse(cx, groundY - 45, width * 0.22, 60, Math.sin(time * 2) * 0.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale, 0, { aura: true });

    this._drawKineticText('होंठों पे सजाया तुम्हें', cx, height * 0.2, {
      fontSize: Math.min(width, height) * 0.06,
      color: '#fff7ee'
    });
    this._drawKineticText('नग़मे सा गाया तुम्हें', cx, height * 0.32, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#f8cfdc',
      glow: true
    });
  }

  // Beat 27: 145.0–148.5 | The secret is safe
  _renderBeat27(width, height, time, progress, state) {
    this._drawSkyGradient('#0a0d24', '#1e1432', width, height);
    this._drawHills(width, height, { h1: '#14122c', h2: '#0d0d1e', h3: '#070712' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Flower shelter closing like petal cocoon with window
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(255, 230, 160, 0.35)';
    ctx.beginPath();
    ctx.ellipse(cx, groundY - 45, 80, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#e899af';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, groundY - 45, 85, -Math.PI * 0.8, Math.PI * 0.8);
    ctx.stroke();
    ctx.restore();

    CharacterSystem.drawCoupleHoldingHands(ctx, cx, groundY, charScale * 0.95, 0, { aura: true });

    // Constellation window visible
    this._drawConstellation(cx, height * 0.26, 0.85, 0.7);

    // Crossfade smoothly during overlap with beat 28 (148.2 - 148.5)
    const textAlpha = state.inOverlap ? (1.0 - state.overlapProgress) : 1.0;
    this._drawKineticText('सब से छुपाया तुम्हें', cx, height * 0.16, {
      fontSize: Math.min(width, height) * 0.07,
      color: '#f8cfdc',
      glow: true,
      alpha: textAlpha
    });
  }

  // Beat 28: 148.2–152.5 | Dream made whole; close the circle
  _renderBeat28(width, height, time, progress, state) {
    // Narrative Full Circle: Opening landscape now transformed & in full bloom!
    this._drawSkyGradient('#070916', '#1a1835', width, height);
    this.particles.drawStars(width, height, time, 0.9);
    this.particles.drawFireflies(width, height, time, 0.85);

    // Opening hill composition
    this._drawHills(width, height, { h1: '#1e1a38', h2: '#131128', h3: '#080a18' });

    const groundY = height * 0.8;
    const charH = height * 0.22;
    const charScale = charH / 85;
    const cx = width * 0.5;

    // Both characters together in center
    CharacterSystem.drawCoupleHoldingHands(this.ctx, cx, groundY, charScale, 0, { aura: true });

    // Blooming flowers covering the knoll
    const fCount = 14;
    for (let f = 0; f < fCount; f++) {
      const fx = width * (0.12 + f * 0.06);
      this._drawFlower(fx, groundY + 12 + (f % 3) * 5, 1.0, f % 2 === 0 ? '#e899af' : '#f3c76d', 30);
    }

    // Great dream bubble resolving into completed constellation
    const bubbleAscend = Math.min(1.0, progress * 1.4);
    const constY = (groundY - 50) - bubbleAscend * (height * 0.35);
    this._drawConstellation(cx, constY, 1.0, 1.0);

    // Easing down motion after 151s (progress > 0.65)
    const textAlpha = state.inOverlap ? state.overlapProgress : (progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) / 0.15) : 1.0);

    this._drawKineticText('सपना बनाया तुम्हें', cx, height * 0.18, {
      fontSize: Math.min(width, height) * 0.065,
      color: '#f3c76d',
      glow: true,
      alpha: textAlpha
    });
    this._drawKineticText('नींदों में बुलाया तुम्हें', cx, height * 0.28, {
      fontSize: Math.min(width, height) * 0.065,
      color: '#ffffff',
      glow: true,
      alpha: textAlpha
    });
  }
}
