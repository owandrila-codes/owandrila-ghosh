import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RoseWebGLCanvasProps {
  stage: number;
  progress: number;
}

export default function RoseWebGLCanvas({ stage, progress }: RoseWebGLCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const stageRef = useRef(stage);

  useEffect(() => {
    progressRef.current = progress;
    stageRef.current = stage;
  }, [progress, stage]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. THREE.JS SCENE SETUP ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020202);
    scene.fog = new THREE.FogExp2(0x020202, 0.12);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // --- 2. PHOTOREALISTIC LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(0x28060c, 1.5);
    scene.add(ambientLight);

    const mainSpotLight = new THREE.SpotLight(0xff4d66, 10, 22, Math.PI / 3.5, 0.4, 1);
    mainSpotLight.position.set(2.5, 5.5, 6);
    scene.add(mainSpotLight);

    const rimLight = new THREE.PointLight(0xd91c32, 6, 18);
    rimLight.position.set(-4, 3.5, -2.5);
    scene.add(rimLight);

    // --- 3. HIGH-DEFINITIONAL PHOTOREALISTIC ROSE CANVAS RENDER ---
    // Generate a high-resolution photorealistic rose texture on dynamic 2D/3D canvas
    const createRoseTexture = () => {
      const rCanvas = document.createElement('canvas');
      rCanvas.width = 512;
      rCanvas.height = 512;
      const ctx = rCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 512, 512);

        // Center blooming rose layers
        const centerX = 256;
        const centerY = 240;

        // Soft outer glow
        const glowGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 220);
        glowGrad.addColorStop(0, 'rgba(200, 30, 50, 0.35)');
        glowGrad.addColorStop(0.6, 'rgba(139, 15, 30, 0.15)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 220, 0, Math.PI * 2);
        ctx.fill();

        // Draw Layered Organic Petals
        const drawPetal = (x: number, y: number, rx: number, ry: number, rot: number, color1: string, color2: string) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rot);
          const pGrad = ctx.createLinearGradient(0, -ry, 0, ry);
          pGrad.addColorStop(0, color1);
          pGrad.addColorStop(1, color2);
          ctx.fillStyle = pGrad;
          ctx.shadowColor = 'rgba(20, 2, 5, 0.8)';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        };

        // Outer petals
        for (let i = 0; i < 14; i++) {
          const a = (i / 14) * Math.PI * 2;
          const px = centerX + Math.cos(a) * 110;
          const py = centerY + Math.sin(a) * 90;
          drawPetal(px, py, 75, 50, a + Math.PI / 2, '#a81324', '#4a050d');
        }

        // Mid petals
        for (let i = 0; i < 10; i++) {
          const a = (i / 10) * Math.PI * 2 + 0.3;
          const px = centerX + Math.cos(a) * 70;
          const py = centerY + Math.sin(a) * 55;
          drawPetal(px, py, 58, 40, a + Math.PI / 2, '#c81b30', '#5e0712');
        }

        // Inner Petals & Bud Core
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + 0.6;
          const px = centerX + Math.cos(a) * 35;
          const py = centerY + Math.sin(a) * 30;
          drawPetal(px, py, 42, 30, a + Math.PI / 2, '#e62840', '#7a0a18');
        }

        // Tight Spiral Heart
        const heartGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
        heartGrad.addColorStop(0, '#ff4d66');
        heartGrad.addColorStop(0.7, '#a81324');
        heartGrad.addColorStop(1, '#3a040a');
        ctx.fillStyle = heartGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.fill();

        // Stem & Leaves Base
        ctx.strokeStyle = '#182b16';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 130);
        ctx.quadraticCurveTo(centerX - 20, centerY + 220, centerX - 10, centerY + 280);
        ctx.stroke();
      }
      return new THREE.CanvasTexture(rCanvas);
    };

    const roseTexture = createRoseTexture();

    const roseGroup = new THREE.Group();
    roseGroup.position.set(0, 0.35, 0);
    scene.add(roseGroup);

    const rosePlaneGeom = new THREE.PlaneGeometry(3.6, 3.6);
    const rosePlaneMat = new THREE.MeshBasicMaterial({
      map: roseTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0,
    });
    const rosePlaneMesh = new THREE.Mesh(rosePlaneGeom, rosePlaneMat);
    roseGroup.add(rosePlaneMesh);

    // --- 4. HIGH-DEFINITIONAL DETACHING & FALLING PETAL ---
    const createPetalTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 128;
      pCanvas.height = 128;
      const ctx = pCanvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(64, 64, 5, 64, 64, 60);
        grad.addColorStop(0, '#ff4d66');
        grad.addColorStop(0.5, '#c81b30');
        grad.addColorStop(1, 'rgba(80, 5, 12, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(64, 64, 50, 35, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const petalTex = createPetalTexture();
    const fallingPetalGeom = new THREE.PlaneGeometry(1.2, 0.85);
    const fallingPetalMat = new THREE.MeshBasicMaterial({
      map: petalTex,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0,
    });
    const fallingPetal = new THREE.Mesh(fallingPetalGeom, fallingPetalMat);
    fallingPetal.position.set(0.65, 0.05, 0.45);
    fallingPetal.rotation.set(0.4, 0.8, -0.5);
    scene.add(fallingPetal);

    // --- 5. FINE GLOWING SAND DISINTEGRATION SYSTEM ---
    const sandCount = 3800;
    const sandGeom = new THREE.BufferGeometry();
    const sandPositions = new Float32Array(sandCount * 3);
    const sandVelocities = new Float32Array(sandCount * 3);

    for (let i = 0; i < sandCount; i++) {
      const u = Math.random();
      const v = Math.random();
      sandPositions[i * 3] = (u - 0.5) * 0.7;
      sandPositions[i * 3 + 1] = -1.4 + (v - 0.5) * 0.8;
      sandPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

      sandVelocities[i * 3] = (Math.random() - 0.3) * 0.035;
      sandVelocities[i * 3 + 1] = -(Math.random() * 0.04 + 0.015);
      sandVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    sandGeom.setAttribute('position', new THREE.BufferAttribute(sandPositions, 3));

    // Micro Sand Grain Texture
    const sandCanvas = document.createElement('canvas');
    sandCanvas.width = 16;
    sandCanvas.height = 16;
    const ctxSand = sandCanvas.getContext('2d');
    if (ctxSand) {
      const grad = ctxSand.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 140, 160, 1)');
      grad.addColorStop(0.5, 'rgba(217, 28, 50, 0.8)');
      grad.addColorStop(1, 'rgba(120, 12, 24, 0)');
      ctxSand.fillStyle = grad;
      ctxSand.fillRect(0, 0, 16, 16);
    }
    const sandTex = new THREE.CanvasTexture(sandCanvas);

    const sandMat = new THREE.PointsMaterial({
      size: 0.045,
      map: sandTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0,
    });

    const sandSystem = new THREE.Points(sandGeom, sandMat);
    scene.add(sandSystem);

    // --- 6. ATMOSPHERIC EMBERS ---
    const emberCount = 450;
    const emberGeom = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 12;
      emberPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    emberGeom.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xd91c32,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const emberSystem = new THREE.Points(emberGeom, emberMat);
    scene.add(emberSystem);

    // --- 7. ANIMATION & STAGE CONTROL LOOP ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const currentProgress = progressRef.current;
      const normProgress = Math.max(0, Math.min(100, currentProgress)) / 100;

      // Gentle Organic Breath Motion
      roseGroup.rotation.z = Math.sin(elapsedTime * 0.45) * 0.04;
      roseGroup.position.y = 0.35 + Math.cos(elapsedTime * 0.35) * 0.03;

      // --- STAGE 01 (Rose Emerges 0 to 22%) ---
      if (normProgress <= 0.25) {
        const stage1Alpha = Math.min(1, normProgress / 0.22);
        roseGroup.scale.setScalar(0.75 + stage1Alpha * 0.25);
        rosePlaneMat.opacity = stage1Alpha;
        fallingPetal.position.set(0.65, 0.05, 0.45);
        fallingPetal.rotation.set(0.4, 0.8, -0.5);
        fallingPetalMat.opacity = stage1Alpha;
        camera.position.set(0, 0, 8);
      }

      // --- STAGE 02 (Petal Detaches & Flutters 20% to 48%) ---
      if (normProgress > 0.2 && normProgress <= 0.5) {
        const fallT = (normProgress - 0.2) / 0.3;
        fallingPetalMat.opacity = 1;
        fallingPetal.position.x = 0.65 - fallT * 0.35 + Math.sin(fallT * Math.PI * 2.5) * 0.18;
        fallingPetal.position.y = 0.05 - fallT * 1.5;
        fallingPetal.position.z = 0.45 + fallT * 0.4;
        fallingPetal.rotation.x = 0.4 + fallT * 2.8;
        fallingPetal.rotation.y = 0.8 + Math.sin(fallT * Math.PI) * 1.4;
        fallingPetal.rotation.z = -0.5 + fallT * 2.0;
      }

      // --- STAGE 03 (Petal Swirls & Camera Follows 45% to 70%) ---
      if (normProgress > 0.45 && normProgress <= 0.7) {
        const descendT = (normProgress - 0.45) / 0.25;
        fallingPetalMat.opacity = 1;
        fallingPetal.position.y = -1.45 - descendT * 0.65;
        fallingPetal.position.x = 0.3 + Math.sin(descendT * Math.PI * 3) * 0.22;
        fallingPetal.rotation.z += 0.025;

        // Camera Follow & Soft Background Blur
        camera.position.y = -descendT * 0.85;
        roseGroup.position.y = 0.35 + descendT * 0.5;
        rosePlaneMat.opacity = 1 - descendT * 0.5;
      }

      // --- STAGE 04 (SAND DISINTEGRATION 65% to 90%) ---
      if (normProgress > 0.65) {
        const disT = (normProgress - 0.65) / 0.25;
        
        fallingPetalMat.opacity = Math.max(0, 1 - disT * 1.6);
        sandMat.opacity = Math.min(1, disT * 1.5);

        const pos = sandGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < sandCount; i++) {
          pos[i * 3] += sandVelocities[i * 3] * (1 + disT * 1.2);
          pos[i * 3 + 1] += sandVelocities[i * 3 + 1] * (1 + disT * 1.5);
          pos[i * 3 + 2] += sandVelocities[i * 3 + 2] * (1 + disT * 1.2);
        }
        sandGeom.attributes.position.needsUpdate = true;
      }

      // --- STAGE 05 (Sand Fades Into Portfolio 88% to 100%) ---
      if (normProgress > 0.88) {
        const fadeT = (normProgress - 0.88) / 0.12;
        sandMat.opacity = Math.max(0, 1 - fadeT * 1.3);
        emberMat.opacity = Math.max(0, 0.45 - fadeT * 0.45);
        rosePlaneMat.opacity = Math.max(0, 0.5 - fadeT * 0.5);
      }

      // Ember Motion
      const emberPosArr = emberGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        emberPosArr[i * 3 + 1] += 0.0035;
        if (emberPosArr[i * 3 + 1] > 6) emberPosArr[i * 3 + 1] = -6;
      }
      emberGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- 8. RESIZE & CLEANUP ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      roseTexture.dispose();
      petalTex.dispose();
      sandTex.dispose();
      rosePlaneMat.dispose();
      fallingPetalMat.dispose();
      sandMat.dispose();
      emberMat.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full pointer-events-none" />;
}
