export default function PromptBar({
  prompt,
  onChange,
  onGenerate,
  isGenerating,
}) {
  const suggestions = [
    "Blue evening gown with lace sleeves and long train",
    "Red satin A-line with off-shoulder neckline",
    "Emerald velvet ballgown with long sleeves",
    "Minimal white silk slip dress",
  ];

  return (
    <section className="mt-0">
      <div
        className="rounded-xl border p-4 backdrop-blur-lg shadow-lg"
        style={{
          border: "1px solid rgba(255,255,255,0.3)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))",
          color: "#001a33",
        }}
      >
        <div className="flex flex-col md:flex-row gap-3">
          <textarea
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            rows={2}
            placeholder="Describe your dress… e.g. 'Generate a blue evening gown with lace sleeves and a long train.'"
            className="flex-1 resize-none rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 backdrop-blur-sm"
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.3)",
              color: "#001a33",
            }}
          />
          <button
            onClick={onGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full md:w-auto md:self-start inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
              color: "#ffffff",
              border: "none",
            }}
          >
            {isGenerating ? (
              <span className="inline-flex items-center gap-2">
                <Spinner className="w-4 h-4 text-[#021018]" /> Generating…
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <WandIcon className="w-4 h-4 text-[#021018]" /> Generate
              </span>
            )}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onChange(s)}
              className="text-xs px-2.5 py-1 rounded-lg border transition-all duration-200"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#001a33",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function WandIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 19 19 6l-1-1L5 18l1 1Z" />
      <path d="M15 6l3 3" />
      <path d="M8 7 7 8" />
      <path d="M16 19l1 1" />
      <path d="M3 3l1 1" />
    </svg>
  );
}

function Spinner(props) {
  return (
    <svg viewBox="0 0 24 24" className="animate-spin" {...props}>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.2"
        fill="none"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
}
