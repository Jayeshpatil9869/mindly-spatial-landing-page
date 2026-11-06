import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateParallax,
  calculateFloatOffset,
  getDepthSortedOrder,
  calculateResponsiveScale,
} from './math3d';

test('calculateParallax clamps within range and computes directional offsets', () => {
  const center = calculateParallax({ x: 0, y: 0 }, 1.0);
  assert.equal(center.x, 0);
  assert.equal(center.y, -0);

  const right = calculateParallax({ x: 1, y: 0 }, 1.5, { x: 40, y: 20 });
  assert.equal(right.x, 60);

  const overflow = calculateParallax({ x: 5, y: -5 }, 1.0, { x: 20, y: 20 });
  assert.equal(overflow.x, 20);
  assert.equal(overflow.y, 20);
});

test('calculateFloatOffset produces continuous sine wave variations', () => {
  const atZero = calculateFloatOffset(0, 1.0, 10, 0);
  assert.equal(atZero.offsetY, 0);

  const atHalfPi = calculateFloatOffset(Math.PI / 2, 1.0, 10, 0);
  assert.ok(Math.abs(atHalfPi.offsetY - 10) < 0.001);
});

test('getDepthSortedOrder correctly sorts objects back-to-front', () => {
  const cards = [
    { id: 'foreground-ideas', z: 120 },
    { id: 'portrait-plane', z: 0 },
    { id: 'background-mountain', z: -80 },
    { id: 'mid-focus', z: 40 },
  ];
  const sorted = getDepthSortedOrder(cards);
  assert.deepEqual(sorted, [
    'background-mountain',
    'portrait-plane',
    'mid-focus',
    'foreground-ideas',
  ]);
});

test('calculateResponsiveScale adapts smoothly to screen widths', () => {
  assert.equal(calculateResponsiveScale(1440), 1.0);
  assert.equal(calculateResponsiveScale(1280), 0.95);
  assert.equal(calculateResponsiveScale(1024), 0.85);
  assert.equal(calculateResponsiveScale(768), 0.72);
  assert.equal(calculateResponsiveScale(375), 0.58);
});
