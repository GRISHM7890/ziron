import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
    number: string;
    title: string;
    subtitle: string;
    desc: string;
}

const milestones: Milestone[] = [
    {
        number: "01",
        title: "Research Driven",
        subtitle: "FOUNDATIONAL INTELLIGENCE",
        desc: "Our systems are built on proprietary cognitive research from the ground up, not generic API wrappers."
    },
    {
        number: "02",
        title: "Enterprise Grade",
        subtitle: "MISSION CRITICAL",
        desc: "Engineered to withstand heavy workloads with 99.99% uptime guarantees for global conglomerates."
    },
    {
        number: "03",
        title: "Indian Roots",
        subtitle: "SOVEREIGN CORE",
        desc: "Tailored to localized infrastructure constraints, languages, and compliance frameworks of India."
    },
    {
        number: "04",
        title: "Global Standards",
        subtitle: "EXPORT READY",
        desc: "Designed to match and exceed the world's most rigorous benchmarks in speed, style, and mechanics."
    },
    {
        number: "05",
        title: "Security First",
        subtitle: "DATA INTEGRITY",
        desc: "Fully encrypted data pipelines ensuring sovereign privacy, sandboxed networks, and compliance."
    },
    {
        number: "06",
        title: "Scalable Systems",
        subtitle: "ELASTIC FABRICS",
        desc: "Infrastructure structures that scale dynamically to handle billions of telemetry transactions."
    },
    {
        number: "07",
        title: "Future Ready",
        subtitle: "DEEP R&D",
        desc: "Continuously iterating on neuromorphic designs and agentic grids to power tomorrow's industries."
    }
];

export const WhyChooseZiron = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Scroll-driven timeline progress line animation
        gsap.fromTo('.timeline-progress',
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline-container',
                    start: 'top 50%',
                    end: 'bottom 50%',
                    scrub: true
                }
            }
        );

        // 2. Animate milestones reveal & toggle active glow state
        const items = gsap.utils.toArray('.timeline-item');
        items.forEach((item: any) => {
            // Entrance fade & slide
            gsap.fromTo(item,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Active glow trigger
            ScrollTrigger.create({
                trigger: item,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => item.classList.add('active'),
                onLeaveBack: () => item.classList.remove('active')
            });
        });
    }, []);

    return (
        <section ref={containerRef} className="why-ziron-section">
            <div className="why-ziron-header-container">
                <div className="why-ziron-badge">
                    <span className="why-ziron-badge-dot" />
                    <span className="why-ziron-badge-text">Core Philosophy</span>
                </div>
                <h2 className="why-ziron-heading">
                    Why Choose ZIRON. <br />
                    <span className="gradient-text">Built to Endure.</span>
                </h2>
            </div>

            <div className="timeline-container">
                {/* Center Vertical Timeline Base Line */}
                <div className="timeline-line">
                    {/* Glowing Progress Line */}
                    <div className="timeline-progress" />
                </div>

                <div className="timeline-items">
                    {milestones.map((ms, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div
                                key={ms.number}
                                className={`timeline-item ${isEven ? 'left-item' : 'right-item'}`}
                            >
                                {/* Indicator Dot on the vertical line */}
                                <div className="timeline-dot">
                                    <div className="dot-inner" />
                                </div>

                                {/* Content Card */}
                                <div className="timeline-card">
                                    <div className="card-top-row">
                                        <span className="timeline-number">{ms.number}</span>
                                        <span className="timeline-subtitle">{ms.subtitle}</span>
                                    </div>
                                    <h3 className="timeline-title">{ms.title}</h3>
                                    <p className="timeline-desc">{ms.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
