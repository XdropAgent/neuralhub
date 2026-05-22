const LINES = [
  { cmd: "$ neuralhub deploy research-agent", delay: 0 },
  { text: "  ✓ Runtime: GPT-4o | Channel: Slack #research", delay: 400 },
  { text: "  ✓ Skills loaded: arxiv-search, paper-summary", delay: 800 },
  { text: "  ✓ Agent 'research-agent' is live", delay: 1200, color: "text-neon-green" },
  { cmd: "$ neuralhub deploy code-reviewer", delay: 1800 },
  { text: "  ✓ Runtime: Claude Sonnet | Channel: GitHub PR", delay: 2200 },
  { text: "  ✓ Skills loaded: diff-analyze, security-scan", delay: 2600 },
  { text: "  ✓ Agent 'code-reviewer' is live", delay: 3000, color: "text-neon-green" },
  { cmd: "$ neuralhub status", delay: 3600 },
  { text: "  ● research-agent    GPT-4o        running  12m", delay: 4000, color: "text-neon-green" },
  { text: "  ● code-reviewer     Claude Sonnet running   8m", delay: 4200, color: "text-neon-green" },
  { text: "  ○ data-analyst      (stopped)", delay: 4400, color: "text-text-dim" },
  { text: "  ○ support-bot       (stopped)", delay: 4600, color: "text-text-dim" },
];

export default function TerminalDemo() {
  return (
    <section id="demo" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Multi-Agent Orchestration</h2>
        <p className="section-sub">
          Deploy specialized agents with a single command. Each runs isolated with its own model, skills, and channel.
        </p>
        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-cosmic-border">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-text-dim ml-4">terminal — neuralhub</span>
          </div>
          <div className="p-6 font-mono text-sm space-y-1.5">
            {LINES.map((l, i) => (
              <div
                key={i}
                className={`transition-opacity duration-300 ${l.cmd ? "text-text-main font-semibold" : l.color || "text-text-dim"}`}
              >
                {l.cmd || l.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
