import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Founder {
    name: string;
    role: string;
    image: string;
    quote: string;
    description: string;
    skills: string[];
    signaturePath: string;
}

const foundersData: Founder[] = [
    {
        name: "Grishma Mahorkar",
        role: "Co-Founder & CTO",
        image: "/assets/grishma.jpg",
        quote: "We design code that runs on commodity hardware but delivers sovereign-scale cognitive agency. No wrappers, no compromises.",
        description: "Handles AI model architecture, principal/HOD education systems training, UI/UX design, and core compiler engineering.",
        skills: ["AI Architecture", "UI/UX Expert", "System Compilation"],
        signaturePath: "M 20 60 Q 40 20 60 50 T 100 40 T 140 60 T 180 50" // Stylized signature curve path
    },
    {
        name: "Nitesh Kitey",
        role: "Co-Founder & CEO",
        image: "/assets/nitesh.jpg",
        quote: "Trust is the ultimate compute layer. We do not negotiate parameters; we negotiate structures of sovereign endurance.",
        description: "Directs business operations, enterprise negotiations, human resources management, and ecosystem deals.",
        skills: ["Enterprise Deals", "HR Operations", "Negotiations"],
        signaturePath: "M 20 50 Q 50 30 80 55 T 130 45 T 180 50" // Stylized signature curve path
    },
    {
        name: "Harsh",
        role: "Co-Founder & CDO",
        image: "/assets/harsh.jpg",
        quote: "The integrity of data is the integrity of Ziron. We scale databases that are sandboxed, zero-trust, and hyper-elastic.",
        description: "Architects high-throughput database networks, custom telemetry nodes, and sandboxed ML pipelines.",
        skills: ["Databases", "ML Pipelines", "Zero-Trust Sync"],
        signaturePath: "M 20 40 Q 60 60 100 30 T 150 50 T 180 40" // Stylized signature curve path
    }
];

export const FounderMessage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Line-by-line quote reveals
        const quoteBlocks = container.querySelectorAll('.founder-quote');
        quoteBlocks.forEach((block) => {
            const lines = block.querySelectorAll('.quote-line');
            gsap.fromTo(lines,
                { y: 15, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // 2. Signature Drawing Scroll Animation
        const signaturePaths = container.querySelectorAll('.signature-path');
        signaturePaths.forEach((path: any) => {
            const length = path.getTotalLength();
            // Set initial dash offset properties
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: path,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // 3. Staggered card entrance reveal
        gsap.fromTo('.founder-card',
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.founders-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="founders-section">
            <div className="founders-header-container">
                <div className="founders-badge">
                    <span className="founders-badge-dot" />
                    <span className="founders-badge-text">Foundational Core</span>
                </div>
                <h2 className="founders-heading">
                    The Leadership. <br />
                    <span className="gradient-text">Co-Founders of ZIRON.</span>
                </h2>
            </div>

            <div className="founders-container">
                <div className="founders-grid">
                    {foundersData.map((f, idx) => (
                        <div key={idx} className="founder-card">
                            <div className="founder-portrait-wrapper">
                                <img src={f.image} alt={f.name} className="founder-portrait" />
                                <div className="portrait-overlay-gradient" />
                            </div>

                            <div className="founder-info-content">
                                <div className="founder-meta-row">
                                    <h3 className="founder-name">{f.name}</h3>
                                    <span className="founder-role-badge">{f.role}</span>
                                </div>

                                <p className="founder-desc">{f.description}</p>

                                {/* Skills competence tags */}
                                <div className="founder-skills">
                                    {f.skills.map((s, i) => (
                                        <span key={i} className="founder-skill-tag">{s}</span>
                                    ))}
                                </div>

                                {/* Quote lines (Split text luxury style) */}
                                <div className="founder-quote">
                                    {f.quote.split('. ').map((sentence, i) => (
                                        <div key={i} className="quote-line-wrapper">
                                            <span className="quote-line">
                                                {sentence}{i === 0 ? '.' : ''}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Signature Hand-draw SVG */}
                                <div className="founder-signature-box">
                                    <svg viewBox="0 0 200 80" className="signature-svg">
                                        <path 
                                            d={f.signaturePath} 
                                            fill="none" 
                                            stroke="rgba(255, 255, 255, 0.7)" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            className="signature-path" 
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
