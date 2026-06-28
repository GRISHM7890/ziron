import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Footer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    // Canvas slow drifting starfield/constellation effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        let height = canvas.height = canvas.parentElement?.clientHeight || 450;

        const handleResize = () => {
            width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            height = canvas.height = canvas.parentElement?.clientHeight || 450;
        };
        window.addEventListener('resize', handleResize);

        const stars: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number; twinkleSpeed: number }> = [];
        const starCount = 35;

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.2,
                twinkleSpeed: Math.random() * 0.01 + 0.005
            });
        }

        let animId: number;

        const drawFooterStarfield = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw constellation lines
            ctx.strokeStyle = 'rgba(0, 210, 255, 0.025)';
            ctx.lineWidth = 0.8;
            for (let i = 0; i < starCount; i++) {
                for (let j = i + 1; j < starCount; j++) {
                    const s1 = stars[i];
                    const s2 = stars[j];
                    const dx = s1.x - s2.x;
                    const dy = s1.y - s2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(s1.x, s1.y);
                        ctx.lineTo(s2.x, s2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw and update stars
            stars.forEach((s) => {
                // Twinkle alpha updates
                s.alpha += s.twinkleSpeed;
                if (s.alpha > 0.85 || s.alpha < 0.15) {
                    s.twinkleSpeed *= -1;
                }

                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fill();

                s.x += s.vx;
                s.y += s.vy;

                // Bounce at canvas boundaries
                if (s.x < 0 || s.x > width) s.vx *= -1;
                if (s.y < 0 || s.y > height) s.vy *= -1;
            });

            animId = requestAnimationFrame(drawFooterStarfield);
        };

        drawFooterStarfield();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        gsap.fromTo('.footer-success-txt', 
            { y: 8, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
    };

    return (
        <footer className="premium-footer">
            {/* Animated Constellation Canvas Background */}
            <canvas ref={canvasRef} className="footer-canvas" />

            <div className="footer-container">
                {/* Top Section */}
                <div className="footer-top-row">
                    {/* Brand Info & Newsletter */}
                    <div className="footer-brand-section">
                        <div className="footer-logo">ZIRON</div>
                        <p className="footer-tagline">Building India's Intelligent Future.</p>
                        
                        {/* Newsletter Glass Box */}
                        <div className="footer-newsletter-box">
                            <span className="newsletter-lbl">SUBSCRIBE TO LOGS</span>
                            {!subscribed ? (
                                <form onSubmit={handleSubscribe} className="newsletter-form">
                                    <input 
                                        type="email" 
                                        placeholder="email@organization.com" 
                                        required
                                        className="newsletter-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button type="submit" className="newsletter-btn">
                                        <svg viewBox="0 0 24 24" className="arrow-svg" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </button>
                                </form>
                            ) : (
                                <p className="footer-success-txt">Subscription Authorized.</p>
                            )}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="footer-links-grid">
                        <div className="footer-link-col">
                            <h4 className="link-col-title">Company</h4>
                            <ul className="link-col-list">
                                <li><a href="#about">About</a></li>
                                <li><a href="#leadership">Leadership</a></li>
                                <li><a href="#sectors">Sectors</a></li>
                                <li><a href="#partners">Partners</a></li>
                            </ul>
                        </div>
                        <div className="footer-link-col">
                            <h4 className="link-col-title">Solutions</h4>
                            <ul className="link-col-list">
                                <li><a href="#infra">AI Infrastructure</a></li>
                                <li><a href="#edu">Education AI</a></li>
                                <li><a href="#health">Healthcare AI</a></li>
                                <li><a href="#enterprise">Enterprise Software</a></li>
                            </ul>
                        </div>
                        <div className="footer-link-col">
                            <h4 className="link-col-title">Resources</h4>
                            <ul className="link-col-list">
                                <li><a href="#research">Research Labs</a></li>
                                <li><a href="#docs">Documentation</a></li>
                                <li><a href="#telemetry">Core Telemetry</a></li>
                                <li><a href="#status">System Status</a></li>
                            </ul>
                        </div>
                        <div className="footer-link-col">
                            <h4 className="link-col-title">Careers</h4>
                            <ul className="link-col-list">
                                <li><a href="#openings">Active Nodes</a></li>
                                <li><a href="#internships">Sandboxed Labs</a></li>
                                <li><a href="#rd">Core R&D</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom-row">
                    <div className="footer-copy">
                        © 2026 ZIRON Limited. All rights reserved.
                    </div>
                    
                    {/* Legal Links */}
                    <div className="footer-legal-links">
                        <a href="#privacy">Privacy</a>
                        <span className="legal-dot" />
                        <a href="#terms">Terms</a>
                        <span className="legal-dot" />
                        <a href="#sovereignty">Sovereign Data Policy</a>
                    </div>

                    {/* Social nodes */}
                    <div className="footer-socials">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
                        <a href="https://discord.com" target="_blank" rel="noreferrer" className="social-link">Discord</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
