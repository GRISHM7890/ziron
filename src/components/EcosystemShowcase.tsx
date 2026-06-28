import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Subsidiary {
    id: string;
    title: string;
    tag: string;
    desc: string;
    gridClass: string;
    icon: ReactNode;
}

const subsidiaries: Subsidiary[] = [
    {
        id: "education",
        title: "Ziron Education",
        tag: "LMS & COGNITIVE",
        desc: "AI-tutors and intelligent curricula personalizing learning for millions across India.",
        gridClass: "card-education",
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        )
    },
    {
        id: "health",
        title: "Ziron Health",
        tag: "CLINICAL ENGINE",
        desc: "Diagnostic models and healthcare accessibility systems powered by edge-AI.",
        gridClass: "card-health",
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        )
    },
    {
        id: "labs",
        title: "Ziron Labs",
        tag: "R&D CORE HUB",
        desc: "Advanced research in cognitive architectures, deep learning models, and quantum systems.",
        gridClass: "card-labs",
        icon: (
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
            </svg>
        )
    },
    {
        id: "digital",
        title: "Ziron Digital",
        tag: "GOVERNANCE & ERP",
        desc: "Enterprise transformation and legacy modernizations with agentic workflows.",
        gridClass: "card-digital",
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
        )
    },
    {
        id: "cloud",
        title: "Ziron Cloud",
        tag: "SECURE COMPUTE",
        desc: "Decentralized secure computing fabric and custom enterprise AI server grids.",
        gridClass: "card-cloud",
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
        )
    },
    {
        id: "ai",
        title: "Ziron AI",
        tag: "COGNITIVE LAYER",
        desc: "Proprietary large-scale foundational models trained specifically on localized datasets.",
        gridClass: "card-ai",
        icon: (
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        )
    }
];

export const EcosystemShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [linePaths, setLinePaths] = useState<string[]>([]);

    // 1. Calculate connecting lines dynamically
    useEffect(() => {
        const calculateLines = () => {
            const container = containerRef.current;
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const labsCard = cardRefs.current['labs'];
            if (!labsCard) return;

            const labsRect = labsCard.getBoundingClientRect();
            const labsCenter = {
                x: labsRect.left - containerRect.left + labsRect.width / 2,
                y: labsRect.top - containerRect.top + labsRect.height / 2
            };

            const paths: string[] = [];
            const otherIds = ['education', 'health', 'digital', 'cloud', 'ai'];

            otherIds.forEach(id => {
                const card = cardRefs.current[id];
                if (card) {
                    const cardRect = card.getBoundingClientRect();
                    const cardCenter = {
                        x: cardRect.left - containerRect.left + cardRect.width / 2,
                        y: cardRect.top - containerRect.top + cardRect.height / 2
                    };
                    paths.push(`M ${labsCenter.x} ${labsCenter.y} L ${cardCenter.x} ${cardCenter.y}`);
                }
            });

            setLinePaths(paths);
        };

        // Run calculation loop using requestAnimationFrame to track hover animation shifts dynamically
        let frameId: number;
        const tick = () => {
            calculateLines();
            frameId = requestAnimationFrame(tick);
        };
        tick();

        window.addEventListener('resize', calculateLines);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', calculateLines);
        };
    }, []);

    // 2. Scroll Animations
    useEffect(() => {
        // Heading animation
        gsap.fromTo('.eco-header', 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: '.eco-header',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Cards fade-in staggered animation
        gsap.fromTo('.eco-card',
            { scale: 0.9, opacity: 0, y: 30 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.ecosystem-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="ecosystem-section">
            {/* Animated slow mesh background behind network */}
            <div className="ecosystem-bg-mesh" />

            <div className="eco-header-container">
                <div className="eco-badge">
                    <span className="eco-badge-dot" />
                    <span className="eco-badge-text">Holding Companies</span>
                </div>
                <h2 className="eco-header">
                    One Vision. <br />
                    <span className="gradient-text">Multiple Innovations.</span>
                </h2>
            </div>

            {/* Floating constallation layout */}
            <div className="ecosystem-grid-container">
                {/* SVG dynamic network lines */}
                <svg className="network-svg">
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#00d2ff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#7928ca" stopOpacity="0.4" />
                        </linearGradient>
                        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {linePaths.map((path, idx) => (
                        <path 
                            key={idx} 
                            d={path} 
                            stroke="url(#line-gradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            filter="url(#glow-filter)"
                            strokeDasharray="4 4"
                            className="pulsing-line"
                        />
                    ))}
                </svg>

                <div className="ecosystem-grid">
                    {subsidiaries.map(sub => {
                        const isHub = sub.id === 'labs';
                        return (
                            <div
                                key={sub.id}
                                ref={el => { cardRefs.current[sub.id] = el; }}
                                className={`eco-card ${sub.gridClass} ${isHub ? 'hub-card' : ''}`}
                            >
                                <div className="card-glass-glow" />
                                <div className="card-content">
                                    <div className="card-icon-wrapper">
                                        {sub.icon}
                                    </div>
                                    <div className="card-meta">
                                        <span className="card-tag">{sub.tag}</span>
                                        <h3 className="card-title">{sub.title}</h3>
                                    </div>
                                    <p className="card-desc">{sub.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
