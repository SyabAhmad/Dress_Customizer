import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { stylesAPI } from "../utils/api.js";
import toast from "react-hot-toast";

export default function Styles() {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchStyles(); }, []);

  const fetchStyles = async () => {
    try {
      setLoading(true);
      const res = await stylesAPI.list();
      setStyles(res.styles || []);
    } catch {
      setStyles([]);
      toast.error("Unable to load styles");
    } finally {
      setLoading(false);
    }
  };

  const applyStyle = (style) => navigate("/studio", { state: { style } });

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await stylesAPI.delete(deleteId);
      setStyles((s) => s.filter((x) => x.id !== deleteId));
      toast.success("Style deleted");
    } catch {
      toast.error("Delete failed");
    }
    setDeleteId(null);
  };

  const sortedStyles = useMemo(() => {
    const filtered = styles.filter((s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || s.category === category)
    );
    const arr = [...filtered];
    if (sort === "newest") arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    else if (sort === "oldest") arr.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    else if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [styles, sort, search]);

  return (
    <div className="h-full overflow-y-auto" style={{ background: "linear-gradient(180deg, rgba(135,206,235,0.95), rgba(173,216,230,0.9))", color: "#001a33" }}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Saved Styles</h1>
            <p className="text-sm mt-1" style={{ color: "#0066cc" }}>{styles.length} {styles.length === 1 ? "style" : "styles"} saved</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#0066cc" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search styles..." className="w-44 rounded-lg border pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0099ff]" style={{ border: "1px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.4)", color: "#001a33" }} />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0099ff]" style={{ border: "1px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.4)", color: "#001a33" }}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: "all", label: "All" },
            { value: "simple-party", label: "Simple Party" },
            { value: "wedding-party", label: "Wedding Party" },
            { value: "family-gathering", label: "Family Gathering" },
            { value: "university-party", label: "University Party" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{
                background: category === cat.value
                  ? "linear-gradient(135deg,#0055bb 0%,#0099ff 100%)"
                  : "rgba(255,255,255,0.5)",
                color: category === cat.value ? "#fff" : "#0066cc",
                border: category === cat.value ? "none" : "1px solid rgba(255,255,255,0.7)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-pulse text-sm font-medium" style={{ color: "#004999" }}>Loading styles...</div>
          </div>
        ) : sortedStyles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4 opacity-20">&#x1F3A8;</div>
            <p className="text-lg font-medium" style={{ color: "#0066cc" }}>
              {search ? "No matching styles" : "No styles yet"}
            </p>
            <p className="text-sm mt-1 mb-6" style={{ color: "#004999" }}>
              {search ? "Try a different search term" : "Save a style from the Studio Customize panel"}
            </p>
            {!search && (
              <button onClick={() => navigate("/studio")} className="text-sm px-5 py-2.5 rounded-xl font-bold shadow-md transition-all hover:scale-[1.02]" style={{ background: "linear-gradient(135deg,#0055bb 0%,#0099ff 100%)", color: "#fff", border: "none" }}>
                Go to Studio
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedStyles.map((s) => (
              <div
                key={s.id}
                className="group rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.4)", backdropFilter: "blur(10px)" }}
                onClick={() => applyStyle(s)}
              >
                <div className="h-32 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))" }}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-xl border-2 border-white/60 shadow-md" style={{ backgroundColor: s.color }} />
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/60" style={{ color: "#0066cc" }}>
                      {s.pattern}
                    </span>
                  </div>
                </div>
                <div className="p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold truncate" style={{ color: "#001a33" }}>{s.name}</h3>
                    <span className="text-[10px] shrink-0" style={{ color: "#0066cc" }}>{new Date(s.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Tag>{s.neckline}</Tag>
                    <Tag>{s.texture}</Tag>
                    <Tag>sleeve {s.sleeve_length}</Tag>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); applyStyle(s); }} className="text-[10px] px-2.5 py-1.5 rounded-md font-medium text-white" style={{ background: "linear-gradient(90deg,#0066cc,#0099ff)" }}>
                      Apply
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteId(s.id); }} className="text-[10px] px-2 py-1.5 rounded-md font-medium ml-auto" style={{ color: "#E11D48", border: "1px solid rgba(225,29,72,0.2)" }}>
                      &#x2715;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="rounded-xl border shadow-xl p-5 w-full max-w-sm mx-4" style={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(255,255,255,0.5)" }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold mb-2" style={{ color: "#001a33" }}>Delete style?</h3>
            <p className="text-xs mb-4" style={{ color: "#004999" }}>This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 text-xs px-3 py-2 rounded-lg font-medium" style={{ background: "rgba(255,255,255,0.5)", color: "#0066cc", border: "1px solid rgba(0,102,204,0.2)" }}>Cancel</button>
              <button onClick={confirmDelete} className="flex-1 text-xs px-3 py-2 rounded-lg font-medium text-white" style={{ background: "#E11D48", border: "none" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: "rgba(0,102,204,0.08)", color: "#004999" }}>
      {children}
    </span>
  );
}
