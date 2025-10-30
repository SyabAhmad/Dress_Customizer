export default function VariantsTray({ variants, onSelect }) {
  if (!variants.length) return null;
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium uppercase tracking-wider text-[#BDBDBD]">
          Variants
        </h3>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            className="shrink-0 w-32 rounded-lg border border-[#31363F] overflow-hidden hover:ring-2 hover:ring-[#76ABAE]/50 snap-start bg-[#31363F]/70 backdrop-blur"
            title={new Date(v.timestamp).toLocaleString()}
          >
            <img
              src={v.thumb}
              alt={v.name}
              className="w-full h-40 object-cover bg-[#222831]"
            />
            <div className="px-2 py-1 text-[11px] text-left truncate bg-[#31363F] text-[#BDBDBD]">
              {v.name}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
