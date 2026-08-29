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

    // --- 1. THREE.JS SCENE & PHOTOREALISTIC LIGHTING SETUP ---
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

    // --- 2. PHOTOREALISTIC CINEMATIC LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x28060c, 1.4);
    scene.add(ambientLight);

    // Key Warm White Light (highlights petal velvet texture)
    const keyLight = new THREE.SpotLight(0xffebd9, 9, 22, Math.PI / 3.5, 0.4, 1);
    keyLight.position.set(2.5, 5.5, 6);
    scene.add(keyLight);

    // Deep Crimson Rim Light (creates realistic backlighting)
    const crimsonRim = new THREE.PointLight(0xd91c32, 6, 18);
    crimsonRim.position.set(-4, 3.5, -2.5);
    scene.add(crimsonRim);

    // Soft Bottom Fill Light
    const bottomFill = new THREE.PointLight(0x730e1a, 4, 12);
    bottomFill.position.set(0, -4, 2);
    scene.add(bottomFill);

    // --- 3. PHOTOREALISTIC 3D ROSE MODEL & PETAL MESHES ---
    const roseGroup = new THREE.Group();
    roseGroup.position.set(0, 0.35, 0);
    scene.add(roseGroup);

    // Velvet Rose Petal Material (Organic Deep Crimson with Subsurface Glow)
    const velvetPetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xa81324,
      roughness: 0.45, // Soft velvet sheen
      metalness: 0.04,
      emissive: 0x3a060d,
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });

    // Procedural Organic Petal Geometry Generator with Natural Edge Curling
    const createOrganicPetalGeometry = (widthScale: number, heightScale: number, curvature: number) => {
      const geom = new THREE.PlaneGeometry(widthScale, heightScale, 20, 20);
      const posAttr = geom.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = geom.attributes.uv.getX(i);
        const v = geom.attributes.uv.getY(i);
        
        // Realistic 3D petal bowl curvature + organic edge lip flare
        const bowlZ = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * curvature;
        const edgeCurl = Math.sin(u * Math.PI * 2) * (v * 0.12);
        const tipFlare = Math.sin(v * Math.PI) * 0.08;
        
        posAttr.setZ(i, bowlZ + edgeCurl + tipFlare);
      }
      geom.computeVertexNormals();
      return geom;
    };

    // 7 Concentric Layers of Organic Blooming Petals (~55 petals total)
    const layers = [
      { count: 3, radius: 0.08, size: 0.4, curve: 0.3, rotX: 0.15 },
      { count: 5, radius: 0.22, size: 0.65, curve: 0.4, rotX: 0.35 },
      { count: 7, radius: 0.42, size: 0.9, curve: 0.5, rotX: 0.55 },
      { count: 9, radius: 0.65, size: 1.15, curve: 0.6, rotX: 0.75 },
      { count: 11, radius: 0.9, size: 1.4, curve: 0.7, rotX: 0.95 },
      { count: 13, radius: 1.15, size: 1.6, curve: 0.8, rotX: 1.15 },
      { count: 15, radius: 1.35, size: 1.8, curve: 0.85, rotX: 1.3 },
    ];

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2 + (layer.radius * 0.4);
        const geom = createOrganicPetalGeometry(layer.size, layer.size * 1.25, layer.curve);
        const petalMesh = new THREE.Mesh(geom, velvetPetalMaterial);

        // Natural organic tilt & position offset
        const jitter = Math.sin(i * 1.7) * 0.05;
        petalMesh.position.set(
          Math.cos(angle) * layer.radius * 0.48 + jitter,
          Math.sin(angle) * layer.radius * 0.28 + (layer.radius * 0.18),
          Math.sin(angle) * layer.radius * 0.48
        );

        petalMesh.rotation.z = angle + Math.PI / 2 + jitter;
        petalMesh.rotation.x = layer.rotX + jitter;
        petalMesh.rotation.y = angle + jitter;

        roseGroup.add(petalMesh);
      }
    });

    // Realistic Green Sepal Leaves at Flower Base
    const sepalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c331a,
      roughness: 0.6,
      emissive: 0x0a1409,
    });
    for (let i = 0; i < 5; i++) {
      const sepalAngle = (i / 5) * Math.PI * 2;
      const sepalGeom = createOrganicPetalGeometry(0.35, 0.9, 0.2);
      const sepalMesh = new THREE.Mesh(sepalGeom, sepalMaterial);
      sepalMesh.position.set(Math.cos(sepalAngle) * 0.25, -0.3, Math.sin(sepalAngle) * 0.25);
      sepalMesh.rotation.set(1.4, sepalAngle, 0);
      roseGroup.add(sepalMesh);
    }

    // Realistic Curving Stem
    const stemGeom = new THREE.CylinderGeometry(0.05, 0.07, 4.0, 14);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x142413,
      roughness: 0.65,
    });
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    stemMesh.position.set(0, -2.0, -0.2);
    stemMesh.rotation.z = -0.05;
    roseGroup.add(stemMesh);

    // --- 4. PHOTOREALISTIC FALLING PETAL ---
    const fallingPetalGeom = createOrganicPetalGeometry(1.0, 1.3, 0.45);
    const fallingPetalMat = new THREE.MeshStandardMaterial({
      color: 0xb51627,
      roughness: 0.4,
      metalness: 0.04,
      emissive: 0x4a0810,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
      transparent: true,
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
    const ctx = sandCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 140, 160, 1)');
      grad.addColorStop(0.5, 'rgba(217, 28, 50, 0.8)');
      grad.addColorStop(1, 'rgba(120, 12, 24, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
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
      roseGroup.rotation.y = Math.sin(elapsedTime * 0.45) * 0.07;
      roseGroup.rotation.x = Math.cos(elapsedTime * 0.35) * 0.04;

      // --- STAGE 01 (Rose Emerges 0 to 22%) ---
      if (normProgress <= 0.25) {
        const stage1Alpha = Math.min(1, normProgress / 0.22);
        roseGroup.scale.setScalar(0.75 + stage1Alpha * 0.25);
        velvetPetalMaterial.opacity = stage1Alpha;
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
        velvetPetalMaterial.opacity = 1 - descendT * 0.5;
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
        velvetPetalMaterial.opacity = Math.max(0, 0.5 - fadeT * 0.5);
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
      velvetPetalMaterial.dispose();
      sepalMaterial.dispose();
      stemMat.dispose();
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
