export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-dots opacity-30" />
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-violet/10 rounded-full blur-[120px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-blue/10 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full border border-cosmic-border text-xs text-text-dim mb-6">
          Open Source &middot; Self-Hosted &middot; Production Ready
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-neon-violet via-neon-blue to-neon-cyan bg-clip-text text-transparent animate-gradient">
            NeuralHub
          </span>
        </h1>
        <p className="text-lg md:text-xl text-text-soft max-w-2xl mx-auto mb-8">
          Deploy and orchestrate autonomous AI agents from a single platform.
          Multi-agent routing, real-time monitoring, and one-command setup.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#install"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-violet to-neon-blue text-white font-semibold hover:opacity-90 transition glow-violet"
          >
            Get Started
          </a>
          <a
            href="https://github.com"
            target="_blank"
            className="px-8 py-3 rounded-xl border border-cosmic-border text-text-soft hover:text-text-main hover:border-text-dim transition"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}