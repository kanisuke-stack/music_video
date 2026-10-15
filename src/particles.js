/**
 * Reusable Particle Systems for Romantic 2D Motion Graphics
 * Deterministic & performance-optimized for 60fps on mobile and desktop.
 */

// Simple pseudo-random helper with seed for deterministic particle generation
function pseudoRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export class ParticleManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Seeded starfield (fixed positions, deterministic twinkling)
    this.stars = [];
    this._initStars(140);

    // Floating stardust bokeh
    this.dust = [];
    this._initDust(45);

    // Petals (blossom / rose)
    this.petals = [];
    this._initPetals(35);

    // Lanterns
    this.lanterns = [];
    this._initLanterns(16);

    // Fireflies
    this.fireflies = [];
    this._initFireflies(25);

    // Rain of light
    this.lightRain = [];
    this._initLightRain(60);

    // Sparkles / fireworks
    this.sparks = [];
    this._initSparks(70);
  }

  _initStars(count) {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: pseudoRandom(i * 1.3),
        y: pseudoRandom(i * 2.7),
        size: 0.6 + pseudoRandom(i * 3.1) * 2.0,
        twinkleSpeed: 0.8 + pseudoRandom(i * 4.2) * 2.5,
        twinkleOffset: pseudoRandom(i * 5.5) * Math.PI * 2,
        color: pseudoRandom(i * 6.1) > 0.3 ? '#ffffff' : (pseudoRandom(i * 7.2) > 0.5 ? '#f3c76d' : '#cdc3e9')
      });
    }
  }

  _initDust(count) {
    for (let i = 0; i < count; i++) {
      this.dust.push({
        x: pseudoRandom(100 + i * 1.5),
        y: pseudoRandom(200 + i * 2.3),
        radius: 1.5 + pseudoRandom(300 + i * 3.1) * 3.5,
        speedX: (pseudoRandom(400 + i * 1.7) - 0.5) * 0.03,
        speedY: -0.02 - pseudoRandom(500 + i * 2.1) * 0.05,
        glow: pseudoRandom(600 + i * 3.3) * Math.PI * 2
      });
    }
  }

  _initPetals(count) {
    for (let i = 0; i < count; i++) {
      this.petals.push({
        x: pseudoRandom(700 + i * 1.9),
        y: pseudoRandom(800 + i * 2.5),
        scale: 0.6 + pseudoRandom(900 + i * 3.1) * 0.8,
        speedX: 0.04 + pseudoRandom(1000 + i * 2.2) * 0.08,
        speedY: 0.03 + pseudoRandom(1100 + i * 1.8) * 0.06,
        rotation: pseudoRandom(1200 + i * 3.5) * Math.PI * 2,
        rotSpeed: 0.5 + pseudoRandom(1300 + i * 2.9) * 1.5,
        color: i % 2 === 0 ? '#f8cfdc' : '#e899af'
      });
    }
  }

  _initLanterns(count) {
    for (let i = 0; i < count; i++) {
      this.lanterns.push({
        x: 0.08 + pseudoRandom(1400 + i * 2.1) * 0.84,
        ySeed: pseudoRandom(1500 + i * 3.7),
        size: 14 + pseudoRandom(1600 + i * 1.5) * 16,
        speed: 0.015 + pseudoRandom(1700 + i * 2.8) * 0.03,
        swaySpeed: 0.6 + pseudoRandom(1800 + i * 1.9) * 1.2,
        swayAmp: 0.015 + pseudoRandom(1900 + i * 2.4) * 0.025
      });
    }
  }

  _initFireflies(count) {
    for (let i = 0; i < count; i++) {
      this.fireflies.push({
        baseX: 0.05 + pseudoRandom(2000 + i * 3.1) * 0.9,
        baseY: 0.5 + pseudoRandom(2100 + i * 2.7) * 0.45,
        rangeX: 0.04 + pseudoRandom(2200 + i * 1.8) * 0.06,
        rangeY: 0.03 + pseudoRandom(2300 + i * 2.3) * 0.05,
        freqX: 0.5 + pseudoRandom(2400 + i * 3.4) * 1.2,
        freqY: 0.4 + pseudoRandom(2500 + i * 2.1) * 1.0,
        radius: 2 + pseudoRandom(2600 + i * 1.7) * 2.5
      });
    }
  }

  _initLightRain(count) {
    for (let i = 0; i < count; i++) {
      this.lightRain.push({
        x: pseudoRandom(2700 + i * 2.4),
        ySeed: pseudoRandom(2800 + i * 3.2),
        length: 15 + pseudoRandom(2900 + i * 1.9) * 25,
        speed: 0.25 + pseudoRandom(3000 + i * 2.6) * 0.35
      });
    }
  }

  _initSparks(count) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 0.05 + pseudoRandom(3100 + i * 2.3) * 0.35;
      this.sparks.push({
        angle,
        speed,
        size: 1.5 + pseudoRandom(3200 + i * 1.8) * 2.5,
        color: i % 3 === 0 ? '#f3c76d' : (i % 3 === 1 ? '#fff6eb' : '#f8cfdc')
      });
    }
  }

  /**
   * Draw twinkling starry sky
   */
  drawStars(width, height, time, alpha = 1.0) {
    if (alpha <= 0) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;

    for (const star of this.stars) {
      const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(time * star.twinkleSpeed + star.twinkleOffset));
      const px = star.x * width;
      const py = star.y * height * 0.75; // Sky upper 75%

      ctx.fillStyle = star.color;
      ctx.globalAlpha = alpha * twinkle;
      ctx.beginPath();
      ctx.arc(px, py, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow for larger stars
      if (star.size > 1.8) {
        ctx.fillStyle = 'rgba(255, 240, 200, 0.25)';
        ctx.beginPath();
        ctx.arc(px, py, star.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Occasional shooting star across starlight scenes
    const shootCycle = (time * 0.35) % 1.0;
    if (shootCycle < 0.25) {
      const progress = shootCycle / 0.25;
      const startX = width * 0.7;
      const startY = height * 0.1;
      const endX = width * 0.3;
      const endY = height * 0.35;
      const curX = startX + (endX - startX) * progress;
      const curY = startY + (endY - startY) * progress;
      const tailX = curX + (startX - endX) * 0.15;
      const tailY = curY + (startY - endY) * 0.15;

      const grad = ctx.createLinearGradient(tailX, tailY, curX, curY);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(1, 'rgba(255, 245, 220, 0.9)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(curX, curY);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Draw floating stardust bokeh particles
   */
  drawDust(width, height, time, alpha = 1.0) {
    if (alpha <= 0) return;
    const ctx = this.ctx;
    ctx.save();

    for (let i = 0; i < this.dust.length; i++) {
      const p = this.dust[i];
      const curX = ((p.x + p.speedX * time) % 1.0 + 1.0) % 1.0 * width;
      const curY = ((p.y + p.speedY * time) % 1.0 + 1.0) % 1.0 * height;
      const pulse = 0.4 + 0.6 * Math.sin(time * 1.5 + p.glow);

      ctx.globalAlpha = alpha * pulse * 0.65;
      const grad = ctx.createRadialGradient(curX, curY, 0, curX, curY, p.radius * 2.5);
      grad.addColorStop(0, 'rgba(243, 199, 109, 0.85)');
      grad.addColorStop(0.5, 'rgba(205, 195, 233, 0.35)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(curX, curY, p.radius * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Draw fluttering cherry/rose petals
   */
  drawPetals(width, height, time, alpha = 1.0) {
    if (alpha <= 0) return;
    const ctx = this.ctx;
    ctx.save();

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      // Wind oscillation
      const windX = Math.sin(time * 1.2 + i) * 0.05;
      const curX = ((p.x + (p.speedX + windX) * time) % 1.2 - 0.1) * width;
      const curY = ((p.y + p.speedY * time) % 1.2 - 0.1) * height;
      const rot = p.rotation + time * p.rotSpeed;

      ctx.save();
      ctx.translate(curX, curY);
      ctx.rotate(rot);
      ctx.scale(p.scale, p.scale);
      ctx.globalAlpha = alpha * 0.85;

      // Draw stylized 2D petal
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.bezierCurveTo(7, -8, 9, 3, 0, 10);
      ctx.bezierCurveTo(-9, 3, -7, -8, 0, -10);
      ctx.fill();

      // Delicate petal inner vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(0, 6);
      ctx.stroke();

      ctx.restore();
    }

    ctx.restore();
  }

  /**
   * Draw floating warm lanterns ascending slowly
   */
  drawLanterns(width, height, time, alpha = 1.0) {
    if (alpha <= 0) return;
    const ctx = this.ctx;
    ctx.save();

    for (let i = 0; i < this.lanterns.length; i++) {
      const l = this.lanterns[i];
      // Lantern rises upward continuously
      const progress = ((l.ySeed - time * l.speed) % 1.2 + 1.2) % 1.2;
      const curY = (progress - 0.1) * height;
      const sway = Math.sin(time * l.swaySpeed + i) * l.swayAmp * width;
      const curX = l.x * width + sway;

      const size = l.size;
      const flicker = 0.85 + 0.15 * Math.sin(time * 3 + i * 2);

      // Warm glow halo
      ctx.globalAlpha = alpha * 0.45 * flicker;
      const glowGrad = ctx.createRadialGradient(curX, curY, 0, curX, curY, size * 2.8);
      glowGrad.addColorStop(0, 'rgba(255, 210, 120, 0.9)');
      glowGrad.addColorStop(0.5, 'rgba(243, 150, 80, 0.35)');
      glowGrad.addColorStop(1, 'rgba(255, 180, 100, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(curX, curY, size * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Lantern body (rounded rect silhouette)
      ctx.globalAlpha = alpha * 0.92;
      ctx.fillStyle = '#ffdfa0';
      ctx.beginPath();
      ctx.roundRect(curX - size * 0.4, curY - size * 0.5, size * 0.8, size, 4);
      ctx.fill();

      // Top and bottom wooden rims
      ctx.fillStyle = '#8a4b29';
      ctx.fillRect(curX - size * 0.45, curY - size * 0.55, size * 0.9, 3);
      ctx.fillRect(curX - size * 0.45, curY + size * 0.5, size * 0.9, 3);

      // Inner flame core
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = alpha * flicker;
      ctx.beginPath();
      ctx.arc(curX, curY + size * 0.1, size * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Draw dancing fireflies
   */
  drawFireflies(width, height, time, alpha = 1.0) {
    if (alpha <= 0) return;
    const ctx = this.ctx;
    ctx.save();

    for (let i = 0; i < this.fireflies.length; i++) {
      const f = this.fireflies[i];
      const curX = (f.baseX + Math.sin(time * f.freqX + i) * f.rangeX) * width;
      const curY = (f.baseY + Math.cos(time * f.freqY + i * 1.5) * f.rangeY) * height;
      const pulse = 0.3 + 0.7 * Math.sin(time * 2.5 + i * 3);

      ctx.globalAlpha = alpha * pulse;
      const grad = ctx.createRadialGradient(curX, curY, 0, curX, curY, f.radius * 3.5);
      grad.addColorStop(0, '#ffffcc');
      grad.addColorStop(0.4, 'rgba(243, 220, 100, 0.6)');
      grad.addColorStop(1, 'rgba(243, 199, 109, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(curX, curY, f.radius * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Crisp center
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(curX, curY, f.radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Draw light rain / warm starlight shower
   */
  drawLightRain(width, height, time, alpha = 1.0) {
    if (alpha <= 0) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 235, 180, 0.45)';
    ctx.lineWidth = 1.2;

    for (let i = 0; i < this.lightRain.length; i++) {
      const r = this.lightRain[i];
      const curX = r.x * width;
      const progress = ((r.ySeed + time * r.speed) % 1.2 - 0.1);
      const curY = progress * height;

      ctx.globalAlpha = alpha * (0.3 + 0.4 * Math.sin(time * 2 + i));
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      ctx.lineTo(curX - 4, curY + r.length);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Draw celebratory golden sparks / bursts
   */
  drawCelebrationSparks(width, height, time, localProgress, alpha = 1.0) {
    if (alpha <= 0) return;
    const ctx = this.ctx;
    ctx.save();

    const centerX = width * 0.5;
    const centerY = height * 0.42;

    for (let i = 0; i < this.sparks.length; i++) {
      const s = this.sparks[i];
      const cycle = ((time * 0.8 + i * 0.05) % 1.0);
      const radius = cycle * Math.min(width, height) * 0.45;
      const px = centerX + Math.cos(s.angle) * radius;
      const py = centerY + Math.sin(s.angle) * radius * 0.75;
      const sparkAlpha = (1.0 - cycle) * alpha;

      ctx.globalAlpha = sparkAlpha;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(px, py, s.size * (1 - cycle * 0.5), 0, Math.PI * 2);
      ctx.fill();

      // Sparkle glow
      if (s.size > 2) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(px, py, s.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }
}
