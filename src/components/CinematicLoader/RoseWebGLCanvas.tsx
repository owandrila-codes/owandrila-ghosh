import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RoseWebGLCanvasProps {
  stage: number;
  progress: number;
}

export default function RoseWebGLCanvas({ stage, progress }: RoseWebGLCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- 1. THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020202);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 2. TEXTURE LOADER FOR PHOTOREALISTIC STAGE RENDERS ---
    const textureLoader = new THREE.TextureLoader();

    const texStage1 = textureLoader.load('/rose-stage1.png');
    const texStage2 = textureLoader.load('/rose-stage2.png');
    const texStage4 = textureLoader.load('/rose-stage4.png');

    [texStage1, texStage2, texStage4].forEach((t) => {
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
    });

    // Materials for smooth crossfading photorealistic rose stages
    const matStage1 = new THREE.MeshBasicMaterial({ map: texStage1, transparent: true, opacity: 0 });
    const matStage2 = new THREE.MeshBasicMaterial({ map: texStage2, transparent: true, opacity: 0 });
    const matStage4 = new THREE.MeshBasicMaterial({ map: texStage4, transparent: true, opacity: 0 });

    const quadGeom = new THREE.PlaneGeometry(2, 2);

    const meshStage1 = new THREE.Mesh(quadGeom, matStage1);
    const meshStage2 = new THREE.Mesh(quadGeom, matStage2);
    const meshStage4 = new THREE.Mesh(quadGeom, matStage4);

    scene.add(meshStage1);
    scene.add(meshStage2);
    scene.add(meshStage4);

    // --- 3. GPU PARTICLE SYSTEM FOR DISINTEGRATING CLIMAX ---
    const particleCount = 1800;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 1.8;
      particlePositions[i * 3 + 1] = -0.4 + (Math.random() - 0.5) * 0.8;
      particlePositions[i * 3 + 2] = 0;

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.008;
      particleVelocities[i * 3 + 1] = Math.random() * 0.012 + 0.003;
      particleVelocities[i * 3 + 2] = 0;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Texture Gradient
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 140, 160, 1)');
      grad.addColorStop(0.5, 'rgba(200, 61, 74, 0.8)');
      grad.addColorStop(1, 'rgba(139, 30, 39, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTex = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0,
    });

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // --- 4. ANIMATION & STAGE CROSSFADING CONTROL LOOP ---
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const normProgress = Math.max(0, Math.min(100, progress)) / 100;

      // STAGE 01 (Rose Appears: 0% to 20%)
      if (normProgress <= 0.2) {
        const stage1T = normProgress / 0.2;
        matStage1.opacity = stage1T;
        matStage2.opacity = 0;
        matStage4.opacity = 0;
        particleMat.opacity = 0;
      }
      // STAGE 02 (Petal Falls: 20% to 45%)
      else if (normProgress > 0.2 && normProgress <= 0.45) {
        const stage2T = (normProgress - 0.2) / 0.25;
        matStage1.opacity = Math.max(0, 1 - stage2T);
        matStage2.opacity = stage2T;
        matStage4.opacity = 0;
        particleMat.opacity = 0;
      }
      // STAGE 03 (Petal Descends: 45% to 70%)
      else if (normProgress > 0.45 && normProgress <= 0.7) {
        const stage3T = (normProgress - 0.45) / 0.25;
        matStage1.opacity = 0;
        matStage2.opacity = Math.max(0, 1 - stage3T * 0.7);
        matStage4.opacity = stage3T * 0.7;
        particleMat.opacity = stage3T * 0.5;
      }
      // STAGE 04 (Petal Disintegrates: 70% to 90%)
      else if (normProgress > 0.7 && normProgress <= 0.9) {
        const stage4T = (normProgress - 0.7) / 0.2;
        matStage1.opacity = 0;
        matStage2.opacity = Math.max(0, 0.3 - stage4T * 0.3);
        matStage4.opacity = Math.max(0, 1 - stage4T * 0.3);
        particleMat.opacity = Math.min(1, 0.5 + stage4T * 0.5);

        // Animate particles rising and spreading
        const positions = particleGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += particleVelocities[i * 3];
          positions[i * 3 + 1] += particleVelocities[i * 3 + 1];
        }
        particleGeom.attributes.position.needsUpdate = true;
      }
      // STAGE 05 (Magic Fades: 90% to 100%)
      else {
        const stage5T = (normProgress - 0.9) / 0.1;
        matStage1.opacity = 0;
        matStage2.opacity = 0;
        matStage4.opacity = Math.max(0, 0.7 - stage5T * 0.7);
        particleMat.opacity = Math.max(0, 1 - stage5T * 1.2);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      matStage1.dispose();
      matStage2.dispose();
      matStage4.dispose();
      quadGeom.dispose();
      particleMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [progress, stage]);

  return <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full" />;
}
