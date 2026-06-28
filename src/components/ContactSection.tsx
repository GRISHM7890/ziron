import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Background Brightness Shift on scroll
        gsap.to(container, {
            backgroundColor: '#0a0b16', // Shift from deep #030303 to a glowing navy-indigo slate
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

        // 3. Staggered reveal for form elements
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
        // Calculate relative coordinates from center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Translate button toward the mouse (35% of the distance)
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
        // Snap back with elastic bounce
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
        
        // Trigger success animation state
        setIsSubmitted(true);
    };

    return (
        <section ref={containerRef} className="contact-section">
            {/* Ambient background glow ring */}
            <div className="contact-glow-overlay" />

            <div className="contact-container">
                <div className="contact-grid">
                    
                    {/* Left Column: Details & Animated Map */}
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

                        {/* Floating Cards */}
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

                        {/* Animated Node Map of India */}
                        <div className="map-wrapper">
                            <svg viewBox="0 0 200 220" className="india-node-map">
                                {/* Dotted outline of India */}
                                <g fill="rgba(255,255,255,0.06)" stroke="none">
                                    <circle cx="100" cy="30" r="1.5" />
                                    <circle cx="95" cy="40" r="1.5" />
                                    <circle cx="110" cy="42" r="1.5" />
                                    <circle cx="90" cy="50" r="1.5" />
                                    <circle cx="100" cy="60" r="1.5" />
                                    <circle cx="115" cy="65" r="1.5" />
                                    <circle cx="85" cy="70" r="1.5" />
                                    <circle cx="100" cy="80" r="1.5" />
                                    <circle cx="120" cy="85" r="1.5" />
                                    <circle cx="75" cy="90" r="1.5" />
                                    <circle cx="90" cy="95" r="1.5" />
                                    <circle cx="110" cy="100" r="1.5" />
                                    <circle cx="65" cy="110" r="1.5" />
                                    <circle cx="80" cy="115" r="1.5" />
                                    <circle cx="100" cy="120" r="1.5" />
                                    <circle cx="120" cy="122" r="1.5" />
                                    <circle cx="70" cy="130" r="1.5" />
                                    <circle cx="88" cy="135" r="1.5" />
                                    <circle cx="105" cy="140" r="1.5" />
                                    <circle cx="78" cy="150" r="1.5" />
                                    <circle cx="95" cy="155" r="1.5" />
                                    <circle cx="110" cy="160" r="1.5" />
                                    <circle cx="85" cy="170" r="1.5" />
                                    <circle cx="100" cy="175" r="1.5" />
                                    <circle cx="92" cy="190" r="1.5" />
                                    <circle cx="100" cy="205" r="1.5" />
                                </g>

                                {/* Connecting network lines */}
                                <g stroke="rgba(0, 210, 255, 0.15)" strokeWidth="0.8" fill="none">
                                    <line x1="100" y1="60" x2="90" y2="95" />
                                    <line x1="90" y1="95" x2="88" y2="135" />
                                    <line x1="88" y1="135" x2="95" y2="155" />
                                    <line x1="95" y1="155" x2="100" y2="205" />
                                    
                                    <line x1="100" y1="60" x2="110" y2="100" />
                                    <line x1="110" y1="100" x2="105" y2="140" />
                                    <line x1="105" y1="140" x2="110" y2="160" />
                                </g>

                                {/* Pulsing City Node 1: Delhi */}
                                <g transform="translate(100, 60)">
                                    <circle r="6" fill="#00d2ff" opacity="0.3">
                                        <animate attributeName="r" values="4;10;4" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    <circle r="3" fill="#00d2ff" />
                                </g>

                                {/* Pulsing City Node 2: Bangalore */}
                                <g transform="translate(95, 155)">
                                    <circle r="6" fill="#7928ca" opacity="0.3">
                                        <animate attributeName="r" values="4;12;4" dur="2.5s" repeatCount="indefinite" />
                                    </circle>
                                    <circle r="3" fill="#7928ca" />
                                </g>
                            </svg>
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
                                /* Success State */
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
