import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechNode {
    id: string;
    label: string;
    cx: number;
    cy: number;
    color: string;
    desc: string;
    specs: string[];
}

interface Connection {
    from: string;
    to: string;
    path: string;
}

const techNodes: TechNode[] = [
    { id: "ai", label: "AI", cx: 380, cy: 300, color: "#00d2ff", desc: "Proprietary foundational models, custom LLM finetuning, and vector database embeddings.", specs: ["RAG Nodes", "LLM Finetuning", "Neural Nets"] },
    { id: "cloud", label: "Cloud", cx: 620, cy: 300, color: "#7928ca", desc: "Decentralized server fabrics, low-latency edge deployment, and sovereign secure compute.", specs: ["K8s Fabrics", "Edge Computing", "Sovereign Grids"] },
    { id: "data", label: "Data", cx: 200, cy: 150, color: "#4f46e5", desc: "High-frequency telemetry pipeline processing, ETL automation, and localized warehouses.", specs: ["Telemetry Sync", "ETL Pipelines", "Data Warehouses"] },
    { id: "web", label: "Web", cx: 140, cy: 300, color: "#06b6d4", desc: "Stripe-level responsive applications built on modern virtual DOM engines.", specs: ["React Engines", "SSR Pipelines", "GSAP Mechanics"] },
    { id: "mobile", label: "Mobile", cx: 200, cy: 450, color: "#3b82f6", desc: "Native cross-platform structural architectures built for speed and low network bandwidth.", specs: ["React Native", "Offline-first Store", "Native Bridges"] },
    { id: "cyber", label: "Cybersecurity", cx: 800, cy: 150, color: "#14b8a6", desc: "Zero-trust verification nodes, sandboxed data layers, and automated telemetry audits.", specs: ["Zero-trust", "Sandboxed Labs", "Audit Nodes"] },
    { id: "analytics", label: "Analytics", cx: 860, cy: 300, color: "#a78bfa", desc: "Real-time decision intelligence dashboards processing complex multi-dimensional datasets.", specs: ["OLAP Engines", "Predictive Models", "Visual Telemetry"] },
    { id: "automation", label: "Automation", cx: 800, cy: 450, color: "#2dd4bf", desc: "Robotic workflows, industrial triggers, and automated multi-tier enterprise tasks.", specs: ["API Automations", "Job Scheduler", "Agent Workflows"] }
];

const connections: Connection[] = [
    { from: "ai", to: "cloud", path: "M 380 300 L 620 300" },
    { from: "ai", to: "data", path: "M 380 300 L 200 150" },
    { from: "ai", to: "web", path: "M 380 300 L 140 300" },
    { from: "ai", to: "mobile", path: "M 380 300 L 200 450" },
    { from: "ai", to: "analytics", path: "M 380 300 L 860 300" },
    { from: "cloud", to: "cyber", path: "M 620 300 L 800 150" },
    { from: "cloud", to: "automation", path: "M 620 300 L 800 450" },
    { from: "cloud", to: "analytics", path: "M 620 300 L 860 300" },
    { from: "cloud", to: "data", path: "M 620 300 L 200 150" },
    { from: "cyber", to: "data", path: "M 800 150 L 200 150" },
    { from: "automation", to: "mobile", path: "M 800 450 L 200 450" }
];

