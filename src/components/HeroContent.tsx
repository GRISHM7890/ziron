export const HeroContent = () => {
    return (
        <div className="hero-content">
            <div className="hero-badge">
                <span className="badge-dot" />
                <span className="badge-text">AI-First Technology Ecosystem</span>
            </div>
            
            <h1 className="hero-heading">
                Building India's <br />
                <span className="gradient-text">Intelligent Future.</span>
            </h1>
            
            <div className="sectors-grid">
                <div className="sector-tag">
                    <span className="tag-number">01</span>
                    <span className="tag-name">AI Infrastructure</span>
                </div>
                <div className="sector-tag">
                    <span className="tag-number">02</span>
                    <span className="tag-name">Education</span>
                </div>
                <div className="sector-tag">
                    <span className="tag-number">03</span>
                    <span className="tag-name">Healthcare</span>
                </div>
                <div className="sector-tag">
                    <span className="tag-number">04</span>
                    <span className="tag-name">Digital Transformation</span>
                </div>
                <div className="sector-tag">
                    <span className="tag-number">05</span>
                    <span className="tag-name">Enterprise Software</span>
                </div>
            </div>

            <p className="hero-subheading">
                One technology ecosystem powering tomorrow.
            </p>

            <div className="hero-ctas">
                <a href="#ecosystem" className="btn btn-primary" id="btn-explore">
                    <span className="btn-content">Explore Ecosystem</span>
                </a>
                <a href="#partner" className="btn btn-secondary" id="btn-partner">
                    <span className="btn-text">Partner With Us</span>
                    <span className="btn-icon">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    );
};
