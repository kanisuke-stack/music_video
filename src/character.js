/**
 * Character Silhouette Vector System
 * 
 * Provides consistent, recognizable, flat 2D vector silhouettes for:
 * - Character 1: Slender silhouette with coat tails and tailored posture
 * - Character 2: Graceful silhouette with flowing dress and gentle drape
 * 
 * Supports walking cycles, reaching out, holding hands, dancing, and idle poses.
 */

export class CharacterSystem {
  /**
   * Draw Character 1 (Taller silhouette with coat / jacket)
   */
  static drawChar1(ctx, x, y, scale = 1.0, pose = 'idle', walkCycle = 0, facing = 1, options = {}) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale * facing, scale);

    const color = options.color || '#080a16';
    ctx.fillStyle = color;

    // Subtle walk bounce
    const bob = (pose === 'walk') ? Math.sin(walkCycle * Math.PI * 2) * 2.2 : 0;
    const stride = (pose === 'walk') ? Math.sin(walkCycle * Math.PI * 2) * 8 : 0;

    // Optional warm backlight aura
    if (options.aura) {
      ctx.save();
      ctx.shadowColor = options.auraColor || 'rgba(243, 199, 109, 0.4)';
      ctx.shadowBlur = options.auraBlur || 12;
      ctx.fillStyle = color;
    }

    ctx.translate(0, bob);

    // Legs / Pants
    if (pose === 'walk') {
      // Front leg
      ctx.beginPath();
      ctx.moveTo(-2, -26);
      ctx.lineTo(-4 + stride, 0);
      ctx.lineTo(2 + stride, 0);
      ctx.lineTo(2, -26);
      ctx.fill();

      // Back leg
      ctx.beginPath();
      ctx.moveTo(0, -26);
      ctx.lineTo(-2 - stride, 0);
      ctx.lineTo(4 - stride, 0);
      ctx.lineTo(4, -26);
      ctx.fill();
    } else {
      // Standing legs
      ctx.beginPath();
      ctx.moveTo(-5, -28);
      ctx.lineTo(-7, 0);
      ctx.lineTo(7, 0);
      ctx.lineTo(5, -28);
      ctx.fill();
    }

    // Coat / Torso
    ctx.beginPath();
    ctx.moveTo(-6, -50);
    ctx.bezierCurveTo(-10, -42, -12, -26, -14, -14); // Left coat edge
    ctx.lineTo(0, -18);                             // Coat split
    ctx.lineTo(12, -14);                            // Right coat edge
    ctx.bezierCurveTo(10, -28, 8, -42, 6, -50);
    ctx.closePath();
    ctx.fill();

    // Chest / Upper Torso
    ctx.beginPath();
    ctx.moveTo(-6, -50);
    ctx.lineTo(-7, -60);
    ctx.bezierCurveTo(-5, -63, 5, -63, 7, -60);
    ctx.lineTo(6, -50);
    ctx.closePath();
    ctx.fill();

    // Neck
    ctx.fillRect(-2, -66, 4, 7);

    // Head
    ctx.beginPath();
    ctx.arc(0, -73, 7.2, 0, Math.PI * 2);
    ctx.fill();

    // Hairstyle (gentle styled silhouette)
    ctx.beginPath();
    ctx.moveTo(-6, -74);
    ctx.bezierCurveTo(-7, -81, 4, -83, 7, -76);
    ctx.bezierCurveTo(8, -73, 5, -70, 0, -72);
    ctx.fill();

    // Arms according to pose
    if (pose === 'reach') {
      // Right arm reaching forward
      ctx.beginPath();
      ctx.moveTo(4, -58);
      ctx.quadraticCurveTo(16, -50, 24, -46);
      ctx.lineTo(24, -43);
      ctx.quadraticCurveTo(14, -46, 2, -54);
      ctx.fill();
    } else if (pose === 'hold_hands') {
      // Arm reaching down-forward to clasp hand
      ctx.beginPath();
      ctx.moveTo(4, -58);
      ctx.quadraticCurveTo(12, -42, 16, -32);
      ctx.lineTo(14, -30);
      ctx.quadraticCurveTo(10, -40, 2, -54);
      ctx.fill();
    } else if (pose === 'dance') {
      // Dynamic dancing arm
      ctx.beginPath();
      ctx.moveTo(3, -58);
      ctx.quadraticCurveTo(16, -65, 20, -56);
      ctx.lineTo(18, -54);
      ctx.quadraticCurveTo(14, -60, 1, -54);
      ctx.fill();
    } else if (pose === 'recline') {
      // Reclining arm resting on ground or chest
      ctx.beginPath();
      ctx.moveTo(4, -58);
      ctx.quadraticCurveTo(12, -40, 18, -25);
      ctx.lineTo(15, -23);
      ctx.quadraticCurveTo(8, -38, 2, -54);
      ctx.fill();
    } else {
      // Resting / natural arm
      ctx.beginPath();
      ctx.moveTo(4, -58);
      ctx.quadraticCurveTo(6, -42, 5, -28);
      ctx.lineTo(2, -28);
      ctx.quadraticCurveTo(2, -42, 1, -56);
      ctx.fill();
    }

    if (options.aura) {
      ctx.restore();
    }
    ctx.restore();
  }

  /**
   * Draw Character 2 (Graceful silhouette with flowing dress)
   */
  static drawChar2(ctx, x, y, scale = 1.0, pose = 'idle', walkCycle = 0, facing = -1, options = {}) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale * facing, scale);

    const color = options.color || '#080a16';
    ctx.fillStyle = color;

    // Subtle walk bounce
    const bob = (pose === 'walk') ? Math.sin(walkCycle * Math.PI * 2) * 2.0 : 0;
    const sway = (pose === 'walk') ? Math.sin(walkCycle * Math.PI * 2) * 4 : 0;

    if (options.aura) {
      ctx.save();
      ctx.shadowColor = options.auraColor || 'rgba(232, 153, 175, 0.5)';
      ctx.shadowBlur = options.auraBlur || 14;
      ctx.fillStyle = color;
    }

    ctx.translate(0, bob);

    // Flowing Dress / Gown
    ctx.beginPath();
    ctx.moveTo(-4, -48);
    // Left flare
    ctx.bezierCurveTo(-6, -34, -12 + sway, -16, -16 + sway * 1.5, 0);
    ctx.lineTo(16 + sway * 0.5, 0);
    // Right curve
    ctx.bezierCurveTo(12 + sway * 0.5, -16, 6, -34, 4, -48);
    ctx.closePath();
    ctx.fill();

    // Torso / Waist
    ctx.beginPath();
    ctx.moveTo(-5, -48);
    ctx.lineTo(-5, -57);
    ctx.bezierCurveTo(-4, -60, 4, -60, 5, -57);
    ctx.lineTo(4, -48);
    ctx.closePath();
    ctx.fill();

    // Neck
    ctx.fillRect(-1.5, -63, 3, 6);

    // Head
    ctx.beginPath();
    ctx.arc(0, -69, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Soft flowing hair drape
    ctx.beginPath();
    ctx.moveTo(-4, -72);
    ctx.bezierCurveTo(-10, -70, -11, -56, -8, -48); // Hair falling down the back
    ctx.bezierCurveTo(-6, -56, -4, -62, -2, -68);
    ctx.fill();

    // Arms according to pose
    if (pose === 'reach') {
      // Reaching arm forward
      ctx.beginPath();
      ctx.moveTo(3, -55);
      ctx.quadraticCurveTo(15, -48, 22, -44);
      ctx.lineTo(22, -41);
      ctx.quadraticCurveTo(13, -45, 1, -52);
      ctx.fill();
    } else if (pose === 'hold_hands') {
      // Arm reaching down-forward to hold hands
      ctx.beginPath();
      ctx.moveTo(3, -55);
      ctx.quadraticCurveTo(10, -42, 14, -32);
      ctx.lineTo(12, -30);
      ctx.quadraticCurveTo(8, -40, 1, -52);
      ctx.fill();
    } else if (pose === 'dance') {
      // Graceful dance arm curve
      ctx.beginPath();
      ctx.moveTo(2, -55);
      ctx.quadraticCurveTo(14, -62, 18, -54);
      ctx.lineTo(16, -52);
      ctx.quadraticCurveTo(12, -58, 0, -52);
      ctx.fill();
    } else {
      // Resting arm
      ctx.beginPath();
      ctx.moveTo(3, -55);
      ctx.quadraticCurveTo(5, -42, 4, -30);
      ctx.lineTo(2, -30);
      ctx.quadraticCurveTo(2, -42, 1, -53);
      ctx.fill();
    }

    if (options.aura) {
      ctx.restore();
    }
    ctx.restore();
  }

  /**
   * Draw both characters together holding hands
   */
  static drawCoupleHoldingHands(ctx, centerX, y, scale = 1.0, walkCycle = 0, options = {}) {
    const spacing = (options.spacing !== undefined) ? options.spacing : 18 * scale;
    // Char 1 on left, facing right
    CharacterSystem.drawChar1(ctx, centerX - spacing, y, scale, 'hold_hands', walkCycle, 1, options);
    // Char 2 on right, facing right or towards Char 1 if char2Facing is -1
    const char2Facing = (options.char2Facing !== undefined) ? options.char2Facing : 1;
    CharacterSystem.drawChar2(ctx, centerX + spacing, y, scale * 0.95, 'hold_hands', walkCycle, char2Facing, options);

    // Glowing spark where hands connect
    ctx.save();
    const claspX = centerX;
    const claspY = y - 31 * scale;
    const glow = ctx.createRadialGradient(claspX, claspY, 0, claspX, claspY, 14 * scale);
    glow.addColorStop(0, 'rgba(255, 245, 200, 0.9)');
    glow.addColorStop(0.5, 'rgba(243, 199, 109, 0.4)');
    glow.addColorStop(1, 'rgba(243, 199, 109, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(claspX, claspY, 14 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /**
   * Draw couple facing each other, raising hands with variable reach progress (0 = resting, 0.5 = hesitating/approaching, 1 = touching fingertips)
   */
  static drawCoupleReaching(ctx, centerX, y, scale = 1.0, reachProg = 0, options = {}) {
    const spacing = (options.spacing !== undefined) ? options.spacing : (20 + (1 - reachProg) * 8) * scale;
    // Char 1 on left facing right
    CharacterSystem.drawChar1(ctx, centerX - spacing, y, scale, reachProg > 0.1 ? 'reach' : 'idle', 0, 1, options);
    // Char 2 on right facing left
    CharacterSystem.drawChar2(ctx, centerX + spacing, y, scale * 0.95, reachProg > 0.1 ? 'reach' : 'idle', 0, -1, options);

    // If fingertips touching (reachProg ~ 1.0), subtle spark at midpoint
    if (reachProg >= 0.88) {
      const sparkAlpha = Math.min(1.0, (reachProg - 0.88) / 0.12);
      ctx.save();
      const sparkX = centerX;
      const sparkY = y - 44 * scale;
      const glow = ctx.createRadialGradient(sparkX, sparkY, 0, sparkX, sparkY, 12 * scale);
      glow.addColorStop(0, `rgba(255, 245, 200, ${sparkAlpha})`);
      glow.addColorStop(0.5, `rgba(243, 199, 109, ${sparkAlpha * 0.6})`);
      glow.addColorStop(1, 'rgba(243, 199, 109, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 12 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * Draw the couple in a graceful circular rotating dance
   */
  static drawCoupleDancing(ctx, centerX, y, scale = 1.0, danceAngle = 0, options = {}) {
    ctx.save();
    ctx.translate(centerX, y);

    const radius = 22 * scale;
    const x1 = Math.cos(danceAngle) * radius;
    const x2 = Math.cos(danceAngle + Math.PI) * radius;
    const z1 = Math.sin(danceAngle);
    const z2 = Math.sin(danceAngle + Math.PI);

    // Draw background character first (for depth)
    if (z1 < z2) {
      CharacterSystem.drawChar1(ctx, x1, 0, scale * (0.9 + 0.1 * z1), 'dance', 0, x1 > 0 ? -1 : 1, options);
      CharacterSystem.drawChar2(ctx, x2, 0, scale * (0.9 + 0.1 * z2), 'dance', 0, x2 > 0 ? -1 : 1, options);
    } else {
      CharacterSystem.drawChar2(ctx, x2, 0, scale * (0.9 + 0.1 * z2), 'dance', 0, x2 > 0 ? -1 : 1, options);
      CharacterSystem.drawChar1(ctx, x1, 0, scale * (0.9 + 0.1 * z1), 'dance', 0, x1 > 0 ? -1 : 1, options);
    }

    // Swirling ribbon of starlight connecting their hands
    ctx.strokeStyle = 'rgba(243, 199, 109, 0.7)';
    ctx.lineWidth = 2.2 * scale;
    ctx.beginPath();
    ctx.ellipse(0, -32 * scale, radius * 1.2, 8 * scale, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Draw the couple sitting together side by side (e.g. under willow or beside shore)
   */
  static drawCoupleSitting(ctx, centerX, y, scale = 1.0, options = {}) {
    const spacing = 14 * scale;
    ctx.save();
    ctx.translate(0, 8 * scale);
    // Char 1 sitting on left, slightly leaning
    CharacterSystem.drawChar1(ctx, centerX - spacing, y, scale * 0.92, 'idle', 0, 1, options);
    // Char 2 sitting on right, leaning softly toward partner
    CharacterSystem.drawChar2(ctx, centerX + spacing, y, scale * 0.88, 'idle', 0, -1, options);
    ctx.restore();
  }

  /**
   * Draw the couple reclining / stargazing together near the bottom of the frame
   */
  static drawCoupleReclining(ctx, centerX, y, scale = 1.0, options = {}) {
    ctx.save();
    ctx.translate(centerX, y);
    // Slight angle tilt for stargazing
    ctx.save();
    ctx.translate(-24 * scale, 12 * scale);
    ctx.rotate(0.35);
    CharacterSystem.drawChar1(ctx, 0, 0, scale * 0.95, 'recline', 0, 1, options);
    ctx.restore();

    ctx.save();
    ctx.translate(20 * scale, 14 * scale);
    ctx.rotate(-0.3);
    CharacterSystem.drawChar2(ctx, 0, 0, scale * 0.9, 'reach', 0, -1, options);
    ctx.restore();

    // Floating starlight connection between them
    ctx.save();
    ctx.shadowColor = '#f3c76d';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -10 * scale, 3 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }
}

