import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gownDesignsAPI } from "../utils/api.js";
import toast from "react-hot-toast";

export default function Designs() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const res = await gownDesignsAPI.getAll();
      setDesigns(res.designs || []);
    } catch (err) {
      console.error("Failed to load designs", err);
      setDesigns([]);
      toast.error("Unable to load designs");
    } finally {
      setLoading(false);
    }
  };

  const openDesign = (id) => {
    navigate(`/designs/${id}`);
  };
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
        <h1
          className="text-3xl font-semibold font-['Playfair_Display']"
          style={{ color: "#001a33" }}
        >
          My Designs
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#0066cc" }}>
          All saved generations
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center py-12">Loading…</div>
          ) : designs.length === 0 ? (
            <div
              className="col-span-full text-center py-12 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <p style={{ color: "#0066cc" }} className="font-medium">
                No designs yet
              </p>
              <p className="text-sm mt-1" style={{ color: "#004999" }}>
                Create one in the Studio.
              </p>
            </div>
          ) : (
            designs.map((d) => (
              <article
                key={d.id}
                className="rounded-xl border p-4 shadow-md hover:shadow-lg transition-shadow"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="text-xs font-medium"
                  style={{ color: "#0066cc" }}
                >
                  {new Date(d.created_at).toLocaleString()}
                </div>
                <div
                  className="mt-2 font-semibold"
                  style={{ color: "#001a33" }}
                >
                  {d.name}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => openDesign(d.id)}
                    className="text-xs px-3 py-1.5 rounded-md font-medium transition-all"
                    style={{
                      background:
                        "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                      color: "#fff",
                    }}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => editDesign(d)}
                    className="text-xs px-3 py-1.5 rounded-md font-medium transition-all"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      color: "#001a33",
                      border: "1px solid rgba(255,255,255,0.6)",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteDesign(d.id)}
                    className="text-xs px-3 py-1.5 rounded-md font-medium transition-all"
                    style={{
                      background: "transparent",
                      color: "#b91c1c",
                      border: "1px solid rgba(185,28,28,0.12)",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
