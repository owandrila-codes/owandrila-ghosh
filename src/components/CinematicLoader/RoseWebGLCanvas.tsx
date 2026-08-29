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

    // --- 1. THREE.JS SCENE & NEON LIGHTING SETUP ---
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
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // --- 2. BEAUTY & THE BEAST ENCHANTED NEON LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x3d0812, 1.5);
    scene.add(ambientLight);

    // Neon Crimson Main Spot
    const neonMainSpot = new THREE.SpotLight(0xff1b40, 12, 22, Math.PI / 3, 0.4, 1);
    neonMainSpot.position.set(2, 5, 6);
    scene.add(neonMainSpot);

    // Intense Ruby Rim Light
    const neonRim = new THREE.PointLight(0xff3355, 8, 18);
    neonRim.position.set(-4, 3, -2);
    scene.add(neonRim);

    // Bottom Glow Light
    const bottomGlow = new THREE.PointLight(0xc83d4a, 5, 12);
    bottomGlow.position.set(0, -4, 2);
    scene.add(bottomGlow);

    // --- 3. 3D ENCHANTED NEON ROSE MODEL ---
    const roseGroup = new THREE.Group();
    roseGroup.position.set(0, 0.3, 0);
    scene.add(roseGroup);

    // Glowing Neon Petal Material
    const neonPetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xff1b36,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0xd91432,
      emissiveIntensity: 1.2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });

    // Petal Geometry Generator with Curved Edges
    const createPetalGeometry = (widthScale: number, heightScale: number, curvature: number) => {
      const geom = new THREE.PlaneGeometry(widthScale, heightScale, 18, 18);
      const posAttr = geom.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = geom.attributes.uv.getX(i);
        const v = geom.attributes.uv.getY(i);
        const z = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * curvature;
        posAttr.setZ(i, z);
      }
      geom.computeVertexNormals();
      return geom;
    };

    // Concentric Petal Layers (Beauty & The Beast Rose Silhouette)
    const layers = [
      { count: 4, radius: 0.15, size: 0.5, curve: 0.35, rotX: 0.2 },
      { count: 6, radius: 0.35, size: 0.75, curve: 0.45, rotX: 0.4 },
      { count: 8, radius: 0.6, size: 1.0, curve: 0.55, rotX: 0.65 },
      { count: 10, radius: 0.85, size: 1.25, curve: 0.65, rotX: 0.85 },
      { count: 12, radius: 1.1, size: 1.5, curve: 0.75, rotX: 1.05 },
    ];

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2 + (layer.radius * 0.5);
        const geom = createPetalGeometry(layer.size, layer.size * 1.2, layer.curve);
        const petalMesh = new THREE.Mesh(geom, neonPetalMaterial);

        petalMesh.position.set(
          Math.cos(angle) * layer.radius * 0.5,
          Math.sin(angle) * layer.radius * 0.3 + (layer.radius * 0.2),
          Math.sin(angle) * layer.radius * 0.5
        );

        petalMesh.rotation.z = angle + Math.PI / 2;
        petalMesh.rotation.x = layer.rotX;
        petalMesh.rotation.y = angle;

        roseGroup.add(petalMesh);
      }
    });

    // Dark Stem & Leaves
    const stemGeom = new THREE.CylinderGeometry(0.05, 0.07, 3.8, 12);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x1a0408,
      roughness: 0.6,
      emissive: 0x4a0812,
      emissiveIntensity: 0.4,
    });
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    stemMesh.position.set(0, -1.9, -0.2);
    stemMesh.rotation.z = -0.04;
    roseGroup.add(stemMesh);

    // --- 4. BEAUTY & THE BEAST FALLING NEON PETAL ---
    const fallingPetalGeom = createPetalGeometry(0.95, 1.25, 0.45);
    const fallingPetalMat = new THREE.MeshStandardMaterial({
      color: 0xff2a4b,
      roughness: 0.15,
      metalness: 0.1,
      emissive: 0xff1b36,
      emissiveIntensity: 1.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const fallingPetal = new THREE.Mesh(fallingPetalGeom, fallingPetalMat);
    fallingPetal.position.set(0.65, 0.05, 0.45);
    fallingPetal.rotation.set(0.4, 0.8, -0.5);
    scene.add(fallingPetal);

    // --- 5. SAND DISINTEGRATION SYSTEM (BEAUTY & THE BEAST FINE SAND DUST) ---
    const sandCount = 3800;
    const sandGeom = new THREE.BufferGeometry();
    const sandPositions = new Float32Array(sandCount * 3);
    const sandVelocities = new Float32Array(sandCount * 3);

    for (let i = 0; i < sandCount; i++) {
      // Initialize sand particles in a petal shape contour
      const u = Math.random();
      const v = Math.random();
      sandPositions[i * 3] = (u - 0.5) * 0.7;
      sandPositions[i * 3 + 1] = -1.4 + (v - 0.5) * 0.8;
      sandPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

      // Fine sand wind velocity vectors (downward & rightward drift)
      sandVelocities[i * 3] = (Math.random() - 0.3) * 0.035;
      sandVelocities[i * 3 + 1] = -(Math.random() * 0.04 + 0.015); // Descend like sand
      sandVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    sandGeom.setAttribute('position', new THREE.BufferAttribute(sandPositions, 3));

    // Fine Sand Texture
    const sandCanvas = document.createElement('canvas');
    sandCanvas.width = 16;
    sandCanvas.height = 16;
    const ctx = sandCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 160, 180, 1)');
      grad.addColorStop(0.5, 'rgba(255, 42, 75, 0.8)');
      grad.addColorStop(1, 'rgba(180, 20, 40, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const sandTex = new THREE.CanvasTexture(sandCanvas);

    const sandMat = new THREE.PointsMaterial({
      size: 0.05, // Fine micro sand size
      map: sandTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0,
    });

    const sandSystem = new THREE.Points(sandGeom, sandMat);
    scene.add(sandSystem);

    // --- 6. ATMOSPHERIC ENCHANTED EMBERS ---
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
      size: 0.06,
      color: 0xff3355,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const emberSystem = new THREE.Points(emberGeom, emberMat);
    scene.add(emberSystem);

    // --- 7. ANIMATION & STAGE PROGRESS LOOP ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const currentProgress = progressRef.current;
      const normProgress = Math.max(0, Math.min(100, currentProgress)) / 100;

      // Gentle Rose Breath & Neon Pulse
      roseGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.08;
      roseGroup.rotation.x = Math.cos(elapsedTime * 0.4) * 0.05;
      neonPetalMaterial.emissiveIntensity = 1.2 + Math.sin(elapsedTime * 2.5) * 0.3;

      // --- STAGE 01 (Neon Rose Emerges 0 to 22%) ---
      if (normProgress <= 0.25) {
        const stage1Alpha = Math.min(1, normProgress / 0.22);
        roseGroup.scale.setScalar(0.7 + stage1Alpha * 0.3);
        neonPetalMaterial.opacity = stage1Alpha;
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

        // Camera Follow & Background Bokeh
        camera.position.y = -descendT * 0.85;
        roseGroup.position.y = 0.3 + descendT * 0.5;
        neonPetalMaterial.opacity = 1 - descendT * 0.5;
      }

      // --- STAGE 04 (BEAUTY & THE BEAST SAND DISINTEGRATION 65% to 90%) ---
      if (normProgress > 0.65) {
        const disT = (normProgress - 0.65) / 0.25;
        
        // Petal dissolves as sand particles break away
        fallingPetalMat.opacity = Math.max(0, 1 - disT * 1.6);
        sandMat.opacity = Math.min(1, disT * 1.5);

        // Animate fine sand particles blowing away like sand grains in wind
        const pos = sandGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < sandCount; i++) {
          pos[i * 3] += sandVelocities[i * 3] * (1 + disT * 1.2);
          pos[i * 3 + 1] += sandVelocities[i * 3 + 1] * (1 + disT * 1.5); // Downward sand fall
          pos[i * 3 + 2] += sandVelocities[i * 3 + 2] * (1 + disT * 1.2);
        }
        sandGeom.attributes.position.needsUpdate = true;
      }

      // --- STAGE 05 (Sand Fades Into Portfolio 88% to 100%) ---
      if (normProgress > 0.88) {
        const fadeT = (normProgress - 0.88) / 0.12;
        sandMat.opacity = Math.max(0, 1 - fadeT * 1.3);
        emberMat.opacity = Math.max(0, 0.5 - fadeT * 0.5);
        neonPetalMaterial.opacity = Math.max(0, 0.5 - fadeT * 0.5);
      }

      // Atmospheric Ember Motion
      const emberPosArr = emberGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        emberPosArr[i * 3 + 1] += 0.004;
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
      neonPetalMaterial.dispose();
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
