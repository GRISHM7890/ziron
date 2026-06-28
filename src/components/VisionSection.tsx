import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VisionSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const block1Ref = useRef<HTMLDivElement>(null);
    const block2Ref = useRef<HTMLDivElement>(null);

    // 1. Procedural Flow Field Particle Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Particle configuration
        const particles: Array<{
            x: number;
            y: number;
            speed: number;
            angle: number;
            radius: number;
            alpha: number;
            baseAlpha: number;
        }> = [];
        const particleCount = 200;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: Math.random() * 0.4 + 0.2,
                angle: Math.random() * Math.PI * 2,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.4 + 0.1,
                baseAlpha: Math.random() * 0.4 + 0.1
            });
        }

        let animId: number;
        let turbulence = 0.002;
        let speedMultiplier = 1;

        // Animate turbulence and speed on scroll progress
        const handleScrollFactor = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Calculate progress of pinning
            const scrollDistance = -rect.top;
            const totalScroll = rect.height - window.innerHeight;
            const progress = Math.max(0, Math.min(1, scrollDistance / totalScroll));

            // Increase speed and noise turbulence as user zooms through text
            speedMultiplier = 1 + progress * 5;
            turbulence = 0.002 + progress * 0.008;
        };

        window.addEventListener('scroll', handleScrollFactor);

        let clock = 0;

        const renderParticles = () => {
            ctx.fillStyle = 'rgba(3, 3, 3, 0.08)'; // Tail effect
            ctx.fillRect(0, 0, width, height);

            clock += 0.005;

            particles.forEach((p) => {
                // Vector field calculation based on sin/cos noise waves
                const angle = Math.sin(p.x * turbulence + clock) * Math.cos(p.y * turbulence + clock) * Math.PI * 2.5;
                p.x += Math.cos(angle) * p.speed * speedMultiplier;
                p.y += Math.sin(angle) * p.speed * speedMultiplier;

                // Fade particles near borders
                if (p.x < 50 || p.x > width - 50 || p.y < 50 || p.y > height - 50) {
                    p.alpha -= 0.01;
                } else {
                    p.alpha += (p.baseAlpha - p.alpha) * 0.1;
                }

                if (p.alpha <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
                    // Respawn particle
                    p.x = Math.random() * (width - 100) + 50;
                    p.y = Math.random() * (height - 100) + 50;
                    p.alpha = 0;
                }

                ctx.fillStyle = `rgba(0, 210, 255, ${p.alpha * 0.55})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animId = requestAnimationFrame(renderParticles);
        };

        renderParticles();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScrollFactor);
        };
    }, []);

    // 2. ScrollTrigger Pinning and Zooming
    useEffect(() => {
        const words1 = block1Ref.current?.querySelectorAll('.vision-word');
        const words2 = block2Ref.current?.querySelectorAll('.vision-word');

        if (!words1 || !words2) return;

        // Pinning Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=200%', // Pin for twice the viewport height
                scrub: 1.2,
                pin: true,
                anticipatePin: 1
            }
        });

        // Initial settings
        gsap.set(block2Ref.current, { scale: 0.7, opacity: 0 });

        tl
        // Phase 1: Reveal Block 1
        .fromTo(words1, 
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 2, ease: 'power3.out' }
        )
        // Hold Block 1
        .to({}, { duration: 1.5 })
        // Zoom through & fade out Block 1
        .to(block1Ref.current, {
            scale: 2.2,
            opacity: 0,
            duration: 3,
            ease: 'power2.inOut'
        })
        // Phase 2: Fade in and scale up Block 2
        .fromTo(block2Ref.current,
            { scale: 0.7, opacity: 0 },
            { scale: 1, opacity: 1, duration: 3, ease: 'power2.out' },
            '-=1.5'
        )
        .fromTo(words2,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 2.5, ease: 'power3.out' },
            '-=2.0'
        )
        // Hold Block 2
        .to({}, { duration: 2 })
        // Zoom through and dissolve Block 2
        .to(block2Ref.current, {
            scale: 3.5,
            opacity: 0,
            duration: 4,
            ease: 'power2.in'
        });

        return () => {
            tl.scrollTrigger?.kill();
        };
    }, []);

    const text1 = "India doesn't need another software company.";
    const text2 = "It needs intelligent infrastructure.";

    return (
        <section ref={containerRef} className="vision-section">
            {/* Background Procedural Fluid Canvas */}
            <canvas ref={canvasRef} className="vision-canvas" />

            <div className="vision-content">
                {/* Text Block 1 */}
                <div ref={block1Ref} className="vision-block block-1">
                    <p className="vision-paragraph">
                        {text1.split(' ').map((word, idx) => {
                            const isHighlighted = word.toLowerCase().includes('software') || word.toLowerCase().includes('company');
                            return (
                                <span 
                                    key={idx} 
                                    className={`vision-word ${isHighlighted ? 'text-dimmed-accent' : ''}`}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </p>
                </div>

                {/* Text Block 2 */}
                <div ref={block2Ref} className="vision-block block-2">
                    <p className="vision-paragraph">
                        {text2.split(' ').map((word, idx) => {
                            const isHighlighted = word.toLowerCase().includes('intelligent') || word.toLowerCase().includes('infrastructure');
                            return (
                                <span 
                                    key={idx} 
                                    className={`vision-word ${isHighlighted ? 'gradient-text-accent' : ''}`}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
};
