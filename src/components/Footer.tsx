export default function Footer() {
  return (
    <footer className="border-t border-cosmic-border py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-neon-violet">⬡ NeuralHub</span>
          <span className="text-xs text-text-dim">v1.0.0</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-text-dim">
          <a href="https://github.com" target="_blank" className="hover:text-text-main transition">GitHub</a>
          <a href="https://github.com" target="_blank" className="hover:text-text-main transition">Docs</a>
          <a href="https://github.com" target="_blank" className="hover:text-text-main transition">Issues</a>
        </div>
        <p className="text-xs text-text-dim">
          NeuralHub — Built for autonomous agents. ⚡
        </p>
      </div>
    </footer>
  );
}
