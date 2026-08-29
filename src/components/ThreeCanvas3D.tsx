import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect mobile or low performance preference
    const isMobile = window.innerWidth < 768;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    // Set pixel ratio cap to 1 for high GPU performance
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Optimized Particle Count
    const particleCount = isMobile ? 60 : 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCrimson = new THREE.Color(0x8F3028);
    const colorRose = new THREE.Color(0xc8434e);
    const colorCream = new THREE.Color(0xf7e9e1);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const rand = Math.random();
      const mixColor = rand > 0.6 ? colorCrimson : rand > 0.3 ? colorRose : colorCream;
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particlePoints = new THREE.Points(geometry, particleMaterial);
    scene.add(particlePoints);

    // 3. Optimized Lightweight Wireframe Torus Objects
    const rings: { mesh: THREE.Mesh; rotX: number; rotY: number }[] = [];
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8F3028,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const ringCount = isMobile ? 2 : 4;
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.TorusGeometry(1 + Math.random() * 0.5, 0.2, 8, 20);
      const ringMesh = new THREE.Mesh(ringGeo, ringMaterial);
      ringMesh.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20
      );
      scene.add(ringMesh);
      rings.push({
        mesh: ringMesh,
        rotX: (Math.random() - 0.5) * 0.008,
        rotY: (Math.random() - 0.5) * 0.008,
      });
    }

    // 4. Throttled Mouse & Scroll Physics
    let targetMouseX = 0;
    let targetMouseY = 0;
    let targetScrollY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let currentScrollY = 0;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          targetMouseX = (e.clientX - window.innerWidth / 2) * 0.0004;
          targetMouseY = (e.clientY - window.innerHeight / 2) * 0.0004;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY * 0.003;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Skip render if tab is hidden
      if (document.hidden) return;

      // Smooth lerp values
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      currentScrollY += (targetScrollY - currentScrollY) * 0.05;

      // Rotate particle field
      particlePoints.rotation.y = currentMouseX;
      particlePoints.rotation.x = currentMouseY;

      // Camera offset
      camera.position.y = -currentScrollY * 0.5;

      // Rotate torus rings
      rings.forEach((r) => {
        r.mesh.rotation.x += r.rotX;
        r.mesh.rotation.y += r.rotY;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      particleMaterial.dispose();
      ringMaterial.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 will-change-transform"
    />
  );
}
