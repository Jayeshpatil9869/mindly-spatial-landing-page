/**
 * 3D math and layout calculation helpers for the Mindly hero scene.
 */

export interface Card3DConfig {
  id: string;
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  floatSpeed: number;
  floatAmplitude: number;
  parallaxFactor: number;
}

export function calculateParallax(
  mousePos: { x: number; y: number },
  factor: number,
  maxOffset: { x: number; y: number } = { x: 30, y: 20 }
): { x: number; y: number; rotX: number; rotY: number } {
  const clampedX = Math.max(-1, Math.min(1, mousePos.x));
  const clampedY = Math.max(-1, Math.min(1, mousePos.y));

  return {
    x: clampedX * maxOffset.x * factor,
    y: -clampedY * maxOffset.y * factor,
    rotX: clampedY * 0.08 * factor,
    rotY: clampedX * 0.12 * factor,
  };
}

export function calculateFloatOffset(
  time: number,
  speed: number,
  amplitude: number,
  phase: number = 0
): { offsetY: number; rotZ: number } {
  const t = time * speed + phase;
  return {
    offsetY: Math.sin(t) * amplitude,
    rotZ: Math.cos(t * 0.8) * 0.02 * amplitude,
  };
}

export function getDepthSortedOrder(cards: Array<{ id: string; z: number }>): string[] {
  return [...cards].sort((a, b) => a.z - b.z).map((c) => c.id);
}

export function calculateResponsiveScale(viewportWidth: number): number {
  if (viewportWidth >= 1440) return 1.0;
  if (viewportWidth >= 1200) return 0.95;
  if (viewportWidth >= 1024) return 0.85;
  if (viewportWidth >= 768) return 0.72;
  return 0.58;
}
