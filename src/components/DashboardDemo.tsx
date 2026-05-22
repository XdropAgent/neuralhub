const AGENTS = [
  { name: "research-agent", model: "GPT-4o", channel: "#research", status: "running", uptime: "2h 14m", tokens: "124K" },
  { name: "code-reviewer", model: "Claude Sonnet", channel: "GitHub PR", status: "running", uptime: "1h 48m", tokens: "89K" },
  { name: "data-analyst", model: "DeepSeek V3", channel: "#analytics", status: "running", uptime: "45m", tokens: "56K" },
  { name: "support-bot", model: "Gemini Flash", channel: "#support", status: "stopped", uptime: "—", tokens: "—" },
];

const STATS = [
  { label: "Total Agents", value: "4", color: "text-neon-violet" },
  { label: "Running", value: "3", color: "text-neon-green" },
  { label: "Tokens Today", value: "269K", color: "text-neon-cyan" },
  { label: "Uptime", value: "99.7%", color: "text-neon-blue" },
];

export default function DashboardDemo() {
  return (
    <section id="dashboard" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Real-Time Observability</h2>
        <p className="section-sub">
          Monitor every agent from a single pane. Health, usage, latency — all in one place.
        </p>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {STATS.map((s, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-text-dim mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Agent table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-cosmic-border flex items-center justify-between">
            <span className="text-sm font-semibold">Agent Fleet</span>
            <span className="text-xs text-text-dim">Auto-refresh: 10s</span>
          </div>
          <div className="divide-y divide-cosmic-border">
            {AGENTS.map((a, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${a.status === "running" ? "bg-neon-green animate-pulse-soft" : "bg-text-dim"}`} />
                  <div>
                    <div className="text-sm font-semibold">{a.name}</div>
                    <div className="text-xs text-text-dim">{a.model} · {a.channel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-xs text-text-dim">
                  <span>{a.uptime}</span>
                  <span>{a.tokens}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    a.status === "running"
                      ? "bg-neon-green/10 text-neon-green border border-neon-green/30"
                      : "bg-cosmic-700 text-text-dim border border-cosmic-border"
                  }`}>
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
