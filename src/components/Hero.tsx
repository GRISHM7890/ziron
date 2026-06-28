import { HeroContent } from './HeroContent';
import { NeuralSphere } from './NeuralSphere';

export const Hero = () => {
    return (
        <main className="hero-viewport">
            <div className="hero-container">
                <HeroContent />
                <div className="hero-visual">
                    <NeuralSphere />
                </div>
            </div>
        </main>
    );
};
