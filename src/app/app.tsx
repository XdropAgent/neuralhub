'use client';

import React, { useEffect, useRef, useState, useCallback, CSSProperties } from 'react';

/* ─────────────────── helpers ─────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useCopyToClipboard() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);
  return { copied, copy };
}

/* ─────────────────── orb data ─────────────────── */

interface OrbDef {
  size: number;
  color: string;
  x: string;
  y: string;
  duration: number;
  delay: number;
  blur: number;
}

const orbDefs: OrbDef[] = [
  { size: 500, color: 'rgba(168,85,247,0.18)', x: '10%', y: '5%', duration: 22, delay: 0, blur: 80 },
  { size: 400, color: 'rgba(59,130,246,0.15)', x: '75%', y: '15%', duration: 26, delay: 3, blur: 90 },
  { size: 350, color: 'rgba(6,182,212,0.13)', x: '50%', y: '55%', duration: 20, delay: 6, blur: 70 },
  { size: 300, color: 'rgba(212,168,83,0.10)', x: '20%', y: '75%', duration: 28, delay: 2, blur: 85 },
  { size: 450, color: 'rgba(168,85,247,0.12)', x: '80%', y: '60%', duration: 24, delay: 5, blur: 95 },
  { size: 250, color: 'rgba(59,130,246,0.10)', x: '40%', y: '30%', duration: 30, delay: 8, blur: 60 },
];

/* ─────────────────── keyframes (injected once) ─────────────────── */

const styleId = '__neuralhub_kf__';
function injectKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(styleId)) return;
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0a0612; color: #e2e8f0; font-family: 'Inter', sans-serif; overflow-x: hidden; }

    @keyframes orbFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(30px, -40px) scale(1.05); }
      50% { transform: translate(-20px, 30px) scale(0.95); }
      75% { transform: translate(40px, 20px) scale(1.03); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,0.3), 0 0 60px rgba(168,85,247,0.1); }
      50% { box-shadow: 0 0 40px rgba(168,85,247,0.5), 0 0 100px rgba(168,85,247,0.2); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes typewriter {
      from { width: 0; }
      to { width: 100%; }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes gridPulse {
      0%, 100% { opacity: 0.03; }
      50% { opacity: 0.07; }
    }
    @keyframes badgeGlow {
      0%, 100% { border-color: rgba(168,85,247,0.3); }
      50% { border-color: rgba(168,85,247,0.7); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    ::selection { background: rgba(168,85,247,0.4); color: #fff; }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0a0612; }
    ::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.4); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.6); }
  `;
  document.head.appendChild(style);
}

/* ─────────────────── style constants ─────────────────── */

const s = {
  section: {
    position: 'relative' as const,
    padding: '100px 24px',
    maxWidth: 1200,
    margin: '0 auto',
  },
  glass: {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)' as unknown as string,
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 16,
  },
  gradientText: {
    background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text' as const,
  },
  heading: {
    fontFamily: "'Cinzel', serif",
    fontWeight: 700,
    lineHeight: 1.1,
  },
  mono: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 32px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 30px rgba(168,85,247,0.4), 0 4px 20px rgba(0,0,0,0.3)',
  } as CSSProperties,
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 32px',
    borderRadius: 12,
    border: '1px solid rgba(168,85,247,0.4)',
    background: 'rgba(168,85,247,0.08)',
    color: '#c084fc',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  } as CSSProperties,
};

/* ─────────────────── orb background ─────────────────── */

function OrbBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        animation: 'gridPulse 6s ease-in-out infinite',
      }} />
      {orbDefs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            left: orb.x,
            top: orb.y,
            filter: `blur(${orb.blur}px)`,
            animation: `orbFloat ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────── navbar ─────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkStyle: CSSProperties = {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    transition: 'color 0.2s',
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0 24px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: scrolled ? 'rgba(10,6,18,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(168,85,247,0.1)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1200,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <a href="#" style={{
          fontFamily: "'Cinzel', serif",
          fontWeight: 700,
          fontSize: 20,
          textDecoration: 'none',
          ...s.gradientText,
        }}>
          ⬡ NeuralHub
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {['Features', 'Demo', 'Install', 'Providers'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#a855f7')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >
              {item}
            </a>
          ))}
          <a
            href="https://github.com/XdropAgent/neuralhub"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...linkStyle,
              padding: '8px 18px',
              border: '1px solid rgba(168,85,247,0.3)',
              borderRadius: 8,
              fontSize: 13,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(168,85,247,0.7)';
              e.currentTarget.style.color = '#a855f7';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────── hero ─────────────────── */

