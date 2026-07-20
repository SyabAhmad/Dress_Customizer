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
  }, [styles, sort, search, category]);

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#f0f4f8" }}>
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-lg font-bold" style={{ color: "#001a33" }}>Saved Styles</h1>
            <p className="text-[11px] mt-0.5" style={{ color: "#94a3b8" }}>
              {styles.length} {styles.length === 1 ? "style" : "styles"} saved
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3" style={{ color: "#94a3b8" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-36 rounded-full border pl-8 pr-3 py-1.5 text-[11px] focus:outline-none transition-all"
                style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff", color: "#001a33" }}
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border px-2.5 py-1.5 text-[11px] focus:outline-none cursor-pointer"
              style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff", color: "#001a33" }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {[
            { value: "all", label: "All" },
            { value: "simple-party", label: "Simple Party" },
            { value: "wedding-party", label: "Wedding" },
            { value: "family-gathering", label: "Family" },
            { value: "university-party", label: "University" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-all"
              style={{
                background: category === cat.value ? "#0066cc" : "#ffffff",
                color: category === cat.value ? "#fff" : "#94a3b8",
                border: category === cat.value ? "none" : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-xs" style={{ color: "#94a3b8" }}>Loading...</p>
          </div>
        ) : sortedStyles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(0,102,204,0.08)" }}>
              <svg className="w-5 h-5" style={{ color: "#0066cc" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
            </div>
            <p className="text-sm font-medium" style={{ color: "#001a33" }}>
              {search ? "No matching styles" : "No styles yet"}
            </p>
            <p className="text-[11px] mt-1 mb-4" style={{ color: "#94a3b8" }}>
              {search ? "Try a different search" : "Save a style from Studio"}
            </p>
            {!search && (
              <button
                onClick={() => navigate("/studio")}
                className="text-[11px] px-4 py-1.5 rounded-full font-medium transition-all hover:shadow-sm"
                style={{ background: "#0066cc", color: "#fff" }}
              >
                Go to Studio
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {sortedStyles.map((s) => (
              <div
                key={s.id}
                className="group rounded-xl cursor-pointer transition-all hover:shadow-sm"
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)" }}
                onClick={() => applyStyle(s)}
              >
                <div className="h-24 flex items-center justify-center rounded-t-xl" style={{ background: "#f8fafc" }}>
                  <div className="w-12 h-12 rounded-lg shadow-sm" style={{ backgroundColor: s.color }} />
                </div>
                <div className="px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-semibold truncate" style={{ color: "#001a33" }}>{s.name}</h3>
                    <span className="text-[10px] shrink-0" style={{ color: "#94a3b8" }}>{new Date(s.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <Tag>{s.neckline}</Tag>
                    <Tag>{s.texture}</Tag>
                    {s.category && <Tag>{s.category.replace(/-/g, " ")}</Tag>}
                  </div>
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); applyStyle(s); }}
                      className="text-[10px] px-2 py-1 rounded font-medium text-white"
                      style={{ background: "#0066cc" }}
                    >
                      Apply
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteId(s.id); }}
                      className="text-[10px] px-1.5 py-1 rounded font-medium ml-auto text-[#94a3b8] hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="rounded-2xl shadow-2xl p-5 w-full max-w-xs mx-4" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)" }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#001a33" }}>Delete style?</h3>
            <p className="text-[11px] mb-4" style={{ color: "#94a3b8" }}>This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 text-[11px] px-3 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors" style={{ color: "#0066cc", border: "1px solid rgba(0,0,0,0.08)" }}>Cancel</button>
              <button onClick={confirmDelete} className="flex-1 text-[11px] px-3 py-2 rounded-lg font-medium text-white transition-all hover:shadow-sm" style={{ background: "#E11D48" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(0,102,204,0.06)", color: "#94a3b8" }}>
      {children}
    </span>
  );
}
