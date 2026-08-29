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
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- 2. CINEMATIC PHOTOREALISTIC LIGHTING RIG ---
    const ambientLight = new THREE.AmbientLight(0x28060c, 1.6);
    scene.add(ambientLight);

    // Key Spot Light (Highlights Petal Velvet Sheen)
    const keySpotLight = new THREE.SpotLight(0xffeedd, 10, 25, Math.PI / 3, 0.4, 1);
    keySpotLight.position.set(3, 6, 6);
    scene.add(keySpotLight);

    // Deep Crimson Rim Light (Creates Rich Backlighting)
    const crimsonRim = new THREE.PointLight(0xff2a4b, 8, 20);
    crimsonRim.position.set(-4.5, 3.5, -2.5);
    scene.add(crimsonRim);

    // Fill Light
    const fillLight = new THREE.PointLight(0x730e1a, 4, 12);
    fillLight.position.set(0, -4, 3);
    scene.add(fillLight);

    // --- 3. PURE 3D PARAMETRIC FIBONACCI ROSE ENGINE FROM SCRATCH ---
    const roseGroup = new THREE.Group();
    roseGroup.position.set(0, 0.35, 0);
    scene.add(roseGroup);

    // Velvet Physical Material with Sheen Subsurface Glow
    const velvetPhysicalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xaa1224,
      roughness: 0.35,
      metalness: 0.05,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xff4d66),
      emissive: 0x3d050a,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });

    // Parametric 3D Petal Geometry Generator with Natural Bowl & Edge Lip
    const create3DPetalGeometry = (widthScale: number, heightScale: number, curvature: number, lipCurl: number) => {
      const geom = new THREE.PlaneGeometry(widthScale, heightScale, 24, 24);
      const pos = geom.attributes.position;
      
      for (let i = 0; i < pos.count; i++) {
        const u = geom.attributes.uv.getX(i); // 0 to 1
        const v = geom.attributes.uv.getY(i); // 0 to 1

        // Parametric 3D Bowl Depth + Lip Outward Curl + Edge Waves
        const bowlZ = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * curvature;
        const edgeLip = Math.sin(v * Math.PI) * Math.cos((u - 0.5) * Math.PI * 2) * lipCurl;
        const naturalWave = Math.sin(u * Math.PI * 3) * 0.04 * v;

        pos.setZ(i, bowlZ + edgeLip + naturalWave);
      }
      geom.computeVertexNormals();
      return geom;
    };

    // Construct 60+ Individual 3D Petals in 8 Fibonacci Spiral Layers
    const goldenAngle = 137.5 * (Math.PI / 180);
    const totalPetals = 65;

    for (let i = 0; i < totalPetals; i++) {
      const normIndex = i / totalPetals;
      const angle = i * goldenAngle;
      const radius = 0.05 + Math.pow(normIndex, 0.75) * 1.35;

      // Petal sizing and curvature scaling from inner bud to outer bloom
      const petalWidth = 0.35 + normIndex * 1.3;
      const petalHeight = 0.45 + normIndex * 1.5;
      const curvature = 0.3 + normIndex * 0.55;
      const lipCurl = normIndex * 0.22;

      const petalGeom = create3DPetalGeometry(petalWidth, petalHeight, curvature, lipCurl);
      const petalMesh = new THREE.Mesh(petalGeom, velvetPhysicalMaterial);

      // 3D Spatial positioning along spiral
      const x = Math.cos(angle) * radius * 0.5;
      const y = Math.sin(angle) * radius * 0.3 + (radius * 0.15);
      const z = Math.sin(angle) * radius * 0.5;

      petalMesh.position.set(x, y, z);

      // Natural 3D blooming tilt angles
      const tiltOutward = Math.min(1.35, 0.1 + normIndex * 1.25);
      petalMesh.rotation.z = angle + Math.PI / 2;
      petalMesh.rotation.x = tiltOutward;
      petalMesh.rotation.y = angle;

      roseGroup.add(petalMesh);
    }

    // Sepal Leaves Base (Green 3D Sepal Petals)
    const sepalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d361b,
      roughness: 0.6,
      emissive: 0x0a1409,
    });
    for (let i = 0; i < 5; i++) {
      const sAngle = (i / 5) * Math.PI * 2;
      const sepalGeom = create3DPetalGeometry(0.35, 0.95, 0.2, 0.05);
      const sepalMesh = new THREE.Mesh(sepalGeom, sepalMaterial);
      sepalMesh.position.set(Math.cos(sAngle) * 0.28, -0.3, Math.sin(sAngle) * 0.28);
      sepalMesh.rotation.set(1.4, sAngle, 0);
      roseGroup.add(sepalMesh);
    }

    // Realistic Curved 3D Stem
    const stemGeom = new THREE.CylinderGeometry(0.05, 0.07, 4.0, 16);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x142613,
      roughness: 0.65,
    });
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    stemMesh.position.set(0, -2.0, -0.2);
    stemMesh.rotation.z = -0.04;
    roseGroup.add(stemMesh);

    // --- 4. PURE 3D DETACHING & FALLING PETAL ---
    const fallingPetalGeom = create3DPetalGeometry(1.05, 1.35, 0.48, 0.18);
    const fallingPetalMat = new THREE.MeshPhysicalMaterial({
      color: 0xba1426,
      roughness: 0.35,
      metalness: 0.05,
      clearcoat: 0.3,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xff4d66),
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
    const sandCount = 4000;
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

    // Sand Micro Texture
    const sandCanvas = document.createElement('canvas');
    sandCanvas.width = 16;
    sandCanvas.height = 16;
    const ctxSand = sandCanvas.getContext('2d');
    if (ctxSand) {
      const grad = ctxSand.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 180, 200, 1)');
      grad.addColorStop(0.5, 'rgba(255, 42, 75, 0.85)');
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
      color: 0xff2a4b,
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

      // Organic 3D Rose Breath Sway
      roseGroup.rotation.y = Math.sin(elapsedTime * 0.45) * 0.07;
      roseGroup.rotation.x = Math.cos(elapsedTime * 0.35) * 0.04;

      // --- STAGE 01 (3D Rose Emerges 0 to 22%) ---
      if (normProgress <= 0.25) {
        const stage1Alpha = Math.min(1, normProgress / 0.22);
        roseGroup.scale.setScalar(0.75 + stage1Alpha * 0.25);
        velvetPhysicalMaterial.opacity = stage1Alpha;
        fallingPetal.position.set(0.65, 0.05, 0.45);
        fallingPetal.rotation.set(0.4, 0.8, -0.5);
        fallingPetalMat.opacity = stage1Alpha;
        camera.position.set(0, 0, 8.5);
      }

      // --- STAGE 02 (3D Petal Detaches & Flutters 20% to 48%) ---
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

      // --- STAGE 03 (3D Petal Swirls & Camera Follows 45% to 70%) ---
      if (normProgress > 0.45 && normProgress <= 0.7) {
        const descendT = (normProgress - 0.45) / 0.25;
        fallingPetalMat.opacity = 1;
        fallingPetal.position.y = -1.45 - descendT * 0.65;
        fallingPetal.position.x = 0.35 + Math.sin(descendT * Math.PI * 3) * 0.22;
        fallingPetal.rotation.z += 0.025;

        // Camera Follow & Soft Background Blur
        camera.position.y = -descendT * 0.85;
        roseGroup.position.y = 0.35 + descendT * 0.5;
        velvetPhysicalMaterial.opacity = 1 - descendT * 0.5;
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
        emberMat.opacity = Math.max(0, 0.5 - fadeT * 0.5);
        velvetPhysicalMaterial.opacity = Math.max(0, 0.5 - fadeT * 0.5);
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
      velvetPhysicalMaterial.dispose();
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
