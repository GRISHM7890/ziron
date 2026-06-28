import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CityNode {
    id: string;
    name: string;
    cx: number;
    cy: number;
    color: string;
}

const citiesList: CityNode[] = [
    { id: "Srinagar", name: "Srinagar Core", cx: 97, cy: 25, color: "#00d2ff" },
    { id: "Delhi", name: "Delhi Sovereign Core", cx: 98, cy: 55, color: "#00d2ff" },
    { id: "Jaipur", name: "Jaipur Node", cx: 82, cy: 75, color: "#a78bfa" },
    { id: "Ahmedabad", name: "Ahmedabad Node", cx: 68, cy: 105, color: "#a78bfa" },
    { id: "Mumbai", name: "Mumbai Telemetry Hub", cx: 72, cy: 130, color: "#00d2ff" },
    { id: "Pune", name: "Pune Facility", cx: 76, cy: 135, color: "#2dd4bf" },
    { id: "Bangalore", name: "Bangalore Train Core", cx: 90, cy: 160, color: "#7928ca" },
    { id: "Hyderabad", name: "Hyderabad DB Node", cx: 100, cy: 140, color: "#00d2ff" },
    { id: "Chennai", name: "Chennai Route Node", cx: 108, cy: 165, color: "#2dd4bf" },
    { id: "Kolkata", name: "Kolkata Backup Core", cx: 140, cy: 105, color: "#7928ca" },
    { id: "Guwahati", name: "Guwahati Sync Node", cx: 172, cy: 90, color: "#a78bfa" },
    { id: "Trivandrum", name: "Trivandrum Oceanic", cx: 92, cy: 195, color: "#00d2ff" }
];

const citiesData: Record<string, { load: string; status: string; type: string; details: string }> = {
    "Srinagar": { load: "18.3%", status: "Active", type: "Remote Edge Cache", details: "Low-latency regional edge synchronization grids serving Northern sectors." },
    "Delhi": { load: "92.4%", status: "Active", type: "Primary Sovereign Core", details: "Houses Ziron's foundational cognitive models and government governance training nodes." },
    "Jaipur": { load: "44.1%", status: "Active", type: "Edge Synapse Node", details: "Processes telemetry traffic routing between Northern and Western grids." },
    "Ahmedabad": { load: "56.2%", status: "Active", type: "Industrial Automation Core", details: "Orchestrates machine learning schedules for manufacturing and automation sectors." },
    "Mumbai": { load: "79.8%", status: "Active", type: "Financial Telemetry Hub", details: "Secures high-frequency data pipelines for commerce, banking, and trading instances." },
    "Pune": { load: "61.5%", status: "Active", type: "R&D Simulation Cluster", details: "Runs sandboxed traffic loops to stress-test model scaling under high workloads." },
    "Bangalore": { load: "87.1%", status: "Active", type: "Cognitive Training Cluster", details: "Primary hardware arrays dedicated to training bespoke transformer parameters." },
    "Hyderabad": { load: "64.2%", status: "Active", type: "Zero-Trust Database Core", details: "Manages hyper-elastic secure data storage systems and transaction hashes." },
    "Chennai": { load: "58.7%", status: "Active", type: "Sovereign Web Router", details: "Serves Web client rendering SSR tasks and orchestrates serverless sync packets." },
    "Kolkata": { load: "42.5%", status: "Idle", type: "Backup Telemetry Node", details: "Standby database replication grid handling Eastern territory failovers." },
    "Guwahati": { load: "31.9%", status: "Active", type: "Edge Sync Facility", details: "Synchronizes localized databases over narrow-bandwidth networks and satellite links." },
    "Trivandrum": { load: "51.2%", status: "Active", type: "Oceanic Fiber Bridge", details: "Links physical subsea fiber networks to the core routing fabric." }
};

