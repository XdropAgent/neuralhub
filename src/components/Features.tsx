const FEATURES = [
  {
    icon: "🚀",
    title: "One-Command Deploy",
    desc: "Single script installs everything: dependencies, runtime, agent configs, and monitoring. Zero manual setup.",
  },
  {
    icon: "🔀",
    title: "Agent Routing",
    desc: "Route requests to specialized agents based on intent. Support, coding, research — each handled by a dedicated model.",
  },
  {
    icon: "📊",
    title: "Live Observability",
    desc: "Real-time dashboard with agent health, token usage, latency metrics, and error tracking across all instances.",
  },
  {
    icon: "🧠",
    title: "Persistent Context",
    desc: "Agents remember conversations, learn preferences, and build knowledge graphs across sessions automatically.",
  },
  {
    icon: "🔐",
    title: "Zero-Trust Security",
    desc: "Credential isolation per agent. Encrypted config storage. Audit logging. No secrets in plaintext, ever.",
  },
  {
    icon: "⚡",
    title: "Hot-Swap Models",
    desc: "Switch between 30+ providers without downtime. Fallback chains, load balancing, and cost optimization built in.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">Everything You Need</h2>
        <p className="section-sub">
          A complete platform for building, deploying, and managing AI agent fleets at any scale.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-text-dim leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
