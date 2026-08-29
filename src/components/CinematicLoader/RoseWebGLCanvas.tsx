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

    // --- 1. THREE.JS SCENE SETUP ---
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020202);
    scene.fog = new THREE.FogExp2(0x020202, 0.15);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- 2. LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(0x22080c, 1.2);
    scene.add(ambientLight);

    const mainSpotLight = new THREE.SpotLight(0xc83d4a, 8, 20, Math.PI / 4, 0.5, 1);
    mainSpotLight.position.set(2, 4, 5);
    scene.add(mainSpotLight);

    const rimLight = new THREE.PointLight(0xff4d61, 4, 15);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const softFillLight = new THREE.PointLight(0x8b1e27, 3, 10);
    softFillLight.position.set(0, -3, 3);
    scene.add(softFillLight);

    // --- 3. 3D ROSE MODEL GENERATION (PARAMETRIC PETAL LAYERS) ---
    const roseGroup = new THREE.Group();
    roseGroup.position.set(0, 0.4, 0);
    scene.add(roseGroup);

    // Rose Petal Material (Deep Crimson Velvet)
    const petalMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b1b28,
      roughness: 0.3,
      metalness: 0.1,
      emissive: 0x3d080e,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
    });

    // Generate Petal Geometry Function
    const createPetalGeometry = (widthScale: number, heightScale: number, curvature: number) => {
      const geom = new THREE.PlaneGeometry(widthScale, heightScale, 16, 16);
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

    // Build Concentric Layers of Rose Petals
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
        const petalMesh = new THREE.Mesh(geom, petalMaterial);

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

    // Stem Geometry
    const stemGeom = new THREE.CylinderGeometry(0.06, 0.08, 3.5, 12);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x1a0508, roughness: 0.7 });
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    stemMesh.position.set(0, -1.8, -0.2);
    stemMesh.rotation.z = -0.05;
    roseGroup.add(stemMesh);

    // --- 4. DETACHING & FALLING SINGLE PETAL ---
    const fallingPetalGeom = createPetalGeometry(0.9, 1.2, 0.4);
    const fallingPetalMat = new THREE.MeshStandardMaterial({
      color: 0xc83d4a,
      roughness: 0.25,
      metalness: 0.15,
      emissive: 0x5a0d14,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });
    const fallingPetal = new THREE.Mesh(fallingPetalGeom, fallingPetalMat);
    fallingPetal.position.set(0.6, 0.1, 0.4);
    fallingPetal.rotation.set(0.4, 0.8, -0.5);
    scene.add(fallingPetal);

    // --- 5. GPU DISINTEGRATION PARTICLE CLIMAX SYSTEM ---
    const particleCount = 2200;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleAlphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 0.4;
      particlePositions[i * 3 + 1] = -1.2 + (Math.random() - 0.5) * 0.4;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.025;
      particleVelocities[i * 3 + 1] = Math.random() * 0.035 + 0.01;
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.025;

      particleSizes[i] = Math.random() * 0.08 + 0.02;
      particleAlphas[i] = 0;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Material Texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 120, 140, 1)');
      grad.addColorStop(0.4, 'rgba(200, 61, 74, 0.8)');
      grad.addColorStop(1, 'rgba(139, 30, 39, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTex = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0,
    });

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // --- 6. ATMOSPHERIC BACKGROUND EMBERS ---
    const emberCount = 350;
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
      color: 0xc83d4a,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const emberSystem = new THREE.Points(emberGeom, emberMat);
    scene.add(emberSystem);

    // --- 7. ANIMATION & STAGE PROGRESS CONTROL LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle Rose Breath Sway
      roseGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.08;
      roseGroup.rotation.x = Math.cos(elapsedTime * 0.4) * 0.05;

      // Stage Progress Driven Animations (progress 0 to 100)
      const normProgress = Math.max(0, Math.min(100, progress)) / 100;

      // --- STAGE 01 (Rose Emerges 0 to 20%) ---
      if (normProgress <= 0.25) {
        const stage1Alpha = normProgress / 0.25;
        roseGroup.scale.setScalar(0.7 + stage1Alpha * 0.3);
        petalMaterial.opacity = stage1Alpha;
        fallingPetal.position.set(0.6, 0.1, 0.4);
        fallingPetal.rotation.set(0.4, 0.8, -0.5);
        fallingPetalMat.opacity = stage1Alpha;
        camera.position.set(0, 0, 8);
      }

      // --- STAGE 02 (Petal Falls 20% to 45%) ---
      if (normProgress > 0.2 && normProgress <= 0.5) {
        const fallT = (normProgress - 0.2) / 0.3;
        fallingPetal.position.x = 0.6 - fallT * 0.3 + Math.sin(fallT * Math.PI * 2) * 0.15;
        fallingPetal.position.y = 0.1 - fallT * 1.5;
        fallingPetal.position.z = 0.4 + fallT * 0.4;
        fallingPetal.rotation.x = 0.4 + fallT * 2.5;
        fallingPetal.rotation.y = 0.8 + Math.sin(fallT * Math.PI) * 1.2;
        fallingPetal.rotation.z = -0.5 + fallT * 1.8;
      }

      // --- STAGE 03 (Petal Descends & Camera Pans 45% to 70%) ---
      if (normProgress > 0.45 && normProgress <= 0.7) {
        const descendT = (normProgress - 0.45) / 0.25;
        fallingPetal.position.y = -1.4 - descendT * 0.6;
        fallingPetal.position.x = 0.3 + Math.sin(descendT * Math.PI * 3) * 0.2;
        fallingPetal.rotation.z += 0.02;

        // Camera Follow & Rose Blur/Fade
        camera.position.y = -descendT * 0.8;
        roseGroup.position.y = 0.4 + descendT * 0.5;
        petalMaterial.opacity = 1 - descendT * 0.5;
      }

      // --- STAGE 04 (Petal Disintegrates 70% to 90%) ---
      if (normProgress > 0.65) {
        const disT = (normProgress - 0.65) / 0.25;
        // Fade original falling petal as it turns to particles
        fallingPetalMat.opacity = Math.max(0, 1 - disT * 1.5);
        particleMat.opacity = Math.min(1, disT * 1.4);

        // Animate particles expanding upward and outward with turbulence
        const positions = particleGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += particleVelocities[i * 3] * (1 + disT * 1.5);
          positions[i * 3 + 1] += particleVelocities[i * 3 + 1] * (1 + disT * 2.0);
          positions[i * 3 + 2] += particleVelocities[i * 3 + 2] * (1 + disT * 1.5);
        }
        particleGeom.attributes.position.needsUpdate = true;
      }

      // --- STAGE 05 (Magic Fades 90% to 100%) ---
      if (normProgress > 0.88) {
        const fadeT = (normProgress - 0.88) / 0.12;
        particleMat.opacity = Math.max(0, 1 - fadeT * 1.2);
        emberMat.opacity = Math.max(0, 0.4 - fadeT * 0.4);
        petalMaterial.opacity = Math.max(0, 0.5 - fadeT * 0.5);
      }

      // Slow drift of background embers
      const emberPositions = emberGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        emberPositions[i * 3 + 1] += 0.003;
        if (emberPositions[i * 3 + 1] > 6) emberPositions[i * 3 + 1] = -6;
      }
      emberGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- 8. RESIZE & CLEANUP ---
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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      petalMaterial.dispose();
      fallingPetalMat.dispose();
      particleMat.dispose();
      emberMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [progress, stage]);

  return <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full" />;
}