export const TechStackShowcase = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll trigger animation
    useEffect(() => {
        gsap.fromTo('.tech-badge',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.tech-header-container',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.tech-heading',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: '.tech-heading',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.svg-graph-container',
            { scale: 0.95, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                scrollTrigger: {
                    trigger: '.svg-graph-container',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    // Verification helpers
    const isConnected = (nodeId: string) => {
        if (!hoveredNode) return true;
        if (nodeId === hoveredNode) return true;
        return connections.some(c => 
            (c.from === hoveredNode && c.to === nodeId) || 
            (c.to === hoveredNode && c.from === nodeId)
        );
    };

    const isLineActive = (from: string, to: string) => {
        if (!hoveredNode) return true;
        return from === hoveredNode || to === hoveredNode;
    };

    const activeNodeData = techNodes.find(n => n.id === hoveredNode);

    return (
        <section ref={containerRef} className="tech-section">
            {/* Tech grid dots layout overlay */}
            <div className="tech-grid-dots" />

            <div className="tech-header-container">
                <div className="tech-badge">
                    <span className="tech-badge-dot" />
                    <span className="tech-badge-text">Neural Network</span>
                </div>
                <h2 className="tech-heading">
                    Cohesive Tech Fabric. <br />
                    <span className="gradient-text">Interconnected Ecosystem.</span>
                </h2>
            </div>

            <div className="tech-graph-container">
                <div className="svg-graph-wrapper">
                    {/* SVG Graphic Context */}
                    <svg viewBox="0 0 1000 600" className="svg-graph-container">
                        <defs>
                            <filter id="svg-glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="6" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Connection Pathways */}
                        <g className="connections-group">
                            {connections.map((conn, idx) => {
                                const active = isLineActive(conn.from, conn.to);
                                return (
                                    <g key={idx}>
                                        <path
                                            d={conn.path}
                                            id={`path-${idx}`}
                                            className={`connection-path ${active ? 'active-path' : 'dimmed-path'} ${hoveredNode ? 'node-is-hovered' : ''}`}
                                            strokeWidth={active ? 1.5 : 0.8}
                                        />
                                        
                                        {/* Animated traveling light pulse along the active line path */}
                                        {active && (
                                            <circle r="3" fill="#ffffff" filter="url(#svg-glow)">
                                                <animateMotion 
                                                    dur={conn.from === 'ai' && conn.to === 'cloud' ? '3s' : '5s'} 
                                                    repeatCount="indefinite" 
                                                    path={conn.path}
                                                />
                                            </circle>
                                        )}
                                    </g>
                                );
                            })}
                        </g>

                        {/* Circle Nodes */}
                        <g className="nodes-group">
                            {techNodes.map(node => {
                                const active = isConnected(node.id);
                                const isDirect = node.id === hoveredNode;
                                
                                return (
                                    <g 
                                        key={node.id}
                                        className={`node-group-item ${isDirect ? 'direct-hover' : ''} ${active ? 'node-active' : 'node-dimmed'}`}
                                        onMouseEnter={() => setHoveredNode(node.id)}
                                        onMouseLeave={() => setHoveredNode(null)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {/* External animated glow circle */}
                                        <circle 
                                            cx={node.cx} 
                                            cy={node.cy} 
                                            r={isDirect ? 20 : 12}
                                            fill="transparent"
                                            stroke={node.color}
                                            strokeWidth="1.5"
                                            className="node-ring-pulse"
                                            opacity={active ? 0.8 : 0.15}
                                        />

                                        {/* Node Core circle */}
                                        <circle
                                            cx={node.cx}
                                            cy={node.cy}
                                            r={isDirect ? 10 : 6}
                                            fill={isDirect ? '#ffffff' : node.color}
                                            filter={isDirect ? 'url(#svg-glow)' : 'none'}
                                        />

                                        {/* Node Label Text */}
                                        <text
                                            x={node.cx}
                                            y={node.cy - (isDirect ? 28 : 20)}
                                            textAnchor="middle"
                                            className={`node-label ${isDirect ? 'label-highlight' : ''}`}
                                            fill={isDirect ? '#ffffff' : (active ? '#d4d4d8' : '#52525b')}
                                        >
                                            {node.label}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>

                {/* Bottom glass detail status panel */}
                <div className="status-detail-panel">
                    <div className="panel-blur" />
                    <div className="panel-content">
                        {hoveredNode && activeNodeData ? (
                            <div className="node-detail">
                                <div className="detail-top-row">
                                    <h4 className="detail-title">{activeNodeData.label} Platform</h4>
                                    <div className="specs-list">
                                        {activeNodeData.specs.map((s, i) => (
                                            <span key={i} className="spec-tag">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="detail-desc">{activeNodeData.desc}</p>
                            </div>
                        ) : (
                            <p className="detail-prompt">
                                <span className="prompt-pulse" />
                                Hover over any neural node in the network to inspect capabilities and stack relationships.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
