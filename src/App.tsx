import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollIndicator } from './components/ScrollIndicator';
import { TrustMarquee } from './components/TrustMarquee';
import { AboutSection } from './components/AboutSection';
import { EcosystemShowcase } from './components/EcosystemShowcase';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseZiron } from './components/WhyChooseZiron';
import { StatsSection } from './components/StatsSection';
import { TechStackShowcase } from './components/TechStackShowcase';
import { VisionSection } from './components/VisionSection';
import { FounderMessage } from './components/FounderMessage';
import { ContactSection } from './components/ContactSection';
import { StorytellingTimeline } from './components/StorytellingTimeline';
import { Footer } from './components/Footer';

function App() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
        };
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Initial setups to prevent layout flashes (FOUC)
        gsap.set('.navbar', { y: -80, opacity: 0 });
        gsap.set('.grid-overlay', { opacity: 0 });
        gsap.set('.hero-badge', { y: 20, opacity: 0 });
        gsap.set('.hero-heading', { y: 30, opacity: 0 });
        gsap.set('.sector-tag', { y: 15, opacity: 0 });
        gsap.set('.hero-subheading', { y: 20, opacity: 0 });
        gsap.set('.btn-primary', { y: 20, opacity: 0 });
        gsap.set('.btn-secondary', { y: 20, opacity: 0 });
        gsap.set('.canvas-wrapper', { scale: 0.8, opacity: 0 });
        gsap.set('.scroll-indicator-container', { opacity: 0 });
        gsap.set('.trust-section', { y: 30, opacity: 0 });

        // Staggered entry sequence
        tl.to('.grid-overlay', {
            opacity: 1,
            duration: 2
        })
        .to('.navbar', {
            y: 0,
            opacity: 1,
            duration: 1.2
        }, '-=1.5')
        .to('.hero-badge', {
            y: 0,
            opacity: 1,
            duration: 0.8
        }, '-=1.0')
        .to('.hero-heading', {
            y: 0,
            opacity: 1,
            duration: 1
        }, '-=0.7')
        .to('.sector-tag', {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08
        }, '-=0.6')
        .to('.hero-subheading', {
            y: 0,
            opacity: 1,
            duration: 0.8
        }, '-=0.5')
        .to(['.btn-primary', '.btn-secondary'], {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15
        }, '-=0.6')
        .to('.canvas-wrapper', {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'elastic.out(1, 0.85)'
        }, '-=1.0')
        .to('.scroll-indicator-container', {
            opacity: 0.6,
            duration: 0.8
        }, '-=0.8')
        .to('.trust-section', {
            y: 0,
            opacity: 1,
            duration: 1.2
        }, '-=0.8');

    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
            <BackgroundEffects />
            <Navbar />
            <Hero />
            <TrustMarquee />
            <AboutSection />
            <EcosystemShowcase />
            <ServicesSection />
            <StorytellingTimeline />
            <WhyChooseZiron />
            <StatsSection />
            <TechStackShowcase />
            <FounderMessage />
            <ContactSection />
            <VisionSection />
            <Footer />
            <ScrollIndicator />
        </div>
    );
}

export default App;
