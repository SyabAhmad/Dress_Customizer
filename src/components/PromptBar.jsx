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
        className="rounded-xl border p-4 bg-gradient-to-br from-[rgba(124,92,255,0.1)] to-[rgba(59,232,208,0.1)] backdrop-blur-lg shadow-lg"
        style={{ border: "1px solid rgba(15,23,42,0.04)" }}
      >
        <div className="flex flex-col md:flex-row gap-3">
          <textarea
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            rows={2}
            placeholder="Describe your dress… e.g. 'Generate a blue evening gown with lace sleeves and a long train.'"
            className="flex-1 resize-none rounded-lg border border-[rgba(124,92,255,0.3)] bg-gradient-to-br from-[rgba(124,92,255,0.05)] to-[rgba(59,232,208,0.05)] text-[#e6f7ff] placeholder-[#b6bfd0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)]/50 backdrop-blur-sm"
          />
          <button
            onClick={onGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full md:w-auto md:self-start inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)",
              color: "#021018",
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
              className="text-xs px-2.5 py-1 rounded-lg border border-[rgba(124,92,255,0.3)] text-[#b6bfd0] hover:bg-gradient-to-r hover:from-[rgba(124,92,255,0.2)] hover:to-[rgba(59,232,208,0.2)] transition-all duration-200"
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
