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
    camera.position.set(0, 0, 6.5); // Brought camera closer for prominent rose view

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- 2. NEON LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(0x28060c, 1.5);
    scene.add(ambientLight);

    const neonMainSpot = new THREE.SpotLight(0xff3355, 12, 22, Math.PI / 3, 0.4, 1);
    neonMainSpot.position.set(2, 5, 6);
    scene.add(neonMainSpot);

    const greenLeafGlow = new THREE.PointLight(0x33ff66, 6, 12);
    greenLeafGlow.position.set(0, -1.5, 2);
    scene.add(greenLeafGlow);

    // --- 3. PROMINENT BIGGER VERTICAL NEON ROSE FROM UPLOADED IMAGE (/neon-rose.png) ---
    const textureLoader = new THREE.TextureLoader();
    const neonRoseTexture = textureLoader.load('/neon-rose.png');

    const roseGroup = new THREE.Group();
    roseGroup.position.set(0, 0.1, 0);
    scene.add(roseGroup);

    // Scaled up geometry (4.8 x 9.6) to fill screen prominently
    const rosePlaneGeom = new THREE.PlaneGeometry(4.8, 9.6);
    const rosePlaneMat = new THREE.MeshBasicMaterial({
      map: neonRoseTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0,
    });
    const rosePlaneMesh = new THREE.Mesh(rosePlaneGeom, rosePlaneMat);
    roseGroup.add(rosePlaneMesh);

    // --- 4. GLOWING NEON PETAL (DETACHES FROM FLOWER HEAD & FALLS) ---
    const createExactNeonPetalTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 160;
      pCanvas.height = 160;
      const ctx = pCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 160, 160);
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 50, 80, 0.95)';
        ctx.lineWidth = 14;
        ctx.shadowColor = 'rgba(255, 50, 80, 1)';
        ctx.shadowBlur = 24;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(35, 115);
        ctx.bezierCurveTo(25, 45, 115, 25, 145, 95);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(35, 115);
        ctx.bezierCurveTo(25, 45, 115, 25, 145, 95);
        ctx.stroke();
        ctx.restore();
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const neonPetalTex = createExactNeonPetalTexture();
    const fallingPetalGeom = new THREE.PlaneGeometry(1.4, 1.4);
    const fallingPetalMat = new THREE.MeshBasicMaterial({
      map: neonPetalTex,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0,
    });
    const fallingPetal = new THREE.Mesh(fallingPetalGeom, fallingPetalMat);
    fallingPetal.position.set(0.5, 1.6, 0.45);
    fallingPetal.rotation.set(0.4, 0.8, -0.5);
    scene.add(fallingPetal);

    // --- 5. FINE GLOWING NEON SAND DISINTEGRATION SYSTEM ---
    const sandCount = 4000;
    const sandGeom = new THREE.BufferGeometry();
    const sandPositions = new Float32Array(sandCount * 3);
    const sandVelocities = new Float32Array(sandCount * 3);

    for (let i = 0; i < sandCount; i++) {
      const u = Math.random();
      const v = Math.random();
      sandPositions[i * 3] = (u - 0.5) * 0.8;
      sandPositions[i * 3 + 1] = -2.0 + (v - 0.5) * 0.9;
      sandPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

      sandVelocities[i * 3] = (Math.random() - 0.3) * 0.035;
      sandVelocities[i * 3 + 1] = -(Math.random() * 0.04 + 0.015);
      sandVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    sandGeom.setAttribute('position', new THREE.BufferAttribute(sandPositions, 3));

    // Neon Micro Sand Texture
    const sandCanvas = document.createElement('canvas');
    sandCanvas.width = 16;
    sandCanvas.height = 16;
    const ctxSand = sandCanvas.getContext('2d');
    if (ctxSand) {
      const grad = ctxSand.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 180, 200, 1)');
      grad.addColorStop(0.5, 'rgba(255, 50, 90, 0.85)');
      grad.addColorStop(1, 'rgba(180, 20, 50, 0)');
      ctxSand.fillStyle = grad;
      ctxSand.fillRect(0, 0, 16, 16);
    }
    const sandTex = new THREE.CanvasTexture(sandCanvas);

    const sandMat = new THREE.PointsMaterial({
      size: 0.05,
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
      color: 0xff3366,
      transparent: true,
      opacity: 0.5,
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

      // Gentle Neon Breath Pulse
      roseGroup.rotation.z = Math.sin(elapsedTime * 0.45) * 0.03;
      roseGroup.position.y = 0.1 + Math.cos(elapsedTime * 0.35) * 0.02;

      // --- STAGE 01 (Neon Rose Emerges 0 to 22%) ---
      if (normProgress <= 0.25) {
        const stage1Alpha = Math.min(1, normProgress / 0.22);
        roseGroup.scale.setScalar(0.75 + stage1Alpha * 0.25);
        rosePlaneMat.opacity = stage1Alpha;
        fallingPetal.position.set(0.5, 1.6, 0.45);
        fallingPetal.rotation.set(0.4, 0.8, -0.5);
        fallingPetalMat.opacity = stage1Alpha;
        camera.position.set(0, 0, 6.5);
      }

      // --- STAGE 02 (Neon Petal Detaches & Flutters 20% to 48%) ---
      if (normProgress > 0.2 && normProgress <= 0.5) {
        const fallT = (normProgress - 0.2) / 0.3;
        fallingPetalMat.opacity = 1;
        fallingPetal.position.x = 0.5 - fallT * 0.35 + Math.sin(fallT * Math.PI * 2.5) * 0.22;
        fallingPetal.position.y = 1.6 - fallT * 3.2;
        fallingPetal.position.z = 0.45 + fallT * 0.4;
        fallingPetal.rotation.x = 0.4 + fallT * 2.8;
        fallingPetal.rotation.y = 0.8 + Math.sin(fallT * Math.PI) * 1.4;
        fallingPetal.rotation.z = -0.5 + fallT * 2.0;
      }

      // --- STAGE 03 (Petal Swirls & Camera Follows 45% to 70%) ---
      if (normProgress > 0.45 && normProgress <= 0.7) {
        const descendT = (normProgress - 0.45) / 0.25;
        fallingPetalMat.opacity = 1;
        fallingPetal.position.y = -1.6 - descendT * 0.85;
        fallingPetal.position.x = 0.2 + Math.sin(descendT * Math.PI * 3) * 0.25;
        fallingPetal.rotation.z += 0.025;

        // Camera Follow & Soft Background Blur
        camera.position.y = -descendT * 0.9;
        roseGroup.position.y = 0.1 + descendT * 0.5;
        rosePlaneMat.opacity = 1 - descendT * 0.5;
      }

      // --- STAGE 04 (NEON SAND DISINTEGRATION 65% to 90%) ---
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
        emberMat.opacity = Math.max(0, 0.5 - fadeT * 0.5);
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
      neonRoseTexture.dispose();
      neonPetalTex.dispose();
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