function HeroSection() {
  const ref = useScrollReveal();
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
      padding: '120px 24px 80px',
    }}>
      <div ref={ref}>
        {/* badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 20px',
          borderRadius: 100,
          border: '1px solid rgba(168,85,247,0.3)',
          background: 'rgba(168,85,247,0.08)',
          marginBottom: 32,
          fontSize: 13,
          fontWeight: 500,
          color: '#c084fc',
          animation: 'badgeGlow 3s ease-in-out infinite',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          v2.0 — Now with Agent Orchestration
        </div>

        {/* title */}
        <h1 style={{
          ...s.heading,
          fontSize: 'clamp(48px, 8vw, 96px)',
          marginBottom: 24,
          ...s.gradientText,
          filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.3))',
        }}>
          NeuralHub
        </h1>

        {/* subtitle */}
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          color: '#94a3b8',
          maxWidth: 640,
          margin: '0 auto 16px',
          lineHeight: 1.6,
          fontWeight: 300,
        }}>
          The open-source platform for deploying, orchestrating, and monitoring autonomous AI agents at scale.
        </p>

        <p style={{
          fontSize: 15,
          color: '#64748b',
          maxWidth: 500,
          margin: '0 auto 48px',
          lineHeight: 1.6,
        }}>
          One command. Any provider. Full observability. Zero vendor lock-in.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#install"
            style={s.btnPrimary}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 50px rgba(168,85,247,0.6), 0 8px 30px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(168,85,247,0.4), 0 4px 20px rgba(0,0,0,0.3)';
            }}
          >
            ⚡ Quick Start
          </a>
          <a
            href="https://github.com/XdropAgent/neuralhub"
            target="_blank"
            rel="noopener noreferrer"
            style={s.btnSecondary}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ★ Star on GitHub
          </a>
        </div>

        {/* stats row */}
        <div style={{
          display: 'flex',
          gap: 48,
          justifyContent: 'center',
          marginTop: 64,
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Providers', value: '30+' },
            { label: 'Avg Deploy Time', value: '<5min' },
            { label: 'Models Supported', value: '8+' },
            { label: 'Uptime', value: '99.97%' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ ...s.heading, fontSize: 28, color: '#e2e8f0', marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── features ─────────────────── */

const features = [
  { icon: '🚀', title: 'One-Command Deploy', desc: 'Deploy agents with a single CLI command. No Dockerfiles, no YAML, no cloud-specific configs. NeuralHub handles provisioning, networking, and scaling automatically.', color: '#a855f7' },
  { icon: '🧠', title: 'Intelligent Routing', desc: 'Automatically route requests to the best available LLM provider based on latency, cost, and capability. Failover is instant and seamless.', color: '#3b82f6' },
  { icon: '📊', title: 'Full Observability', desc: 'Real-time dashboards with token usage, latency percentiles, error rates, and cost tracking per agent. Export to Grafana, Datadog, or any OTLP endpoint.', color: '#06b6d4' },
  { icon: '🔗', title: 'Context System', desc: 'Built-in RAG pipeline with vector storage, document chunking, and semantic search. Agents get the right context at the right time, automatically.', color: '#22c55e' },
  { icon: '🔒', title: 'Enterprise Security', desc: 'SOC2-ready architecture with end-to-end encryption, RBAC, audit logging, and secret management. Deploy on-prem or in your own VPC.', color: '#f59e0b' },
  { icon: '♻️', title: 'Hot-Swap Providers', desc: 'Switch between OpenAI, Anthropic, Mistral, or any custom provider without redeploying. Models are abstracted behind a unified interface.', color: '#ec4899' },
];

function FeaturesSection() {
  return (
    <section id="features" style={{ ...s.section, zIndex: 1 }}>
      <SectionHeader
        label="Features"
        title="Everything you need to ship AI agents"
        subtitle="NeuralHub gives you the complete infrastructure stack — from deployment to monitoring — so you can focus on building agents, not plumbing."
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 24,
      }}>
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useScrollReveal();
  const [hover, setHover] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...s.glass,
        padding: 32,
        transition: 'all 0.4s cubic-bezier(.16,1,.3,1)',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        borderColor: hover ? `${feature.color}33` : 'rgba(255,255,255,0.06)',
        boxShadow: hover ? `0 0 40px ${feature.color}22, 0 20px 60px rgba(0,0,0,0.3)` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}08)`,
        border: `1px solid ${feature.color}33`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
        marginBottom: 20,
      }}>
        {feature.icon}
      </div>
      <h3 style={{
        ...s.heading,
        fontSize: 20,
        color: '#f1f5f9',
        marginBottom: 12,
      }}>
        {feature.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: '#94a3b8' }}>
        {feature.desc}
      </p>
    </div>
  );
}

/* ─────────────────── terminal demo ─────────────────── */

function TerminalDemo() {
  const ref = useScrollReveal();
  const lines = [
    { text: '$ npx neuralhub deploy my-agent --provider anthropic', color: '#22c55e', prompt: true },
    { text: '', color: '' },
    { text: '  ⬡ NeuralHub v2.0.0', color: '#a855f7' },
    { text: '  ✓ Connected to provider: Anthropic (claude-3.5-sonnet)', color: '#22c55e' },
    { text: '  ✓ Context system initialized (2,847 chunks indexed)', color: '#22c55e' },
    { text: '  ✓ Observability stream active (OTLP → Grafana)', color: '#22c55e' },
    { text: '  ✓ Health checks configured (interval: 30s)', color: '#22c55e' },
    { text: '', color: '' },
    { text: '  Building agent bundle...', color: '#94a3b8' },
    { text: '  ████████████████████████████████ 100%', color: '#3b82f6' },
    { text: '', color: '' },
    { text: '  ✓ Deployed: https://my-agent.neuralhub.ai', color: '#22c55e' },
    { text: '  ✓ Gateway: wss://ws.neuralhub.ai/my-agent', color: '#22c55e' },
    { text: '  ✓ Cost tracking enabled ($0.0023/request)', color: '#f59e0b' },
    { text: '', color: '' },
    { text: '  Agent is live. 47ms cold start. 🚀', color: '#a855f7' },
  ];

  return (
    <section id="demo" style={{ ...s.section, zIndex: 1 }}>
      <SectionHeader
        label="CLI Demo"
        title="Deploy in seconds, not hours"
        subtitle="Watch a complete agent deployment lifecycle — from zero to production in under 30 seconds."
      />
      <div ref={ref} style={{
        ...s.glass,
        maxWidth: 780,
        margin: '0 auto',
        overflow: 'hidden',
        boxShadow: '0 0 60px rgba(168,85,247,0.15), 0 30px 80px rgba(0,0,0,0.4)',
        animation: 'pulseGlow 4s ease-in-out infinite',
      }}>
        {/* title bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 20px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef444488' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308', boxShadow: '0 0 6px #eab30888' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e88' }} />
          <span style={{ marginLeft: 12, fontSize: 13, color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
            neuralhub — deploy
          </span>
        </div>
        {/* body */}
        <div style={{ padding: '24px 28px', minHeight: 300 }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                ...s.mono,
                lineHeight: 1.9,
                color: line.color || 'transparent',
                opacity: 0,
                animation: `fadeInUp 0.5s ease forwards`,
                animationDelay: `${0.6 + i * 0.12}s`,
              }}
            >
              {line.text || '\u00A0'}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── dashboard preview ─────────────────── */

const agents = [
  { name: 'research-agent-v2', provider: 'Anthropic', model: 'claude-3.5-sonnet', status: 'running', latency: '42ms', tokens: '1.2M', cost: '$18.40' },
  { name: 'code-reviewer', provider: 'OpenAI', model: 'gpt-4o', status: 'running', latency: '38ms', tokens: '890K', cost: '$12.60' },
  { name: 'data-pipeline', provider: 'Mistral', model: 'mistral-large', status: 'idle', latency: '—', tokens: '456K', cost: '$4.20' },
  { name: 'customer-support', provider: 'Anthropic', model: 'claude-3-haiku', status: 'running', latency: '28ms', tokens: '3.1M', cost: '$8.90' },
  { name: 'doc-summarizer', provider: 'Google', model: 'gemini-pro', status: 'error', latency: '—', tokens: '120K', cost: '$1.10' },
];

function DashboardDemo() {
  const ref = useScrollReveal();
  const statusColors: Record<string, { bg: string; color: string }> = {
    running: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
    idle: { bg: 'rgba(234,179,8,0.15)', color: '#eab308' },
    error: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  };

  return (
    <section style={{ ...s.section, zIndex: 1 }}>
      <SectionHeader
        label="Observability"
        title="Real-time agent fleet dashboard"
        subtitle="Monitor every agent across every provider from a single pane of glass. Latency, cost, tokens, errors — all in real time."
      />
      <div ref={ref} style={{
        ...s.glass,
        maxWidth: 900,
        margin: '0 auto',
        overflow: 'hidden',
        boxShadow: '0 0 60px rgba(59,130,246,0.1), 0 30px 80px rgba(0,0,0,0.4)',
      }}>
        {/* stats bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { label: 'Active Agents', value: '4', sub: '/ 5 total' },
            { label: 'Avg Latency', value: '36ms', sub: 'p95: 89ms' },
            { label: 'Total Tokens', value: '5.8M', sub: 'today' },
            { label: 'Total Cost', value: '$45.20', sub: 'this month' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '20px 24px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</div>
              <div style={{ ...s.heading, fontSize: 22, color: '#e2e8f0' }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{stat.sub}</div>
            </div>
          ))}
        </div>
        {/* table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Agent', 'Provider', 'Model', 'Status', 'Latency', 'Tokens', 'Cost'].map(h => (
                  <th key={h} style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: '#64748b',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((a, i) => (
                <tr key={i} style={{
                  borderBottom: i < agents.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 16px', color: '#c084fc', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{a.name}</td>
                  <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{a.provider}</td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{a.model}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '4px 10px',
                      borderRadius: 100,
                      fontSize: 11,
                      fontWeight: 600,
                      background: statusColors[a.status].bg,
                      color: statusColors[a.status].color,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColors[a.status].color }} />
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{a.latency}</td>
                  <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{a.tokens}</td>
                  <td style={{ padding: '14px 16px', color: '#f59e0b', fontWeight: 500 }}>{a.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── framework comparison ─────────────────── */

function FrameworkComparison() {
  const ref = useScrollReveal();
  const rows = [
    { feature: 'One-command deploy', nh: true, oc: false },
    { feature: 'Multi-provider routing', nh: true, oc: false },
    { feature: 'Built-in observability', nh: true, oc: false },
    { feature: 'Context / RAG system', nh: true, oc: 'partial' },
    { feature: 'Hot-swap models', nh: true, oc: false },
    { feature: 'Agent-to-agent comms', nh: true, oc: true },
    { feature: 'Self-hosted option', nh: true, oc: true },
    { feature: 'Open source', nh: true, oc: true },
    { feature: 'Edge deployment', nh: true, oc: false },
    { feature: 'Cost tracking', nh: true, oc: false },
  ];

  const Check = () => <span style={{ color: '#22c55e', fontSize: 18 }}>✓</span>;
  const X = () => <span style={{ color: '#ef4444', fontSize: 18 }}>✗</span>;
  const Partial = () => <span style={{ color: '#eab308', fontSize: 14, fontWeight: 600 }}>partial</span>;

  return (
    <section style={{ ...s.section, zIndex: 1 }}>
      <SectionHeader
        label="Comparison"
        title="Why teams choose NeuralHub"
        subtitle="See how NeuralHub stacks up against the most popular alternative for AI agent deployment."
      />
      <div ref={ref} style={{
        ...s.glass,
        maxWidth: 700,
        margin: '0 auto',
        overflow: 'hidden',
      }}>
        {/* header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 120px 120px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ padding: '16px 24px', fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Feature</div>
          <div style={{
            padding: '16px',
            textAlign: 'center',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1,
            background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(59,130,246,0.1))',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            color: '#c084fc',
            fontWeight: 600,
          }}>
            ⬡ NeuralHub
          </div>
          <div style={{ padding: '16px', textAlign: 'center', fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
            OpenClaw
          </div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 120px 120px',
            borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
          }}>
            <div style={{ padding: '14px 24px', fontSize: 14, color: '#e2e8f0' }}>{r.feature}</div>
            <div style={{
              padding: '14px',
              textAlign: 'center',
              background: 'rgba(168,85,247,0.04)',
              borderLeft: '1px solid rgba(255,255,255,0.03)',
            }}>
              {r.nh === true ? <Check /> : r.nh === false ? <X /> : <Partial />}
            </div>
            <div style={{
              padding: '14px',
              textAlign: 'center',
              borderLeft: '1px solid rgba(255,255,255,0.03)',
            }}>
              {r.oc === true ? <Check /> : r.oc === false ? <X /> : <Partial />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── installation ─────────────────── */

function InstallStep({ step, index }: { step: { step: string; title: string; code: string; lang: string }; index: number }) {
  const ref = useScrollReveal();
  const { copied, copy } = useCopyToClipboard();
  const codeId = `install-${index}`;
  return (
    <div ref={ref} style={{
      ...s.glass,
      padding: 28,
      display: 'flex',
      gap: 24,
      alignItems: 'flex-start',
    }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.2))',
        border: '1px solid rgba(168,85,247,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...s.heading,
        fontSize: 16,
        color: '#a855f7',
        flexShrink: 0,
      }}>
        {step.step}
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ ...s.heading, fontSize: 18, color: '#f1f5f9', marginBottom: 12 }}>{step.title}</h3>
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 10,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <code style={{ ...s.mono, color: '#22c55e', fontSize: 13 }}>{step.code}</code>
          <button
            onClick={() => copy(step.code, codeId)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              padding: '6px 12px',
              color: copied === codeId ? '#22c55e' : '#94a3b8',
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            {copied === codeId ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}

function InstallSection() {
  const steps = [
    {
      step: '01',
      title: 'Install the CLI',
      code: 'npm install -g neuralhub',
      lang: 'bash',
    },
    {
      step: '02',
      title: 'Initialize your agent',
      code: 'neuralhub init my-agent --template conversational',
      lang: 'bash',
    },
    {
      step: '03',
      title: 'Deploy to production',
      code: 'neuralhub deploy my-agent --provider anthropic --region us-east-1',
      lang: 'bash',
    },
  ];

  return (
    <section id="install" style={{ ...s.section, zIndex: 1 }}>
      <SectionHeader
        label="Installation"
        title="Up and running in 3 commands"
        subtitle="From zero to a production-deployed AI agent in under 60 seconds. No configuration files, no infrastructure setup."
      />
      <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {steps.map((step, i) => (
          <InstallStep key={i} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── providers ─────────────────── */

const providers = [
  { name: 'OpenAI', color: '#10a37f' },
  { name: 'Anthropic', color: '#d4a853' },
  { name: 'Google', color: '#4285f4' },
  { name: 'Mistral', color: '#f97316' },
  { name: 'Cohere', color: '#39d98a' },
  { name: 'Groq', color: '#f43f5e' },
  { name: 'Together', color: '#8b5cf6' },
  { name: 'Replicate', color: '#06b6d4' },
  { name: 'Fireworks', color: '#f59e0b' },
  { name: 'DeepInfra', color: '#22d3ee' },
  { name: 'Anyscale', color: '#a78bfa' },
  { name: 'Perplexity', color: '#20b2aa' },
  { name: 'AWS Bedrock', color: '#ff9900' },
  { name: 'Azure OpenAI', color: '#0078d4' },
  { name: 'GCP Vertex', color: '#4285f4' },
  { name: 'Hugging Face', color: '#ffcc00' },
  { name: 'Ollama', color: '#e2e8f0' },
  { name: 'vLLM', color: '#fb923c' },
  { name: 'LM Studio', color: '#a855f7' },
  { name: 'TextGen', color: '#64748b' },
  { name: 'LiteLLM', color: '#06b6d4' },
  { name: 'AI21 Labs', color: '#6366f1' },
  { name: 'Aleph Alpha', color: '#2563eb' },
  { name: 'Baseten', color: '#ec4899' },
  { name: 'Cloudflare', color: '#f48120' },
  { name: 'Voyage AI', color: '#7c3aed' },
  { name: 'NVIDIA', color: '#76b900' },
  { name: 'Snowflake', color: '#29b5e8' },
  { name: 'Databricks', color: '#ff3621' },
  { name: 'Cerebras', color: '#e11d48' },
];

function ProviderBadge({ provider, index, hoveredIdx, onEnter, onLeave }: { provider: typeof providers[0]; index: number; hoveredIdx: number | null; onEnter: () => void; onLeave: () => void }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 18px',
        borderRadius: 10,
        background: hoveredIdx === index ? `${provider.color}18` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hoveredIdx === index ? `${provider.color}44` : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.3s ease',
        cursor: 'default',
        transform: hoveredIdx === index ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <span style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: provider.color,
        boxShadow: `0 0 8px ${provider.color}88`,
      }} />
      <span style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>{provider.name}</span>
    </div>
  );
}

function ProvidersSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <section id="providers" style={{ ...s.section, zIndex: 1 }}>
      <SectionHeader
        label="Providers"
        title="30+ providers, one interface"
        subtitle="Connect to any LLM provider through a unified API. Switch models without changing a single line of code."
      />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {providers.map((p, i) => (
          <ProviderBadge
            key={i}
            provider={p}
            index={i}
            hoveredIdx={hoveredIdx}
            onEnter={() => setHoveredIdx(i)}
            onLeave={() => setHoveredIdx(null)}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── footer ─────────────────── */

function Footer() {
  const cols = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Documentation', 'Changelog', 'Roadmap'],
    },
    {
      title: 'Resources',
      links: ['Quick Start Guide', 'API Reference', 'Examples', 'Blog', 'Status Page'],
    },
    {
      title: 'Community',
      links: ['GitHub', 'Discord', 'Twitter / X', 'Stack Overflow', 'Contributing'],
    },
  ];

  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(0,0,0,0.3)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '64px 24px 32px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* brand col */}
          <div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 12,
              ...s.gradientText,
            }}>
              ⬡ NeuralHub
            </div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, maxWidth: 240 }}>
              Open-source platform for deploying, orchestrating, and monitoring autonomous AI agents at scale.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                marginBottom: 16,
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none' }}>
                {col.links.map(link => (
                  <li key={link} style={{ marginBottom: 10 }}>
                    <a
                      href="#"
                      style={{
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: 13,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#a855f7')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ fontSize: 12, color: '#475569' }}>
            © 2026 NeuralHub. Built by{' '}
            <a href="https://nousresearch.com" target="_blank" rel="noopener noreferrer" style={{ color: '#a855f7', textDecoration: 'none' }}>
              Nous Research
            </a>
            . MIT License.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Security'].map(item => (
              <a
                key={item}
                href="#"
                style={{ fontSize: 12, color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────── section header helper ─────────────────── */

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: 56 }}>
      <div style={{
        display: 'inline-block',
        padding: '6px 16px',
        borderRadius: 100,
        border: '1px solid rgba(168,85,247,0.25)',
        background: 'rgba(168,85,247,0.06)',
        fontSize: 12,
        fontWeight: 600,
        color: '#a855f7',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 20,
      }}>
        {label}
      </div>
      <h2 style={{
        ...s.heading,
        fontSize: 'clamp(28px, 4vw, 42px)',
        color: '#f1f5f9',
        marginBottom: 16,
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: 16,
        color: '#94a3b8',
        maxWidth: 560,
        margin: '0 auto',
        lineHeight: 1.7,
      }}>
        {subtitle}
      </p>
    </div>
  );
}

/* ─────────────────── main export ─────────────────── */

export default function NeuralHubLanding() {
  useEffect(() => {
    injectKeyframes();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <OrbBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TerminalDemo />
      <DashboardDemo />
      <FrameworkComparison />
      <InstallSection />
      <ProvidersSection />
      <Footer />
    </div>
  );
}
