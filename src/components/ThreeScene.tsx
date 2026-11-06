import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  createTextCardTexture,
  createRoundedImageTexture,
  createFrostedBandTexture,
} from '../utils/cardTextures';

/**
 * Creates a plane curved along the X-axis around an imaginary cylinder
 * of radius R, giving cards authentic spatial 3D curvature.
 */
function createCurvedCardGeometry(
  width: number,
  height: number,
  radius: number,
  segments = 32
): THREE.BufferGeometry {
  const geom = new THREE.PlaneGeometry(width, height, segments, 1);
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const theta = x / radius;
    const newX = radius * Math.sin(theta);
    // Curve backward into the cylinder so card wraps around the center
    const newZ = -radius * (1 - Math.cos(theta));
    pos.setXYZ(i, newX, pos.getY(i), newZ);
  }
  geom.computeVertexNormals();
  return geom;
}

export const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Mouse tracking state
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. WebGL & Renderer Detection
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Setup Viewport Dimensions
    const width = container.clientWidth || 1100;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 1, 3000);
    camera.position.set(0, -10, 880);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(150, 250, 400);
    scene.add(dirLight);

    // 4. Main Group for Orbital Elements
    const groupRing = new THREE.Group();
    scene.add(groupRing);

    const textureLoader = new THREE.TextureLoader();

    // Cylindrical Curvature Radius (~260px radius for natural head wrapping)
    const curveRadius = 280;
    const cardGeomText = createCurvedCardGeometry(175, 78, curveRadius);
    const cardGeomImage = createCurvedCardGeometry(152, 108, curveRadius);
    const cardGeomBand = createCurvedCardGeometry(130, 175, curveRadius * 0.9);

    interface FloatItem {
      mesh: THREE.Object3D;
      baseX: number;
      baseY: number;
      baseZ: number;
      baseRotX: number;
      baseRotY: number;
      baseRotZ: number;
      speed: number;
      amplitude: number;
      phase: number;
      parallaxMult: number;
    }
    const floatItems: FloatItem[] = [];

    // --- (A) Central Portrait Cutout Plane ---
    let portraitMesh: THREE.Mesh | null = null;
    textureLoader.load(
      '/assets/portrait.png',
      (portraitTex) => {
        portraitTex.colorSpace = THREE.SRGBColorSpace;
        portraitTex.minFilter = THREE.LinearFilter;
        portraitTex.magFilter = THREE.LinearFilter;

        const portraitAspect = 896 / 1200;
        const pHeight = 515;
        const pWidth = pHeight * portraitAspect;

        const portraitGeom = new THREE.PlaneGeometry(pWidth, pHeight);
        const portraitMat = new THREE.MeshBasicMaterial({
          map: portraitTex,
          transparent: true,
          depthWrite: false,
        });

        portraitMesh = new THREE.Mesh(portraitGeom, portraitMat);
        portraitMesh.position.set(16, -58, 0);
        portraitMesh.renderOrder = 5; // Portrait is between back cards and front cards
        scene.add(portraitMesh);

        setIsReady(true);
      },
      undefined,
      (err) => console.warn('Portrait load fallback', err)
    );

    // --- (B) Card 1: FOCUS (Upper-Left) ---
    const focusTex = createTextCardTexture({
      title: 'Focus',
      subtitle: 'Deep work, bigger results.',
      iconType: 'focus',
    });
    const focusMat = new THREE.MeshBasicMaterial({
      map: focusTex,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const focusMesh = new THREE.Mesh(cardGeomText, focusMat);
    focusMesh.position.set(-136, 86, 60);
    focusMesh.rotation.set(0.04, 0.22, -0.03);
    focusMesh.renderOrder = 8;
    groupRing.add(focusMesh);
    floatItems.push({
      mesh: focusMesh,
      baseX: -136,
      baseY: 86,
      baseZ: 60,
      baseRotX: 0.04,
      baseRotY: 0.22,
      baseRotZ: -0.03,
      speed: 0.85,
      amplitude: 5.5,
      phase: 0.5,
      parallaxMult: 1.15,
    });

    // --- (C) Card 2: IDEAS (Front Center-Lower) ---
    const ideasTex = createTextCardTexture({
      title: 'Ideas',
      subtitle: 'Capture everything.',
      iconType: 'ideas',
    });
    const ideasMat = new THREE.MeshBasicMaterial({
      map: ideasTex,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ideasMesh = new THREE.Mesh(cardGeomText, ideasMat);
    ideasMesh.position.set(-30, -56, 135);
    ideasMesh.rotation.set(-0.02, 0.05, -0.015);
    ideasMesh.renderOrder = 10;
    groupRing.add(ideasMesh);
    floatItems.push({
      mesh: ideasMesh,
      baseX: -30,
      baseY: -56,
      baseZ: 135,
      baseRotX: -0.02,
      baseRotY: 0.05,
      baseRotZ: -0.015,
      speed: 1.05,
      amplitude: 6.5,
      phase: 1.8,
      parallaxMult: 1.35,
    });

    // --- (D) Card 3: PLAN (Right Center) ---
    const planTex = createTextCardTexture({
      title: 'Plan',
      subtitle: 'Turn ideas into action.',
      iconType: 'plan',
    });
    const planMat = new THREE.MeshBasicMaterial({
      map: planTex,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const planMesh = new THREE.Mesh(cardGeomText, planMat);
    planMesh.position.set(176, -24, 70);
    planMesh.rotation.set(0.02, -0.25, 0.03);
    planMesh.renderOrder = 7;
    groupRing.add(planMesh);
    floatItems.push({
      mesh: planMesh,
      baseX: 176,
      baseY: -24,
      baseZ: 70,
      baseRotX: 0.02,
      baseRotY: -0.25,
      baseRotZ: 0.03,
      speed: 0.9,
      amplitude: 5.5,
      phase: 3.2,
      parallaxMult: 1.2,
    });

    // --- (E) Mountain Preview Card (Mid-Left, behind head) ---
    const imgMountain = new Image();
    imgMountain.src = '/assets/mountain.jpg';
    imgMountain.onload = () => {
      const mountainTex = createRoundedImageTexture(imgMountain, 460, 320, 46);
      const mountainMat = new THREE.MeshBasicMaterial({
        map: mountainTex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mountainMesh = new THREE.Mesh(cardGeomImage, mountainMat);
      mountainMesh.position.set(-204, 2, -45);
      mountainMesh.rotation.set(0.06, 0.32, 0.06);
      mountainMesh.renderOrder = 3; // Renders behind portraitMesh (5)
      groupRing.add(mountainMesh);
      floatItems.push({
        mesh: mountainMesh,
        baseX: -204,
        baseY: 2,
        baseZ: -45,
        baseRotX: 0.06,
        baseRotY: 0.32,
        baseRotZ: 0.06,
        speed: 0.75,
        amplitude: 4.5,
        phase: 4.1,
        parallaxMult: 0.85,
      });
    };

    // --- (F) Planet Preview Card (Lower Right) ---
    const imgPlanet = new Image();
    imgPlanet.src = '/assets/planet.jpg';
    imgPlanet.onload = () => {
      const planetTex = createRoundedImageTexture(imgPlanet, 460, 320, 46);
      const planetMat = new THREE.MeshBasicMaterial({
        map: planetTex,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const planetMesh = new THREE.Mesh(cardGeomImage, planetMat);
      planetMesh.position.set(182, -114, 98);
      planetMesh.rotation.set(-0.04, -0.30, -0.04);
      planetMesh.renderOrder = 9;
      groupRing.add(planetMesh);
      floatItems.push({
        mesh: planetMesh,
        baseX: 182,
        baseY: -114,
        baseZ: 98,
        baseRotX: -0.04,
        baseRotY: -0.30,
        baseRotZ: -0.04,
        speed: 1.0,
        amplitude: 5.5,
        phase: 2.3,
        parallaxMult: 1.25,
      });
    };

    // --- (G) Background Frosted Orbital Bands (Cylinder Halo) ---
    const bandTex = createFrostedBandTexture(280, 360, 46);
    const bandMat = new THREE.MeshBasicMaterial({
      map: bandTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });

    // Far-left band
    const bandLeft = new THREE.Mesh(cardGeomBand, bandMat);
    bandLeft.position.set(-252, -50, -85);
    bandLeft.rotation.set(0.08, 0.45, 0.02);
    bandLeft.renderOrder = 1;
    groupRing.add(bandLeft);

    // Far-right band
    const bandRight = new THREE.Mesh(cardGeomBand, bandMat);
    bandRight.position.set(222, 52, -65);
    bandRight.rotation.set(-0.05, -0.38, -0.03);
    bandRight.renderOrder = 2;
    groupRing.add(bandRight);

    // 5. Mouse Interaction Handler
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseRef.current.targetX = Math.max(-1, Math.min(1, nx));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, ny));
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseleave', handlePointerLeave);

    // 6. Animation Loop
    let frameId = 0;
    const startTime = performance.now();

    function tick() {
      const now = performance.now();
      const elapsedTime = (now - startTime) / 1000;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      camera.position.x = mx * 28;
      camera.position.y = -10 + my * 16;
      camera.position.z = 880;
      camera.lookAt(mx * 8, -40 + my * 5, 0);

      if (portraitMesh) {
        portraitMesh.position.x = 16 + mx * 8;
        portraitMesh.position.y = -58 + my * 5;
        portraitMesh.rotation.y = mx * 0.025;
      }

      floatItems.forEach((item) => {
        const t = elapsedTime * item.speed + item.phase;
        const floatY = Math.sin(t) * item.amplitude;
        const tiltZ = Math.cos(t * 0.8) * 0.015;

        item.mesh.position.y = item.baseY + floatY + my * 12 * item.parallaxMult;
        item.mesh.position.x = item.baseX + mx * 18 * item.parallaxMult;
        item.mesh.rotation.z = item.baseRotZ + tiltZ + mx * 0.025;
        item.mesh.rotation.y = item.baseRotY + mx * 0.04;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    tick();

    // 7. Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full max-w-[1200px] mx-auto flex items-end justify-center transition-opacity duration-700 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ minHeight: '520px' }}
      aria-label="3D Interactive Experience"
    />
  );
};
