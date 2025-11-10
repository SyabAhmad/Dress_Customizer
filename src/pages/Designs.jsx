import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { gownDesignsAPI } from "../utils/api.js";
import toast from "react-hot-toast";

export default function Designs() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      const res = await gownDesignsAPI.getAll();
      setDesigns(res.designs || []);
    } catch (err) {
      console.error("Failed to load designs", err);
      setDesigns([]);
      toast.error("Unable to load designs");
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  const openDesign = (id) => navigate(`/designs/${id}`);
  const editDesign = (d) => {
    // Navigate to Studio with design state for editing
    navigate("/studio", { state: { design: d } });
  };

  const deleteDesign = async (id) => {
    try {
      const ok = window.confirm("Delete this design? This cannot be undone.");
      if (!ok) return;
      await gownDesignsAPI.delete(id);
      setDesigns((s) => s.filter((x) => x.id !== id));
      toast.success("Design deleted");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Delete failed");
    }
  };

  const sortedDesigns = useMemo(() => {
    const arr = [...designs];
    if (sort === "newest")
      arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    else if (sort === "oldest")
      arr.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    else if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [designs, sort]);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, rgba(135,206,235,0.95), rgba(173,216,230,0.9))",
        color: "#001a33",
      }}
    >
      <main className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold font-['Playfair_Display']">
              My Designs
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#0066cc" }}>
              All saved generations
            </p>
          </div>
          {/* Toolbar */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => fetchDesigns(true)}
              disabled={refreshing}
              className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm"
              style={{
                background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                color: "#fff",
                opacity: refreshing ? 0.7 : 1,
              }}
            >
              <span className="inline-block">
                {refreshing ? "Refreshing" : "Refresh"}
              </span>
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm font-medium border outline-none transition"
              style={{
                background: "rgba(255,255,255,0.7)",
                borderColor: "rgba(0,102,204,0.3)",
                color: "#00416A",
              }}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Content area */}
        <div className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div
                className="animate-pulse text-sm font-medium"
                style={{ color: "#004999" }}
              >
                Loading designs…
              </div>
            </div>
          ) : sortedDesigns.length === 0 ? (
            <div
              className="rounded-xl border p-10 text-center mx-auto max-w-lg"
              style={{
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.5)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="text-lg font-semibold"
                style={{ color: "#0066cc" }}
              >
                No designs yet
              </div>
              <p className="text-sm mt-1" style={{ color: "#004999" }}>
                Generate your first dress concept in the Studio.
              </p>
              <button
                onClick={() => navigate("/studio")}
                className="mt-5 px-4 py-2 rounded-md text-sm font-medium shadow transition"
                style={{
                  background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                  color: "#fff",
                }}
              >
                Go to Studio
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedDesigns.map((d) => (
                <article
                  key={d.id}
                  onClick={() => openDesign(d.id)}
                  className="group rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition relative flex flex-col cursor-pointer hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(140deg,rgba(255,255,255,0.78),rgba(255,255,255,0.6))",
                    border: "1px solid rgba(255,255,255,0.55)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="p-4 flex-1 flex flex-col">
                    <div
                      className="text-[11px] font-medium tracking-wide"
                      style={{ color: "#0066cc" }}
                    >
                      {new Date(d.created_at).toLocaleString()}
                    </div>
                    <h2
                      className="mt-2 font-semibold text-sm line-clamp-2"
                      style={{ color: "#001a33" }}
                    >
                      {d.name || "Untitled design"}
                    </h2>
                    {d.description && (
                      <p
                        className="mt-2 text-[12px] leading-relaxed line-clamp-3"
                        style={{ color: "#004999" }}
                      >
                        {d.description}
                      </p>
                    )}
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDesign(d.id);
                        }}
                        className="text-[11px] px-3 py-1.5 rounded-md font-medium transition shadow-sm hover:shadow group-hover:translate-y-[-1px]"
                        style={{
                          background:
                            "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                          color: "#fff",
                        }}
                      >
                        Open
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editDesign(d);
                        }}
                        className="text-[11px] px-3 py-1.5 rounded-md font-medium transition border"
                        style={{
                          background: "rgba(255,255,255,0.55)",
                          color: "#001a33",
                          border: "1px solid rgba(0,102,204,0.15)",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDesign(d.id);
                        }}
                        className="text-[11px] px-3 py-1.5 rounded-md font-medium transition border"
                        style={{
                          background: "rgba(255,255,255,0.4)",
                          color: "#b91c1c",
                          border: "1px solid rgba(185,28,28,0.2)",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
