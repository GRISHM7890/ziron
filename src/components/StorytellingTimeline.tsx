import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import type { ReactNode } from 'react';

interface Step {
    num: string;
    title: string;
    headline: string;
    desc: string;
    illustration: ReactNode;
}

export const StorytellingTimeline = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const wrapper = wrapperRef.current;
        if (!section || !wrapper) return;

        // Calculate scroll width dynamically
        const getScrollAmount = () => {
            return wrapper.scrollWidth - window.innerWidth;
        };

        // Horizontal Scroll Pinning
        const scrollTween = gsap.to(wrapper, {
            x: () => -getScrollAmount(),
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${getScrollAmount()}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        // Cards rotation & tilt effect while scrolling
        const cards = wrapper.querySelectorAll('.timeline-scroll-card');
        cards.forEach((card) => {
            gsap.fromTo(card,
                { rotationY: -15, rotationZ: -2, scale: 0.94, transformPerspective: 1000 },
                {
                    rotationY: 15,
                    rotationZ: 2,
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween, // Link to horizontal scroll tween
                        start: 'left right',
                        end: 'right left',
                        scrub: true
                    }
                }
            );
        });

        // Cleanup
        return () => {
            scrollTween.scrollTrigger?.kill();
        };
    }, []);

    const steps: Step[] = [
        {
            num: "01",
            title: "DISCOVER",
            headline: "Identifying Sovereignty Gaps",
            desc: "We map operational friction across Indian governance, education networks, and healthcare centers to find structural vulnerabilities.",
            illustration: (
                <svg viewBox="0 0 200 120" className="step-svg">
                    {/* Scanning radar grid */}
                    <path d="M 10 10 L 190 10 M 10 30 L 190 30 M 10 50 L 190 50 M 10 70 L 190 70 M 10 90 L 190 90 M 10 110 L 190 110" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <path d="M 10 10 L 10 110 M 40 10 L 40 110 M 70 10 L 70 110 M 100 10 L 100 110 M 130 10 L 130 110 M 160 10 L 160 110 M 190 10 L 190 110" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    {/* Radar Sweep line */}
                    <line x1="100" y1="60" x2="180" y2="20" stroke="rgba(0, 210, 255, 0.4)" strokeWidth="1.5">
                        <animateTransform 
                            attributeName="transform" 
                            type="rotate" 
                            from="0 100 60" 
                            to="360 100 60" 
                            dur="5s" 
                            repeatCount="indefinite" 
                        />
                    </line>
                    <circle cx="100" cy="60" r="80" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="1" fill="none" />
                    <circle cx="100" cy="60" r="50" stroke="rgba(0, 210, 255, 0.08)" strokeWidth="1" fill="none" />
                    <circle cx="140" cy="30" r="4" fill="#00d2ff">
                        <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="70" cy="80" r="3" fill="#00d2ff">
                        <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                </svg>
            )
        },
        {
            num: "02",
            title: "RESEARCH",
            headline: "Proprietary Cognitive Modeling",
            desc: "Instead of building on commercial APIs, our lab trains bespoke intelligence weights designed for low latency and localization.",
            illustration: (
                <svg viewBox="0 0 200 120" className="step-svg">
                    {/* Dynamic Neural Hub */}
                    <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                        <line x1="100" y1="60" x2="50" y2="30" />
                        <line x1="100" y1="60" x2="150" y2="30" />
                        <line x1="100" y1="60" x2="150" y2="90" />
                        <line x1="100" y1="60" x2="50" y2="90" />
                        <line x1="50" y1="30" x2="150" y2="30" />
                        <line x1="150" y1="30" x2="150" y2="90" />
                        <line x1="150" y1="90" x2="50" y2="90" />
                        <line x1="50" y1="90" x2="50" y2="30" />
                    </g>
                    {/* Pulsing Core */}
                    <circle cx="100" cy="60" r="10" fill="#7928ca" opacity="0.4">
                        <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="100" cy="60" r="6" fill="#00d2ff" />
                    
                    {/* Outer Nodes */}
                    <circle cx="50" cy="30" r="4" fill="#ffffff" />
                    <circle cx="150" cy="30" r="4" fill="#ffffff" />
                    <circle cx="150" cy="90" r="4" fill="#ffffff" />
                    <circle cx="50" cy="90" r="4" fill="#ffffff" />
                </svg>
            )
        },
        {
            num: "03",
            title: "PROTOTYPE",
            headline: "Sandboxed Simulation Grids",
            desc: "We deploy isolated nodes to simulate traffic under extreme throughput, proving reliability in highly constrained network grids.",
            illustration: (
                <svg viewBox="0 0 200 120" className="step-svg">
                    {/* Blueprint isometric blocks */}
                    <g fill="none" stroke="rgba(0, 210, 255, 0.2)" strokeWidth="1">
                        {/* Box 1 */}
                        <path d="M 60 50 L 100 30 L 140 50 L 100 70 Z" />
                        <path d="M 60 50 L 60 70 L 100 90 L 100 70 Z" />
                        <path d="M 140 50 L 140 70 L 100 90 L 100 70 Z" />
                        
                        {/* Upper floating lid */}
                        <path d="M 70 35 L 100 20 L 130 35 L 100 50 Z" stroke="#ffffff" opacity="0.4">
                            <animateTransform 
                                attributeName="transform" 
                                type="translate" 
                                values="0,0; 0,-10; 0,0" 
                                dur="4s" 
                                repeatCount="indefinite" 
                            />
                        </path>
                    </g>
                    {/* Data flow dots */}
                    <circle cx="100" cy="50" r="2.5" fill="#00d2ff">
                        <animate attributeName="cy" values="30;70;30" dur="3s" repeatCount="indefinite" />
                    </circle>
                </svg>
            )
        },
        {
            num: "04",
            title: "ENGINEER",
            headline: "Hardened Core Compilations",
            desc: "Systems are coded in type-safe languages with custom hardware compiler passes to squeeze optimal speed from commodity systems.",
            illustration: (
                <svg viewBox="0 0 200 120" className="step-svg">
                    {/* Vertical system stack lines */}
                    <path d="M 40 20 L 160 20 M 40 40 L 160 40 M 40 60 L 160 60 M 40 80 L 160 80 M 40 100 L 160 100" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
                    <g fill="#00d2ff">
                        {/* Flashing blocks on line tracks */}
                        <rect x="60" y="18" width="20" height="4" rx="2">
                            <animate attributeName="x" values="40;140;40" dur="4s" repeatCount="indefinite" />
                        </rect>
                        <rect x="120" y="38" width="15" height="4" rx="2" fill="#7928ca">
                            <animate attributeName="x" values="140;40;140" dur="5s" repeatCount="indefinite" />
                        </rect>
                        <rect x="80" y="58" width="30" height="4" rx="2">
                            <animate attributeName="x" values="50;120;50" dur="3.5s" repeatCount="indefinite" />
                        </rect>
                        <rect x="50" y="78" width="25" height="4" rx="2" fill="#ffffff">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                        </rect>
                    </g>
                </svg>
            )
        },
        {
            num: "05",
            title: "DEPLOY",
            headline: "Low-Bandwidth Local Sync",
            desc: "Nodes are compiled into atomic packages that synchronize seamlessly over poor 3G/4G connections and remote areas.",
            illustration: (
                <svg viewBox="0 0 200 120" className="step-svg">
                    {/* Signal wave arcs emitting outwards */}
                    <circle cx="100" cy="90" r="10" fill="none" stroke="rgba(0, 210, 255, 0.4)" strokeWidth="1.5" />
                    <path d="M 85 75 A 20 20 0 0 1 115 75" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3">
                        <animate attributeName="stroke-width" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M 75 65 A 35 35 0 0 1 125 65" fill="none" stroke="#00d2ff" strokeWidth="1.5" opacity="0.5">
                        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" />
                    </path>
                    <path d="M 65 55 A 50 50 0 0 1 135 55" fill="none" stroke="#7928ca" strokeWidth="1.5" opacity="0.7">
                        <animate attributeName="stroke" values="#7928ca;#00d2ff;#7928ca" dur="3s" repeatCount="indefinite" />
                    </path>
                    
                    {/* Server base */}
                    <rect x="85" y="85" width="30" height="15" rx="2" fill="#030303" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <circle cx="95" cy="92" r="1.5" fill="#00d2ff" />
                    <circle cx="105" cy="92" r="1.5" fill="#00d2ff" />
                </svg>
            )
        },
        {
            num: "06",
            title: "SCALE",
            headline: "Elastic Ecosystem Expansion",
            desc: "Successful instances auto-replicate across districts, establishing a shared intelligence grid that grows smarter with every transaction.",
            illustration: (
                <svg viewBox="0 0 200 120" className="step-svg">
                    {/* Expanding nodes connection grid */}
                    <g stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none">
                        <circle cx="100" cy="60" r="30" />
                        <circle cx="100" cy="60" r="55" />
                    </g>
                    <g fill="#00d2ff">
                        {/* Center core */}
                        <circle cx="100" cy="60" r="5" />
                        
                        {/* Ring 1 nodes */}
                        <circle cx="75" cy="45" r="3" />
                        <circle cx="125" cy="45" r="3" />
                        <circle cx="100" cy="90" r="3" />
                        
                        {/* Ring 2 nodes expanding */}
                        <circle cx="50" cy="30" r="2.5" opacity="0.4">
                            <animateTransform attributeName="transform" type="translate" values="0,0; -5,-5; 0,0" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="150" cy="30" r="2.5" opacity="0.4">
                            <animateTransform attributeName="transform" type="translate" values="0,0; 5,-5; 0,0" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="150" cy="90" r="2.5" opacity="0.4">
                            <animateTransform attributeName="transform" type="translate" values="0,0; 5,5; 0,0" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="50" cy="90" r="2.5" opacity="0.4">
                            <animateTransform attributeName="transform" type="translate" values="0,0; -5,5; 0,0" dur="4s" repeatCount="indefinite" />
                        </circle>
                    </g>
                    {/* Connection rays */}
                    <line x1="100" y1="60" x2="75" y2="45" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="1" />
                    <line x1="100" y1="60" x2="125" y2="45" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="1" />
                    <line x1="100" y1="60" x2="100" y2="90" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="1" />
                </svg>
            )
        }
    ];

    return (
        <section ref={sectionRef} className="horizontal-section">
            <div className="horizontal-sticky-header">
                <div className="horizontal-badge">
                    <span className="horizontal-badge-dot" />
                    <span className="horizontal-badge-text">Operational Engine</span>
                </div>
                <h2 className="horizontal-heading">
                    How We Build. <span className="gradient-text">Our Methodology.</span>
                </h2>
            </div>

            {/* Horizontal Track Wrapper */}
            <div ref={wrapperRef} className="horizontal-wrapper">
                {steps.map((step) => (
                    <div key={step.num} className="horizontal-slide">
                        <div className="timeline-scroll-card">
                            <div className="card-illustration-box">
                                {step.illustration}
                            </div>
                            <div className="card-details-box">
                                <div className="card-top-indicator">
                                    <span className="card-index-num">{step.num}</span>
                                    <span className="card-step-title">{step.title}</span>
                                </div>
                                <h3 className="card-step-headline">{step.headline}</h3>
                                <p className="card-step-desc">{step.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
