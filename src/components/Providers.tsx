const PROVIDERS = [
  "OpenAI", "Anthropic", "OpenRouter", "DeepSeek", "Groq",
  "Gemini", "Mistral", "xAI", "Ollama", "Cohere",
  "HuggingFace", "Together", "Fireworks", "Replicate",
  "Moonshot", "DashScope", "VolcEngine", "Minimax",
  "ZhipuAI", "Baichuan", "Yi", "Infini-AI",
];

export default function Providers() {
  return (
    <section id="providers" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">30+ Providers</h2>
        <p className="section-sub">
          Connect to any AI provider. Swap anytime. No vendor lock-in.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {PROVIDERS.map((p, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-lg glass text-sm text-text-soft hover:text-text-main hover:border-neon-violet/40 transition cursor-default"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
