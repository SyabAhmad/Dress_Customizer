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
    <section className="mt-6">
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <textarea
            value={prompt}
            onChange={(e) => onChange(e.target.value)}
            rows={2}
            placeholder="Describe your dress… e.g. ‘Generate a blue evening gown with lace sleeves and a long train.’"
            className="flex-1 resize-none rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
          <button
            onClick={onGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="md:self-start inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-blue-600 text-white px-4 py-2.5 text-sm font-medium shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="inline-flex items-center gap-2">
                <Spinner className="w-4 h-4" /> Generating…
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <WandIcon className="w-4 h-4" /> Generate
              </span>
            )}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onChange(s)}
              className="text-xs px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
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
