import * as THREE from 'three';

/**
 * Creates high-resolution canvas textures for the 3D orbital cards
 * with crisp anti-aliased icons, typography, and frosted glass borders.
 */

interface TextCardOptions {
  title: string;
  subtitle: string;
  iconType: 'focus' | 'ideas' | 'plan';
  width?: number;
  height?: number;
}

export function createTextCardTexture(options: TextCardOptions): THREE.CanvasTexture {
  const { title, subtitle, iconType, width = 800, height = 340 } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const padding = 28;
  const cardW = width - padding * 2;
  const cardH = height - padding * 2;
  const radius = 64;

  // 1. Soft Ambient Elevation Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(15, 20, 40, 0.18)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 16;

  ctx.beginPath();
  ctx.roundRect(padding, padding, cardW, cardH, radius);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.fill();
  ctx.restore();

  // 2. Frosted Glass Panel Fill
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(padding, padding, cardW, cardH, radius);
  ctx.clip();

  // Glass gradient fill
  const bgGrad = ctx.createLinearGradient(padding, padding, padding + cardW * 0.8, padding + cardH);
  bgGrad.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
  bgGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.88)');
  bgGrad.addColorStop(1, 'rgba(248, 246, 242, 0.82)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(padding, padding, cardW, cardH);

  // Diagonal Specular Gloss Highlight
  const glossGrad = ctx.createLinearGradient(padding, padding, padding + cardW * 0.6, padding + cardH * 0.6);
  glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  glossGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.25)');
  glossGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = glossGrad;
  ctx.fillRect(padding, padding, cardW, cardH);
  ctx.restore();

  // 3. Crisp Glass Border
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(padding, padding, cardW, cardH, radius);
  ctx.lineWidth = 4;
  const borderGrad = ctx.createLinearGradient(padding, padding, padding + cardW, padding + cardH);
  borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
  borderGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
  borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
  ctx.strokeStyle = borderGrad;
  ctx.stroke();
  ctx.restore();

  // 4. Squircle Icon Container
  const iconX = padding + 48;
  const iconSize = 92;
  const iconY = padding + (cardH - iconSize) / 2;
  const iconRadius = 28;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(iconX, iconY, iconSize, iconSize, iconRadius);

  const cx = iconX + iconSize / 2;
  const cy = iconY + iconSize / 2;

  if (iconType === 'focus') {
    // Lime green
    const iconGrad = ctx.createLinearGradient(iconX, iconY, iconX + iconSize, iconY + iconSize);
    iconGrad.addColorStop(0, '#B8F062');
    iconGrad.addColorStop(1, '#84CC16');
    ctx.fillStyle = iconGrad;
    ctx.fill();

    // Dark olive concentric target rings
    ctx.fillStyle = '#1C3806';
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#1C3806';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.stroke();
  } else if (iconType === 'ideas') {
    // Soft violet / purple
    const iconGrad = ctx.createLinearGradient(iconX, iconY, iconX + iconSize, iconY + iconSize);
    iconGrad.addColorStop(0, '#D8B4FE');
    iconGrad.addColorStop(1, '#A855F7');
    ctx.fillStyle = iconGrad;
    ctx.fill();

    // 4-pointed sparkle star in pure white
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    const starR1 = 26;
    const starR2 = 8;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const r = i % 2 === 0 ? starR1 : starR2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  } else if (iconType === 'plan') {
    // Warm apricot / orange
    const iconGrad = ctx.createLinearGradient(iconX, iconY, iconX + iconSize, iconY + iconSize);
    iconGrad.addColorStop(0, '#FDBA74');
    iconGrad.addColorStop(1, '#F97316');
    ctx.fillStyle = iconGrad;
    ctx.fill();

    // Crisp white checkbox / checklist icon
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 18, cy + 1);
    ctx.lineTo(cx - 6, cy + 13);
    ctx.lineTo(cx + 18, cy - 11);
    ctx.stroke();
  }
  ctx.restore();

  // 5. Typography
  const textX = iconX + iconSize + 36;

  // Title
  ctx.font = 'bold 54px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#111111';
  ctx.textBaseline = 'top';
  ctx.fillText(title, textX, iconY + 2);

  // Subtitle
  ctx.font = '36px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#66625B';
  ctx.textBaseline = 'top';
  ctx.fillText(subtitle, textX, iconY + 56);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates rounded image texture for mountain / moon cards with shadow and glass border
 */
export function createRoundedImageTexture(
  image: HTMLImageElement,
  width = 640,
  height = 440,
  radius = 60
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const padding = 26;
  const cardW = width - padding * 2;
  const cardH = height - padding * 2;

  // Drop Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(15, 20, 35, 0.25)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 16;
  ctx.beginPath();
  ctx.roundRect(padding, padding, cardW, cardH, radius);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.restore();

  // Clipped Image
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(padding, padding, cardW, cardH, radius);
  ctx.clip();
  ctx.drawImage(image, padding, padding, cardW, cardH);

  // Subtle gloss gradient
  const grad = ctx.createLinearGradient(padding, padding, padding, padding + cardH);
  grad.addColorStop(0, 'rgba(255,255,255,0.22)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = grad;
  ctx.fillRect(padding, padding, cardW, cardH);
  ctx.restore();

  // Glass border
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(padding, padding, cardW, cardH, radius);
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.stroke();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates frosted ribbon texture for orbital background cards
 */
export function createFrostedBandTexture(width = 440, height = 580, radius = 64): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const padding = 26;
  const cardW = width - padding * 2;
  const cardH = height - padding * 2;

  // Soft Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(20, 25, 45, 0.12)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  ctx.beginPath();
  ctx.roundRect(padding, padding, cardW, cardH, radius);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.fill();
  ctx.restore();

  // Glass Fill
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(padding, padding, cardW, cardH, radius);
  ctx.clip();

  const grad = ctx.createLinearGradient(padding, padding, padding + cardW, padding + cardH);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.72)');
  grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.42)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0.28)');
  ctx.fillStyle = grad;
  ctx.fillRect(padding, padding, cardW, cardH);
  ctx.restore();

  // Glass Border
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(padding, padding, cardW, cardH, radius);
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.stroke();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
