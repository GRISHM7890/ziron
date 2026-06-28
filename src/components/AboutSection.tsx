import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);

    // 1. Text scroll animations
    useEffect(() => {
        const words = headingRef.current?.querySelectorAll('.word-inner');
        const paragraphs = bodyRef.current?.querySelectorAll('.about-body-p');

        if (words) {
            gsap.fromTo(words, 
                { y: '100%', opacity: 0 },
                {
                    y: '0%',
                    opacity: 1,
                    duration: 1,
                    stagger: 0.08,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                        end: 'bottom 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        if (paragraphs) {
            gsap.fromTo(paragraphs,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: bodyRef.current,
                        start: 'top 85%',
                        end: 'bottom 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        // Clean up ScrollTriggers
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // 2. Three.js Architectural Illustration Wireframe
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        let width = parent.clientWidth || 500;
        let height = parent.clientHeight || 500;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 4, 16);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const archGroup = new THREE.Group();
        scene.add(archGroup);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(ambientLight);

        const blueprintBlueLight = new THREE.PointLight(0x00d2ff, 2.5, 30);
        blueprintBlueLight.position.set(5, 5, 5);
        scene.add(blueprintBlueLight);

        const violetLight = new THREE.PointLight(0x7928ca, 2.0, 30);
        violetLight.position.set(-5, -5, 5);
        scene.add(violetLight);

        // Architectural Skyscraper Elements Stack
        const levels = 8;
        const spacing = 1.35;
        const geometries: THREE.BoxGeometry[] = [];
        const lines: THREE.LineSegments[] = [];
        const pointsList: THREE.Points[] = [];

        const colorCyan = new THREE.Color(0x00d2ff);
        const colorIndigo = new THREE.Color(0x4f46e5);

        for (let i = 0; i < levels; i++) {
            // Taper sizes upwards
            const w = 4 - i * 0.35;
            const h = 0.9;
            const d = 4 - i * 0.35;

            const boxGeom = new THREE.BoxGeometry(w, h, d);
            geometries.push(boxGeom);

            const edges = new THREE.EdgesGeometry(boxGeom);
            const isTop = i > 5;
            const lineMat = new THREE.LineBasicMaterial({
                color: isTop ? colorCyan : colorIndigo,
                transparent: true,
                opacity: 0.3 + (i * 0.05),
                blending: THREE.AdditiveBlending,
                linewidth: 1.5
            });

            const lineSegs = new THREE.LineSegments(edges, lineMat);
            lineSegs.position.y = (i - levels / 2) * spacing;
            archGroup.add(lineSegs);
            lines.push(lineSegs);

            // Add node markers at vertices
            const vertPositions = boxGeom.getAttribute('position');
            const ptGeom = new THREE.BufferGeometry();
            ptGeom.setAttribute('position', vertPositions);

            const ptMat = new THREE.PointsMaterial({
                color: isTop ? 0xffffff : 0x00d2ff,
                size: 0.16,
                transparent: true,
                opacity: 0.75,
                blending: THREE.AdditiveBlending
            });

            const pts = new THREE.Points(ptGeom, ptMat);
            pts.position.y = lineSegs.position.y;
            archGroup.add(pts);
            pointsList.push(pts);

            // X-bracing struts for technical blueprint feel
            if (i < levels - 1) {
                const braceGeom = new THREE.BufferGeometry();
                const braceVertices = new Float32Array([
                    -w/2, -h/2, -d/2,  w/2, h/2, d/2,
                     w/2, -h/2, -d/2, -w/2, h/2, d/2,
                    -w/2, -h/2,  d/2,  w/2, h/2, -d/2,
                     w/2, -h/2,  d/2, -w/2, h/2, -d/2
                ]);
                braceGeom.setAttribute('position', new THREE.BufferAttribute(braceVertices, 3));
                const braceMat = new THREE.LineBasicMaterial({
                    color: 0x515154,
                    transparent: true,
                    opacity: 0.15,
                    blending: THREE.AdditiveBlending
                });
                const braces = new THREE.LineSegments(braceGeom, braceMat);
                braces.position.y = lineSegs.position.y;
                archGroup.add(braces);
            }
        }

        // Add blueprint axis base plate circles
        const baseGeom = new THREE.RingGeometry(2.5, 3.2, 32);
        const baseEdges = new THREE.EdgesGeometry(baseGeom);
        const baseMat = new THREE.LineBasicMaterial({
            color: 0x00d2ff,
            transparent: true,
            opacity: 0.2
        });
        const baseRing = new THREE.LineSegments(baseEdges, baseMat);
        baseRing.rotation.x = Math.PI / 2;
        baseRing.position.y = -levels/2 * spacing - 0.2;
        archGroup.add(baseRing);

        // Interaction
        let scrollYTarget = 0;
        let scrollYCurrent = 0;

        const handleScroll = () => {
            // Measure scroll ratio
            const rect = parent.getBoundingClientRect();
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            scrollYTarget = Math.max(0, Math.min(1, progress)) * Math.PI * 1.5;
        };

        window.addEventListener('scroll', handleScroll);

        const handleResize = () => {
            const w = parent.clientWidth || 500;
            const h = parent.clientHeight || 500;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        };

        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animationId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animationId = requestAnimationFrame(animate);

            const time = clock.getElapsedTime();

            // Rotate components
            archGroup.rotation.y = time * 0.08 + scrollYCurrent;
            
            // Pulse nodes and wireframe lines
            lines.forEach((line, idx) => {
                const mat = line.material as THREE.LineBasicMaterial;
                mat.opacity = 0.25 + Math.sin(time * 2 + idx) * 0.15;
            });

            pointsList.forEach((pts, idx) => {
                const mat = pts.material as THREE.PointsMaterial;
                mat.size = 0.14 + Math.sin(time * 4 + idx) * 0.04;
            });

            // Smooth scroll interpolation
            scrollYCurrent += (scrollYTarget - scrollYCurrent) * 0.06;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);

            // Clean up Geometries, Materials, and Objects
            geometries.forEach(g => g.dispose());
            lines.forEach(l => {
                (l.material as THREE.Material).dispose();
                archGroup.remove(l);
            });
            pointsList.forEach(p => {
                (p.material as THREE.Material).dispose();
                archGroup.remove(p);
            });

            baseGeom.dispose();
            baseEdges.dispose();
            baseMat.dispose();
            archGroup.remove(baseRing);

            scene.remove(archGroup);
            renderer.dispose();
        };
    }, []);

    // Split text strings by space to apply reveal animations
    const headingText = "Engineering the Future of India.";
    const wordsList = headingText.split(' ');

    return (
        <section ref={containerRef} className="about-section">
            {/* Blueprint Grid Background */}
            <div className="blueprint-background" />

            {/* Content Split Grid Container */}
            <div className="about-container">
                {/* Left Side: Staggered Text */}
                <div className="about-text-column">
                    <div className="about-badge">
                        <span className="about-badge-line" />
                        <span className="about-badge-text">Vision & Authority</span>
                    </div>

                    <h2 ref={headingRef} className="about-heading">
                        {wordsList.map((word, i) => (
                            <span key={i} className="word-wrapper">
                                <span className="word-inner">{word}</span>
                            </span>
                        ))}
                    </h2>

                    <div ref={bodyRef} className="about-body">
                        <p className="about-body-p text-highlight">
                            ZIRON is a technology holding company building intelligent systems that redefine education, healthcare, governance, enterprise software and digital infrastructure.
                        </p>
                        <p className="about-body-p text-sub">
                            Instead of chasing trends, we build ecosystems.
                        </p>
                    </div>
                </div>

                {/* Right Side: Futuristic 3D Skyscraper Wireframe */}
                <div className="about-visual-column">
                    <div className="arch-canvas-wrapper">
                        <canvas ref={canvasRef} id="architectural-wireframe" />
                        {/* Blueprint decorative marks */}
                        <div className="blueprint-tick top-left">+ X: 89.1</div>
                        <div className="blueprint-tick top-right">+ Y: 43.2</div>
                        <div className="blueprint-tick bottom-left">+ Z: 02.4</div>
                        <div className="blueprint-tick bottom-right">SCALE 1:50</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
