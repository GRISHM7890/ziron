

const marqueeItems = [
    "Building AI Infrastructure for the Next Generation",
    "Future of Education",
    "Enterprise Solutions",
    "Healthcare Innovation",
    "Digital India",
    "Automation",
    "Smart Governance",
    "AI Research"
];

export const TrustMarquee = () => {
    return (
        <section className="trust-section">
            <div className="marquee-wrapper">
                <div className="marquee-track">
                    {/* Group 1 */}
                    <div className="marquee-group">
                        {marqueeItems.map((item, index) => (
                            <div key={`a-${index}`} className="marquee-item">
                                <span className="marquee-dot" />
                                <span className="marquee-text">{item}</span>
                            </div>
                        ))}
                    </div>
                    {/* Group 2 (Identical duplicate for seamless looping) */}
                    <div className="marquee-group">
                        {marqueeItems.map((item, index) => (
                            <div key={`b-${index}`} className="marquee-item">
                                <span className="marquee-dot" />
                                <span className="marquee-text">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
