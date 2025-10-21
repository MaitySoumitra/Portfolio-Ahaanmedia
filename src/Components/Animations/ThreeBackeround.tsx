import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const PortfolioGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const current = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      current.clientWidth / current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(current.clientWidth, current.clientHeight);
    renderer.setClearColor("#ffffff"); // white background
    current.appendChild(renderer.domElement);

    // Create sphere (globe)
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, // Tailwind blue-500
      roughness: 0.7,
      metalness: 0.1,
      wireframe: false,
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);

    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Add directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Pins data (latitude, longitude, label)
    const pinsData = [
      { lat: 37.7749, lon: -122.4194, label: "Project A" }, // San Francisco
      { lat: 51.5074, lon: -0.1278, label: "Project B" },   // London
      { lat: 35.6895, lon: 139.6917, label: "Project C" },  // Tokyo
      { lat: -33.8688, lon: 151.2093, label: "Project D" }, // Sydney
    ];

    // Convert lat/lon to 3D position on sphere surface
    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      return new THREE.Vector3(x, y, z);
    };

    // Create pins (small spheres)
    pinsData.forEach(({ lat, lon }) => {
      const pinGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const pinMaterial = new THREE.MeshStandardMaterial({
        color: 0xfbbf24, // Tailwind yellow-400
        emissive: 0xfbbf24,
        emissiveIntensity: 0.7,
      });
      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      const pos = latLonToVector3(lat, lon, 1.5);
      pin.position.copy(pos);
      scene.add(pin);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      globe.rotation.y += 0.002; // slow rotation
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] max-w-lg mx-auto mt-10 rounded-lg shadow-lg bg-white"
    />
  );
};

export default PortfolioGlobe;
