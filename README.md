# 🧠 NeuralHub

<h3 align="center">Open-source platform for deploying, orchestrating, and monitoring autonomous AI agents</h3>

<p align="center">
  One-command install. Multi-agent orchestration. Live dashboard.<br/>
  Deploy AI agents to any VPS in under 5 minutes.
</p>

<p align="center">
  <a href="https://neuralhub-red.vercel.app">🔗 Live Demo</a> ·
  <a href="https://github.com/XdropAgent/neuralhub">📦 GitHub</a> ·
  <a href="#getting-started">🚀 Getting Started</a>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/NEXT.JS-16-black?style=flat-square&logo=next.js" alt="Next.js 16"/>
  <img src="https://img.shields.io/badge/REACT-19-61DAFB?style=flat-square&logo=react" alt="React 19"/>
  <img src="https://img.shields.io/badge/TYPESCRIPT-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript 5"/>
  <img src="https://img.shields.io/badge/TAILWIND-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind 4"/>
  <img src="https://img.shields.io/badge/PLATFORM-VPS-FF6900?style=flat-square&logo=linux" alt="VPS"/>
  <img src="https://img.shields.io/badge/LICENSE-MIT-green?style=flat-square" alt="MIT"/>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [One-Command Deploy](#-one-command-deploy)
  - [Intelligent Routing](#-intelligent-routing)
  - [Observability](#-observability)
  - [Context System](#-context-system)
  - [Security](#-security)
  - [Hot-Swap](#-hot-swap)
- [Multi-Agent Orchestration](#multi-agent-orchestration)
- [Dashboard](#dashboard)
- [Supported Providers](#supported-providers)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Framework Comparison](#framework-comparison)
- [License](#license)

---

## Overview

**NeuralHub** is an open-source platform for deploying and managing autonomous AI agents on any VPS. A single command installs everything — runtime, dependencies, agent configurations, and monitoring — with zero manual setup.

**The Problem:** Deploying multiple AI agents requires complex infrastructure setup, provider management, and monitoring. Each agent needs its own configuration, channel integration, and error handling. NeuralHub eliminates this complexity with a unified platform.

---

## Features

### 🚀 One-Command Deploy

Single script installs everything: dependencies, runtime, agent configs, and monitoring. Zero manual setup.

```bash
curl -fsSL https://get.neuralhub.ai | bash
```

### 🧠 Intelligent Routing

Automatic model selection based on task complexity. Route simple queries to fast models, complex reasoning to capable ones.

- **Cost optimization** — 40-60% reduction in API costs
- **Latency optimization** — Fast models for simple tasks
- **Quality optimization** — Best models for complex reasoning

### 📊 Observability

Real-time dashboard showing agent fleet status, token usage, error rates, and uptime metrics. Built-in alerting for anomalies.

- Agent status monitoring (running, idle, error)
- Token usage tracking per agent and model
- Error rate monitoring with alert thresholds
- Uptime and response time metrics

### 🧩 Context System

Persistent memory across sessions. Agents remember user preferences, environment details, and learned procedures without re-prompting.

- **Memory** — Compact persistent facts (user prefs, environment)
- **Skills** — Reusable procedures (workflows, error recovery)
- **Session Search** — Historical recall across past conversations

### 🔒 Security

Sandboxed agent execution with credential isolation. Each agent runs in its own container with restricted filesystem access.

- Credential isolation per agent
- Filesystem sandboxing
- Network access controls
- Audit logging for all operations

### 🔄 Hot-Swap

Switch models, providers, or configurations without restarting agents. Zero-downtime updates for production deployments.

- Model switching without restart
- Provider failover (OpenAI → Anthropic → OpenRouter)
- Configuration hot-reload
- Rolling updates across agent fleet

---

## Multi-Agent Orchestration

Deploy multiple specialized agents that work together:

```
┌─────────────────────────────────────────────────────┐
│                  NeuralHub Gateway                    │
├─────────────┬─────────────┬─────────────┬───────────┤
│  Research   │   Code      │  Support    │  Monitor  │
│  Agent      │   Agent     │  Agent      │  Agent    │
│  GPT-4o     │   Claude    │  DeepSeek   │  Gemini   │
│  Slack      │   GitHub    │  Discord    │  Email    │
└─────────────┴─────────────┴─────────────┴───────────┘
```

Each agent has independent:
- Model provider and configuration
- Channel integration (Slack, Discord, Telegram, Email)
- Skill set and context memory
- Token budget and rate limits

---

## Dashboard

Live monitoring dashboard with real-time agent fleet visibility:

- **Agent Fleet Table** — Name, model, channel, status, uptime, token usage
- **Stats Bar** — Total agents, active count, total tokens, error rate
- **Status Indicators** — Running (green), Idle (yellow), Error (red)
- **Auto-refresh** — Dashboard updates every 30 seconds

---

## Supported Providers

30+ AI providers supported out of the box:

**Tier 1 (Full Support):**
OpenAI · Anthropic · OpenRouter · DeepSeek · Groq · Gemini · Mistral · xAI

**Tier 2 (API Compatible):**
Ollama · Cohere · HuggingFace · Together · Fireworks · Replicate · Moonshot · DashScope

**Tier 3 (Community):**
Novita · Chutes · Voyage · Baidu · Zhipu · Baichuan · Minimax · Stepfun · SiliconFlow · Cloudflare

---

## Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   CLI Tool    │────▶│  NeuralHub Core   │────▶│  Agent Runtime    │
│   (install)   │     │  (orchestrator)   │     │  (per-agent)      │
└──────────────┘     └──────────────────┘     └──────────────────┘
                             │                        │
                             ▼                        ▼
                    ┌──────────────────┐     ┌──────────────────┐
                    │  Model Router     │     │  Channel Bridge   │
                    │  (30+ providers)  │     │  (Slack/Discord)  │
                    └──────────────────┘     └──────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Dashboard        │
                    │  (monitoring)     │
                    └──────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Runtime | Node.js 24 LTS |
| Deployment | VPS (Ubuntu 24.04 / Debian 13) |
| Font | JetBrains Mono, Geist |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/XdropAgent/neuralhub.git
cd neuralhub

# Install dependencies
npm install

# Start development server
npm run dev
```

The landing page will be available at `http://localhost:3000`.

**Build for Production:**

```bash
npm run build
npm run start
```

**Deploy to VPS:**

```bash
curl -fsSL https://get.neuralhub.ai | bash
```

---

## Project Structure

```
neuralhub/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page (all sections)
│   │   ├── layout.tsx                  # Root layout (fonts, metadata)
│   │   └── globals.css                 # Cosmic theme, gradient animations
│   │
│   └── components/
│       ├── Navbar.tsx                  # Sticky nav with smooth scroll
│       ├── Hero.tsx                    # Hero section with gradient title + CTA
│       ├── Features.tsx                # 6 feature cards with icons
│       ├── TerminalDemo.tsx            # Animated terminal deploy demo
│       ├── DashboardDemo.tsx           # Agent fleet table + stats bar
│       ├── Providers.tsx               # 30+ provider badges grid
│       ├── Install.tsx                 # 3-step install guide with copy buttons
│       └── Footer.tsx                  # Footer with links
│
└── .env.local                          # Environment variables (not committed)
```

---

## Framework Comparison

| Feature | NeuralHub | OpenClaw |
|---------|-----------|----------|
| One-command deploy | ✅ | ❌ |
| Multi-agent orchestration | ✅ | ❌ |
| Live dashboard | ✅ | ❌ |
| Context memory system | ✅ | ✅ |
| Sandboxed execution | ✅ | ❌ |
| 30+ providers | ✅ | ✅ |
| Hot-swap configs | ✅ | ❌ |
| Cost routing | ✅ | ❌ |

---

## License

MIT

---

<p align="center">
  Built with Next.js 16 + TypeScript + Tailwind CSS v4<br/>
  Open source AI agent deployment platform
</p>
