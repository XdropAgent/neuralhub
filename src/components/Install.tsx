"use client";
import { useState } from "react";

const STEPS = [
  {
    step: "01",
    title: "Clone & Install",
    code: `git clone https://github.com/neuralhub-ai/neuralhub.git\ncd neuralhub\nsudo ./install.sh`,
  },
  {
    step: "02",
    title: "Configure Provider",
    code: `neuralhub config set provider openai\nneuralhub config set model gpt-4o\nneuralhub config set-key sk-xxx`,
  },
  {
    step: "03",
    title: "Deploy Your Agent",
    code: `neuralhub deploy my-agent --channel telegram --skills "web-search,code-exec"`,
  },
];

export default function Install() {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = (i: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="install" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Up and Running in Minutes</h2>
        <p className="section-sub">
          Three steps. No Docker required. Works on any Linux VPS.
        </p>
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-cosmic-border">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neon-violet">{s.step}</span>
                  <span className="text-sm font-semibold">{s.title}</span>
                </div>
                <button
                  onClick={() => copy(i, s.code)}
                  className="text-xs text-text-dim hover:text-text-main transition px-3 py-1 rounded border border-cosmic-border hover:border-text-dim"
                >
                  {copied === i ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-6 text-sm font-mono text-text-soft overflow-x-auto whitespace-pre">
                {s.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
