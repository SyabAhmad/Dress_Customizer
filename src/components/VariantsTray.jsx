export default function VariantsTray({ variants, onSelect }) {
  if (!variants.length) return null;
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-medium uppercase tracking-wider"
          style={{ color: "#0066cc" }}
        >
          Variants
        </h3>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            className="shrink-0 w-32 rounded-lg border overflow-hidden hover:ring-2 snap-start backdrop-blur"
            title={new Date(v.timestamp).toLocaleString()}
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.2)",
            }}
          >
            <img
              src={v.thumb}
              alt={v.name}
              className="w-full h-40 object-cover"
              style={{ background: "rgba(255,255,255,0.3)" }}
            />
            <div
              className="px-2 py-1 text-[11px] text-left truncate"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#001a33",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {v.name}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
