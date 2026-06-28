export const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <a href="#" className="logo-link">
                    <div className="logo">
                        <span className="logo-accent">Z</span>IRON
                    </div>
                </a>
                <nav className="nav-links">
                    <a href="#ecosystem" className="nav-item">Ecosystem</a>
                    <a href="#infrastructure" className="nav-item">Infrastructure</a>
                    <a href="#sectors" className="nav-item">Sectors</a>
                    <a href="#about" className="nav-item">About</a>
                </nav>
                <div className="nav-cta">
                    <a href="#partner" className="btn-nav">Contact Enterprise</a>
                </div>
            </div>
        </header>
    );
};
