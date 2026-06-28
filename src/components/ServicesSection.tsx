import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
    id: string;
    title: string;
    tag: string;
    desc: string;
    extra: string[];
    gridClass: string;
    icon: React.ReactNode;
}

const services: ServiceItem[] = [
    {
        id: "ai",
        title: "AI Solutions",
        tag: "COGNITIVE ARCHITECTURES",
        desc: "Custom training, finetuning, and deployment of foundational intelligence layers.",
        extra: ["LLM Orchestration", "Agentic Workflows", "Vector DB RAG Nodes"],
        gridClass: "bento-span-2",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                <polyline points="7.5 19.79 7.5 14.6 3 12" />
                <polyline points="21 12 16.5 14.6 16.5 19.79" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        )
    },
    {
        id: "web",
        title: "Website Development",
        tag: "HIGH FIDELITY FRONTEND",
        desc: "Stripe-level responsive interfaces built on high-performance frameworks.",
        extra: ["Vite & React", "Next.js SSR Engines", "GSAP Page Mechanics"],
        gridClass: "bento-span-1",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        )
    },
    {
        id: "mobile",
        title: "Mobile Applications",
        tag: "CROSS PLATFORM NATIVE",
        desc: "High-performance iOS and Android structures with smooth native mechanics.",
        extra: ["React Native", "Custom Native Bridges", "Offline-first Storage"],
        gridClass: "bento-span-1",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        )
    },
    {
        id: "health-ai",
        title: "Healthcare AI",
        tag: "CLINICAL VALIDATION",
        desc: "Diagnostic and imaging models processing telemetry at the edge.",
        extra: ["DICOM Vision Networks", "Telemetry Analyzers", "HIPAA Secure"],
        gridClass: "bento-span-1",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        )
    },
    {
        id: "edu-ai",
        title: "Education AI",
        tag: "COGNITIVE TUTORS",
        desc: "Intelligent personalized tutoring layers tracking cognitive patterns.",
        extra: ["LMS Integrations", "Adaptive Curricula", "Behavioral Analyzers"],
        gridClass: "bento-span-1",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
        )
    },
    {
        id: "automation",
        title: "Automation",
        tag: "ROBOTIC PROCESSES",
        desc: "Industrial agent workflows automating back-office systems at scale.",
        extra: ["ERP Auto Nodes", "Cron Grid Managers", "Zero-trust API Sync"],
        gridClass: "bento-span-1",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        )
    },
    {
        id: "cloud",
        title: "Cloud Infrastructure",
        tag: "SECURE FABRIC",
        desc: "Decentralized server fabrics, load distribution, and custom storage grids.",
        extra: ["Kubernetes Fabrics", "AWS/Vercel Pipelines", "Global Edge Latency"],
        gridClass: "bento-span-2",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
            </svg>
        )
    },
    {
        id: "software",
        title: "Custom Software",
        tag: "ENTERPRISE MONOLITHS",
        desc: "Proprietary software engines tailored specifically to heavy enterprise operational pipelines.",
        extra: ["Relational Databases", "High-frequency Message Brokers", "Multi-tenant Access Architectures"],
        gridClass: "bento-span-3",
        icon: (
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
        )
    }
];

export const ServicesSection = () => {
    // 1. Mouse Spotlight Tracker per Card
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    // 2. Scroll Animation
    useEffect(() => {
        gsap.fromTo('.services-badge',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.services-header-container',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.services-heading',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: '.services-heading',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.bento-card',
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.bento-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <section className="services-section">
            <div className="services-header-container">
                <div className="services-badge">
                    <span className="services-badge-dot" />
                    <span className="services-badge-text">Capabilities</span>
                </div>
                <h2 className="services-heading">
                    World-Class Services. <br />
                    <span className="gradient-text">Engineered for Impact.</span>
                </h2>
            </div>

            <div className="services-grid-container">
                <div className="bento-grid">
                    {services.map(service => (
                        <div
                            key={service.id}
                            className={`bento-card ${service.gridClass}`}
                            onMouseMove={handleMouseMove}
                        >
                            {/* Mouse light radial element */}
                            <div className="card-spotlight" />

                            <div className="card-top">
                                <div className="card-header-row">
                                    <div className="service-icon-wrapper">
                                        {service.icon}
                                    </div>
                                    <span className="service-tag">{service.tag}</span>
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-desc">{service.desc}</p>
                            </div>

                            {/* Hidden detail list revealed on hover */}
                            <div className="card-hover-details">
                                <span className="hover-details-title">Core Competencies:</span>
                                <ul className="details-list">
                                    {service.extra.map((item, idx) => (
                                        <li key={idx} className="details-list-item">
                                            <span className="details-bullet" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
