export default function VariantsTray({ variants, onSelect }) {
  if (!variants.length) return null;
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Variants
        </h3>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            className="shrink-0 w-32 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:ring-2 hover:ring-blue-500/30"
            title={new Date(v.timestamp).toLocaleString()}
          >
            <img
              src={v.thumb}
              alt={v.name}
              className="w-full h-40 object-cover bg-white"
            />
            <div className="px-2 py-1 text-[11px] text-left truncate bg-zinc-50 dark:bg-zinc-950">
              {v.name}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
