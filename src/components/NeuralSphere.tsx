import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const NeuralSphere = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        // Dimensions
        const width = parent.clientWidth || 500;
        const height = parent.clientHeight || 500;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 24;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Group to hold particles & lines
        const sphereGroup = new THREE.Group();
        scene.add(sphereGroup);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
        scene.add(ambientLight);

        const cyanLight = new THREE.PointLight(0x00d2ff, 1.5, 30);
        cyanLight.position.set(10, 10, 10);
        scene.add(cyanLight);

        const purpleLight = new THREE.PointLight(0x7928ca, 2.5, 30);
        purpleLight.position.set(-10, -10, 10);
        scene.add(purpleLight);

        // Nodes configuration
        const nodeCount = 90;
        const radius = 7.5;
        const nodes: Array<{
            mesh: THREE.Mesh;
            basePos: THREE.Vector3;
            normal: THREE.Vector3;
            offset: number;
            speed: number;
            material: THREE.MeshStandardMaterial;
        }> = [];

        const nodeGeom = new THREE.SphereGeometry(0.12, 12, 12);
        const colorCyan = new THREE.Color(0x00d2ff);
        const colorIndigo = new THREE.Color(0x581c87);
        const colorWhite = new THREE.Color(0xffffff);

        for (let i = 0; i < nodeCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / nodeCount);
            const theta = Math.sqrt(nodeCount * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            const isCyan = i % 3 === 0;
            const isIndigo = i % 3 === 1;
            const emissiveColor = isCyan ? colorCyan : (isIndigo ? colorIndigo : colorWhite);

            const nodeMat = new THREE.MeshStandardMaterial({
                color: emissiveColor,
                emissive: emissiveColor,
                emissiveIntensity: 1.2,
                roughness: 0.1,
                metalness: 0.9
            });

            const mesh = new THREE.Mesh(nodeGeom, nodeMat);
            mesh.position.set(x, y, z);

            nodes.push({
                mesh: mesh,
                basePos: new THREE.Vector3(x, y, z),
                normal: new THREE.Vector3(x, y, z).clone().normalize(),
                offset: Math.random() * Math.PI * 2,
                speed: 0.0015 + Math.random() * 0.002,
                material: nodeMat
            });

            sphereGroup.add(mesh);
        }

        // Lines connection Buffer Setup
        const maxConnections = 240;
        const lineGeom = new THREE.BufferGeometry();
        const linePositions = new Float32Array(maxConnections * 2 * 3);
        const lineColors = new Float32Array(maxConnections * 2 * 3);

        lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeom.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        const lineMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });

        const connectionLines = new THREE.LineSegments(lineGeom, lineMat);
        sphereGroup.add(connectionLines);

        // Interaction coordinates
        let mouseX = 0;
        let mouseY = 0;
        let targetRotX = 0;
        let targetRotY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const normX = (e.clientX / window.innerWidth) * 2 - 1;
            const normY = -(e.clientY / window.innerHeight) * 2 + 1;
            targetRotY = normX * 0.5;
            targetRotX = normY * 0.3;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            const w = parent.clientWidth || 500;
            const h = parent.clientHeight || 500;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        };

        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animationFrameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const time = clock.getElapsedTime();

            // Pulse Nodes
            nodes.forEach(node => {
                const pulseAmount = Math.sin(time * 1.5 + node.offset) * 0.35;
                node.mesh.position.copy(node.basePos).addScaledVector(node.normal, pulseAmount);
                node.material.emissiveIntensity = 0.8 + Math.sin(time * 3 + node.offset) * 0.6;
            });

            // Re-calculate Interconnections
            let lineIdx = 0;
            const posAttrib = connectionLines.geometry.attributes.position as THREE.BufferAttribute;
            const colorAttrib = connectionLines.geometry.attributes.color as THREE.BufferAttribute;
            const maxDist = 4.2;

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    if (lineIdx >= maxConnections) break;

                    const posA = nodes[i].mesh.position;
                    const posB = nodes[j].mesh.position;
                    const dist = posA.distanceTo(posB);

                    if (dist < maxDist) {
                        posAttrib.setXYZ(lineIdx * 2, posA.x, posA.y, posA.z);
                        posAttrib.setXYZ(lineIdx * 2 + 1, posB.x, posB.y, posB.z);

                        const fade = 1 - (dist / maxDist);
                        const r = 0.1 * fade;
                        const g = 0.5 * fade;
                        const b = 0.9 * fade;

                        colorAttrib.setXYZ(lineIdx * 2, r, g, b);
                        colorAttrib.setXYZ(lineIdx * 2 + 1, r, g, b);

                        lineIdx++;
                    }
                }
            }

            // Zero out unused connections
            for (let k = lineIdx; k < maxConnections; k++) {
                posAttrib.setXYZ(k * 2, 0, 0, 0);
                posAttrib.setXYZ(k * 2 + 1, 0, 0, 0);
                colorAttrib.setXYZ(k * 2, 0, 0, 0);
                colorAttrib.setXYZ(k * 2 + 1, 0, 0, 0);
            }

            posAttrib.needsUpdate = true;
            colorAttrib.needsUpdate = true;

            // Smooth Interpolation
            mouseX += (targetRotY - mouseX) * 0.05;
            mouseY += (targetRotX - mouseY) * 0.05;

            sphereGroup.rotation.y = time * 0.08 + mouseX;
            sphereGroup.rotation.x = time * 0.04 - mouseY;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup resources
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            nodes.forEach(node => {
                node.material.dispose();
                sphereGroup.remove(node.mesh);
            });
            nodeGeom.dispose();

            lineGeom.dispose();
            lineMat.dispose();
            sphereGroup.remove(connectionLines);

            scene.remove(sphereGroup);
            renderer.dispose();
        };
    }, []);

    return (
        <div className="canvas-wrapper">
            <canvas ref={canvasRef} id="neural-sphere-canvas" />
            <div className="visual-glow-backdrop" />
        </div>
    );
};
