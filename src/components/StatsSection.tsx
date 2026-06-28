import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
    target: number;
    label: string;
    suffix: string;
}

const statsData: Stat[] = [
    { target: 50, label: "Schools Planned", suffix: "+" },
    { target: 100, label: "Solutions", suffix: "+" },
    { target: 5, label: "Business Verticals", suffix: "+" },
    { target: 100000, label: "Lives Impact Target", suffix: "+" }
];

export const StatsSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Constellation Background Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        let height = canvas.height = canvas.parentElement?.clientHeight || 400;

        const handleResize = () => {
            width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            height = canvas.height = canvas.parentElement?.clientHeight || 400;
        };
        window.addEventListener('resize', handleResize);

        const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
        const particleCount = 45;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1
            });
        }

        let animId: number;

        const drawConstellation = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connecting lines
            ctx.strokeStyle = 'rgba(0, 210, 255, 0.04)';
            ctx.lineWidth = 1;
            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(p => {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce or wrap
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            });

            animId = requestAnimationFrame(drawConstellation);
        };

        drawConstellation();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 2. Count Up Scroll trigger
    useEffect(() => {
        const numElements = document.querySelectorAll('.stat-number-value');
        numElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target') || '0', 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const countObj = { val: 0 };

            gsap.to(countObj, {
                val: target,
                duration: 2.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                onUpdate: () => {
                    el.textContent = Math.floor(countObj.val).toLocaleString() + suffix;
                }
            });
        });
        
        // Staggered entry animation
        gsap.fromTo('.stat-card',
            { scale: 0.95, opacity: 0, y: 30 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.stats-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="stats-section">
            {/* Constellation Canvas background */}
            <canvas ref={canvasRef} className="constellation-canvas" />

            <div className="stats-container">
                <div className="stats-grid">
                    {statsData.map((stat, idx) => (
                        <div key={idx} className="stat-card">
                            <div className="stat-card-glow" />
                            <div className="stat-card-content">
                                <span 
                                    className="stat-number-value" 
                                    data-target={stat.target}
                                    data-suffix={stat.suffix}
                                >
                                    0{stat.suffix}
                                </span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
