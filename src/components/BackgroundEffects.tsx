import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const BackgroundEffects = () => {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const spotlight = spotlightRef.current;
        if (!spotlight) return;

        let firstMove = true;

        const handleMouseMove = (e: MouseEvent) => {
            if (firstMove) {
                gsap.to(spotlight, {
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out'
                });
                firstMove = false;
            }

            gsap.to(spotlight, {
                left: e.clientX,
                top: e.clientY,
                duration: 0.8,
                ease: 'power3.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            {/* Mouse Spotlight */}
            <div ref={spotlightRef} className="spotlight" />
            
            {/* Grid Overlay */}
            <div className="grid-overlay" />

            {/* Gradient Mesh Background Orbs */}
            <div className="gradient-mesh-container">
                <div className="glow-orb orb-1" />
                <div className="glow-orb orb-2" />
                <div className="glow-orb orb-3" />
            </div>
        </>
    );
};