export const ContactSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Background Brightness Shift on scroll
        gsap.to(container, {
            backgroundColor: '#0a0b16',
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            }
        });

        // 2. Float animations for contact details cards
        gsap.fromTo('.floating-contact-card',
            { y: 0 },
            {
                y: -12,
                duration: 3,
                stagger: 0.4,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            }
        );

        // 3. Staggered reveal for layouts
        gsap.fromTo('.contact-left-anim',
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-grid',
                    start: 'top 75%'
                }
            }
        );

        gsap.fromTo('.contact-right-anim',
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-grid',
                    start: 'top 75%'
                }
            }
        );
    }, []);

    // 4. Magnetic Physics Button Animation
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = buttonRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        const btn = buttonRef.current;
        if (!btn) return;
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) return;
        setIsSubmitted(true);
    };

    // HUD Active Node Calculation
    const activeCityId = hoveredCity || "Delhi";
    const activeCityData = citiesData[activeCityId];

    return (
        <section ref={containerRef} className="contact-section">
            <div className="contact-glow-overlay" />

            <div className="contact-container">
                <div className="contact-grid">
                    
                    {/* Left Column: Details & India HUD Map */}
                    <div className="contact-left contact-left-anim">
                        <div className="contact-badge">
                            <span className="contact-badge-dot" />
                            <span className="contact-badge-text">Collaboration</span>
                        </div>
                        <h2 className="contact-heading">
                            Partner With Us. <br />
                            <span className="gradient-text">Build the Future.</span>
                        </h2>
                        <p className="contact-lead-desc">
                            We collaborate with state departments, healthcare consortiums, and enterprise networks to establish secure intelligence nodes across India.
                        </p>

                        {/* Floating Info Cards */}
                        <div className="floating-cards-container">
                            <div className="floating-contact-card">
                                <span className="card-lbl">ENTERPRISE INQUIRIES</span>
                                <a href="mailto:partner@ziron.in" className="card-val">partner@ziron.in</a>
                            </div>
                            <div className="floating-contact-card">
                                <span className="card-lbl">SOVEREIGN CORE HQ</span>
                                <span className="card-val">New Delhi / Bangalore, India</span>
                            </div>
                        </div>

                        {/* Animated Geographic Node Map & HUD Panel */}
                        <div className="map-and-hud-container">
                            <div className="map-wrapper">
                                <svg viewBox="0 0 200 220" className="india-node-map">
                                    <defs>
                                        <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
                                            <feGaussianBlur stdDeviation="3" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    {/* Complete high-fidelity stylized outline polygon of India */}
                                    <polygon 
                                        points="95,12 102,20 102,32 108,35 115,40 120,55 125,70 135,80 148,82 155,88 165,85 178,78 188,82 190,90 175,100 160,98 152,105 145,105 135,108 128,112 122,120 112,130 110,145 115,160 110,175 100,195 95,205 92,205 88,180 82,165 72,152 76,140 70,130 58,112 55,100 62,95 72,90 78,90 82,82 78,70 85,60 88,45 92,30" 
                                        fill="rgba(255, 255, 255, 0.015)" 
                                        stroke="rgba(0, 210, 255, 0.08)" 
                                        strokeWidth="1" 
                                        strokeDasharray="4 4"
                                    />

                                    {/* Core Connection Pathways */}
                                    <g stroke="rgba(0, 210, 255, 0.18)" strokeWidth="0.8" fill="none">
                                        <path d="M 97 25 L 98 55" />
                                        <path d="M 98 55 L 82 75" />
                                        <path d="M 82 75 L 68 105" />
                                        <path d="M 68 105 L 72 130" />
                                        <path d="M 72 130 L 76 135" />
                                        <path d="M 76 135 L 90 160" />
                                        <path d="M 90 160 L 92 195" />
                                        
                                        <path d="M 98 55 L 100 140" />
                                        <path d="M 100 140 L 90 160" />
                                        <path d="M 100 140 L 108 165" />
                                        <path d="M 108 165 L 92 195" />
                                        
                                        <path d="M 98 55 L 140 105" />
                                        <path d="M 140 105 L 172 90" />
                                        <path d="M 140 105 L 100 140" />
                                    </g>

                                    {/* Flowing animated light pulses traveling along paths */}
                                    <g>
                                        <circle r="2" fill="#00d2ff" filter="url(#map-glow)">
                                            <animateMotion dur="4.5s" repeatCount="indefinite" path="M 97 25 L 98 55 L 100 140 L 90 160" />
                                        </circle>
                                        <circle r="2" fill="#7928ca" filter="url(#map-glow)">
                                            <animateMotion dur="5.5s" repeatCount="indefinite" path="M 98 55 L 140 105 L 172 90" />
                                        </circle>
                                        <circle r="2" fill="#00d2ff" filter="url(#map-glow)">
                                            <animateMotion dur="6s" repeatCount="indefinite" path="M 68 105 L 72 130 L 76 135 L 90 160 L 92 195" />
                                        </circle>
                                        <circle r="2" fill="#ffffff" filter="url(#map-glow)">
                                            <animateMotion dur="5s" repeatCount="indefinite" path="M 140 105 L 100 140 L 108 165" />
                                        </circle>
                                    </g>

                                    {/* City Beacons */}
                                    {citiesList.map((city) => {
                                        const isHovered = city.id === hoveredCity;
                                        return (
                                            <g 
                                                key={city.id} 
                                                className="map-city-group"
                                                onMouseEnter={() => setHoveredCity(city.id)}
                                                onMouseLeave={() => setHoveredCity(null)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {/* Pulsing glow ring */}
                                                <circle 
                                                    cx={city.cx} 
                                                    cy={city.cy} 
                                                    r={isHovered ? 8 : 5} 
                                                    fill={city.color} 
                                                    opacity={isHovered ? 0.6 : 0.25}
                                                >
                                                    <animate attributeName="r" values="3;9;3" dur="2.5s" repeatCount="indefinite" />
                                                </circle>
                                                {/* Core Center dot */}
                                                <circle 
                                                    cx={city.cx} 
                                                    cy={city.cy} 
                                                    r={isHovered ? 3.5 : 2.2} 
                                                    fill="#ffffff" 
                                                />
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>

                            {/* Floating Real-Time HUD Status Panel */}
                            <div className="map-hud-panel">
                                <div className="hud-blur" />
                                <div className="hud-content">
                                    <div className="hud-top-line">
                                        <span className="hud-city-name">{activeCityId} Core</span>
                                        <span className={`hud-status-badge ${activeCityData.status.toLowerCase()}`}>
                                            {activeCityData.status}
                                        </span>
                                    </div>
                                    <div className="hud-meta-grid">
                                        <div className="hud-meta-item">
                                            <span className="hud-meta-lbl">CLASSIFICATION</span>
                                            <span className="hud-meta-val">{activeCityData.type}</span>
                                        </div>
                                        <div className="hud-meta-item">
                                            <span className="hud-meta-lbl">TELEMETRY LOAD</span>
                                            <span className="hud-meta-val load-pct">{activeCityData.load}</span>
                                        </div>
                                    </div>
                                    <p className="hud-city-details">{activeCityData.details}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Inquiry Form Card */}
                    <div className="contact-right contact-right-anim">
                        <div className="glass-form-card">
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="inquiry-form">
                                    <h3 className="form-title">Initiate Protocol</h3>
                                    
                                    <div className="form-group">
                                        <label htmlFor="form-name">Name</label>
                                        <input 
                                            id="form-name"
                                            type="text" 
                                            placeholder="Your Name" 
                                            required
                                            value={formState.name} 
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })} 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="form-company">Company</label>
                                        <input 
                                            id="form-company"
                                            type="text" 
                                            placeholder="Organization / Government Dept" 
                                            value={formState.company} 
                                            onChange={(e) => setFormState({ ...formState, company: e.target.value })} 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="form-email">Corporate Email</label>
                                        <input 
                                            id="form-email"
                                            type="email" 
                                            placeholder="name@organization.com" 
                                            required
                                            value={formState.email} 
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })} 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="form-message">Brief Intent</label>
                                        <textarea 
                                            id="form-message"
                                            rows={4} 
                                            placeholder="Outline requirements or partnership scope..." 
                                            required
                                            value={formState.message} 
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })} 
                                        />
                                    </div>

                                    {/* Magnetic Submit Button */}
                                    <button 
                                        ref={buttonRef}
                                        type="submit" 
                                        className="magnetic-submit-btn"
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        Transmit Signal
                                        <span className="btn-glow-layer" />
                                    </button>
                                </form>
                            ) : (
                                <div className="form-success-container">
                                    <div className="success-circle-pulse">
                                        <svg viewBox="0 0 52 52" className="success-checkmark-svg">
                                            <circle cx="26" cy="26" r="25" fill="none" className="checkmark-circle-path" />
                                            <path d="M14.1 27.2 l7.1 7.2 16.7-16.8" fill="none" className="checkmark-check-path" />
                                        </svg>
                                    </div>
                                    <h3 className="success-title">Transmission Secure</h3>
                                    <p className="success-desc">
                                        Thank you, {formState.name}. Your signal has been registered. An ecosystem architect will establish contact shortly.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
