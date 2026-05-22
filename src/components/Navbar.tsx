"use client";
import { useState } from "react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Providers", href: "#providers" },
  { label: "Install", href: "#install" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-neon-violet">⬡ NeuralHub</a>
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-text-dim hover:text-text-main transition">
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            className="text-sm px-4 py-1.5 rounded-lg border border-neon-violet text-neon-violet hover:bg-neon-violet/10 transition"
          >
            GitHub
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-text-dim">
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="block text-sm text-text-dim py-2" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}